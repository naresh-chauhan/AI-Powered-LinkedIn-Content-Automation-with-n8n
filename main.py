#!/usr/bin/env python3
import os
import re
from functools import lru_cache
from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

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
    brand_tone: str
    audience: str
    keywords: List[str]
    context: str = ""

class LinkedInResponse(BaseModel):
    ideas: List[str]
    draft: str
    confidence_score: float
    hashtags: str

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
        ideation_agent, drafting_agent, hashtag_agent = get_agents()

        # Create the Brand Brief context
        brand_brief = f"""
        TONE: {request.brand_tone}
        AUDIENCE: {request.audience}
        KEYWORDS: {', '.join(request.keywords)}
        CONTEXT: {request.context}
        """

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