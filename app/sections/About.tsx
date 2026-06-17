import SectionReveal from "../components/SectionReveal";
import { GraduationCap, MapPin } from "lucide-react";

export default function About() {
    return (
        <section
            id="about"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-mono text-sm text-accent uppercase tracking-wider">
                            About
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                </SectionReveal>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <SectionReveal delay={0.1}>
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                Driven by curiosity,{" "}
                                <span className="text-accent">powered by code</span>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                I am a Computer Science undergraduate at UPES with a deep passion
                                for building systems that can perceive, learn, and adapt. My
                                journey spans from training deep learning models to deploying
                                computer vision applications on edge devices.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                I believe in writing clean, maintainable code and creating
                                solutions that bridge the gap between research and real-world
                                impact. Whether it is optimizing a neural network or architecting
                                a software pipeline, I approach every challenge with analytical
                                rigor and creative problem-solving.
                            </p>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.2}>
                        <div className="space-y-6">
                            <div className="p-6 bg-surface border border-border rounded-lg">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <GraduationCap className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Education
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            UPES, Dehradun
                                        </p>
                                        <p className="text-foreground font-medium">
                                            B.Tech in Computer Science
                                        </p>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            2023 — 2027
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-surface border border-border rounded-lg">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <MapPin className="text-accent" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Location
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Dehradun, India
                                        </p>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            Open to remote opportunities and internships worldwide
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}