"use client";

import React from "react";
import { Wifi, Wind, Archive, BookOpen, Video } from "lucide-react";

const facilities = [
  { icon: <Wifi size={24} />, text: "24×7 High-speed Wi-Fi Access" },
  { icon: <Wind size={24} />, text: "Full AC & High-speed Fans" },
  { icon: <Archive size={24} />, text: "Individual Belongings Storage Boxes" },
  { icon: <BookOpen size={24} />, text: "Vast Book Collection" },
  { icon: <Video size={24} />, text: "24-hour CCTV Camera Protection" },
];

const libraryImages = [
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", // Library shelves
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",   // Modern workspace / AC room
  "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop", // Individual desks
  "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop"  // Quiet reading room
];

export default function BharatLibrary() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16 px-4">
      {/* Centered Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-white text-center tracking-tight mb-8 uppercase font-sans">
        Bharat Library
      </h2>

      {/* Facilities Info Strip */}
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-14 text-sm font-medium text-[var(--color-subtle-grey)] bg-black/40 border border-[var(--color-glass-border)] rounded-full px-8 py-5 w-max mx-auto max-w-full backdrop-blur-md overflow-x-auto whitespace-nowrap scrollbar-hide">
        {facilities.map((fac, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <span className="text-[var(--color-viz-cyan)]">{fac.icon}</span>
              <span className="tracking-wide uppercase text-xs">{fac.text}</span>
            </div>
            {idx < facilities.length - 1 && (
              <span className="text-white/20 px-2">|</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Image Gallery 1x4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-[1400px] mx-auto">
        {libraryImages.map((src, idx) => (
          <div 
            key={idx} 
            className="group relative w-full aspect-[4/5] rounded-[12px] overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`Bharat Library Area ${idx + 1}`} 
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[800ms] ease-in-out grayscale-[30%] group-hover:grayscale-0"
            />
            
            {/* High-fidelity vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
