"use client";

import { useState, useEffect, useRef } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Project from "@/components/Porjects";
import Tech from "@/components/Tech";

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Tech", id: "tech" },
  { label: "Work", id: "projects" },
  { label: "Connect", id: "contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(sectionLinks[0].id);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    tech: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = sectionLinks[0].id;
      const scrollOffset = window.scrollY + 200;

      for (const link of sectionLinks) {
        const ref = sectionRefs[link.id as keyof typeof sectionRefs].current;
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollOffset >= top && scrollOffset < top + height) {
            currentActiveId = link.id;
          }
        }
      }

      setActiveSection(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center" style={{ backgroundColor: "#0a0a0f" }}>
      <Navbar
        navLinks={sectionLinks}
        activeId={activeSection}
        onNavLinkClick={scrollToSection}
      />

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
