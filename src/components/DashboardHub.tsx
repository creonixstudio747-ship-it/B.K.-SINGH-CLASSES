"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronRight, Activity, BookCheck } from "lucide-react";

const classesData = [
  { id: "9th", title: "Class 9th", board: "CBSE / State", completion: 45, color: "var(--color-viz-cyan)" },
  { id: "10th", title: "Class 10th", board: "Board Exam Focus", completion: 82, color: "var(--color-bk-lime)" },
  { id: "11th", title: "Class 11th", board: "Science Stream", completion: 30, color: "var(--color-viz-purple)" },
  { id: "12th", title: "Class 12th", board: "Board + JEE/NEET", completion: 65, color: "var(--color-subtle-grey)" },
];

const mockTestData = {
  "9th": [
    { chapter: "Chapter 1", subject: "Mathematics", title: "Number Systems", score: 85 },
    { chapter: "Chapter 2", subject: "Science", title: "Matter & Surroundings", score: 92 },
    { chapter: "Chapter 3", subject: "Mathematics", title: "Polynomial Basics", score: 78 }
  ],
  "10th": [
    { chapter: "Chapter 1", subject: "Mathematics", title: "Trigonometry Subtest 1", score: 85 },
    { chapter: "Chapter 2", subject: "Science", title: "Light & Reflection", score: 92 },
    { chapter: "Chapter 3", subject: "Mathematics", title: "Quadratic Equations", score: 78 }
  ],
  "11th": [
    { chapter: "Chapter 1", subject: "Physics", title: "Kinematics & Vectors", score: 85 },
    { chapter: "Chapter 2", subject: "Chemistry", title: "Atomic Structure", score: 92 },
    { chapter: "Chapter 3", subject: "Mathematics", title: "Calculus Limits", score: 78 }
  ],
  "12th": [
    { chapter: "Chapter 1", subject: "Physics", title: "Electrostatics Focus", score: 85 },
    { chapter: "Chapter 2", subject: "Chemistry", title: "Organic Reactions", score: 92 },
    { chapter: "Chapter 3", subject: "Mathematics", title: "Advanced Integration", score: 78 }
  ]
};

export default function DashboardHub() {
  const [activeTab, setActiveTab] = useState("10th");

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const tierMatch = customEvent.detail.match(/(\d+th)/);
      if (tierMatch) {
        setActiveTab(tierMatch[1]);
      }
    };
    window.addEventListener('syncDashboardClass', handleSync);
    return () => window.removeEventListener('syncDashboardClass', handleSync);
  }, []);

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar: Class Selection */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Layers className="text-[var(--color-bk-lime)]" />
              Learning Hub
            </h2>
            <p className="text-[var(--color-subtle-grey)] mt-2 text-sm leading-relaxed">
              Select your academic stage to access hierarchical mock tests, assignments, and structural performance history.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {classesData.map((cls) => {
              const isActive = activeTab === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setActiveTab(cls.id)}
                  className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 overflow-hidden flex items-center justify-between border ${
                    isActive 
                      ? "bg-[initial] border-[initial]" 
                      : "bg-[initial] border-[var(--color-glass-border)] hover:bg-[var(--color-glass-lighter)]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--color-glass-lighter)" : "rgba(255, 255, 255, 0.02)",
                    borderColor: isActive ? "var(--color-bk-lime)" : "var(--color-glass-border)",
                    boxShadow: isActive ? `0 0 20px -5px var(--color-bk-lime)` : "none",
                  }}
                >
                  {/* Subtle active state gradient background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 opacity-10"
                      style={{ background: `linear-gradient(90deg, var(--color-bk-lime), transparent)` }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    {/* Refined Circular Progress Loader */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-black/30"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray={`${cls.completion}, 100`}
                          strokeLinecap="round"
                          className="drop-shadow-lg transition-all duration-1000 ease-out"
                          strokeWidth="2.5"
                          stroke={cls.color}
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-[9px] font-bold text-white">{cls.completion}%</span>
                    </div>

                    <div>
                      <h3 className={`text-lg transition-colors duration-300 font-bold ${isActive ? "text-white" : "text-[var(--color-subtle-grey)] group-hover:text-white"}`}>
                        {cls.title}
                      </h3>
                      <p className="text-xs text-[var(--color-subtle-grey)]">{cls.board}</p>
                    </div>
                  </div>
                  
                  <ChevronRight size={18} className={`relative z-10 transition-transform duration-300 ${isActive ? "text-[var(--color-bk-lime)] translate-x-1" : "text-[var(--color-subtle-grey)] group-hover:text-white"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area: Mock Test Dashboard */}
        <div className="w-full lg:w-2/3 glass-card rounded-3xl p-6 lg:p-10 min-h-[500px] flex flex-col relative overflow-hidden ring-1 ring-white/5">
          {/* Internal ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] pb-6 mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Activity className="text-[var(--color-viz-cyan)]" />
              Mock Test & Analysis
            </h3>
            <button className="text-xs font-semibold uppercase tracking-wider text-[var(--color-bk-lime)] hover:text-white hover:bg-[var(--color-bk-lime)]/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-[var(--color-bk-lime)]/30">
              View Analytics
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex flex-col gap-4"
            >
              {(mockTestData[activeTab as keyof typeof mockTestData] || []).map((test, idx) => (
                <div key={idx} className="group relative w-full bg-black/20 hover:bg-black/40 border border-[var(--color-glass-border)] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--color-glass-lighter)] rounded-lg flex items-center justify-center border border-[var(--color-glass-border-highlight)] group-hover:bg-[var(--color-bk-lime)]/10 group-hover:border-[var(--color-bk-lime)]/30 transition-colors">
                      <BookCheck className="text-[var(--color-subtle-grey)] group-hover:text-[var(--color-bk-lime)] transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-[var(--color-viz-purple)] tracking-wider">{test.chapter}</span>
                        <span className="w-1 h-1 bg-[var(--color-subtle-grey)] rounded-full"></span>
                        <span className="text-[10px] uppercase font-bold text-[var(--color-subtle-grey)] tracking-wider">{test.subject}</span>
                      </div>
                      <h4 className="text-white font-semibold text-lg group-hover:text-[var(--color-bk-lime)] transition-colors">{test.title}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="text-right">
                      <div className="text-xs text-[var(--color-subtle-grey)]">Score</div>
                      <div className="text-lg font-bold text-white group-hover:text-[var(--color-viz-cyan)] transition-colors">
                      {test.score}<span className="text-[10px] text-[var(--color-subtle-grey)] font-normal">/100</span>
                    </div>
                    </div>
                    <button className="h-10 px-6 bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] text-sm font-medium text-white rounded-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                      View details
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="mt-auto pt-6 text-center">
                <button className="text-[var(--color-subtle-grey)] hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto">
                  Load previous tests <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
