import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Nautiyal | AI & Data Engineer",
  description:
    "Portfolio of Harsh Nautiyal — AI & Data Engineer building intelligent systems that automate decision making.",
  keywords: ["AI Engineer", "Data Engineer", "Machine Learning", "Portfolio", "Harsh Nautiyal"],
  openGraph: {
    title: "Harsh Nautiyal | AI & Data Engineer",
    description: "Building intelligent systems that automate decision making.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-slate-200 font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
