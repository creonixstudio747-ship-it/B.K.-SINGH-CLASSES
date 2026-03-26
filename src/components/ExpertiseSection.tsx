"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpenCheck, Compass, Microscope } from "lucide-react";

const expertiseData = [
  {
    tier: "9th Standard",
    title: "Foundation Building",
    description: "Establishing crystal clear concepts in Mathematics and Science for future competitive exams.",
    icon: <Microscope size={28} className="text-[var(--color-viz-cyan)]" />,
    enrolled: 82,
  },
  {
    tier: "10th Standard",
    title: "Board Mastery",
    description: "Rigorous practice, PYQs, and tailored test series to maximize board permutations.",
    icon: <BookOpenCheck size={28} className="text-[var(--color-bk-lime)]" />,
    enrolled: 94,
  },
  {
    tier: "11th Standard",
    title: "Core Development",
    description: "Deep-dive into advanced physics, chemistry, and mathematics with an eye on JEE/NEET.",
    icon: <Compass size={28} className="text-[var(--color-subtle-grey)]" />,
    enrolled: 76,
  },
  {
    tier: "12th Standard",
    title: "The Ultimate Finish",
    description: "Simulated exam environments, rank-boosting strategies, and supreme confidence building.",
    icon: <GraduationCap size={28} className="text-[var(--color-viz-purple)]" />,
    enrolled: 88,
  },
];

export default function ExpertiseSection() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Our Expertise</h2>
        <p className="text-[var(--color-subtle-grey)] text-lg max-w-2xl mx-auto font-light">
          Structured hierarchies of learning, engineered for every stage of academic maturity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expertiseData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
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

            {/* Subtle enrolled progress loader (Dashboard Style) */}
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
    </section>
  );
}
