"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Role = "user" | "assistant";
interface Message { role: Role; content: string; }

const API_URL =
    process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "http://localhost:8000/api/chat";

const WELCOME: Message = {
    role: "assistant",
    content: "Hi! I'm Ishan's assistant. Ask me anything — his projects, skills, education, experience, or how to get in touch 👋",
};

const SUGGESTED = [
    "How can I contact Ishan?",
    "What projects has he built?",
    "What are his technical skills?",
];

// ── Renders inline text: plain + [label](url) links ─────────────────────
function InlineText({ text }: { text: string }) {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index));
        parts.push(
            <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
                style={{ color: "#60a5fa", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                {match[1]}
            </a>
        );
        last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <span>{parts}</span>;
}

// ── Renders full message: bullet lines or plain inline text ──────────────
function MessageText({ text }: { text: string }) {
    const lines = text.split("\n");
    const hasBullets = lines.some(l => l.trimStart().startsWith("- "));

    if (!hasBullets) return <InlineText text={text} />;

    return (
        <span>
            {lines.map((line, i) => {
                const trimmed = line.trimStart();
                if (trimmed.startsWith("- ")) {
                    return (
                        <span key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginTop: i === 0 ? 0 : "5px" }}>
                            <span style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0, marginTop: "1px" }}>•</span>
                            <InlineText text={trimmed.slice(2)} />
                        </span>
                    );
                }
                return line
                    ? <span key={i} style={{ display: "block", marginBottom: "4px" }}><InlineText text={line} /></span>
                    : null;
            })}
        </span>
    );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);

    async function sendMessage(text: string) {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        setShowSuggestions(false);
        setError(null);
        const userMsg: Message = { role: "user", content: trimmed };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updated }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail ?? `Server error ${res.status}`);
            }
            const data: { reply: string } = await res.json();
            setMessages([...updated, { role: "assistant", content: data.reply }]);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
            setMessages(messages);
        } finally {
            setLoading(false);
        }
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" style={{ fontFamily: "inherit" }}>

            {/* ── Chat window ──────────────────────────────────────── */}
            {open && (
                <div
                    className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                    style={{ width: "340px", height: "480px", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#141414" }}>
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full"
                                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                            <span className="text-sm font-semibold text-white">Ask about Ishan</span>
                        </div>
                        <button onClick={() => setOpen(false)} aria-label="Close"
                            className="p-1 rounded-md" style={{ color: "rgba(255,255,255,0.4)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "white")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                            <X size={15} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className="text-sm leading-relaxed px-3 py-2 rounded-xl"
                                    style={{
                                        maxWidth: "84%",
                                        ...(m.role === "user"
                                            ? { background: "white", color: "#0d0d0d", borderBottomRightRadius: "4px" }
                                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", borderBottomLeftRadius: "4px" }),
                                    }}>
                                    <MessageText text={m.content} />
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
                                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}>
                                    <Loader2 size={13} className="animate-spin" />
                                    <span>Thinking…</span>
                                </div>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="flex justify-center">
                                <span className="text-xs px-3 py-1.5 rounded-lg"
                                    style={{ background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                                    {error}
                                </span>
                            </div>
                        )}

                        {/* Suggestions */}
                        {showSuggestions && messages.length === 1 && !loading && (
                            <div className="pt-1 space-y-1.5">
                                {SUGGESTED.map((q) => (
                                    <button key={q} onClick={() => sendMessage(q)}
                                        className="w-full text-left text-xs px-3 py-2 rounded-lg transition-colors"
                                        style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <input
                            ref={inputRef}
                            className="flex-1 text-sm rounded-lg px-3 py-2 outline-none"
                            style={{ background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.08)" }}
                            placeholder="Ask anything…"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            disabled={loading}
                            autoComplete="off"
                        />
                        <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
                            aria-label="Send"
                            className="flex-shrink-0 p-2 rounded-lg"
                            style={{ background: "white", color: "#0d0d0d", opacity: loading || !input.trim() ? 0.3 : 1 }}>
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Toggle button ──────────────────────────────────── */}
            <button
                onClick={() => setOpen(p => !p)}
                aria-label={open ? "Close chat" : "Open chat"}
                className="flex items-center justify-center rounded-full shadow-xl active:scale-95"
                style={{ width: "52px", height: "52px", background: "white", color: "#0d0d0d", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transition: "transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                {open ? <X size={20} /> : <MessageCircle size={20} />}
            </button>
        </div>
    );
}