from http.server import BaseHTTPRequestHandler
import json, os, urllib.request

# ── Paste your full KNOWLEDGE_BASE and SYSTEM_PROMPT here ──────────────────
# (copy from chatbot-backend/knowledge_base.py)
KNOWLEDGE_BASE = """
Knowledge base built from Ishan Vaidya's portfolio website and resume.
Sources: https://ishanvaidya.vercel.app/ + resume PDF
"""

KNOWLEDGE_BASE = """
=== ABOUT ===
Name: Ishan Vaidya
Role: Computer Science Undergraduate
Summary: CS undergrad with experience in machine learning, computer vision, and full-stack development. Builds scalable Python applications, LSTM predictive models, and CNN architectures.

=== CONTACT ===
Email: ishan3vaidya@gmail.com
Phone: +91 6377220093
LinkedIn: https://www.linkedin.com/in/ishan-vaidya/
GitHub: https://github.com/ishaaanvaidya
Location: Dehradun, India. Open to remote work and internships worldwide.
Contact Form: On this page — scroll to the Contact section at the bottom, fill in your name, email, and message.
Resume: https://ishanvaidya.vercel.app/Ishan_Vaidya_Resume.pdf

=== EDUCATION ===
B.Tech Computer Science Engineering — UPES, Dehradun (Jul 2023 – Jun 2027, ongoing)
Class 12 CBSE — Birla Shishu Vihar, Pilani — 81.2% (2022)
Class 10 CBSE — Birla Shishu Vihar, Pilani — 88.4% (2020)

=== INTERNSHIP ===
Role: Software Development Intern
Company: Rams Creative Technologies Pvt. Ltd., Jaipur
Duration: Jun 2025 – Jul 2025 (8 weeks)
Work: Built an LSTM model to predict stock prices. Achieved 85% accuracy through feature engineering and hyperparameter tuning. Visualized results using Matplotlib.

=== PROJECTS ===
1. Driver Drowsiness Detection
   GitHub: https://github.com/ishaaanvaidya/driver-drowsiness-detector
   Stack: Python, OpenCV, MediaPipe, Raspberry Pi 4
   Details: Real-time system that tracks Eye Aspect Ratio via MediaPipe's 468-point facial mesh. Triggers visual alerts on detecting drowsiness. Deployed on Raspberry Pi 4.

2. HDFC Stock Prediction
   GitHub: https://github.com/ishaaanvaidya/hdfc-stock-prediction-lstm
   Stack: Python, LSTM, TensorFlow, Keras
   Details: LSTM time-series forecasting for HDFC stock prices using feature engineering and ensemble techniques.

3. Pothole Detection
   GitHub: https://github.com/ishaaanvaidya/pothole-detection-cnn
   Stack: Python, CNN, TensorFlow, OpenCV
   Details: CNN trained on 2,000+ road images. Achieves 92% confidence in pothole identification and classifies severity levels.

=== SKILLS ===
Languages: Python, SQL / MySQL
ML Frameworks: TensorFlow, PyTorch, Keras
Computer Vision: OpenCV, MediaPipe
Data: NumPy, Pandas, Matplotlib
Tools: Git, GitHub
Soft Skills: Communication, Leadership, Teamwork, Problem-Solving
""".strip()

SYSTEM_PROMPT = f"""
You are a concise assistant embedded in Ishan Vaidya's portfolio website. The user is already on the website, so never link to the portfolio itself.

STRICT RULES:
1. Answer ONLY what was directly asked. Nothing more.
2. Never use **bold** or any markdown formatting except bullet lists and links.
3. For URLs to external sites (LinkedIn, GitHub, resume), use markdown links: [display text](url)
4. Never mention or link to ishanvaidya.vercel.app — the user is already here. Instead say things like "scroll to the Contact section" or "check the Projects section above".
5. When listing multiple items (projects, skills, etc.), use a bullet list — one item per line starting with "- ".
6. Keep each bullet to one short sentence.
7. Only answer questions about Ishan. For anything else: "I only have info about Ishan — you can reach him at ishan3vaidya@gmail.com."

EXAMPLES OF CORRECT BEHAVIOUR:
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
--- END KNOWLEDGE BASE ---
"""
# ───────────────────────────────────────────────────────────────────────────

HF_TOKEN = os.environ.get("HF_TOKEN", "")
MODEL_ID  = "deepseek-ai/DeepSeek-V4-Flash"
API_URL   = "https://router.huggingface.co/novita/v1/chat/completions"

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        length  = int(self.headers.get("Content-Length", 0))
        body    = json.loads(self.rfile.read(length))
        messages = body.get("messages", [])[-10:]

        payload = json.dumps({
            "model": MODEL_ID,
            "messages": [{"role": "system", "content": SYSTEM_PROMPT}]
                        + [{"role": m["role"], "content": m["content"]} for m in messages],
            "max_tokens": 300,
            "temperature": 0.6,
        }).encode()

        req = urllib.request.Request(
            API_URL,
            data=payload,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {HF_TOKEN}"},
            method="POST",
        )

        try:
            with urllib.request.urlopen(req) as resp:
                data  = json.loads(resp.read())
            reply = data["choices"][0]["message"]["content"].strip()
            self._respond(200, {"reply": reply})
        except Exception as e:
            self._respond(500, {"detail": str(e)})

    def do_OPTIONS(self):
        self._respond(200, {})

    def _respond(self, status: int, body: dict):
        self.send_response(status)
        self.send_header("Content-Type",  "application/json")
        self.send_header("Access-Control-Allow-Origin",  "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def log_message(self, *args):
        pass  # silence default request logs