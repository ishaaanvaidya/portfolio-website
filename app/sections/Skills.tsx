import SectionReveal from "../components/SectionReveal";
import SkillCard from "../components/SkillCard";

const skillCategories = [
    {
        category: "Languages",
        skills: ["Python", "SQL"],
    },
    {
        category: "Machine Learning",
        skills: ["TensorFlow", "PyTorch", "Keras"],
    },
    {
        category: "Computer Vision",
        skills: ["OpenCV", "MediaPipe"],
    },
    {
        category: "Tools & Libraries",
        skills: ["Git", "GitHub", "Pandas", "NumPy"],
    },
];

export default function Skills() {
    return (
        <section
            id="skills"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative bg-surface/15 border-y border-border/20 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 bg-dot mask-radial opacity-20" />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/80" />
                        <span className="font-mono text-xs text-accent uppercase tracking-widest bg-accent/8 border border-accent/25 px-3 py-1 rounded-full">
                            Skills
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/80" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-center mb-4 leading-tight">
                        Technical Arsenal
                    </h2>
                    <p className="text-muted-foreground text-center text-sm sm:text-base max-w-xl mx-auto mb-16 leading-relaxed">
                        Technologies and tools I use to build intelligent systems and
                        production-ready software.
                    </p>
                </SectionReveal>

                <div className="grid sm:grid-cols-2 gap-6">
                    {skillCategories.map((category, index) => (
                        <SectionReveal key={category.category} delay={index * 0.1}>
                            <SkillCard
                                category={category.category}
                                skills={category.skills}
                            />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}