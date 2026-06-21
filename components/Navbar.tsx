"use client";

import { useState, useEffect, useRef } from "react";
import ScatterBox from "./ScatterBox";
import ScatterText from "./ScatterText";

interface NavbarProps {
  navLinks?: Array<{ id: string; label: string }>;
  activeId?: string;
  onNavLinkClick?: (id: string) => void;
}

export default function Navbar({
  navLinks = [],
  activeId = "about",
  onNavLinkClick = () => {},
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (id: string) => {
    onNavLinkClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out hidden md:block ${
          scrolled
            ? "top-4 w-fit"
            : "w-[90%] max-w-5xl top-6"
        }`}
      >
        <ScatterBox accentColor="#00ff88" particleDensity={5} scatterRadius={50} scatterForce={4} className="rounded-2xl">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled ? "px-4 py-2" : ""
          }`}
          style={{
            backgroundColor: scrolled
              ? "rgba(10, 10, 15, 0.95)"
              : "rgba(10, 10, 15, 0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: scrolled
              ? "0 0 30px rgba(0, 255, 136, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Logo */}
          {!scrolled && (
            <div className="flex items-center gap-2 cursor-pointer group">
              <span
                className="inline-block w-2 h-2 rounded-full animate-glow-pulse"
                style={{ backgroundColor: "#00ff88" }}
              />
              <ScatterText
                text="trymbak_"
                className="font-mono text-sm font-bold tracking-wider"
                style={{ color: "#ffffff" }}
                scatterRadius={40}
                scatterForce={15}
                accentColor="#00ff88"
              />
            </div>
          )}

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavLinkClick(link.id)}
                className="relative px-4 py-2 rounded-lg font-mono text-xs tracking-wider uppercase transition-all duration-300"
                style={{
                  color:
                    link.id === activeId
                      ? "#00ff88"
                      : "rgba(255, 255, 255, 0.5)",
                  backgroundColor:
                    link.id === activeId
                      ? "rgba(0, 255, 136, 0.08)"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (link.id !== activeId) {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (link.id !== activeId) {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.id === activeId && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                    style={{ backgroundColor: "#00ff88" }}
                  />
                )}
                <ScatterText
                  text={link.label}
                  scatterRadius={30}
                  scatterForce={12}
                  accentColor="#00ff88"
                />
              </button>
            ))}
          </div>

          {/* Status indicator */}
          {!scrolled && (
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[10px] tracking-wider"
                style={{ color: "rgba(255, 255, 255, 0.3)" }}
              >
                AVAILABLE
              </span>
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#00ff88" }}
              />
            </div>
          )}
        </div>
        </ScatterBox>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-glow-pulse"
              style={{ backgroundColor: "#00ff88" }}
            />
            <span
              className="font-mono text-sm font-bold tracking-wider"
              style={{ color: "#ffffff" }}
            >
              trymbak
              <span style={{ color: "#00ff88" }}>_</span>
            </span>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
              style={{ backgroundColor: "#00ff88" }}
            />
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
              style={{ backgroundColor: "#00ff88" }}
            />
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
              style={{ backgroundColor: "#00ff88" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 z-[70] transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#0a0a0f",
          borderLeft: "1px solid rgba(0, 255, 136, 0.1)",
        }}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          {/* Terminal header */}
          <div className="mb-8 font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {">"} navigation
            <span className="animate-typing-cursor" style={{ color: "#00ff88" }}>
              _
            </span>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleMobileNavClick(link.id)}
                  className="w-full text-left px-4 py-3 rounded-lg font-mono text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    color:
                      link.id === activeId
                        ? "#00ff88"
                        : "rgba(255, 255, 255, 0.6)",
                    backgroundColor:
                      link.id === activeId
                        ? "rgba(0, 255, 136, 0.08)"
                        : "transparent",
                    borderLeft:
                      link.id === activeId
                        ? "2px solid #00ff88"
                        : "2px solid transparent",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom status */}
          <div
            className="mt-auto font-mono text-[10px] flex items-center gap-2"
            style={{ color: "rgba(255, 255, 255, 0.3)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#00ff88" }}
            />
            system: online
          </div>
        </div>
      </div>
    </>
  );
}
