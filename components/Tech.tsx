"use client";

import Image from "next/image";
import { useState } from "react";

// --- Data for the Tech Stack Section ---
const techList = [
  // Core Languages
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "Python", src: "/logos/python.svg" },
  { name: "Rust", src: "/logos/rust.svg" },
  { name: "Golang", src: "/logos/golang.svg" },

  // Frontend & Backend Frameworks
  { name: "React", src: "/logos/react.svg" },
  { name: "Next.js", src: "/logos/next.svg" },
  { name: "Express.js", src: "/logos/express.svg" },
  { name: "Linux", src: "/logos/linux.svg" },

  // Blockchain & Web3 (Using placeholders where common logos might not exist)
  { name: "Ethereum", src: "/logos/etherum.svg" },
  { name: "Solana@web3", src: "/logos/solana.svg" },
  { name: "Web3.js", src: "/logos/web3js.svg" },
  { name: "Ethers.js", src: "/logos/etherjs.svg" },
  { name: "Docker", src: "/logos/docker.svg" },

  // Cloud
  { name: "Postgres", src: "/logos/postgres.svg" },
  { name: "Node.js", src: "/logos/nodejs.svg" },
];

// --- Tech Icon Component with Magnifying Effect ---
interface TechIconProps {
  name: string;
  src: string;
  onHover: (name: string) => void;
  onLeave: () => void;
  isHovered: boolean;
}

const TechIcon = ({
  name,
  src,
  onHover,
  onLeave,
  isHovered,
}: TechIconProps) => {
  return (
    <div
      className={`relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center m-2 p-2 
                       rounded-2xl border border-gray-200 bg-white shadow-lg cursor-pointer 
                       transform transition-all duration-300 ease-out 
                       ${
                         isHovered
                           ? "scale-[1.4] z-10 shadow-pink-400/50"
                           : "scale-100 z-0 hover:scale-110"
                       }`}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={onLeave}
    >
      <Image
        src={src || "/icons/placeholder.svg"}
        alt={`${name} icon`}
        width={isHovered ? 48 : 32}
        height={isHovered ? 48 : 32}
        className="object-contain transition-all duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/icons/placeholder.svg";
        }}
      />
      {/* Tooltip effect for the name */}
      <span
        className={`absolute bottom-[-2.5rem] bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap 
                             transition-opacity duration-300
                             ${
                               isHovered
                                 ? "opacity-100"
                                 : "opacity-0 pointer-events-none"
                             }`}
      >
        {name}
      </span>
    </div>
  );
};

// --- Main Tech Stack Section Component ---
export default function Tech() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const handleHover = (name: string) => setHoveredTech(name);
  const handleLeave = () => setHoveredTech(null);

  return (
    <section
      id="tech-stack"
      className="flex flex-col items-center py-24 md:py-32 px-4 sm:px-6  text-gray-900"
    >
      <div className="max-w-4xl w-full text-center">
        {/* Section Heading */}
        <h3 className="text-pink-600 font-bold uppercase tracking-widest text-sm mb-2">
          Technical Expertise
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight">
          Technologies I Master
        </h2>

        {/* The Tech Grid Container */}
        <div className="flex flex-wrap gap-4 justify-center">
          {techList.map((tech) => (
            <TechIcon
              key={tech.name}
              name={tech.name}
              src={tech.src}
              onHover={handleHover}
              onLeave={handleLeave}
              isHovered={hoveredTech === tech.name}
            />
          ))}
        </div>

        {/* Name Display */}
        <p className="mt-16 h-6 text-center text-lg text-gray-700 font-medium transition-opacity duration-300">
          {hoveredTech ? (
            <span className="text-pink-600 font-bold">{hoveredTech}</span>
          ) : (
            "Hover over an icon to see the name."
          )}
        </p>
      </div>
    </section>
  );
}
