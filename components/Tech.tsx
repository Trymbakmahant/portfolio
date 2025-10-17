"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Data for the Tech Stack Section ---
const techList = [
  // Core Languages
  { name: "JavaScript", src: "/logos/javascript.svg" },
  { name: "TypeScript", src: "/logos/typescript.svg" },
  { name: "Python", src: "/logos/python.svg" },
  { name: "Rust", src: "/logos/rust.svg" },
  { name: "Golang", src: "/logos/golang.svg" },
  { name: "C++", src: "/logos/c++.svg" },

  // Frontend & Backend Frameworks
  { name: "React", src: "/logos/react.svg" },
  { name: "Next.js", src: "/logos/next.svg" },
  { name: "Express.js", src: "/logos/express.svg" },
  { name: "Linux", src: "/logos/linux.svg" },
  { name: "Node.js", src: "/logos/nodejs.svg" },

  // Blockchain & Web3
  { name: "Ethereum", src: "/logos/etherum.svg" },
  { name: "Solana", src: "/logos/solana.svg" },
  { name: "Web3.js", src: "/logos/web3js.svg" },
  { name: "Ethers.js", src: "/logos/etherjs.svg" },
  { name: "Docker", src: "/logos/docker.svg" },

  // Database & Cloud
  { name: "Postgres", src: "/logos/postgres.svg" },
  { name: "Arduino", src: "/logos/arduino.svg" },
];

// --- Tech Icon Component for Scrolling ---
interface TechIconProps {
  name: string;
  src: string;
}

const TechIcon = ({ name, src }: TechIconProps) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center mx-4">
      <div
        className="w-20 h-20 flex items-center justify-center p-3 
                   rounded-2xl border backdrop-blur-sm
                   transform transition-all duration-300 ease-out hover:scale-110"
        style={{
          borderColor: "rgba(123, 123, 123, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0 8px 16px rgba(123, 123, 123, 0.1), 0 0 8px rgba(123, 123, 123, 0.05)",
        }}
      >
        <Image
          src={src || "/icons/placeholder.svg"}
          alt={`${name} icon`}
          width={40}
          height={40}
          className="object-contain transition-all duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/icons/placeholder.svg";
          }}
        />
      </div>
      <span
        className="text-xs font-medium mt-2 text-center whitespace-nowrap"
        style={{ color: "#7B7B7B" }}
      >
        {name}
      </span>
    </div>
  );
};

// --- Main Tech Stack Section Component ---
export default function Tech() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current && sectionRef.current) {
      const words = headingRef.current.textContent?.split(" ") || [];
      headingRef.current.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");

      const wordElements = headingRef.current.querySelectorAll(".word");

      gsap.set(wordElements, { y: 50, opacity: 0 });

      gsap.to(wordElements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Infinite scroll animation
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalWidth = container.scrollWidth;

      gsap.to(container, {
        x: -totalWidth / 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative w-screen flex flex-col items-center py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: "#F8F8F8", color: "#222222" }}
    >
      <div className="max-w-6xl w-full text-center relative z-10">
        {/* Section Heading */}
        <div className="mb-16">
          <h3
            className="font-bold uppercase tracking-widest text-sm mb-4"
            style={{ color: "#7B7B7B" }}
          >
            Technical Expertise
          </h3>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#222222" }}
          >
            Technologies I work with
          </h2>
        </div>

        {/* Infinite Scrolling Tech Icons */}
        <div className="relative overflow-hidden">
          {/* Left fade gradient */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #F8F8F8, transparent)",
            }}
          />

          {/* Right fade gradient */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #F8F8F8, transparent)",
            }}
          />

          <div
            ref={scrollContainerRef}
            className="flex items-center"
            style={{ width: "fit-content" }}
          >
            {/* First set of tech icons */}
            {techList.map((tech) => (
              <TechIcon
                key={`first-${tech.name}`}
                name={tech.name}
                src={tech.src}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {techList.map((tech) => (
              <TechIcon
                key={`second-${tech.name}`}
                name={tech.name}
                src={tech.src}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
