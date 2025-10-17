"use client";

import Image from "next/image";
import { GraduationCap, Folder } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current && sectionRef.current) {
      const words = headingRef.current.textContent?.split(" ") || [];
      headingRef.current.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");

      const wordElements = headingRef.current.querySelectorAll(".word");

      gsap.set(wordElements, { y: 50, opacity: 0 });

      gsap.to(wordElements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate description text
    if (descriptionRef.current && sectionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate info cards
    if (infoCardsRef.current && sectionRef.current) {
      const cards = infoCardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex flex-col items-center w-screen justify-center py-24 md:py-32 px-4 sm:px-6"
      style={{ backgroundColor: "#F8F8F8", color: "#222222" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative p-2 rounded-3xl"
            style={{ backgroundColor: "rgba(123, 123, 123, 0.1)" }}
          >
            <Image
              src="/fullimage.png"
              alt="Trymbak Mahanat working on blockchain development projects"
              width={400}
              height={500}
              className="rounded-[20px] shadow-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500 ease-out"
              style={{ boxShadow: "0 25px 50px rgba(123, 123, 123, 0.3)" }}
              sizes="(max-width: 768px) 400px, 400px"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <article className="md:pl-8">
          {/* Section Heading Group */}
          <header>
            <h3
              className="text-center md:text-left font-bold uppercase tracking-widest text-sm mb-2"
              style={{ color: "#7B7B7B" }}
            >
              Get to Know Me
            </h3>
            <h2
              ref={headingRef}
              id="about-heading"
              className="text-5xl font-extrabold text-center md:text-left mb-8 leading-tight"
              style={{ color: "#222222" }}
            >
              I build decentralized,{" "}
              <span style={{ color: "#7B7B7B" }}>future-proof</span>{" "}
              applications.
            </h2>
          </header>

          <p
            ref={descriptionRef}
            className="text-lg leading-relaxed mb-12 text-center md:text-left max-w-lg"
            style={{ color: "#7B7B7B" }}
          >
            I&apos;m an experienced{" "}
            <strong>Blockchain Fullstack Developer</strong> with over
            <strong> 4+ years of professional expertise</strong>. I specialize
            in creating robust, end-to-end solutions, leveraging modern
            languages like
            <strong> Rust and TypeScript</strong> to drive organizational
            success and growth in the decentralized space.
          </p>

          {/* Info Cards */}
          <div
            ref={infoCardsRef}
            className="grid sm:grid-cols-3 gap-6 mb-12"
            role="list"
            aria-label="Professional highlights"
          >
            <InfoCard
              Icon={GraduationCap}
              title="Key Languages"
              description="TypeScript, Rust, C++, Python"
            />
            <InfoCard
              Icon={GraduationCap}
              title="Education"
              description="B.Tech in Computer Science"
            />
            <InfoCard
              Icon={Folder}
              title="Projects"
              description="Successfully delivered 5+ complex projects"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

// Separate Card Component for reusability and clean structure
interface InfoCardProps {
  Icon: React.ComponentType<{
    className?: string;
    color?: string;
    "aria-hidden"?: boolean;
  }>;
  title: string;
  description: string;
}

const InfoCard = ({ Icon, title, description }: InfoCardProps) => (
  <div
    className="border rounded-2xl p-6 text-center shadow-md transition duration-300 transform hover:-translate-y-1"
    style={{
      borderColor: "#7B7B7B",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 4px 6px rgba(123, 123, 123, 0.1)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#F8F8F8";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#FFFFFF";
    }}
    role="listitem"
  >
    <Icon className="w-7 h-7 mx-auto mb-3" color="#7B7B7B" aria-hidden={true} />
    <h4 className="font-bold text-lg mb-1" style={{ color: "#222222" }}>
      {title}
    </h4>
    <p className="text-sm" style={{ color: "#7B7B7B" }}>
      {description}
    </p>
  </div>
);
