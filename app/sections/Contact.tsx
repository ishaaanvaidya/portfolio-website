import SectionReveal from "../components/SectionReveal";
import ContactForm from "../components/ContactForm";
import { Mail, MapPin } from "lucide-react";

const GitHubIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "ishan3vaidya@gmail.com",
        href: "mailto:ishan3vaidya@gmail.com",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Dehradun, India",
        href: null,
    },
    {
        icon: GitHubIcon,
        label: "GitHub",
        value: "github.com/ishaaanvaidya",
        href: "https://github.com/ishaaanvaidya",
    },
    {
        icon: LinkedInIcon,
        label: "LinkedIn",
        value: "linkedin.com/in/ishan-vaidya",
        href: "https://www.linkedin.com/in/ishan-vaidya/",
    },
];

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto">
                <SectionReveal>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-mono text-sm text-accent uppercase tracking-wider">
                            Contact
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-4">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                        Have a project in mind or want to discuss opportunities? I&apos;d love
                        to hear from you.
                    </p>
                </SectionReveal>

                <div className="grid md:grid-cols-5 gap-12">
                    <SectionReveal delay={0.1} className="md:col-span-2">
                        <div className="space-y-6">
                            <h3 className="font-semibold text-foreground mb-6">
                                Get in Touch
                            </h3>
                            {contactInfo.map((info) => (
                                <div key={info.label} className="flex items-start gap-4">
                                    <div className="p-2 bg-accent/10 rounded-lg">
                                        <info.icon className="text-accent" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-0.5">
                                            {info.label}
                                        </p>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                target={info.href.startsWith("http") ? "_blank" : undefined}
                                                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="text-foreground hover:text-accent transition-colors text-sm"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-foreground text-sm">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.2} className="md:col-span-3">
                        <div className="p-6 bg-surface border border-border rounded-lg">
                            <ContactForm />
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}