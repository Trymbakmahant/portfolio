"use client";

import AsciiPortrait from "./AsciiPortrait";
import ScatterBox from "./ScatterBox";
import ScatterText from "./ScatterText";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center w-full justify-center py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
      aria-labelledby="about-heading"
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
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-[1fr_1fr] gap-10 items-center">
        {/* Left: ASCII Portrait in ScatterBox */}
        <div className="flex justify-center">
          <ScatterBox
            accentColor="#00ff88"
            particleDensity={5}
            scatterRadius={80}
            scatterForce={8}
            className="p-4 rounded-2xl"
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <AsciiPortrait imageSrc="/fullimage.png" width={480} height={580} />
            </div>
          </ScatterBox>
        </div>

        {/* Right: Text Content */}
        <article className="md:pl-4">
          {/* Terminal-style label */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-block w-2 h-2 rounded-full animate-glow-pulse"
              style={{ backgroundColor: "#00ff88" }}
            />
            <ScatterText
              text="about_me"
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "#00ff88" }}
              scatterRadius={35}
              scatterForce={12}
              accentColor="#00ff88"
            />
          </div>

         

          <div
            className="text-base leading-relaxed mb-12 text-center md:text-left max-w-lg font-mono"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            <ScatterText
              text="// Web3 & Full-Stack Engineer with 10+ production apps shipped across DeFi, prediction markets, and enterprise logistics. Specializing in Solana, Anchor Protocol, Rust, and TypeScript — from smart contracts to production-grade SDKs."
              as="p"
              scatterRadius={40}
              scatterForce={15}
              accentColor="#00d4ff"
            />
          </div>

          {/* Info Cards with ScatterBox */}
          <div
            className="grid sm:grid-cols-3 gap-4"
            role="list"
            aria-label="Professional highlights"
          >
            <ScatterBox accentColor="#00ff88" particleDensity={6} scatterRadius={50} scatterForce={5} className="rounded-xl">
              <div className="p-5 text-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)" }} role="listitem">
                <h4 className="font-mono font-bold text-sm mb-1" style={{ color: "#00ff88" }}>Languages</h4>
                <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>TypeScript, Rust, Solidity, Go</p>
              </div>
            </ScatterBox>
            <ScatterBox accentColor="#00d4ff" particleDensity={6} scatterRadius={50} scatterForce={5} className="rounded-xl">
              <div className="p-5 text-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)" }} role="listitem">
                <h4 className="font-mono font-bold text-sm mb-1" style={{ color: "#00d4ff" }}>Education</h4>
                <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>B.Tech Computer Science</p>
              </div>
            </ScatterBox>
            <ScatterBox accentColor="#a855f7" particleDensity={6} scatterRadius={50} scatterForce={5} className="rounded-xl">
              <div className="p-5 text-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)" }} role="listitem">
                <h4 className="font-mono font-bold text-sm mb-1" style={{ color: "#a855f7" }}>Shipped</h4>
                <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>10+ production applications</p>
              </div>
            </ScatterBox>
          </div>

          {/* Hackathon badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["ETHIndia 2024 Winner", "Superfluid Best Dev", "ETHGlobal Winner"].map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-full border"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  borderColor: "rgba(0, 255, 136, 0.2)",
                  backgroundColor: "rgba(0, 255, 136, 0.05)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
