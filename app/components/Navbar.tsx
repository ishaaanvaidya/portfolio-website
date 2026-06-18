"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = navLinks.map((link) => link.href.slice(1));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "fixed top-4 left-1/2 z-50 transition-all duration-300 md:w-max w-[95%] rounded-full border border-border/40 px-6 shadow-2xl",
                    isScrolled
                        ? "bg-background/75 backdrop-blur-md border-border/60 shadow-black/60 py-2"
                        : "bg-background/25 backdrop-blur-sm shadow-none py-3"
                )}
            >
                <div className="w-full">
                    <div className="flex items-center justify-start h-12 w-full gap-4">
                        {/* Center: Navigation links */}
                        <div className="hidden md:flex items-center space-x-1 flex-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className={cn(
                                        "relative px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-full cursor-pointer",
                                        activeSection === link.href.slice(1)
                                            ? "text-accent"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {activeSection === link.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-accent/8 border border-accent/15 rounded-full"
                                            transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </button>
                            ))}
                            <a
                                href="/Ishan_Vaidya_Resume.pdf"
                                download
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide bg-accent/10 border border-accent/25 rounded-full text-accent shadow-[0_0_12px_rgba(197,34,34,0.08)] hover:shadow-[0_0_18px_rgba(197,34,34,0.25)] hover:bg-accent hover:text-foreground hover:border-accent transition-all duration-350 cursor-pointer ml-3"
                            >
                                <Download size={12} />
                                Resume
                            </a>
                        </div>

                        {/* Mobile: Hamburger menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden ml-auto p-2 text-foreground hover:text-accent transition-colors rounded-full hover:bg-surface border border-transparent hover:border-border/40"
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-background/90 backdrop-blur-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="relative flex flex-col items-center justify-center h-full space-y-8">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    onClick={() => scrollToSection(link.href)}
                                    className={cn(
                                        "text-xl font-bold tracking-wider uppercase transition-colors",
                                        activeSection === link.href.slice(1)
                                            ? "text-accent"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.name}
                                </motion.button>
                            ))}

                            <motion.a
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.08 }}
                                href="/Ishan_Vaidya_Resume.pdf"
                                download
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-base font-semibold uppercase tracking-wider bg-accent/10 border border-accent/25 rounded-full text-accent shadow-[0_0_15px_rgba(197,34,34,0.1)] hover:bg-accent hover:text-foreground transition-all duration-300"
                            >
                                <Download size={16} />
                                Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}