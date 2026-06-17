import { cn } from "@/lib/utils";

interface SkillCardProps {
    category: string;
    skills: string[];
    className?: string;
}

export default function SkillCard({ category, skills, className }: SkillCardProps) {
    return (
        <div className={cn("p-6 bg-surface border border-border rounded-lg", className)}>
            <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-4">
                {category}
            </h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-background border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors duration-300"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}