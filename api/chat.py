import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

# ═══════════════════════════════════════════════════════════════
# CONFIG
# ═══════════════════════════════════════════════════════════════

HF_TOKEN = os.environ.get("HF_TOKEN", "")
MODEL_ID = os.environ.get("MODEL_ID", "meta-llama/Meta-Llama-3.1-8B-Instruct")
PROVIDER = os.environ.get("HF_PROVIDER", "together")

# CORRECT HF Inference Providers API endpoint
# Provider goes in the request BODY, not the URL path
API_URL = "https://router.huggingface.co/v1/chat/completions"

# ═══════════════════════════════════════════════════════════════
# KNOWLEDGE BASE
# ═══════════════════════════════════════════════════════════════

KNOWLEDGE_BASE = """
=== ABOUT ===
Name: Ishan Vaidya
Role: Computer Science Undergraduate
Location: Dehradun, India
Availability: Open to remote work and internships worldwide

=== CONTACT ===
Email: ishan3vaidya@gmail.com
Phone: +91 6377220093
LinkedIn: https://www.linkedin.com/in/ishan-vaidya/
GitHub: https://github.com/ishaaanvaidya
Resume: https://ishanvaidya.vercel.app/Ishan_Vaidya_Resume.pdf

=== EDUCATION ===
B.Tech CSE — UPES, Dehradun (2023–2027, ongoing)
Class 12 CBSE — Birla Shishu Vihar, Pilani — 81.2% (2022)
Class 10 CBSE — Birla Shishu Vihar, Pilani — 88.4% (2020)

=== INTERNSHIP ===
Rams Creative Technologies Pvt. Ltd., Jaipur — Jun 2025 – Jul 2025 (8 weeks)
Built an LSTM stock price predictor achieving 85% accuracy.

=== PROJECTS ===
1. Driver Drowsiness Detection — real-time eye tracking with OpenCV + MediaPipe, deployed on Raspberry Pi 4.
2. HDFC Stock Prediction — LSTM time-series forecasting with TensorFlow and Keras.
3. Pothole Detection — CNN trained on 2,000+ road images, 92% accuracy, TensorFlow + OpenCV.

=== SKILLS ===
Languages: Python, SQL / MySQL
ML: TensorFlow, PyTorch, Keras
CV: OpenCV, MediaPipe
Data: NumPy, Pandas, Matplotlib
Tools: Git, GitHub
""".strip()

SYSTEM_PROMPT = f"""You are a concise assistant embedded in Ishan Vaidya's portfolio website. The user is already on the website.

STRICT RULES:
1. Answer ONLY what was directly asked. Nothing more.
2. Never use **bold** or markdown except bullet lists and [text](url) links.
3. Never mention or link to ishanvaidya.vercel.app — the user is already here. Say "scroll to the Contact section" instead.
4. For external URLs (LinkedIn, GitHub, resume), use markdown links: [display text](url)
5. When listing multiple items, use "- " bullet lists, one item per line.
6. Keep each bullet to one short sentence.
7. Only answer questions about Ishan. For anything else: "I only have info about Ishan — you can reach him at ishan3vaidya@gmail.com."

EXAMPLES:
Q: "Where did he intern?" → "Ishan interned at Rams Creative Technologies Pvt. Ltd. in Jaipur, India."
Q: "List his projects" →
- Driver Drowsiness Detection — real-time eye tracking system using OpenCV and MediaPipe, deployed on Raspberry Pi 4.
- HDFC Stock Prediction — LSTM model forecasting HDFC stock prices with TensorFlow and Keras.
- Pothole Detection — CNN trained on 2,000+ road images achieving 92% accuracy, built with TensorFlow and OpenCV.
Q: "How to contact Ishan?" → "You can email him at ishan3vaidya@gmail.com, connect on [LinkedIn](https://www.linkedin.com/in/ishan-vaidya/), or scroll to the Contact section at the bottom of this page."
Q: "Where is the contact form?" → "Scroll to the Contact section at the bottom of this page."
Q: "What are his skills?" →
- Languages: Python, SQL
- ML: TensorFlow, PyTorch, Keras
- Computer Vision: OpenCV, MediaPipe
- Tools: Git, NumPy, Pandas, Matplotlib

--- KNOWLEDGE BASE ---
{KNOWLEDGE_BASE}
--- END KNOWLEDGE BASE ---"""

# ═══════════════════════════════════════════════════════════════
# INTENT DETECTION
# ═══════════════════════════════════════════════════════════════

def detect_intent(user_msg: str):
    text = "".join(c if c.isalnum() or c.isspace() else " " for c in user_msg.lower().strip())
    intents = {
        "contact": ["contact", "reach", "email", "phone", "call", "message", "get in touch", "talk to", "connect with"],
        "projects": ["project", "projects", "built", "work", "portfolio", "what did he make", "what has he done"],
        "skills": ["skill", "skills", "tech stack", "technologies", "know", "can he do", "expertise", "proficient"],
        "internship": ["intern", "internship", "experience", "worked", "company", "job", "where did he work"],
        "education": ["education", "study", "studies", "college", "university", "degree", "school", "upes", "qualification"],
        "about": ["who is", "about", "introduce", "tell me about", "who", "what does he do", "background"],
        "contact_form": ["contact form", "form", "where is the form", "how to send message"],
        "resume": ["resume", "cv", "download"],
    }
    for intent, keywords in intents.items():
        if any(kw in text for kw in keywords):
            return intent
    return None

def generate_programmatic_reply(intent: str) -> str:
    if intent == "contact":
        return "You can email him at ishan3vaidya@gmail.com, connect on [LinkedIn](https://www.linkedin.com/in/ishan-vaidya/), or scroll to the Contact section at the bottom of this page."
    elif intent == "projects":
        return "- Driver Drowsiness Detection — real-time eye tracking system using OpenCV and MediaPipe, deployed on Raspberry Pi 4.\n- HDFC Stock Prediction — LSTM model forecasting HDFC stock prices with TensorFlow and Keras.\n- Pothole Detection — CNN trained on 2,000+ road images achieving 92% accuracy, built with TensorFlow and OpenCV."
    elif intent == "skills":
        return "- Languages: Python, SQL / MySQL\n- ML: TensorFlow, PyTorch, Keras\n- Computer Vision: OpenCV, MediaPipe\n- Data: NumPy, Pandas, Matplotlib\n- Tools: Git, GitHub"
    elif intent == "internship":
        return "Ishan interned at Rams Creative Technologies Pvt. Ltd. in Jaipur, India."
    elif intent == "education":
        return "- B.Tech CSE — UPES, Dehradun (2023–2027, ongoing)\n- Class 12 CBSE — Birla Shishu Vihar, Pilani — 81.2% (2022)\n- Class 10 CBSE — Birla Shishu Vihar, Pilani — 88.4% (2020)"
    elif intent == "about":
        return "Ishan Vaidya is a Computer Science undergraduate at UPES, Dehradun. He specializes in machine learning, computer vision, and software engineering. Based in Dehradun, India, he's open to remote work and internships worldwide."
    elif intent == "contact_form":
        return "Scroll to the Contact section at the bottom of this page."
    elif intent == "resume":
        return "You can download his resume here: [Resume](https://ishanvaidya.vercel.app/Ishan_Vaidya_Resume.pdf)."
    else:
        return "I only have info about Ishan — you can reach him at ishan3vaidya@gmail.com."

def post_process(text: str) -> str:
    import re as _re
    cleaned = _re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    cleaned = _re.sub(r"(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)", r"\1", cleaned)

    patterns = [
        r"https?://ishanvaidya\.vercel\.app/?",
        r"ishanvaidya\.vercel\.app",
        r"his portfolio (website|site)",
        r"the portfolio (website|site)",
        r"on (his|the) website",
    ]
    for p in patterns:
        cleaned = _re.sub(p, "", cleaned, flags=_re.IGNORECASE)

    cleaned = _re.sub(r"\s+", " ", cleaned)
    cleaned = _re.sub(r"\( ?\)", "", cleaned)
    cleaned = _re.sub(r",\s*,", ",", cleaned)
    cleaned = _re.sub(r"\s+\.", ".", cleaned)
    cleaned = _re.sub(r"\s+,", ",", cleaned)

    lines = cleaned.strip().split("\n")
    has_bullets = any(l.strip().startswith("- ") for l in lines)
    if not has_bullets:
        sentences = _re.split(r"(?<=[.!?])\s+", cleaned.strip())
        if len(sentences) > 2:
            cleaned = " ".join(sentences[:2])

    return cleaned.strip()

# ═══════════════════════════════════════════════════════════════
# LLM FALLBACK
# ═══════════════════════════════════════════════════════════════

def llm_reply(messages: list) -> str:
    hf_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    hf_messages += [{"role": m["role"], "content": m["content"]} for m in messages[-10:]]

    # CORRECT: provider goes in the payload, not the URL
    payload = json.dumps({
        "model": MODEL_ID,
        "messages": hf_messages,
        "max_tokens": 250,
        "temperature": 0.3,
        "provider": PROVIDER,
    }).encode()

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {HF_TOKEN}",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        raw = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
        return post_process(raw)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        raise Exception(f"HF API HTTP {e.code}: {error_body}")
    except Exception as e:
        raise Exception(f"LLM call failed: {str(e)}")

# ═══════════════════════════════════════════════════════════════
# HTTP HANDLER
# ═══════════════════════════════════════════════════════════════

class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self._respond(200, {})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length == 0:
                self._respond(400, {"detail": "Empty body"})
                return

            body = json.loads(self.rfile.read(length))
            messages = body.get("messages", [])

            if not messages:
                self._respond(400, {"detail": "messages list is empty"})
                return

            if not HF_TOKEN:
                self._respond(500, {"detail": "HF_TOKEN not configured"})
                return

            # Intent detection
            last_msg = messages[-1].get("content", "")
            intent = detect_intent(last_msg)

            if intent:
                reply = generate_programmatic_reply(intent)
                self._respond(200, {"reply": reply, "source": "programmatic"})
                return

            # LLM fallback
            try:
                reply = llm_reply(messages)
                self._respond(200, {"reply": reply, "source": "llm"})
            except Exception as e:
                self._respond(502, {"detail": str(e)})

        except json.JSONDecodeError:
            self._respond(400, {"detail": "Invalid JSON"})
        except Exception as e:
            self._respond(500, {"detail": f"Internal error: {str(e)}"})

    def _respond(self, status: int, body: dict):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def log_message(self, format, *args):
        pass