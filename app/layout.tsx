import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ishanvaidya.github.io"),
  alternates: {
    canonical: "/",
  },
  title: "Ishan Vaidya | Computer Science Undergraduate",
  description:
    "Portfolio of Ishan Vaidya, a Computer Science undergraduate specializing in Machine Learning, Computer Vision, and Software Development.",
  keywords: [
    "Ishan Vaidya",
    "Computer Science",
    "Machine Learning",
    "Computer Vision",
    "Software Developer",
    "Python",
    "TensorFlow",
    "OpenCV",
  ],
  authors: [{ name: "Ishan Vaidya" }],
  creator: "Ishan Vaidya",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishanvaidya.github.io",
    siteName: "Ishan Vaidya Portfolio",
    title: "Ishan Vaidya | Computer Science Undergraduate",
    description:
      "Portfolio of Ishan Vaidya, a Computer Science undergraduate specializing in Machine Learning, Computer Vision, and Software Development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ishan Vaidya Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishan Vaidya | Computer Science Undergraduate",
    description:
      "Portfolio of Ishan Vaidya, a Computer Science undergraduate specializing in Machine Learning, Computer Vision, and Software Development.",
    images: ["/og-image.png"],
    creator: "@ishanvaidya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ishan Vaidya",
    "url": "https://ishanvaidya.github.io",
    "image": "https://ishanvaidya.github.io/og-image.png",
    "jobTitle": "Computer Science Undergraduate",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "UPES, Dehradun"
    },
    "knowsAbout": [
      "Machine Learning",
      "Computer Vision",
      "Deep Learning",
      "Python",
      "TensorFlow",
      "OpenCV"
    ],
    "sameAs": [
      "https://github.com/ishaaanvaidya",
      "https://www.linkedin.com/in/ishan-vaidya/"
    ],
    "email": "mailto:ishan3vaidya@gmail.com"
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}