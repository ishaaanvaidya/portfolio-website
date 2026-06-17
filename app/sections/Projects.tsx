import SectionReveal from "../components/SectionReveal";
import ProjectCard from "../components/ProjectCard";

const projects = [
    {
        title: "Driver Drowsiness Detection",
        description:
            "Real-time fatigue monitoring system using computer vision. Detects eye aspect ratio and head pose to alert drowsy drivers. Deployed on Raspberry Pi 4 for edge computing.",
        tags: ["Python", "OpenCV", "MediaPipe", "Raspberry Pi 4"],
        githubUrl: "https://github.com/ishaaanvaidya/driver-drowsiness-detector", // Add when repo exists
    },
    {
        title: "HDFC Stock Prediction",
        description:
            "LSTM-based time series forecasting model for HDFC stock prices. Engineered features from historical data and implemented ensemble techniques for improved accuracy.",
        tags: ["LSTM", "TensorFlow", "Keras", "Feature Engineering"],
        githubUrl: "https://github.com/ishaaanvaidya/hdfc-stock-prediction-lstm", // Add when repo exists
    },
    {
        title: "Pothole Detection",
        description:
            "Convolutional Neural Network for automated road damage detection. Processes dashboard camera feeds to identify potholes and classify severity levels.",
        tags: ["CNN", "TensorFlow", "OpenCV"],
        githubUrl: "https://github.com/ishaaanvaidya/pothole-detection-cnn"
    },
];

export default function Projects() {
    return (
        <section
            id="projects"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-mono text-sm text-accent uppercase tracking-wider">
                            Projects
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4">
                        Featured Work
                    </h2>
                    <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                        A selection of projects that demonstrate my expertise in machine
                        learning, computer vision, and software engineering
                    </p>
                </SectionReveal>

                <div className="grid gap-6">
                    {projects.map((project, index) => (
                        <SectionReveal key={project.title} delay={index * 0.15}>
                            <ProjectCard {...project} />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}