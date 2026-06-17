import type { Metadata } from "next";
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

export const metadata: Metadata = {
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
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}