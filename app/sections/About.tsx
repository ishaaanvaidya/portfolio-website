import SectionReveal from "../components/SectionReveal";
import { GraduationCap, MapPin } from "lucide-react";

export default function About() {
    return (
        <section
            id="about"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/80" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest bg-accent/8 border border-accent/25 px-3 py-1 rounded-full">
                            About Me
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/80" />
                    </div>
                </SectionReveal>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <SectionReveal delay={0.1}>
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                                Driven by curiosity,{" "}
                                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">powered by code</span>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                I am a Computer Science undergraduate at UPES with a deep passion
                                for building systems that can perceive, learn, and adapt. My
                                journey spans from training deep learning models to deploying
                                computer vision applications on edge devices.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
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
                            <div className="group p-6 bg-surface/45 backdrop-blur-sm border border-border/80 rounded-2xl hover:border-accent/30 hover:bg-surface/75 hover:shadow-[0_0_20px_rgba(197,34,34,0.04)] hover:scale-[1.01] transition-all duration-350">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/8 border border-accent/15 rounded-xl group-hover:scale-105 group-hover:bg-accent/12 transition-all duration-300">
                                        <GraduationCap className="text-accent" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                                            Education
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            UPES, Dehradun
                                        </p>
                                        <p className="text-foreground font-medium text-sm sm:text-base">
                                            B.Tech in Computer Science
                                        </p>
                                        <p className="text-muted-foreground text-xs font-mono mt-1">
                                            2023 — 2027
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-6 bg-surface/45 backdrop-blur-sm border border-border/80 rounded-2xl hover:border-accent/30 hover:bg-surface/75 hover:shadow-[0_0_20px_rgba(197,34,34,0.04)] hover:scale-[1.01] transition-all duration-350">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/8 border border-accent/15 rounded-xl group-hover:scale-105 group-hover:bg-accent/12 transition-all duration-300">
                                        <MapPin className="text-accent" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                                            Location
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Dehradun, India
                                        </p>
                                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
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