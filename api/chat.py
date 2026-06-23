import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

# ═══════════════════════════════════════════════════════════════
# CONFIG
# ═══════════════════════════════════════════════════════════════

HF_TOKEN = os.environ.get("HF_TOKEN", "")
MODEL_ID = os.environ.get("MODEL_ID", "deepseek-ai/DeepSeek-V4-Flash")
PROVIDER = os.environ.get("HF_PROVIDER", "deepinfra")
API_URL = "https://router.huggingface.co/v1/chat/completions"

# ═══════════════════════════════════════════════════════════════
# KNOWLEDGE BASE
# ═══════════════════════════════════════════════════════════════

KNOWLEDGE_BASE = """
=== PORTFOLIO NAVIGATION ===
- The website is divided into several main sections:
  1. Hero (top of the page): Welcoming introduction.
  2. About: Information on Ishan's background and UPES Dehradun education.
  3. Projects: Showcase of his personal projects (Driver Drowsiness Detection, Stock Prediction, Pothole Detection).
  4. Skills: List of technologies he is familiar with.
  5. Experience: Information on his internship at Rams Creative Technologies.
  6. Contact (bottom of the page): Form to send him a direct message, links to email/LinkedIn/GitHub.
- To navigate to any section, users can click the links in the Navigation Bar at the top of the page (About, Projects, Skills, Experience, Contact) or scroll.

=== ABOUT ISHAN VAIDYA ===
- Name: Ishan Vaidya
- Role: Computer Science Undergraduate
- Location: Dehradun, India
- Availability: Open to remote work and internships worldwide
- Resume: Available for download at the top right of the page or directly via [Resume](/Ishan_Vaidya_Resume.pdf)

=== CONTACT DETAILS ===
- Email: ishan3vaidya@gmail.com
- Phone: +91 6377220093
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/ishan-vaidya/)
- GitHub: [GitHub](https://github.com/ishaaanvaidya)
- Contact Form: Scroll to the Contact section at the bottom of this page.

=== EDUCATION ===
- B.Tech Computer Science Engineering: UPES, Dehradun (2023–2027, ongoing)
- Class 12 CBSE: Birla Shishu Vihar, Pilani — 81.2% (2022)
- Class 10 CBSE: Birla Shishu Vihar, Pilani — 88.4% (2020)

=== INTERNSHIP EXPERIENCE ===
- Software Development Intern: Rams Creative Technologies Pvt. Ltd., Jaipur (Jun 2025 – Jul 2025, 8 weeks)
- Key Work: Built an LSTM stock price predictor achieving 85% accuracy.

=== PROJECTS ===
1. Driver Drowsiness Detection: Real-time eye tracking system using OpenCV and MediaPipe, deployed on Raspberry Pi 4.
2. HDFC Stock Prediction: LSTM time-series forecasting model using TensorFlow and Keras.
3. Pothole Detection: CNN model trained on 2,000+ road images with 92% accuracy, built using TensorFlow and OpenCV.

=== TECHNICAL SKILLS ===
- Languages: Python, SQL / MySQL
- Machine Learning: TensorFlow, PyTorch, Keras
- Computer Vision: OpenCV, MediaPipe
- Data Libraries: NumPy, Pandas, Matplotlib
- Tools: Git, GitHub
""".strip()

SYSTEM_PROMPT = f"""You are Ishan's AI assistant embedded in his portfolio website.

STRICT RULES:
1. If the user asks who you are, introduce yourself as Ishan's AI assistant.
2. Only answer questions about Ishan, his background, his resume, his experience, his skills, his projects, or how to navigate this website.
3. If the query is about ANY other topic (e.g. general knowledge, math, programming/scripting tasks, other people, general questions), you MUST reply with exactly: "I only have info about Ishan" and nothing else.
4. Answer ONLY what was directly asked. Keep it extremely concise and direct.
5. Never use **bold** or markdown except bullet lists and [text](url) links.
6. Never link to or mention "ishanvaidya.vercel.app" as a full host. Instead, use relative links like [Resume](/Ishan_Vaidya_Resume.pdf) or ask the user to scroll to the relevant section (e.g., "scroll to the Contact section at the bottom of this page").
7. When listing multiple items, use "- " bullet lists, one item per line. Keep each bullet to one short sentence.
8. Respond in the same language/mix of languages (e.g., English, Hindi, Hinglish) that the user used to ask their question.

EXAMPLES OF CORRECT BEHAVIOR:
Q: "Who are you?" → "I am Ishan's AI assistant. I can answer questions about his skills, education, experience, projects, or help you navigate his website."
Q: "Where did he intern?" → "Ishan interned at Rams Creative Technologies Pvt. Ltd. in Jaipur, India."
Q: "Write a python script to reverse a list" → "I only have info about Ishan"
Q: "What is the capital of France?" → "I only have info about Ishan"
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
Q: "iske 12th mai kitne marks aaye?" → "Ishan ke Class 12 CBSE exams (2022) me 81.2% marks aaye the."
Q: "schooling kahan se kari?" → "Ishan ne apni Class 10 aur 12 ki schooling Birla Shishu Vihar, Pilani se ki hai."

--- KNOWLEDGE BASE ---
{KNOWLEDGE_BASE}
--- END KNOWLEDGE BASE ---"""

# ═══════════════════════════════════════════════════════════════
# POST PROCESSING
# ═══════════════════════════════════════════════════════════════

def post_process(text: str) -> str:
    import re as _re
    cleaned = text.strip()

    # If the response is the strict fallback message, return it directly.
    if "I only have info about Ishan" in cleaned:
        return "I only have info about Ishan"

    # Remove bold markdown (**text** -> text)
    cleaned = _re.sub(r"\*\*([^*]+)\*\*", r"\1", cleaned)
    # Remove single star italics (*text* -> text)
    cleaned = _re.sub(r"(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)", r"\1", cleaned)

    # Convert absolute portfolio URLs to relative paths (so links remain functional)
    cleaned = _re.sub(r"https?://ishanvaidya\.vercel\.app/?", "/", cleaned, flags=_re.IGNORECASE)

    # Clean up whitespace line-by-line to preserve newlines for bullet lists
    lines = []
    for line in cleaned.split("\n"):
        line_clean = line.strip()
        if not line_clean:
            continue
        # Replace multiple spaces/tabs (not newlines) with a single space
        line_clean = _re.sub(r"[ \t]+", " ", line_clean)
        # Clean up punctuation spacing
        line_clean = _re.sub(r"\( ?\)", "", line_clean)
        line_clean = _re.sub(r",\s*,", ",", line_clean)
        line_clean = _re.sub(r"\s+\.", ".", line_clean)
        line_clean = _re.sub(r"\s+,", ",", line_clean)
        lines.append(line_clean)

    # Limit to 2 sentences for paragraph responses (non-bulleted)
    has_bullets = any(l.strip().startswith("- ") for l in lines)
    if not has_bullets and lines:
        single_paragraph = " ".join(lines)
        sentences = _re.split(r"(?<=[.!?])\s+", single_paragraph)
        if len(sentences) > 2:
            return " ".join(sentences[:2])
        return single_paragraph

    return "\n".join(lines)

# ═══════════════════════════════════════════════════════════════
# LLM SERVICE
# ═══════════════════════════════════════════════════════════════

def llm_reply(messages: list) -> str:
    hf_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    hf_messages += [{"role": m["role"], "content": m["content"]} for m in messages[-10:]]

    payload = json.dumps({
        "model": MODEL_ID,
        "messages": hf_messages,
        "max_tokens": 250,
        "temperature": 0.2,  # Low temperature for deterministic behavior
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