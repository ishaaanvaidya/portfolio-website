import { cn } from "@/lib/utils";

interface SkillCardProps {
    category: string;
    skills: string[];
    className?: string;
}

export default function SkillCard({ category, skills, className }: SkillCardProps) {
    return (
        <div className={cn("p-6 bg-surface/40 backdrop-blur-sm border border-border/80 rounded-2xl shadow-md hover:border-accent/25 transition-all duration-300", className)}>
            <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-bold">
                {category}
            </h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-background/40 border border-border/80 rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 hover:scale-[1.03] cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}