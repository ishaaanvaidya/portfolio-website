"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
    name: string;
    email: string;
    message: string;
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
                setFormData({ name: "", email: "", message: "" });
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
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200",
                        errors.name ? "border-red-500" : "border-border hover:border-accent/30"
                    )}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            id="name-error"
                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                        >
                            <AlertCircle size={14} />
                            {errors.name}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200",
                        errors.email ? "border-red-500" : "border-border hover:border-accent/30"
                    )}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            id="email-error"
                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                        >
                            <AlertCircle size={14} />
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                        "w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 resize-none",
                        errors.message ? "border-red-500" : "border-border hover:border-accent/30"
                    )}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                <AnimatePresence>
                    {errors.message && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            id="message-error"
                            className="mt-1 text-sm text-red-400 flex items-center gap-1"
                        >
                            <AlertCircle size={14} />
                            {errors.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={cn(
                    "w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300",
                    status === "success"
                        ? "bg-accent text-background"
                        : "bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-background"
                )}
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                    </>
                ) : status === "success" ? (
                    <>
                        <CheckCircle size={18} />
                        Message Sent!
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        Send Message
                    </>
                )}
            </button>

            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-center"
                    >
                        <p className="text-accent text-sm">
                            Thank you for reaching out! I will get back to you soon.
                        </p>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center"
                    >
                        <p className="text-red-400 text-sm">
                            Something went wrong. Please try again or email me directly.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}