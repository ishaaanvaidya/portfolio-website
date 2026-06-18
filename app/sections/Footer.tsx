export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm text-muted-foreground">
                    © {currentYear} Ishan Vaidya. All rights reserved.
                </p>
            </div>
        </footer>
    );
}