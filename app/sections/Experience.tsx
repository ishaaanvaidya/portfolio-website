import SectionReveal from "../components/SectionReveal";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
    {
        role: "Software Development Intern",
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
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-mono text-sm text-accent uppercase tracking-wider">
                            Experience
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
                        Professional Journey
                    </h2>
                </SectionReveal>

                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                    {experiences.map((exp, index) => (
                        <SectionReveal key={exp.company} delay={index * 0.2}>
                            <div className="relative mb-12 last:mb-0">
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full border-4 border-background" />

                                <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                                    <div className="hidden md:block md:text-right">
                                        <div className="inline-flex items-center gap-2 text-muted-foreground font-mono text-sm">
                                            <Calendar size={14} className="text-accent" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    <div className="md:col-start-2">
                                        <div className="p-6 bg-surface border border-border rounded-lg hover:border-accent/30 transition-colors duration-300">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-accent/10 rounded-lg">
                                                    <Briefcase className="text-accent" size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-4 md:hidden">
                                                <Calendar size={14} className="text-accent" />
                                                {exp.period}
                                            </div>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                {exp.description}
                                            </p>

                                            <ul className="space-y-2">
                                                {exp.highlights.map((highlight) => (
                                                    <li
                                                        key={highlight}
                                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <span className="text-accent mt-1.5">•</span>
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