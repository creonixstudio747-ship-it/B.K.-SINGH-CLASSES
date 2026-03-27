"use client";

import React, { useState } from "react";
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
            onClick={() => {
              setSelectedExp(exp);
              window.dispatchEvent(new CustomEvent('syncDashboardClass', { detail: exp.tier }));
            }}
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

      {/* Modal Integration (Fixed Viewport Modal) */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop: Semi-transparent to let background be visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />
            
            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0a0a0a]/95 backdrop-blur-xl border border-[var(--color-bk-lime)] shadow-[0_0_40px_rgba(163,255,0,0.25)] rounded-2xl overflow-hidden pointer-events-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 p-2 text-[var(--color-subtle-grey)] hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-8 pr-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[var(--color-glass-lighter)] border border-[var(--color-glass-border)]">
                      {selectedExp.icon}
                    </div>
                    <div>
                      <h4 className="text-[var(--color-bk-lime)] text-xs font-bold uppercase tracking-widest mb-1">
                        {selectedExp.tier}
                      </h4>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {selectedExp.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[var(--color-subtle-grey)] text-sm leading-relaxed">
                    {selectedExp.description}
                  </p>
                </div>

                {/* Points List */}
                <div className="space-y-4">
                  {selectedExp.modalPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-bk-lime)] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-200 leading-snug">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="px-6 py-2.5 rounded-full bg-[var(--color-bk-lime)] text-black font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(163,255,0,0.4)] transition-shadow"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
