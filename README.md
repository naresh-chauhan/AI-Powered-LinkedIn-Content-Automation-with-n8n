# LinkedIn Content Automation

This small FastAPI service generates LinkedIn post ideas, drafts, and hashtags using agent integrations.

Quick start

1. Create or activate the workspace venv (optional):

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:

```bash
pip3 install -r requirements.txt
```

3. Set Azure OpenAI environment variables:

```bash
export AZURE_OPENAI_API_KEY="<your-api-key>"
export AZURE_OPENAI_ENDPOINT="https://openai-api-management-gw.azure-api.net"   # optional if default is fine
export AZURE_OPENAI_API_VERSION="2025-01-01-preview"                              # optional
export AZURE_OPENAI_DEPLOYMENT="gpt-5-mini"                                        # optional
export AZURE_OPENAI_MODEL="gpt-5-mini"                                             # optional
```

4. Run the service:

```bash
bash run.sh
# Optional override:
# PORT=8010 bash run.sh
```

5. POST to the endpoint `http://localhost:8001/linkedin` with JSON body matching the `BrandConfigRequest` schema.

Notes

- The app now uses real AutoGen packages: `autogen-agentchat` and `autogen-ext[openai]`.
- Agents are initialized lazily on first `/linkedin` request and require `AZURE_OPENAI_API_KEY`.
- If packages are missing or config is invalid, `/linkedin` returns a clear 500 error with the reason.
