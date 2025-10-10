"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = triggerRef.current;
    const slider = sectionRef.current;

    if (!pin || !slider) return;

    // Calculate total scroll distance
    const totalScrollWidth = slider.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation with smoother easing
    const scrollTween = gsap.to(slider, {
      x: -totalScrollWidth,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 0.5, // Reduced for smoother animation
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        onUpdate: (self) => {
          // Add parallax effect to individual cards
          const cards = slider.querySelectorAll(".project-card");
          cards.forEach((card, index) => {
            const progress = self.progress;
            const cardOffset = index * 608; // 600px width + 8px gap
            const cardProgress = Math.max(
              0,
              Math.min(1, (progress * totalScrollWidth - cardOffset) / 608)
            );

            gsap.to(card, {
              y: Math.sin(cardProgress * Math.PI) * -20,
              scale: 0.95 + Math.sin(cardProgress * Math.PI) * 0.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        },
      },
    });

    // Cards are now visible by default without fade-in animation

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Eclipse Domains",
      subtitle: "web3 domain name services",
      tag: "Consumer",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      color: "from-purple-500 to-indigo-600",
      url: "https://eclipsedomains.xyz/",
    },
    {
      title: "Stackem",
      subtitle: "80+ ETH volume",
      tag: "Games",
      image: "/stackem.jpeg",
      color: "from-green-500 to-emerald-600",
      url: "https://x.com/stackem_xyz",
    },
    {
      title: "TurboWhack",
      subtitle: "3M+ onchain txns",
      tag: "Games",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      color: "from-blue-500 to-cyan-600",
      url: "https://x.com/TurboWhack",
    },
    {
      title: "LeafSpark",
      subtitle: "campus critical power solutions",
      tag: "Enterprise",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      color: "from-lime-500 to-green-600",
      url: "https://www.leafspark.in/",
    },
  ];

  return (
    <div className="bg-black w-screen text-white">
      {/* Intro Section */}
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-6 opacity-0 animate-fade-in-up">
          My portfolio
        </p>
        <h1 className="text-6xl md:text-8xl font-light mb-8 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent opacity-0 animate-fade-in-up animation-delay-200">
          My latest work
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-400">
          A curated showcase of innovative projects spanning web3,
          infrastructure, gaming, and enterprise solutions that I&apos;ve built
          and launched.
        </p>
        <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-600">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-gray-500 transition-colors duration-300 hover:text-lime-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Section - This gets pinned */}
      <div ref={triggerRef} className="overflow-hidden">
        <div
          ref={sectionRef}
          className="flex gap-8 h-screen items-center will-change-transform"
          style={{
            width: "max-content",
            paddingLeft: "0",
            paddingRight: "10vw",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card min-w-[600px] h-[600px] relative rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0"
              onClick={() => project.url && window.open(project.url, "_blank")}
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-700 group-hover:opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10 transform transition-transform duration-700 group-hover:-translate-y-2">
                <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs tracking-wider uppercase mb-6 border border-white/20 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/40">
                  {project.tag}
                </span>

                <h3 className="text-4xl font-semibold mb-3 transition-all duration-500 group-hover:text-white">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-base mb-8 transition-all duration-500 group-hover:text-gray-100">
                  {project.subtitle}
                </p>

                {/* Arrow Button */}
                <div className="w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-lime-300 group-hover:shadow-lg group-hover:shadow-lime-400/25">
                  <svg
                    className="w-6 h-6 stroke-black transition-transform duration-500 group-hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-white/10" />

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
