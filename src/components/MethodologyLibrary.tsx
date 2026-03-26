"use client";

import React from "react";
import { PlayCircle, Eye, Clock, DownloadCloud } from "lucide-react";

const methodologySteps = [
  { id: "01", title: "Conceptual Grasp", desc: "Interactive fundamental lectures bridging standard theories to modern applications.", color: "var(--color-bk-lime)" },
  { id: "02", title: "Doubt Clearance", desc: "AI-assisted query resolution targeting individual weaknesses instantaneously.", color: "var(--color-viz-cyan)" },
  { id: "03", title: "Rigorous Practice", desc: "Algorithmic generation of practice sets mimicking board and competitive strictness.", color: "var(--color-viz-purple)" },
  { id: "04", title: "Mock Analysis", desc: "Deep structural breakdowns of testing errors to construct unshakeable confidence.", color: "var(--color-subtle-grey)" },
  { id: "05", title: "Final Polish", desc: "Rank-boosting intensive revision camps leading to the exams.", color: "white" },
];

const libraryItems = [
  { 
    title: "Advanced Mathematics Vol 1", 
    type: "Digital Book", 
    reads: "1.2K", time: "2h 40m", 
    bg: "from-[#1a1025] to-[var(--color-viz-purple)]/20",
    border: "border-[var(--color-viz-purple)]/30"
  },
  { 
    title: "Physics: Thermodynamics", 
    type: "Video Series", 
    reads: "4.5K", time: "5h 15m", 
    bg: "from-[#0a192f] to-[var(--color-viz-cyan)]/20",
    border: "border-[var(--color-viz-cyan)]/30"
  },
  { 
    title: "Chemistry: Organic Rev", 
    type: "Quick Notes", 
    reads: "890", time: "45m", 
    bg: "from-[#1f2915] to-[var(--color-bk-lime)]/20",
    border: "border-[var(--color-bk-lime)]/30"
  },
];

export default function MethodologyLibrary() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Methodology Vertical List */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Our Methodology</h2>
          <div className="flex flex-col">
            {methodologySteps.map((step, index) => (
              <div 
                key={step.id} 
                className="group relative flex gap-6 py-6 border-b border-[var(--color-glass-border)] last:border-0 hover:bg-[var(--color-glass-lighter)] transition-colors duration-300 rounded-lg px-4 -mx-4 cursor-default"
              >
                {/* Step Number */}
                <span 
                  className="text-4xl font-black font-mono tracking-tighter transition-colors duration-500"
                  style={{ color: "var(--color-glass-border-highlight)", WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                >
                  {step.id}
                </span>

                <div className="flex-grow pt-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                      style={index === 0 ? { backgroundImage: `linear-gradient(to right, ${step.color}, white)` } :
                             index === 1 ? { backgroundImage: `linear-gradient(to right, ${step.color}, white)` } :
                             index === 2 ? { backgroundImage: `linear-gradient(to right, ${step.color}, white)` } :
                             index === 3 ? { backgroundImage: `linear-gradient(to right, ${step.color}, white)` } :
                             { backgroundImage: `linear-gradient(to right, ${step.color}, white)` }}>
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-subtle-grey)] text-sm leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Library Thumbnails */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Digital Library</h2>
            <button className="text-xs font-semibold uppercase tracking-wider text-[var(--color-bk-lime)] hover:text-white transition-colors">
              View All Content
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {libraryItems.map((item, index) => (
              <div 
                key={index} 
                className={`glass-card p-4 rounded-2xl flex gap-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative group`}
              >
                {/* Thumbnail graphic section */}
                <div className={`w-32 h-28 rounded-xl bg-gradient-to-br ${item.bg} border ${item.border} flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
                  <PlayCircle size={32} className="text-white/60 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                </div>

                {/* Info section */}
                <div className="flex flex-col justify-center flex-grow py-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-subtle-grey)] mb-1">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-[var(--color-bk-lime)] transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-subtle-grey)]">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {item.reads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {item.time}
                    </span>
                  </div>
                </div>

                {/* Right action */}
                <div className="flex items-center pr-2">
                  <button className="w-10 h-10 rounded-full border border-[var(--color-glass-border)] flex items-center justify-center text-[var(--color-subtle-grey)] group-hover:border-white group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <DownloadCloud size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
