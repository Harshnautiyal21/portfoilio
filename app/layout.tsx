import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/content/config";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: ["AI Engineer", "Data Engineer", "Portfolio", "Machine Learning", "Next.js"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.url,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-gray-100 font-body antialiased overflow-x-hidden">
        <div className="scan-line" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
