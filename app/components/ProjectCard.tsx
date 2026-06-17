"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const GitHubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    className?: string;
}

export default function ProjectCard({
    title,
    description,
    tags,
    githubUrl,
    liveUrl,
    className,
}: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "group relative p-6 bg-surface border border-border rounded-lg hover:border-accent/30 transition-colors duration-300",
                className
            )}
        >
            <div className="flex items-start justify-between mb-4">
                {/* Left icon: GitHub link if available, otherwise decorative */}
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                    {githubUrl ? (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source code on GitHub"
                            className="block text-accent hover:text-foreground transition-colors"
                        >
                            <GitHubIcon size={24} />
                        </a>
                    ) : (
                        <GitHubIcon size={24} className="text-accent" />
                    )}
                </div>

                {/* Right side: Only Live Demo link if available */}
                <div className="flex gap-2">
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live project"
                            className="p-2 text-muted-foreground hover:text-accent transition-colors rounded-md hover:bg-accent/10"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {description}
            </p>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono bg-background border border-border rounded text-muted-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}