"use client";
import { useEffect, useRef } from "react";
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

    // Create horizontal scroll animation
    const scrollTween = gsap.to(slider, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false, // Set to true for debugging
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Frontend Project",
      subtitle: "web design",
      tag: "Web Development",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Geo Based App",
      subtitle: "mobile app",
      tag: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Photography Site",
      subtitle: "web design",
      tag: "Creative Design",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "UI/UX Designing",
      subtitle: "ui/ux design",
      tag: "Product Design",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "E-Commerce Platform",
      subtitle: "full stack",
      tag: "Web Application",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Dashboard Analytics",
      subtitle: "data visualization",
      tag: "UI Design",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Intro Section */}
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-6">
          My portfolio
        </p>
        <h1 className="text-6xl md:text-8xl font-light mb-8 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
          My latest work
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to my web development portfolio! Explore a collection of
          projects showcasing my expertise in front-end development.
        </p>
        <div className="mt-12 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-500"
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

      {/* Horizontal Scroll Section - This gets pinned */}
      <div ref={triggerRef} className="overflow-hidden">
        <div
          ref={sectionRef}
          className="flex gap-8 h-screen items-center will-change-transform"
          style={{
            width: "max-content",
            paddingLeft: "10vw",
            paddingRight: "10vw",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card min-w-[450px] h-[600px] relative rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 mix-blend-multiply`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs tracking-wider uppercase mb-6 border border-white/20">
                  {project.tag}
                </span>

                <h3 className="text-4xl font-semibold mb-3">{project.title}</h3>

                <p className="text-gray-300 text-base mb-8">
                  {project.subtitle}
                </p>

                {/* Arrow Button */}
                <div className="w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
                  <svg
                    className="w-6 h-6 stroke-black"
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
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
