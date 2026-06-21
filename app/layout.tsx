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
  title: "Trymbak Mahanat - Web3 & Full-Stack Engineer | Solana Developer",
  description:
    "Portfolio of Trymbak Mahanat - Web3 & Full-Stack Engineer specializing in Solana, Anchor Protocol, Rust, and TypeScript. Builder of prediction markets, supply chain protocols, and enterprise solutions. ETHIndia 2024 Grand Prize Winner.",
  keywords: [
    "Trymbak Mahanat",
    "Web3 Developer",
    "Solana Developer",
    "Anchor Protocol",
    "Blockchain Developer",
    "Smart Contract Developer",
    "Full Stack Developer",
    "Rust Developer",
    "TypeScript Developer",
    "Prediction Markets",
    "AI Oracles",
    "Base Network",
    "Solidity",
    "Next.js Developer",
    "React Developer",
    "DeFi Developer",
    "Supply Chain Blockchain",
    "ETHIndia Winner",
    "PnP Exchange",
    "Eclipse Domains",
    "Stackem",
    "TurboWhack",
    "LeafSpark",
    "Modern Village Future",
  ],
  authors: [{ name: "Trymbak Mahanat" }],
  creator: "Trymbak Mahanat",
  publisher: "Trymbak Mahanat",
  category: "Technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: "#00ff88",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://trymbakmahanat.vercel.app",
  },
  openGraph: {
    title: "Trymbak Mahanat - Web3 & Full-Stack Engineer | Solana Developer",
    description:
      "Web3 engineer specializing in Solana, prediction markets, and enterprise blockchain solutions. 10+ production apps shipped. ETHIndia 2024 Grand Prize Winner.",
    url: "https://trymbakmahanat.vercel.app",
    siteName: "Trymbak Mahanat Portfolio",
    images: [
      {
        url: "/pfp.png",
        width: 1200,
        height: 630,
        alt: "Trymbak Mahanat - Full Stack Developer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trymbak Mahanat - Web3 & Full-Stack Engineer | Solana Developer",
    description:
      "Web3 engineer specializing in Solana, prediction markets, and enterprise blockchain solutions. 10+ production apps shipped.",
    images: ["/pfp.png"],
    creator: "@TrymbakMahant",
    site: "@TrymbakMahant",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  other: {
    "msapplication-TileColor": "#0a0a0f",
    "msapplication-config": "/browserconfig.xml",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Trymbak Mahanat",
  jobTitle: "Web3 & Full-Stack Engineer",
  description:
    "Web3 engineer specializing in Solana, Anchor Protocol, prediction markets, and enterprise blockchain solutions. ETHIndia 2024 Grand Prize Winner.",
  url: "https://trymbakmahanat.vercel.app",
  image: "https://trymbakmahanat.vercel.app/pfp.png",
  sameAs: [
    "https://github.com/Trymbakmahant",
    "https://www.linkedin.com/in/trymbak-mahant-2652701ba/",
    "https://x.com/TrymbakMahant",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jashpur",
    addressRegion: "Chhattisgarh",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Solana Development",
    "Anchor Protocol",
    "Smart Contract Development",
    "Prediction Markets",
    "AI Oracles Integration",
    "TypeScript",
    "Rust",
    "Solidity",
    "Go",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Supply Chain Protocols",
    "SDK Development",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Computer Science Engineering",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Web3 & Full-Stack Engineer",
    occupationLocation: {
      "@type": "Country",
      name: "India",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#0a0a0f" }}
      >
        {children}
      </body>
    </html>
  );
}
