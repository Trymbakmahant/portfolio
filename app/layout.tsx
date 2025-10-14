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
    "TypeScript Developer",
    "Rust Developer",
    "Portfolio",
    "Eclipse Domains",
    "Solana Remix",
    "Stackem",
    "TurboWhack",
    "LeafSpark",
    "Blockchain Infrastructure",
    "DeFi Developer",
    "Smart Contracts",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Trymbak Mahanat" }],
  creator: "Trymbak Mahanat",
  publisher: "Trymbak Mahanat",
  category: "Technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: "#ec4899",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://trymbakmahanat.vercel.app",
  },
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
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trymbak Mahanat - Full Stack Developer & Web3 Builder",
    description:
      "Portfolio showcasing innovative projects spanning web3, infrastructure, gaming, and enterprise solutions.",
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
    "msapplication-TileColor": "#ec4899",
    "msapplication-config": "/browserconfig.xml",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Trymbak Mahanat",
  jobTitle: "Full Stack Developer & Web3 Builder",
  description:
    "Full stack developer specializing in web3, blockchain infrastructure, gaming, and enterprise solutions",
  url: "https://trymbakmahanat.vercel.app",
  image: "https://trymbakmahanat.vercel.app/pfp.png",
  sameAs: [
    "https://github.com/TrymbakMahant",
    "https://www.linkedin.com/in/trymbak-mahant-2652701ba/",
    "https://x.com/TrymbakMahant",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  knowsAbout: [
    "Web3 Development",
    "Blockchain Development",
    "Full Stack Development",
    "TypeScript",
    "Rust",
    "React",
    "Next.js",
    "Solana",
    "Smart Contracts",
    "DeFi",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Computer Science Engineering",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack Developer",
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
        className={`${geistSans.variable} bg-white ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
