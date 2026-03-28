"use client";

import React from "react";
import { Brain, Sparkles, Target, LineChart } from "lucide-react";

const methodologyCards = [
  { 
    id: 1, 
    title: "Conceptual Depth", 
    desc: "Fundamental interactive lectures bridging standard theories to modern applications.", 
    icon: <Brain size={36} />, 
    color: "var(--color-bk-lime)",
    bgColor: "rgba(163, 255, 0, 0.1)"
  },
  { 
    id: 2, 
    title: "Doubt Clearance", 
    desc: "Instant AI and mentor-led resolution targeting individual weaknesses instantaneously.", 
    icon: <Sparkles size={36} />, 
    color: "var(--color-viz-cyan)",
    bgColor: "rgba(0, 180, 216, 0.1)"
  },
  { 
    id: 3, 
    title: "Rigorous Practice", 
    desc: "Competitive exam-level practice sets mimicking rigorous board and test strictness.", 
    icon: <Target size={36} />, 
    color: "var(--color-viz-purple)",
    bgColor: "rgba(157, 78, 221, 0.1)"
  },
  { 
    id: 4, 
    title: "Performance Analysis", 
    desc: "Deep structural breakdown of academic growth and tracking of testing improvement.", 
    icon: <LineChart size={36} />, 
    color: "#ffffff",
    bgColor: "rgba(255, 255, 255, 0.1)"
  },
];

export default function OurMethodology() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16 px-4">
      {/* Centered Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-white text-center tracking-tight mb-16 uppercase font-sans">
        Our Methodology
      </h2>

      {/* 4 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methodologyCards.map((card) => (
          <div 
            key={card.id}
            className="group glass-card rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-black/40 border border-[var(--color-glass-border)] hover:border-white/20 relative overflow-hidden"
          >
            {/* Neon Accent Glow */}
            <div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
              style={{ background: card.color }}
            ></div>

            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300 transform group-hover:scale-110"
              style={{ 
                color: card.color, 
                backgroundColor: card.bgColor,
                borderColor: `color-mix(in srgb, ${card.color} 30%, transparent)`
              }}
            >
              {card.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{card.title}</h3>
            <p className="text-sm text-[var(--color-subtle-grey)] leading-relaxed group-hover:text-white/80 transition-colors">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
