"use client";

import { useState, useEffect, useRef } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

        // Calculate the offset from the UL container's padding
        const ulPaddingLeft =
          parseInt(getComputedStyle(ulRef.current).paddingLeft) || 0;
        const ulPaddingTop =
          parseInt(getComputedStyle(ulRef.current).paddingTop) || 0;

        setActivePillStyle({
          left: linkRect.left - ulRect.left - ulPaddingLeft + 25 + "px",
          width: linkRect.width + "px",
          height: linkRect.height + "px",
          top: linkRect.top - ulRect.top - ulPaddingTop + 15 + "px",
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
    isDarkBackground && !scrolled ? "text-white" : "text-gray-800";
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
          ? "backdrop-blur-xl border-gray-600/50"
          : "bg-white/20 backdrop-blur-xl md:bg-white/20 border-white/10"
      } w-[95%] sm:w-[85%]`;

  // Mobile-specific navbar classes with solid background
  const mobileNavbarClasses = `${navBaseClasses} bg-white backdrop-blur-xl shadow-lg border border-gray-200 w-full`;

  // Enhanced UL container with better glassmorphism and mobile responsiveness
  const ulContainerClasses = `
    relative border py-3 px-4 sm:py-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-400 ease-out will-change-transform
    ${
      scrolled
        ? "border-white/30 bg-white/40 backdrop-blur-2xl shadow-inner"
        : isDarkBackground
        ? "backdrop-blur-xl"
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

  const handleMobileNavClick = (id: string) => {
    onNavLinkClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`${navbarClasses} hidden md:block`}
        style={
          isDarkBackground && !scrolled
            ? { backgroundColor: "rgba(34, 34, 34, 0.8)" }
            : {}
        }
      >
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
          <div
            className={ulContainerClasses}
            style={
              isDarkBackground && !scrolled
                ? {
                    backgroundColor: "rgba(123, 123, 123, 0.1)",
                    borderColor: "rgba(123, 123, 123, 0.3)",
                  }
                : {}
            }
          >
            <NavUL ulClassName="" links={navLinks} isMinimal={false} />
          </div>

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
          <div
            className={ulContainerClasses}
            style={
              isDarkBackground && !scrolled
                ? {
                    backgroundColor: "rgba(123, 123, 123, 0.1)",
                    borderColor: "rgba(123, 123, 123, 0.3)",
                  }
                : {}
            }
          >
            <NavUL ulClassName="" links={navLinks} isMinimal={true} />
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Completely separate with solid background */}
      <nav className={`${mobileNavbarClasses} md:hidden`}>
        <div className="flex items-center justify-between w-full px-4 py-3">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900 group cursor-pointer">
            <span className="relative">
              Trymbak
              <span className="text-pink-500">.</span>
            </span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 rounded-lg transition-all duration-300 hover:bg-gray-100/50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="self-end mb-8 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <span className="text-2xl text-gray-600">×</span>
          </button>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleMobileNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    link.id === activeId
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Connect Button */}
          <button
            onClick={() => handleMobileNavClick("contact")}
            className="mt-auto w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Connect
          </button>
        </div>
      </div>
    </>
  );
}
