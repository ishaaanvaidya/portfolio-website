from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

from knowledge_base import SYSTEM_PROMPT

load_dotenv()

app = FastAPI(title="Ishan Vaidya Portfolio Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN not found in environment. Check your .env file.")

# DeepSeek V3 via HuggingFace Inference Providers
# Change model string here if needed
MODEL_ID = os.getenv("MODEL_ID", "deepseek-ai/DeepSeek-V4-Flash")
PROVIDER  = os.getenv("HF_PROVIDER", "novita")   # novita | together | fireworks

client = InferenceClient(
    provider=PROVIDER,
    api_key=HF_TOKEN,
)

app = FastAPI(title="Ishan Vaidya Portfolio Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


# ── Request / Response schemas ──────────────────────────────────────────────

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

class ChatResponse(BaseModel):
    reply: str


# ── Endpoint ─────────────────────────────────────────────────────────────────

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages list is empty")

    # Keep last 10 turns to avoid runaway token usage
    trimmed = req.messages[-10:]

    hf_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    hf_messages += [{"role": m.role, "content": m.content} for m in trimmed]

    try:
        completion = client.chat.completions.create(
            model=MODEL_ID,
            messages=hf_messages,
            max_tokens=300,
            temperature=0.6,
        )
        reply = completion.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Model error: {str(e)}")

    return ChatResponse(reply=reply)


@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_ID, "provider": PROVIDER}