// src/app/page.js or src/pages/index.js

"use client"; // Keep this at the top

import { useState, useEffect, useRef } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Project from "@/components/Porjects"; // Ensure this component is dark
import Tech from "@/components/Tech";

// Define your navigation links with corresponding component IDs
const sectionLinks = [
  { label: "Home", id: "hero" },
  { label: "About me", id: "about" },
  { label: "Tech Stack", id: "tech" },
  { label: "My work", id: "projects" },
  { label: "Connect", id: "contact" },
];

export default function Home() {
  const [isProjectSection, setIsProjectSection] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionLinks[0].id); // State for current section

  // Create refs for all sections
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    tech: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = sectionLinks[0].id;
      // Offset to account for the fixed Navbar height and better active state visibility
      const scrollOffset = window.scrollY + 200;

      // 1. Determine the Active Section
      let darkSectionIsVisible = false;

      for (const link of sectionLinks) {
        const ref = sectionRefs[link.id as keyof typeof sectionRefs].current;

        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;

          if (scrollOffset >= top && scrollOffset < top + height) {
            currentActiveId = link.id;

            // Check specifically if the dark section is visible
            if (link.id === "projects") {
              darkSectionIsVisible = true;
            }
          }
        }
      }

      setActiveSection(currentActiveId);
      setIsProjectSection(darkSectionIsVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <Navbar
        isDarkBackground={isProjectSection}
        navLinks={sectionLinks} // Pass the updated links
        activeId={activeSection} // Pass the active section ID
        onNavLinkClick={scrollToSection} // Pass the click handler
      />

      {/* Attach refs and IDs to all section containers */}
      <div id="hero" ref={sectionRefs.hero}>
        <Hero />
      </div>
      <div id="about" ref={sectionRefs.about}>
        <About />
      </div>
      <div id="tech" ref={sectionRefs.tech}>
        <Tech />
      </div>
      <div id="projects" ref={sectionRefs.projects}>
        <Project />
      </div>
      <div id="contact" ref={sectionRefs.contact}>
        <Contact />
      </div>
    </div>
  );
}
