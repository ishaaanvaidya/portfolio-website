import SectionReveal from "../components/SectionReveal";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
    {
        role: "AI/ML Intern",
        company: "Rams Creative Technologies Pvt. Ltd.",
        period: "Jun 2025 — Jul 2025",
        description:
            "Developed a deep learning model using LSTM neural networks to predict stock prices based on 1-day interval historical data. Achieved 85% prediction accuracy through data preprocessing, feature engineering, and hyperparameter tuning. Visualized prediction results and model performance metrics using Matplotlib, enabling data-driven investment decisions.",
        highlights: [
            "Built LSTM-based predictive models for stock price forecasting",
            "Achieved 85% accuracy through feature engineering and hyperparameter tuning",
            "Visualized model performance with Matplotlib for data-driven insights",
        ],
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative bg-surface/10 border-b border-border/20 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 bg-dot mask-radial opacity-15" />

            <div className="max-w-4xl mx-auto relative z-10">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/80" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest bg-accent/8 border border-accent/25 px-3 py-1 rounded-full">
                            Journey
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/80" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-center mb-16 leading-tight">
                        Professional Journey
                    </h2>
                </SectionReveal>

                <div className="relative">
                    {/* Tracing Beam Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-accent/60 to-transparent md:-translate-x-[1px]" />

                    {experiences.map((exp, index) => (
                        <SectionReveal key={exp.company} delay={index * 0.2}>
                            <div className="relative mb-12 last:mb-0">
                                {/* Pulsing Timeline Bullet */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-accent rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(197,34,34,0.4)]">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                </div>

                                <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                                    <div className="hidden md:block md:text-right">
                                        <div className="inline-flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-wider mt-5">
                                            <Calendar size={12} className="text-accent" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    <div className="md:col-start-2">
                                        <div className="group p-6 bg-surface/40 backdrop-blur-sm border border-border/80 rounded-2xl hover:border-accent/35 hover:bg-surface/65 hover:shadow-[0_0_25px_rgba(197,34,34,0.04)] transition-all duration-350 hover:scale-[1.01]">
                                            <div className="flex items-center gap-3.5 mb-4">
                                                <div className="p-2.5 bg-accent/8 border border-accent/15 rounded-xl group-hover:bg-accent/12 transition-all duration-300">
                                                    <Briefcase className="text-accent" size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors duration-300 text-sm sm:text-base">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs mb-4 md:hidden">
                                                <Calendar size={12} className="text-accent" />
                                                {exp.period}
                                            </div>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                                                {exp.description}
                                            </p>

                                            <ul className="space-y-2.5">
                                                {exp.highlights.map((highlight) => (
                                                    <li
                                                        key={highlight}
                                                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                                    >
                                                        <span className="text-accent mt-1 text-xs select-none">•</span>
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}