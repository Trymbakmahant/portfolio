"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex mt-[40px] flex-col items-center justify-center text-center min-h-screen  px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/pfp.png" // Replace with your own image in /public
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full shadow-md"
          />
        </div>

        {/* Intro Text */}
        <h2 className="text-lg text-gray-700">
          Hi! I’m <span className="font-semibold">Trymbak Mahant</span> 👋
        </h2>
        <h1 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mt-4 leading-tight">
          Fullstack blockchain developer <br /> based in india.
        </h1>

        <p className="text-gray-600 mt-6 leading-relaxed">
          I am a frontend developer from India with 4 years of experience in
          multiple technologies like Frontend, Backend and Blockchain.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            connect with me <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="/trymbak_resume.pdf"
            download="Trymbak_Mahanat_Resume.pdf"
            className="flex text-black items-center gap-2 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            my resume <Download className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
