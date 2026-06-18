"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

// Inline SVGs for brand icons (Lucide removed them in v1)
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 bg-grid mask-radial opacity-20" />
            <div className="absolute inset-0 -z-10 bg-dot mask-radial opacity-35" />
            
            {/* Animated Glow Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accent/6 rounded-full blur-[90px] animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[110px] animate-float-slower" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-accent/8 border border-accent/20 rounded-full text-xs font-mono tracking-widest uppercase text-accent shadow-[0_0_12px_rgba(197,34,34,0.06)] hover:border-accent/35 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        Computer Science Undergraduate
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-500 bg-clip-text text-transparent mb-6 select-none"
                >
                    Ishan Vaidya
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
                >
                    Building intelligent systems at the intersection of{" "}
                    <span className="text-accent font-semibold">Machine Learning</span>,{" "}
                    <span className="text-accent font-semibold">Computer Vision</span>, and{" "}
                    <span className="text-accent font-semibold">Software Engineering</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="flex flex-wrap justify-center gap-3.5 mb-14"
                >
                    {["Machine Learning", "Computer Vision", "Software Development"].map(
                        (tag) => (
                            <span
                                key={tag}
                                className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-surface/50 border border-border/80 rounded-full text-muted-foreground hover:border-accent/40 hover:text-accent shadow-sm hover:shadow-[0_0_15px_rgba(197,34,34,0.06)] hover:bg-accent/5 transition-all duration-300 cursor-default"
                            >
                                {tag}
                            </span>
                        )
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="flex justify-center gap-5 mb-16"
                >
                    {[
                        {
                            icon: GitHubIcon,
                            href: "https://github.com/ishaaanvaidya",
                            label: "GitHub",
                        },
                        {
                            icon: LinkedInIcon,
                            href: "https://www.linkedin.com/in/ishan-vaidya/",
                            label: "LinkedIn",
                        },
                        {
                            icon: Mail,
                            href: "mailto:ishan3vaidya@gmail.com",
                            label: "Email",
                        },
                    ].map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-3.5 text-muted-foreground hover:text-accent bg-surface/50 border border-border/80 hover:border-accent/30 rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(197,34,34,0.08)] hover:scale-105 transition-all duration-350"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="cursor-pointer p-2 rounded-full hover:bg-surface border border-transparent hover:border-border/30 transition-colors"
                        onClick={() => {
                            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <ArrowDown className="text-muted-foreground hover:text-accent transition-colors" size={18} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}