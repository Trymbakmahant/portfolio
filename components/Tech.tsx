"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScatterBox from "./ScatterBox";
import ScatterText from "./ScatterText";

const techList = [
  { name: "Solana", src: "/logos/solana.svg" },
  { name: "Rust", src: "/logos/rust.svg" },
  { name: "Ethereum", src: "/logos/etherum.svg" },
  { name: "Web3.js", src: "/logos/web3js.svg" },
  { name: "Ethers.js", src: "/logos/etherjs.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "Golang", src: "/logos/golang.svg" },
  { name: "Python", src: "/logos/python.svg" },
  { name: "Next.js", src: "/logos/next.svg" },
  { name: "React", src: "/logos/react.svg" },
  { name: "Node.js", src: "/logos/nodejs.svg" },
  { name: "Express.js", src: "/logos/express.svg" },
  { name: "Postgres", src: "/logos/postgres.svg" },
  { name: "Docker", src: "/logos/docker.svg" },
  { name: "Linux", src: "/logos/linux.svg" },
];

interface TechIconProps {
  name: string;
  src: string;
}

const TechIcon = ({ name, src }: TechIconProps) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center mx-5 group">
      <div
        className="w-20 h-20 flex items-center justify-center p-3 rounded-xl border transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
        style={{
          borderColor: "rgba(255, 255, 255, 0.06)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.3)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 255, 136, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <Image
          src={src || "/icons/placeholder.svg"}
          alt={`${name} icon`}
          width={40}
          height={40}
          className="object-contain relative z-10"
          style={{ filter: "brightness(0.9) contrast(1.1)" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/icons/placeholder.svg";
          }}
        />
      </div>
      <span
        className="text-[11px] font-mono font-medium mt-2 text-center whitespace-nowrap transition-colors duration-300 group-hover:text-[#00ff88]"
        style={{ color: "rgba(255, 255, 255, 0.4)" }}
      >
        {name}
      </span>
    </div>
  );
};

export default function Tech() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Only keep the infinite scroll - lightweight gsap tween
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalWidth = container.scrollWidth;

      const tween = gsap.to(container, {
        x: -totalWidth / 2,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      return () => { tween.kill(); };
    }
  }, []);

  return (
    <section
      id="tech-stack"
      className="relative w-screen flex flex-col items-center py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orb */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header - centered */}
        <div className="text-center mb-16">
          {/* Terminal-style label */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className="inline-block w-2 h-2 rounded-full animate-glow-pulse"
              style={{ backgroundColor: "#00d4ff" }}
            />
            <ScatterText
              text="tech_stack"
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "#00d4ff" }}
              scatterRadius={35}
              scatterForce={12}
              accentColor="#00d4ff"
            />
          </div>

          {/* Section Heading */}
          <div
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 flex justify-center"
            style={{ color: "#ffffff" }}
          >
            <ScatterText
              text="Tools of the trade"
              as="h2"
              scatterRadius={55}
              scatterForce={22}
              accentColor="#00d4ff"
            />
          </div>

          <div
            className="font-mono text-sm mx-auto mb-0 flex justify-center"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            <ScatterText
              text="// Battle-tested technologies powering production systems"
              as="p"
              scatterRadius={40}
              scatterForce={15}
              accentColor="#00d4ff"
            />
          </div>
        </div>

        {/* Infinite Scrolling Tech Icons in ScatterBox */}
        <ScatterBox accentColor="#00d4ff" particleDensity={5} scatterRadius={70} scatterForce={6} className="rounded-2xl p-6">
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div
              className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0a0a0f, transparent)",
              }}
            />

            {/* Right fade */}
            <div
              className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, #0a0a0f, transparent)",
              }}
            />

            <div
              ref={scrollContainerRef}
              className="flex items-center"
              style={{ width: "fit-content" }}
            >
              {techList.map((tech) => (
                <TechIcon key={`first-${tech.name}`} name={tech.name} src={tech.src} />
              ))}
              {techList.map((tech) => (
                <TechIcon key={`second-${tech.name}`} name={tech.name} src={tech.src} />
              ))}
            </div>
          </div>
        </ScatterBox>

        {/* Category labels */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { label: "Blockchain & Web3", color: "#00ff88" },
            { label: "Languages", color: "#00d4ff" },
            { label: "Frameworks", color: "#a855f7" },
            { label: "Infrastructure", color: "#ff6b35" },
          ].map((cat) => (
            <span
              key={cat.label}
              className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-full border"
              style={{
                color: cat.color,
                borderColor: `${cat.color}33`,
                backgroundColor: `${cat.color}08`,
              }}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
