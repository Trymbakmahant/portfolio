"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <main
      className="flex mt-[40px] w-screen flex-col items-center justify-center text-center min-h-screen px-4"
      style={{ backgroundColor: "#222222" }}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Profile Image */}
        <header className="flex justify-center mb-6">
          <Image
            src="/pfp.png"
            alt="Trymbak Mahanat - Full Stack Developer and Web3 Builder professional headshot"
            width={120}
            height={120}
            className="rounded-full shadow-lg border-2"
            style={{ borderColor: "#7B7B7B" }}
            priority
            sizes="(max-width: 768px) 120px, 120px"
          />
        </header>

        {/* Intro Text */}
        <h2 className="text-lg" style={{ color: "#7B7B7B" }}>
          Hi! I&apos;m{" "}
          <span className="font-semibold" style={{ color: "#FFFFFF" }}>
            Trymbak Mahanat
          </span>{" "}
          👋
        </h2>
        <h1
          className="text-4xl md:text-6xl font-serif font-medium mt-4 leading-tight"
          style={{ color: "#FFFFFF" }}
        >
          Fullstack blockchain developer <br /> based in India.
        </h1>

        <p className="mt-6 leading-relaxed" style={{ color: "#7B7B7B" }}>
          I am a full-stack developer from India with 4+ years of experience in
          multiple technologies including Frontend, Backend, and Blockchain
          development. Specializing in Web3, DeFi, and enterprise solutions.
        </p>

        {/* Call to Action Buttons */}
        <nav
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          aria-label="Main navigation"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full transition focus:outline-none focus:ring-2 shadow-lg"
            style={{
              backgroundColor: "#7B7B7B",
              color: "#FFFFFF",
              boxShadow: "0 10px 25px rgba(123, 123, 123, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#8B8B8B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#7B7B7B";
            }}
            aria-label="Connect with Trymbak Mahanat"
          >
            connect with me{" "}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="/trymbak_resume.pdf"
            download="Trymbak_Mahanat_Resume.pdf"
            className="flex items-center gap-2 border px-6 py-3 rounded-full transition focus:outline-none focus:ring-2"
            style={{
              color: "#FFFFFF",
              borderColor: "#7B7B7B",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2A2A2A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label="Download Trymbak Mahanat's resume"
          >
            my resume <Download className="w-4 h-4" aria-hidden="true" />
          </a>
        </nav>
      </motion.article>
    </main>
  );
}
