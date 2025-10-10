// src/app/page.js or src/pages/index.js

"use client"; // Keep this at the top

import { useState, useEffect, useRef } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Project from "@/components/Porjects"; // Ensure this component is dark
import Tech from "@/components/Tech";

export default function Home() {
  const [isProjectSection, setIsProjectSection] = useState(false);
  // 1. Create a ref for the dark section (Project)
  const projectRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (projectRef.current) {
        const top = projectRef.current.offsetTop;
        const height = projectRef.current.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Add offset for Navbar height

        // 2. Check if the current scroll position is within the dark section bounds
        if (scrollPosition >= top && scrollPosition < top + height) {
          setIsProjectSection(true);
        } else {
          setIsProjectSection(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Re-run effect only if projectRef changes (which it won't after initial render)

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      {/* 3. Pass the state to the Navbar */}
      <Navbar isDarkBackground={isProjectSection} />
      <Hero />
      <About />
      <Tech />
      {/* 4. Attach the ref to the dark component */}
      <div ref={projectRef}>
        <Project />
      </div>
      <Contact />
    </div>
  );
}
