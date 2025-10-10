import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trymbak Mahanat - Full Stack Developer & Web3 Builder",
  description:
    "Portfolio of Trymbak Mahanat - Full stack developer specializing in web3, blockchain infrastructure, gaming, and enterprise solutions. Explore projects like Eclipse Domains, Solana Remix, Stackem, TurboWhack, and LeafSpark.",
  keywords: [
    "Trymbak Mahanat",
    "Full Stack Developer",
    "Web3 Developer",
    "Blockchain Developer",
    "Solana Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Eclipse Domains",
    "Solana Remix",
    "Stackem",
    "TurboWhack",
    "LeafSpark",
  ],
  authors: [{ name: "Trymbak Mahanat" }],
  creator: "Trymbak Mahanat",
  openGraph: {
    title: "Trymbak Mahanat - Full Stack Developer & Web3 Builder",
    description:
      "Portfolio showcasing innovative projects spanning web3, infrastructure, gaming, and enterprise solutions.",
    url: "https://trymbakmahanat.vercel.app",
    siteName: "Trymbak Mahanat Portfolio",
    images: [
      {
        url: "/pfp.png",
        width: 1200,
        height: 630,
        alt: "Trymbak Mahanat - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trymbak Mahanat - Full Stack Developer & Web3 Builder",
    description:
      "Portfolio showcasing innovative projects spanning web3, infrastructure, gaming, and enterprise solutions.",
    images: ["/pfp.png"],
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-white ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
