"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Define your navigation links
const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "About me" },
  { href: "#", label: "Services" },
  { href: "#", label: "My work" },
  { href: "#", label: "Testimonials" },
];

// 🎨 Component now accepts a prop to indicate a dark page background
export default function Navbar({ isDarkBackground = false }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 150;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // --- Color-dependent classes ---
  // Text color based on the scrolled state and background prop
  const textColor =
    isDarkBackground && !scrolled ? "text-white" : "text-gray-700";
  const logoColor = isDarkBackground && !scrolled ? "text-white" : "text-black";
  const connectButtonClasses = `
    border px-4 py-2 rounded-full transition-colors duration-300
    ${
      isDarkBackground && !scrolled
        ? "text-white border-white/50 hover:bg-white/10"
        : "text-black border-gray-300 hover:bg-gray-100"
    }`;

  // --- Layout and animation classes ---
  const navBaseClasses = `
    fixed top-0 z-50 transition-all duration-700 ease-in-out
    left-1/2 -translate-x-1/2
  `;

  const navbarClasses = scrolled
    ? `${navBaseClasses} bg-white rounded-3xl shadow-lg w-fit `
    : `${navBaseClasses} mx-auto rounded-b-xl py-4 px-6 ${
        isDarkBackground ? "bg-black/20 " : " bg-white/10"
      } backdrop-blur-md w-[80%]`;

  const ulContainerClasses = `
    border-2 py-4 rounded-3xl px-4 transition-all duration-500 ease-in-out
    ${
      scrolled
        ? "border-gray-200 bg-white/30 backdrop-blur-2xl"
        : isDarkBackground
        ? "bg-black/20"
        : "border-transparent bg-white/10"
    }
  `;

  // --- Layout to handle smooth content transition (Fixes quick shrink) ---
  // The element that contains the Logo, UL, and Button when NOT scrolled.
  const fullLayoutClasses = `
    flex items-center justify-between w-full
    transition-opacity duration-300
    ${
      scrolled
        ? "opacity-0 absolute inset-0 pointer-events-none"
        : "opacity-100"
    }
  `;

  // The element that contains the minimized UL when SCROLLED.
  const minimalLayoutClasses = `
    transition-opacity duration-300
    ${
      scrolled
        ? "opacity-100"
        : "opacity-0 absolute inset-0 pointer-events-none"
    }
  `;

  return (
    <nav className={navbarClasses}>
      {/* ---------------------------------------------------------
        Initial Layout: Shows logo, UL, and button (Fades OUT)
        ---------------------------------------------------------
      */}
      <div className={fullLayoutClasses}>
        {/* Logo */}
        <div className={`text-xl font-semibold ${logoColor}`}>
          Trymbak<span className="text-pink-500">.</span>
        </div>

        {/* UL Container */}
        <div className={ulContainerClasses}>
          <ul className={`hidden md:flex space-x-8 ${textColor}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Button */}
        <button className={connectButtonClasses}>Connect</button>
      </div>

      {/* ---------------------------------------------------------
        Scrolled Layout: Shows only the centered UL container (Fades IN)
        ---------------------------------------------------------
      */}
      <div className={minimalLayoutClasses}>
        <div className={ulContainerClasses}>
          <ul className={`flex space-x-8 ${textColor}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
