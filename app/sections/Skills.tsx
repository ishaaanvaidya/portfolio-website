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
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-mono text-sm text-accent uppercase tracking-wider">
                            Skills
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4">
                        Technical Arsenal
                    </h2>
                    <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                        Technologies and tools I use to build intelligent systems and
                        production-ready software
                    </p>
                </SectionReveal>

                <div className="grid sm:grid-cols-2 gap-4">
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