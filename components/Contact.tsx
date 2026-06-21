"use client";
import { useState } from "react";
import ScatterBox from "./ScatterBox";
import ScatterText from "./ScatterText";

const socials = [
  {
    name: "Email",
    handle: "trymbak0102mahant@gmail.com",
    url: "mailto:trymbak0102mahant@gmail.com",
    accent: "#00ff88",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@TrymbakMahant",
    url: "https://x.com/TrymbakMahant",
    accent: "#00d4ff",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "trymbak-mahant",
    url: "https://www.linkedin.com/in/trymbak-mahant-2652701ba/",
    accent: "#a855f7",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "trymbak",
    url: "https://discord.com/users/trymbak",
    accent: "#7c5cfc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "Trymbakmahant",
    url: "https://github.com/Trymbakmahant",
    accent: "#ffffff",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

function SocialCard({ social, index }: { social: (typeof socials)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={social.url}
      target={social.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group relative block p-[1px] rounded-xl transition-all duration-500"
      style={{
        background: isHovered
          ? `linear-gradient(135deg, ${social.accent}44, transparent 60%, ${social.accent}22)`
          : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%, rgba(255,255,255,0.03))",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Connect on ${social.name}`}
    >
      <div
        className="relative flex items-center gap-4 p-5 rounded-xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.95)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background: `radial-gradient(circle at 30% 50%, ${social.accent}, transparent 60%)`,
          }}
        />

        {/* Index */}
        <span
          className="absolute top-2 right-3 font-mono text-[10px]"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 relative z-10"
          style={{
            borderColor: isHovered ? `${social.accent}44` : "rgba(255,255,255,0.06)",
            backgroundColor: isHovered ? `${social.accent}0a` : "rgba(255,255,255,0.02)",
            color: isHovered ? social.accent : "rgba(255,255,255,0.5)",
          }}
        >
          {social.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 relative z-10">
          <p
            className="font-mono font-semibold text-sm transition-colors duration-300"
            style={{ color: isHovered ? social.accent : "#ffffff" }}
          >
            {social.name}
          </p>
          <p
            className="text-xs font-mono truncate"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {social.handle}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 ml-auto flex-shrink-0 transition-all duration-300 relative z-10"
          style={{
            color: isHovered ? social.accent : "rgba(255,255,255,0.2)",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <div
      className="relative min-h-screen w-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-14">
            {/* Terminal label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span
                className="inline-block w-2 h-2 rounded-full animate-glow-pulse"
                style={{ backgroundColor: "#a855f7" }}
              />
              <ScatterText
                text="connect"
                className="font-mono text-xs tracking-[0.3em] uppercase"
                style={{ color: "#a855f7" }}
                scatterRadius={35}
                scatterForce={12}
                accentColor="#a855f7"
              />
            </div>

            <div
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#ffffff" }}
            >
              <ScatterText
                text="Let's build together"
                as="h1"
                scatterRadius={55}
                scatterForce={22}
                accentColor="#a855f7"
              />
            </div>
            <div
              className="max-w-md mx-auto font-mono text-sm"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              <ScatterText
                text="// Open for collaborations, freelance, and full-time opportunities"
                as="p"
                scatterRadius={40}
                scatterForce={15}
                accentColor="#a855f7"
              />
            </div>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((social, index) => (
              <ScatterBox
                key={social.name}
                accentColor={social.accent}
                particleDensity={6}
                scatterRadius={50}
                scatterForce={5}
                className="rounded-xl"
              >
                <SocialCard social={social} index={index} />
              </ScatterBox>
            ))}
          </div>

          {/* Terminal-style availability */}
          {/* Terminal box in ScatterBox */}
          <ScatterBox accentColor="#00ff88" particleDensity={5} scatterRadius={60} scatterForce={5} className="mt-12 mx-auto max-w-md rounded-lg">
            <div
              className="p-4 rounded-lg font-mono text-xs"
              style={{
                backgroundColor: "rgba(0, 255, 136, 0.02)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  terminal
                </span>
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                <span style={{ color: "#00ff88" }}>$</span> status --current
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {">"} Available for Web3 projects
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {">"} Location: Jashpur, Chhattisgarh, India
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {">"} Response time: {"<"} 24h
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span style={{ color: "#00ff88" }}>$</span>
                <span className="animate-typing-cursor" style={{ color: "#00ff88" }}>_</span>
              </div>
            </div>
          </ScatterBox>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 border-t py-6"
        style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex flex-col md:flex-row justify-between items-center font-mono text-xs"
            style={{ color: "rgba(255, 255, 255, 0.3)" }}
          >
            <p>© 2025 Trymbak Mahanat. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#00ff88" }}
              />
            
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
