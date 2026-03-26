"use client";

import React from "react";
import Link from "next/link";
import { Camera, Video, MessageCircle, Globe } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: ["Mock Tests", "Digital Library", "Video Lectures", "AI Mentor"],
  },
  {
    title: "Classes",
    links: ["9th Standard Foundation", "10th Board Mastery", "11th Science Core", "12th Boards + JEE/NEET"],
  },
  {
    title: "Company",
    links: ["About B.K. Singh", "Our Methodology", "Success Stories", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto pt-20 pb-10 border-t border-[var(--color-glass-border)] mt-10">
      {/* Ambient footer glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-bk-lime)]/30 to-transparent"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
        {/* Brand Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 group w-max">
            <div className="flex flex-col">
              <span className="text-xl font-light tracking-[0.2em] text-white leading-none">
                B.K. SINGH
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-subtle-grey)] group-hover:text-white transition-colors">
                CLASSES
              </span>
            </div>
          </Link>
          <p className="text-[var(--color-subtle-grey)] text-sm leading-relaxed max-w-sm">
            The elite digital ecosystem for academic preparation. Engineered to deliver exceptional results and shape the leaders of tomorrow.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] flex items-center justify-center text-[var(--color-subtle-grey)] hover:bg-[var(--color-bk-lime)] hover:text-black hover:border-[var(--color-bk-lime)] transition-all duration-300">
              <Video size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] flex items-center justify-center text-[var(--color-subtle-grey)] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
              <Camera size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] flex items-center justify-center text-[var(--color-subtle-grey)] hover:bg-[var(--color-viz-cyan)] hover:text-black hover:border-[var(--color-viz-cyan)] transition-all duration-300">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] flex items-center justify-center text-[var(--color-subtle-grey)] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Sitemap Links */}
        {footerLinks.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">{section.title}</h4>
            <ul className="flex flex-col gap-4">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href="#" className="text-[var(--color-subtle-grey)] text-sm hover:text-[var(--color-bk-lime)] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-[var(--color-glass-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--color-subtle-grey)] text-xs font-medium">
          &copy; {new Date().getFullYear()} B.K. Singh Classes. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-[var(--color-subtle-grey)] text-xs hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-[var(--color-subtle-grey)] text-xs hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
