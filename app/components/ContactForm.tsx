"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
    name: string;
    email: string;
    message: string;
    _gotcha?: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
        _gotcha: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
        "idle"
    );

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus("submitting");

        try {
            const response = await fetch("https://formspree.io/f/xwvjjkgw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "", _gotcha: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate suppressHydrationWarning>
            {/* Honeypot anti-spam field — bots fill this in, humans never see it. Formspree silently drops these submissions. */}
            <input
                suppressHydrationWarning
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />
            <div>
                <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                >
                    Name
                </label>
                <input
                    suppressHydrationWarning
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 bg-surface/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300",
                        errors.name ? "border-red-500/60 focus:ring-red-500/30" : "border-border/80 hover:border-accent/30"
                    )}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            id="name-error"
                            className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider"
                        >
                            <AlertCircle size={12} />
                            {errors.name}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                >
                    Email Address
                </label>
                <input
                    suppressHydrationWarning
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 bg-surface/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300",
                        errors.email ? "border-red-500/60 focus:ring-red-500/30" : "border-border/80 hover:border-accent/30"
                    )}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            id="email-error"
                            className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider"
                        >
                            <AlertCircle size={12} />
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                >
                    Message
                </label>
                <textarea
                    suppressHydrationWarning
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                        "w-full px-4 py-3 bg-surface/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300 resize-none",
                        errors.message ? "border-red-500/60 focus:ring-red-500/30" : "border-border/80 hover:border-accent/30"
                    )}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                <AnimatePresence>
                    {errors.message && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            id="message-error"
                            className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono uppercase tracking-wider"
                        >
                            <AlertCircle size={12} />
                            {errors.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                suppressHydrationWarning
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={cn(
                    "w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(197,34,34,0.06)] transition-all duration-350 cursor-pointer",
                    status === "success"
                        ? "bg-accent border border-accent text-white shadow-[0_0_20px_rgba(197,34,34,0.3)]"
                        : "bg-accent/8 text-accent border border-accent/25 hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_0_20px_rgba(197,34,34,0.25)]"
                )}
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                    </>
                ) : status === "success" ? (
                    <>
                        <CheckCircle size={14} />
                        Message Sent!
                    </>
                ) : (
                    <>
                        <Send size={14} />
                        Send Message
                    </>
                )}
            </button>

            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="p-4 bg-accent/8 border border-accent/15 rounded-xl text-center shadow-sm"
                    >
                        <p className="text-accent text-xs font-mono uppercase tracking-wider">
                            Thank you for reaching out! I will get back to you soon.
                        </p>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="p-4 bg-red-500/8 border border-red-500/15 rounded-xl text-center shadow-sm"
                    >
                        <p className="text-red-400 text-xs font-mono uppercase tracking-wider">
                            Something went wrong. Please try again or email me directly.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}