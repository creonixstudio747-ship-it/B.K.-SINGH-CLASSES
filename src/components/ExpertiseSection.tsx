"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpenCheck, Compass, Microscope, X, CheckCircle2 } from "lucide-react";

const expertiseData = [
  {
    tier: "9th Standard",
    title: "Foundation Building",
    description: "Establishing crystal clear concepts in Mathematics and Science for future competitive exams.",
    icon: <Microscope size={28} className="text-[var(--color-viz-cyan)]" />,
    enrolled: 82,
    modalPoints: [
      "Crystal clear concepts",
      "Mental Ability",
      "JEE/NEET Foundation",
      "Digital tracking"
    ]
  },
  {
    tier: "10th Standard",
    title: "Board Mastery",
    description: "Rigorous practice, PYQs, and tailored test series to maximize board permutations.",
    icon: <BookOpenCheck size={28} className="text-[var(--color-bk-lime)]" />,
    enrolled: 94,
    modalPoints: [
      "10-Year PYQ analysis",
      "BSEB/CBSE workshops",
      "95%+ Percentile strategies",
      "Mock Tests"
    ]
  },
  {
    tier: "11th Standard",
    title: "Core Development",
    description: "Deep-dive into advanced physics, chemistry, and mathematics with an eye on JEE/NEET.",
    icon: <Compass size={28} className="text-[var(--color-subtle-grey)]" />,
    enrolled: 76,
    modalPoints: [
      "Advanced Science/Math deep-dive",
      "Dual-track prep",
      "AI Mentor support",
      "Entrance basics"
    ]
  },
  {
    tier: "12th Standard",
    title: "The Ultimate Finish",
    description: "Simulated exam environments, rank-boosting strategies, and supreme confidence building.",
    icon: <GraduationCap size={28} className="text-[var(--color-viz-purple)]" />,
    enrolled: 88,
    modalPoints: [
      "Intensive Revision",
      "Rank-boosting for NEET/CUET",
      "Simulated Exams",
      "Career counseling"
    ]
  },
];

export default function ExpertiseSection() {
  const [selectedExp, setSelectedExp] = useState<typeof expertiseData[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (selectedExp && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedExp, isMobile]);

  // Handle UX Standard Navigation (Browser Back Button Support)
  useEffect(() => {
    const handlePopState = () => {
      // Whenever history pops backwards, safely close the detailed panel natively
      setSelectedExp(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openPanel = (exp: typeof expertiseData[0]) => {
    if (!selectedExp) {
      window.history.pushState({ detailsOpen: true }, "");
    }
    setSelectedExp(exp);
    window.dispatchEvent(new CustomEvent('syncDashboardClass', { detail: exp.tier }));
  };

  const closePanel = () => {
    // Standard condition UI close mapping to browser generic back
    if (window.history.state?.detailsOpen) {
      window.history.back(); // Triggers popstate, safely closing the ui
    } else {
      setSelectedExp(null);
    }
  };

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16">
      <div className="text-center mb-16 space-y-4 px-4 hover:cursor-default">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Our Expertise</h2>
        <p className="text-[var(--color-subtle-grey)] text-lg max-w-2xl mx-auto font-light">
          Structured hierarchies of learning, engineered for every stage of academic maturity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {expertiseData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            onClick={() => openPanel(exp)}
            className="group glass-card rounded-2xl p-8 hover:bg-[var(--color-glass-lighter)] hover:border-[var(--color-glass-border-highlight)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 inline-flex items-center justify-center p-4 rounded-xl bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500">
              {exp.icon}
            </div>

            <h4 className="text-[var(--color-subtle-grey)] text-xs font-bold uppercase tracking-widest mb-2">
              {exp.tier}
            </h4>
            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{exp.title}</h3>
            <p className="text-[var(--color-subtle-grey)] text-sm font-light leading-relaxed flex-grow">
              {exp.description}
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--color-glass-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-subtle-grey)] font-medium">Batch Capacity</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white">{exp.enrolled}%</span>
                <div className="w-16 h-1.5 bg-[var(--color-glass-lighter)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${exp.enrolled}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      exp.enrolled > 90
                        ? "bg-[var(--color-bk-lime)] shadow-[0_0_8px_rgba(163,255,0,0.6)]"
                        : exp.enrolled > 80
                        ? "bg-[var(--color-viz-cyan)] shadow-[0_0_8px_rgba(0,180,216,0.6)]"
                        : "bg-[var(--color-viz-purple)] shadow-[0_0_8px_rgba(157,78,221,0.6)]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Persistent Inline Details Panel (Desktop) / Fixed Modal (Mobile) */}
      <AnimatePresence>
        {selectedExp && (
          <>
            {/* Mobile Backdrop Overlay (only on mobile) */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePanel}
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md cursor-pointer"
                aria-hidden="true"
              />
            )}

            <motion.div
              initial={isMobile ? { opacity: 0, scale: 0.95 } : { opacity: 0, height: 0, y: -20 }}
              animate={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, height: "auto", y: 0 }}
              exit={isMobile ? { opacity: 0, scale: 0.95 } : { opacity: 0, height: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`border border-[var(--color-bk-lime)] overflow-hidden flex flex-col ${
                isMobile 
                  ? "fixed inset-4 sm:inset-6 z-50 bg-[#0a0a0a]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(163,255,0,0.15)] rounded-2xl overflow-y-auto" 
                  : "w-full max-w-5xl mx-auto mt-12 bg-[#0a0a0a]/60 backdrop-blur-xl shadow-[0_0_40px_rgba(163,255,0,0.1)] rounded-3xl relative"
              }`}
            >
              <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 relative overflow-hidden ${isMobile ? "p-6 sm:p-8" : "p-8 lg:p-10"}`}>
                {/* Decorative ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bk-lime)]/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={closePanel}
                  className="absolute top-6 right-6 p-2 text-[var(--color-subtle-grey)] hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>

                {/* Header Info */}
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 relative z-10">
                  <div className={`flex items-center gap-4 ${isMobile ? "mb-4" : "mb-6"}`}>
                    <div className="p-4 rounded-2xl bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)] shadow-inner">
                      {selectedExp.icon}
                    </div>
                    <div>
                      <h4 className="text-[var(--color-bk-lime)] text-xs font-bold uppercase tracking-widest mb-1">
                        {selectedExp.tier}
                      </h4>
                      <h3 className={`font-black text-white leading-tight ${isMobile ? "text-xl sm:text-2xl" : "text-2xl lg:text-3xl"}`}>
                        {selectedExp.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[var(--color-subtle-grey)] text-base leading-relaxed">
                    {selectedExp.description}
                  </p>
                  
                  {/* Centered dynamically for mobile */}
                  <div className={`mt-8 ${isMobile ? "flex justify-center" : ""}`}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-bk-lime)]/10 text-[var(--color-bk-lime)] text-xs font-bold tracking-wide border border-[var(--color-bk-lime)]/20 shadow-[0_0_15px_rgba(163,255,0,0.1)]">
                      {selectedExp.enrolled}% Capacity Reached
                    </span>
                  </div>
                </div>

                {/* Points List */}
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2 md:pt-0">
                  {selectedExp.modalPoints.map((point, idx) => (
                    <motion.div
                      key={`${selectedExp.tier}-${idx}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className="flex items-start gap-3 bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                    >
                      <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[var(--color-bk-lime)]/10 flex items-center justify-center border border-[var(--color-bk-lime)]/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-bk-lime)]" />
                      </div>
                      <span className="text-sm font-medium text-gray-200 leading-relaxed">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
