"use client";
import { useRef, useState } from "react";
import ScatterBox from "./ScatterBox";
import ScatterText from "./ScatterText";

const projects = [
  {
    title: "PnP Exchange",
    subtitle: "Real-time prediction markets on Solana with AI Oracle integration",
    tag: "SOLANA",
    stack: ["Rust", "Anchor", "TypeScript", "AI Oracles"],
    url: "https://x.com/predictandpump",
    accent: "#00ff88",
  },
  {
    title: "Modern Village Future",
    subtitle: "Agricultural supply chain protocol deployed on Base Mainnet",
    tag: "BASE",
    stack: ["Solidity", "TypeScript", "SDK", "PostgreSQL"],
    url: "https://modernvillagefuture.com",
    accent: "#00d4ff",
  },
  {
    title: "LeafSpark",
    subtitle: "Enterprise web platform with admin dashboards & secure data pipelines",
    tag: "ENTERPRISE",
    stack: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    url: "https://www.leafspark.in/",
    accent: "#ff6b35",
  },
  {
    title: "Sunflower Ruby",
    subtitle: "Solana ecosystem showcase with real-time blockchain telemetry",
    tag: "SOLANA",
    stack: ["Solana Web3.js", "Wallet Adapter", "React", "TypeScript"],
    url: "https://sunflower-ruby.vercel.app",
    accent: "#a855f7",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="project-card relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.url, "_blank")}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative p-[1px] rounded-2xl transition-all duration-500"
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) translateZ(20px)`
            : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          background: isHovered
            ? `linear-gradient(135deg, ${project.accent}88, transparent 40%, ${project.accent}44)`
            : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 40%, rgba(255,255,255,0.03))",
        }}
      >
        <div
          className="relative rounded-2xl p-8 md:p-10 overflow-hidden h-full"
          style={{
            background: "linear-gradient(145deg, rgba(15,15,20,0.98), rgba(8,8,12,0.99))",
            minHeight: "340px",
          }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
            }}
          />

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(600px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, ${project.accent}, transparent 40%)`,
            }}
          />

          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top row */}
          <div className="relative z-10 flex items-center justify-between mb-8">
            <span className="font-mono text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 rounded-full border"
              style={{
                color: project.accent,
                borderColor: `${project.accent}33`,
                backgroundColor: `${project.accent}0a`,
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Title */}
          <h3
            className="relative z-10 text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300"
            style={{
              color: isHovered ? project.accent : "#ffffff",
              textShadow: isHovered ? `0 0 30px ${project.accent}44` : "none",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="relative z-10 text-sm leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
            {project.subtitle}
          </p>

          {/* Tech stack */}
          <div className="relative z-10 flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-3 py-1 rounded-md border"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="relative z-10 flex items-center gap-2 mt-auto">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:translate-x-1"
              style={{
                borderColor: isHovered ? `${project.accent}66` : "rgba(255,255,255,0.1)",
                backgroundColor: isHovered ? `${project.accent}11` : "transparent",
              }}
            >
              <svg
                className="w-4 h-4 transition-all duration-500 group-hover:rotate-45"
                style={{ color: isHovered ? project.accent : "rgba(255,255,255,0.5)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <span className="font-mono text-xs transition-all duration-300" style={{ color: isHovered ? project.accent : "rgba(255,255,255,0.3)" }}>
              View Project
            </span>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none" style={{ borderRight: `1px solid ${project.accent}22`, borderTop: `1px solid ${project.accent}22`, borderTopRightRadius: "16px" }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none" style={{ borderLeft: `1px solid ${project.accent}22`, borderBottom: `1px solid ${project.accent}22`, borderBottomLeftRadius: "16px" }} />
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <div
      className="relative w-screen min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#00ff88" }} />
            <ScatterText
              text="featured_projects"
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "#00ff88" }}
              scatterRadius={35}
              scatterForce={12}
              accentColor="#00ff88"
            />
          </div>

          <div className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight" style={{ color: "#ffffff" }}>
            <ScatterText
              text="My latest work"
              as="h1"
              scatterRadius={60}
              scatterForce={25}
              accentColor="#00ff88"
            />
          </div>

          <div className="mt-6 text-base max-w-lg font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ScatterText
              text="// Production systems built from scratch — smart contracts, SDKs, and full-stack platforms."
              as="p"
              scatterRadius={40}
              scatterForce={15}
              accentColor="#00ff88"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScatterBox
              key={project.title}
              accentColor={project.accent}
              particleDensity={5}
              scatterRadius={70}
              scatterForce={7}
              className="rounded-2xl"
            >
              <ProjectCard project={project} index={index} />
            </ScatterBox>
          ))}
        </div>
      </div>
    </div>
  );
}
