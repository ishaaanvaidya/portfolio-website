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
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="font-mono text-accent text-sm tracking-wider uppercase">
                        Computer Science Undergraduate
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
                >
                    Ishan Vaidya
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
                >
                    Building intelligent systems at the intersection of{" "}
                    <span className="text-foreground font-medium">Machine Learning</span>,{" "}
                    <span className="text-foreground font-medium">Computer Vision</span>, and{" "}
                    <span className="text-foreground font-medium">Software Engineering</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {["Machine Learning", "Computer Vision", "Software Development"].map(
                        (tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 text-sm font-mono border border-border rounded-full text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors duration-300"
                            >
                                {tag}
                            </span>
                        )
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-center gap-4 mb-16"
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
                            className="p-3 text-muted-foreground hover:text-accent hover:bg-surface rounded-lg transition-all duration-300"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="text-muted-foreground" size={20} />
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
            </div>
        </section>
    );
}