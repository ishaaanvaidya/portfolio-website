import { Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {currentYear} Ishan Vaidya. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">


                </p>
            </div>
        </footer>
    );
}