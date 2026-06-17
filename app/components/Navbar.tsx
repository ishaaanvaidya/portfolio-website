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
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-b border-border"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Empty spacer for centering balance */}
                        <div className="w-[100px] hidden md:block" />

                        {/* Center: Navigation links */}
                        <div className="hidden md:flex items-center justify-center space-x-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className={cn(
                                        "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                                        activeSection === link.href.slice(1)
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {activeSection === link.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-surface rounded-md"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Right: Resume button */}
                        <div className="hidden md:block">
                            <a
                                href="/Ishan_Vaidya_Resume.pdf"
                                download
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-accent/10 border border-accent/30 rounded-md text-accent hover:bg-accent hover:text-background transition-all duration-300"
                            >
                                <Download size={14} />
                                Resume
                            </a>
                        </div>

                        {/* Mobile: Hamburger menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-foreground hover:text-accent transition-colors rounded-md"
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-background/95 backdrop-blur-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(link.href)}
                                    className={cn(
                                        "text-2xl font-medium transition-colors",
                                        activeSection === link.href.slice(1)
                                            ? "text-accent"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.name}
                                </motion.button>
                            ))}

                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                href="/Ishan_Vaidya_Resume.pdf"
                                download
                                className="inline-flex items-center gap-2 px-4 py-2 text-lg font-medium bg-accent/10 border border-accent/30 rounded-lg text-accent"
                            >
                                <Download size={18} />
                                Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}