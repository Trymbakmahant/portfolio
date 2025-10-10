"use client";

import { useState, useEffect, useRef } from "react";
// Removed Link import as we will use a button for the click handler

// Default links are only for safety, links are passed via props now
const defaultNavLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About me" },
  { id: "tech", label: "Tech Stack" },
  { id: "projects", label: "My work" },
  { id: "contact", label: "Connect" },
];

// 🎨 Component now accepts props for dynamic navigation
interface NavbarProps {
  isDarkBackground?: boolean;
  navLinks?: Array<{ id: string; label: string }>;
  activeId?: string;
  onNavLinkClick?: (id: string) => void;
}

export default function Navbar({
  isDarkBackground = false,
  navLinks = defaultNavLinks,
  activeId = "hero", // The ID of the currently active section
  onNavLinkClick = () => {}, // Function to handle smooth scrolling
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  // Ref to hold the list container for calculating the active pill position
  const ulRef = useRef<HTMLDivElement>(null);
  // State for the pill/badge position and size
  const [activePillStyle, setActivePillStyle] = useState({});

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 100;

          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to calculate and position the active indicator pill
  useEffect(() => {
    if (ulRef.current) {
      const activeLinkElement = ulRef.current.querySelector(
        `[data-id="${activeId}"]`
      );

      if (activeLinkElement) {
        // Get the position of the active link relative to the UL container
        const ulRect = ulRef.current.getBoundingClientRect();
        const linkRect = activeLinkElement.getBoundingClientRect();

        setActivePillStyle({
          left: linkRect.left - ulRect.left + "px",
          width: linkRect.width + "px",
          height: linkRect.height + "px",
          // Center the pill vertically
          top: linkRect.top - ulRect.top + "px",
          opacity: 1,
        });
      } else {
        // Hide the pill if no active element is found (e.g., during initialization)
        setActivePillStyle({ opacity: 0 });
      }
    }
  }, [activeId, scrolled]); // Recalculate if activeId or scrolled state changes

  // --- Enhanced Color-dependent classes ---
  const textColor =
    isDarkBackground && !scrolled ? "text-white/90" : "text-gray-800";
  const logoColor =
    isDarkBackground && !scrolled ? "text-white" : "text-gray-900";

  // Enhanced active link text color logic
  const activeTextColor = scrolled
    ? "text-gray-900 font-semibold"
    : isDarkBackground
    ? "text-gray-900 font-semibold"
    : "text-gray-900 font-semibold";

  // Enhanced active pill background with gradient
  const activePillBg = scrolled
    ? "bg-gradient-to-r from-white/80 to-white/60 shadow-lg border border-white/20"
    : isDarkBackground
    ? "bg-gradient-to-r from-white/95 to-white/85 shadow-xl border border-white/30"
    : "bg-gradient-to-r from-white/70 to-white/50 shadow-md border border-white/20";

  const connectButtonClasses = `
    border px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 font-medium
    backdrop-blur-sm relative overflow-hidden group text-sm sm:text-base
    ${
      isDarkBackground && !scrolled
        ? "text-white border-white/40 hover:border-white/60 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20"
        : "text-gray-800 border-gray-300/60 hover:border-gray-400 hover:bg-white/80 hover:shadow-lg hover:shadow-gray-200/50"
    }`;

  // --- Enhanced Layout and animation classes ---
  const navBaseClasses = `
    fixed top-0 z-50 transition-all duration-500 ease-out will-change-transform
    left-1/2 -translate-x-1/2
  `;

  // Dynamic styling based on scroll progress for smoother transitions
  const navbarClasses = scrolled
    ? `${navBaseClasses} bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-fit max-w-[90vw]`
    : `${navBaseClasses} mx-auto rounded-b-2xl py-4 px-4 sm:py-5 sm:px-8 ${
        isDarkBackground
          ? "bg-black/30 backdrop-blur-xl"
          : "bg-white/20 backdrop-blur-xl"
      } border border-white/10 w-[95%] sm:w-[85%]`;

  // Enhanced UL container with better glassmorphism and mobile responsiveness
  const ulContainerClasses = `
    relative border py-3 px-4 sm:py-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-400 ease-out will-change-transform
    ${
      scrolled
        ? "border-white/30 bg-white/40 backdrop-blur-2xl shadow-inner"
        : isDarkBackground
        ? "bg-black/20 border-white/10 backdrop-blur-xl"
        : "border-white/20 bg-white/20 backdrop-blur-xl"
    }
  `;

  // The element that contains the Logo, UL, and Button when NOT scrolled.
  const fullLayoutClasses = `
    flex items-center justify-between w-full
    transition-all duration-400 ease-out will-change-opacity
    ${
      scrolled
        ? "opacity-0 absolute inset-0 pointer-events-none scale-95"
        : "opacity-100 scale-100"
    }
  `;

  // The element that contains the minimized UL when SCROLLED.
  const minimalLayoutClasses = `
    transition-all duration-400 ease-out will-change-opacity
    ${
      scrolled
        ? "opacity-100 scale-100"
        : "opacity-0 absolute inset-0 pointer-events-none scale-95"
    }
  `;

  // Reusable Nav UL content
  interface NavULProps {
    ulClassName: string;
    links: Array<{ id: string; label: string }>;
    isMinimal: boolean;
  }

  const NavUL = ({ ulClassName, links }: NavULProps) => (
    <div className={ulClassName} ref={ulRef}>
      {/* Enhanced Active Pill Indicator */}
      <div
        className={`absolute rounded-full transition-all duration-300 ease-out will-change-transform ${activePillBg}`}
        style={activePillStyle}
      />

      <ul className={`flex space-x-2 sm:space-x-6 relative z-10 ${textColor}`}>
        {links.map((link: { id: string; label: string }) => (
          <li key={link.id}>
            <button
              onClick={() => onNavLinkClick(link.id)}
              className={`
                transition-all duration-300 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full relative
                group overflow-hidden text-sm sm:text-base
                ${
                  link.id === activeId
                    ? activeTextColor
                    : "hover:opacity-80 hover:scale-105 hover:bg-white/10"
                }
              `}
              data-id={link.id} // Custom attribute for position calculation
            >
              {/* Hover effect background */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
              />

              {/* Text content */}
              <span className="relative z-10 font-medium">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <nav className={navbarClasses}>
      {/* Scroll Progress Indicator */}

      {/* ---------------------------------------------------------
        Initial Layout: Shows logo, UL, and button (Fades OUT)
        ---------------------------------------------------------
      */}
      <div className={fullLayoutClasses}>
        {/* Enhanced Logo */}
        <div
          className={`text-xl sm:text-2xl font-bold ${logoColor} group cursor-pointer transition-all duration-300 hover:scale-105`}
        >
          <span className="relative">
            Trymbak
            <span className="text-pink-500 transition-all duration-300 group-hover:text-pink-400">
              .
            </span>
            {/* Subtle glow effect */}
            <span className="absolute inset-0 text-pink-500/20 blur-sm group-hover:blur-none transition-all duration-300">
              Trymbak.
            </span>
          </span>
        </div>

        {/* UL Container */}
        <NavUL
          ulClassName={ulContainerClasses}
          links={navLinks}
          isMinimal={false}
        />

        {/* Enhanced Connect Button */}
        <button
          className={connectButtonClasses}
          onClick={() => onNavLinkClick("contact")} // Connect button links to contact
        >
          <span className="relative z-10">Connect</span>
          {/* Shimmer effect */}
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
          />
        </button>
      </div>

      {/* ---------------------------------------------------------
        Scrolled Layout: Shows only the centered UL container (Fades IN)
        ---------------------------------------------------------
      */}
      <div className={minimalLayoutClasses}>
        <NavUL
          ulClassName={ulContainerClasses}
          links={navLinks}
          isMinimal={true}
        />
      </div>
    </nav>
  );
}
