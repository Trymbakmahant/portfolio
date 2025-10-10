"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-gray-600 text-sm mb-2">Connect with me</p>
            <h1 className="text-5xl text-black font-serif mb-6">
              Get in touch
            </h1>
            <p className="text-gray-600">
              I&apos;d love to hear from you! If you have any questions,
              comments or
              <br />
              feedback, please use the form below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="px-6 py-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="px-6 py-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-6 py-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-none"
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition flex items-center gap-2"
              >
                Submit now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Name and Email */}
          <div className="text-center mb-8">
            <h2 className="text-3xl text-black font-serif mb-4">
              Trymbak<span className="text-red-500">.</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>trymbak0102mahant@gmail.com</span>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>© 2025 Trymbak Mahant. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900 transition">
                Terms of Services
              </a>
              <a href="#" className="hover:text-gray-900 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition">
                Connect with me
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
