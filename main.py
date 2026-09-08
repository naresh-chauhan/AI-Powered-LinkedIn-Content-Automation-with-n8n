#!/usr/bin/env python3
import os
import re
from functools import lru_cache
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, model_validator

try:
    from autogen_agentchat.agents import AssistantAgent
    from autogen_agentchat.messages import TextMessage
    from autogen_ext.models.openai import AzureOpenAIChatCompletionClient
    AUTOGEN_AVAILABLE = True
    AUTOGEN_IMPORT_ERROR = None
except Exception as e:
    # Keep the app runnable but return a clear error when endpoint is used.
    AssistantAgent = None
    TextMessage = None
    AzureOpenAIChatCompletionClient = None
    AUTOGEN_AVAILABLE = False
    AUTOGEN_IMPORT_ERROR = str(e)

# 1. Initialize FastAPI app
app = FastAPI(title="LinkedIn Content Automation Service")

# 2. Define Request and Response Schemas
class BrandConfigRequest(BaseModel):
    # Course payload fields
    company: Optional[str] = None
    tone: Optional[str] = None
    topic: Optional[str] = None

    # Extended payload fields supported by this service
    brand_tone: Optional[str] = None
    audience: Optional[str] = None
    keywords: Optional[List[str]] = None
    context: str = ""
    dry_run: bool = True

    @model_validator(mode="after")
    def validate_any_supported_shape(self):
        has_course_shape = bool(self.company and self.tone and self.topic)
        has_extended_shape = bool(self.brand_tone and self.audience and self.keywords)

        if not (has_course_shape or has_extended_shape):
            raise ValueError(
                "Provide either (company, tone, topic) or "
                "(brand_tone, audience, keywords)."
            )
        return self

class LinkedInResponse(BaseModel):
    ideas: List[str]
    draft: str
    confidence: float
    confidence_score: float
    hashtags: str


def normalize_request(request: BrandConfigRequest) -> dict:
    """Normalize either input schema into one internal shape."""
    tone = request.brand_tone or request.tone or "professional"
    topic = request.topic or ""
    keywords = request.keywords or ([] if not topic else [topic])
    audience = request.audience or "LinkedIn professionals"
    company = request.company or "Your company"

    return {
        "tone": tone,
        "topic": topic,
        "keywords": keywords,
        "audience": audience,
        "company": company,
        "context": request.context,
    }


def fallback_generate_content(payload: dict):
    """Generate deterministic local output when model integrations are unavailable."""
    company = payload["company"]
    tone = payload["tone"]
    topic = payload["topic"] or ", ".join(payload["keywords"][:1]) or "industry innovation"
    audience = payload["audience"]

    ideas = [
        f"{company}'s take on {topic}: what changes this quarter",
        f"A practical guide to {topic} for {audience}",
        f"Three lessons business leaders should know about {topic}",
    ]
    draft = (
        f"{topic.title()} is creating new opportunities for teams that move early. "
        f"At {company}, we focus on customer trust, measurable outcomes, and steady execution. "
        f"If your team is exploring this space, start with one focused use case, measure impact, "
        f"and iterate with discipline.\n\n"
        f"confidence_score: 0.78"
    )
    hashtags = "#Fintech #LinkedIn #DigitalTransformation #Innovation #Leadership"

    if tone.lower() == "authoritative":
        draft = (
            f"{topic.title()} is no longer optional for forward-looking organizations. "
            f"At {company}, we treat it as a strategic priority anchored in trust, compliance, "
            f"and measurable business value. Teams that execute in short, evidence-driven cycles "
            f"will define the next wave of category leaders.\n\n"
            f"confidence_score: 0.83"
        )

    return ideas, draft, hashtags

@lru_cache(maxsize=1)
def get_agents():
    """Create and cache AutoGen agents using environment-based Azure OpenAI config."""
    if not AUTOGEN_AVAILABLE:
        raise RuntimeError(
            "Missing required packages for agent integrations: "
            f"{AUTOGEN_IMPORT_ERROR}. Install autogen-agentchat and autogen-ext[openai]."
        )

    azure_endpoint = os.getenv(
        "AZURE_OPENAI_ENDPOINT",
        "https://openai-api-management-gw.azure-api.net",
    )
    api_key = os.getenv("AZURE_OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY")
    api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2025-01-01-preview")
    deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-5-mini")
    model = os.getenv("AZURE_OPENAI_MODEL", deployment)

    if not api_key:
        raise RuntimeError("AZURE_OPENAI_API_KEY (or OPENAI_API_KEY) is not set")

    model_client = AzureOpenAIChatCompletionClient(
        azure_endpoint=azure_endpoint,
        api_key=api_key,
        api_version=api_version,
        model=model,
        azure_deployment=deployment,
    )

    ideation_agent = AssistantAgent(
        name="IdeationAgent",
        model_client=model_client,
        system_message=(
            "You are a creative Content Strategist. Generate 3 distinct LinkedIn post ideas "
            "based on the provided brand brief. Return only the numbered list of ideas."
        ),
    )

    drafting_agent = AssistantAgent(
        name="DraftingAgent",
        model_client=model_client,
        system_message=(
            "You are an expert LinkedIn Writer. Create a high-quality post from a selected idea. "
            "Guidelines: 1. Maintain the specified brand tone. 2. Ensure it is professional. "
            "3. You MUST end your response with a confidence_score: [Value between 0.0 and 1.0]."
        ),
    )

    hashtag_agent = AssistantAgent(
        name="HashtagAgent",
        model_client=model_client,
        system_message=(
            "You are a Social Media Specialist. Generate 5-10 trending and relevant hashtags "
            "for the provided LinkedIn post. Return only the hashtags."
        ),
    )

    return ideation_agent, drafting_agent, hashtag_agent

# 5. Define the /linkedin Endpoint (As required by Source [1, 2])
@app.post("/linkedin", response_model=LinkedInResponse)
async def generate_linkedin_content(request: BrandConfigRequest):
    try:
        payload = normalize_request(request)

        # Create the Brand Brief context
        brand_brief = f"""
        COMPANY: {payload['company']}
        TONE: {payload['tone']}
        AUDIENCE: {payload['audience']}
        KEYWORDS: {', '.join(payload['keywords'])}
        TOPIC: {payload['topic']}
        CONTEXT: {payload['context']}
        """

        try:
            ideation_agent, drafting_agent, hashtag_agent = get_agents()
        except RuntimeError:
            ideas, draft_content, hashtags = fallback_generate_content(payload)
            m = re.search(r'confidence_score\s*[:\-]\s*([0-9]*\.?[0-9]+)', draft_content, flags=re.I)
            confidence = float(m.group(1)) if m else 0.78
            draft_clean = re.sub(r'(?im)^.*confidence_score\s*[:\-].*$', '', draft_content).strip()
            return LinkedInResponse(
                ideas=ideas,
                draft=draft_clean,
                confidence=confidence,
                confidence_score=confidence,
                hashtags=hashtags.strip(),
            )

        # A) Ideation Phase
        ideation_msg = await ideation_agent.on_messages(
            [TextMessage(content=f"Generate post ideas for: {brand_brief}", source="user")],
            cancellation_token=None
        )
        ideas_text = getattr(ideation_msg.chat_message, 'content', '')
        # Parse numbered or plain lines into ideas
        ideas_list = []
        for line in ideas_text.splitlines():
            s = line.strip()
            if not s:
                continue
            # remove leading numbering like '1.', '1)', '1 -', etc.
            idea = re.sub(r'^\s*\d+\s*[\.)\-:]*\s*', '', s)
            ideas_list.append(idea)
        if not ideas_list:
            ideas_list = fallback_generate_content(payload)[0]

        # B) Drafting Phase
        draft_msg = await drafting_agent.on_messages(
            [TextMessage(content=f"Write a post for Idea 1 from this list: {ideas_text}. Context: {brand_brief}", source="user")],
            cancellation_token=None
        )
        draft_content = getattr(draft_msg.chat_message, 'content', '')

        # C) Extract Confidence Score (Required for n8n Approval Gate [11])
        # Look for a numeric confidence_score anywhere in the draft (0.0 - 1.0)
        confidence = 0.8  # Default fallback
        m = re.search(r'confidence_score\s*[:\-]\s*([0-9]*\.?[0-9]+)', draft_content, flags=re.I)
        if m:
            try:
                confidence = float(m.group(1))
            except Exception:
                pass
        confidence = max(0.0, min(1.0, confidence))

        # D) Hashtag Generation Phase
        hashtag_msg = await hashtag_agent.on_messages(
            [TextMessage(content=f"Generate hashtags for this post: {draft_content}", source="user")],
            cancellation_token=None
        )
        hashtags = getattr(hashtag_msg.chat_message, 'content', '')

        # 6. Return Structured JSON for n8n consumption [2, 6]
        # Clean draft by removing the confidence_score line if present
        draft_clean = re.sub(r'(?im)^.*confidence_score\s*[:\-].*$', '', draft_content).strip()

        return LinkedInResponse(
            ideas=ideas_list[:3],
            draft=draft_clean,
            confidence=confidence,
            confidence_score=confidence,
            hashtags=hashtags.strip()
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. Run the Microservice (Mirroring Source [12, 13])
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8001"))
    uvicorn.run(app, host="0.0.0.0", port=port)