import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Rangga | Portfolio 2026",
    template: "%s | Rangga Portfolio"
  },
  description: "Portfolio of Muhammad Rangga Miftahul Falah - Software Engineer & Fullstack Developer specializing in Next.js, AI Agents, and Modern Web Architecture.",
  keywords: ["Software Engineer", "Fullstack Developer", "Next.js", "React", "AI Agents", "Rangga", "Portfolio", "Web Developer"],
  authors: [{ name: "Muhammad Rangga Miftahul Falah" }],
  creator: "Muhammad Rangga Miftahul Falah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rangga-portfolio.vercel.app",
    title: "Rangga | Portfolio 2026",
    description: "Software Engineer & Fullstack Developer crafting modern digital experiences.",
    siteName: "Rangga Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rangga Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rangga | Portfolio 2026",
    description: "Software Engineer & Fullstack Developer crafting modern digital experiences.",
    creator: "@rangga"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  }
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
