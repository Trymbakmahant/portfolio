"use client";

import Image from "next/image";
import { GraduationCap, Folder } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      // Enhanced Background and Padding
      className="flex flex-col items-center justify-center py-24 md:py-32 px-4 sm:px-6 bg-gray-50 text-gray-900"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative p-2 rounded-3xl bg-pink-500/10 dark:bg-pink-500/10">
            <Image
              src="/fullimage.png" // Replace with your actual image in /public
              alt="Profile photo"
              width={400} // Slightly larger image
              height={500}
              // Improved shadow and rounded corners
              className="rounded-[20px] shadow-2xl shadow-pink-500/30 object-cover transform hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="md:pl-8">
          {/* Section Heading Group */}
          <h3 className="text-center md:text-left text-pink-500 font-bold uppercase tracking-widest text-sm mb-2">
            Get to Know Me
          </h3>
          <h2 className="text-5xl font-extrabold text-center md:text-left mb-8 leading-tight">
            I build decentralized,{" "}
            <span className="text-pink-600">future-proof</span> applications.
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-12 text-center md:text-left max-w-lg">
            I&apos;m an experienced **Blockchain Fullstack Developer** with over
            **4 years of professional expertise**. I specialize in creating
            robust, end-to-end solutions, leveraging modern languages like
            **Rust and TypeScript** to drive organizational success and growth
            in the decentralized space.
          </p>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
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
        </div>
      </div>
    </section>
  );
}

// Separate Card Component for reusability and clean structure
interface InfoCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const InfoCard = ({ Icon, title, description }: InfoCardProps) => (
  <div className="border border-gray-200 rounded-2xl p-6 text-center shadow-md bg-white hover:bg-pink-50 transition duration-300 transform hover:-translate-y-1">
    <Icon className="w-7 h-7 mx-auto mb-3 text-pink-600" />
    <h4 className="font-bold text-lg mb-1">{title}</h4>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);
