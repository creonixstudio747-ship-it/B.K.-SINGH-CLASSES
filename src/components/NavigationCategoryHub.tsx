"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Globe, Timer, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import VideoGalleryModal from "./VideoGalleryModal";

const categories = [
  {
    title: "ALL COURSES",
    subtitle: "Explore Full Curriculum",
    icon: <Library className="w-8 h-8" />,
    color: "var(--color-viz-purple)", // Assuming this is defined, fallback #9d4edd
    colorHex: "#9d4edd",
    href: "/courses",
  },
  {
    title: "ENGLISH COURSE",
    subtitle: "Master Spoken & Grammar",
    icon: <Globe className="w-8 h-8" />,
    color: "var(--color-viz-cyan)", // fallback #00b4d8
    colorHex: "#00b4d8",
    href: "/english",
  },
  {
    title: "MOCK TEST",
    badge: "LIVE",
    pulseBadge: true,
    icon: <Timer className="w-8 h-8" />,
    color: "var(--color-bk-lime)", // fallback #a3ff00
    colorHex: "#a3ff00",
    href: "/mock-test",
  },
  {
    title: "LEADERBOARD",
    badge: "TOP 100 RANKERS",
    icon: <Trophy className="w-8 h-8" />,
    color: "var(--color-subtle-grey)", // fallback #888888, let's use cyan/grey 
    colorHex: "#888888",
    href: "/leaderboard",
  },
  {
    title: "EXPLORE BOOKS",
    subtitle: "Library & Notes",
    icon: <BookOpen className="w-8 h-8" />,
    color: "#F59E0B", 
    colorHex: "#F59E0B",
    href: "/books",
  },
];

export default function NavigationCategoryHub() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isEnglishModalOpen, setIsEnglishModalOpen] = useState(false);

  return (
    <section className="relative z-50 w-full max-w-7xl mx-auto py-12 px-4 md:px-0">
      <div className="relative">
        {/* Ambient Blur Intensity behind the specific card */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 pointer-events-none rounded-[24px]"
              style={{
                background: `radial-gradient(circle at ${
                  (hoveredIndex % 5) * 20 + 10
                }% 50%, ${categories[hoveredIndex].colorHex}20 0%, transparent 50%)`,
                filter: "blur(20px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Parent Container (The Unified Rectangle) */}
        <div 
          className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5 md:p-10 rounded-[24px]"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(40px) saturate(150%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {categories.map((cat, idx) => {
            const isHovered = hoveredIndex === idx;

            const CardContent = (
              <motion.div
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative group flex flex-col items-center justify-center p-6 h-full min-h-[160px] md:min-h-[200px] border border-white/5 bg-white/5 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: isHovered 
                    ? `0 0 20px -5px ${cat.colorHex}60, inset 0 0 10px -5px ${cat.colorHex}40` 
                    : "none",
                  borderColor: isHovered ? `${cat.colorHex}50` : "rgba(255,255,255,0.05)",
                }}
              >
                {/* Badges */}
                {cat.badge && (
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {cat.pulseBadge && (
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-bk-lime)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-bk-lime)]"></span>
                      </div>
                    )}
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${cat.colorHex}20`,
                        color: cat.colorHex,
                        borderColor: `${cat.colorHex}40`,
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>
                )}

                <div 
                  className="mb-4 transition-transform duration-300 transform group-hover:-translate-y-1"
                  style={{ color: isHovered ? cat.colorHex : "#fff" }}
                >
                  {cat.icon}
                </div>
                
                <h3 className="text-sm md:text-base font-bold text-white text-center tracking-wider mb-1">
                  {cat.title}
                </h3>
                
                {cat.subtitle && (
                  <p className="text-xs text-[var(--color-subtle-grey)] text-center">
                    {cat.subtitle}
                  </p>
                )}
              </motion.div>
            );

            return (
              <React.Fragment key={idx}>
                {cat.title === "ENGLISH COURSE" ? (
                  <div className="block w-full" onClick={() => setIsEnglishModalOpen(true)}>
                    {CardContent}
                  </div>
                ) : (
                  <Link href={cat.href} className="block w-full">
                    {CardContent}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      <VideoGalleryModal 
        isOpen={isEnglishModalOpen} 
        onClose={() => setIsEnglishModalOpen(false)} 
      />
    </section>
  );
}
