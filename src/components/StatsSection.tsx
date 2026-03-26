"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, Users, BookOpen } from "lucide-react";

const statsData = [
  {
    title: "Successful Placements",
    value: "15.2K+",
    icon: <Award size={24} className="text-[var(--color-viz-purple)]" />,
    type: "bar",
    progress: 85,
  },
  {
    title: "Success Ratio",
    value: "98.4%",
    icon: <TrendingUp size={24} className="text-[var(--color-viz-cyan)]" />,
    type: "circle",
    progress: 98,
  },
  {
    title: "Total Aspirants",
    value: "120K+",
    icon: <Users size={24} className="text-[var(--color-bk-lime)]" />,
    type: "text",
    subtitle: "+12% this year",
  },
  {
    title: "Active Courses",
    value: "45+",
    icon: <BookOpen size={24} className="text-[var(--color-subtle-grey)]" />,
    type: "text",
    subtitle: "Across 9th-12th & Exams",
  },
];

export default function StatsSection() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 select-none md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 group hover:border-[var(--color-glass-border-highlight)] transition-colors duration-300 relative overflow-hidden flex flex-col justify-between min-h-[160px]"
          >
            {/* Ambient Background Glow for Cards */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-glass-lighter)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[var(--color-glass-lighter)] rounded-xl border border-[var(--color-glass-border)]">
                {stat.icon}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-[var(--color-subtle-grey)]">{stat.title}</p>
            </div>

            {/* Custom Visualizations based on Type */}
            {stat.type === "bar" && (
              <div className="mt-5 w-full h-2 bg-[var(--color-glass-lighter)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[var(--color-viz-purple)] to-[#c77dff] rounded-full shadow-[0_0_10px_rgba(157,78,221,0.5)]"
                />
              </div>
            )}

            {stat.type === "circle" && (
              <div className="absolute top-6 right-6 w-14 h-14">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-[var(--color-glass-lighter)]"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Circle */}
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: `${stat.progress}, 100` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="text-[var(--color-viz-cyan)] drop-shadow-[0_0_8px_rgba(0,180,216,0.5)]"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            )}

            {stat.type === "text" && (
              <div className="mt-4">
                <span className="text-xs font-semibold text-[var(--color-bk-lime)] bg-[var(--color-bk-lime)]/10 px-2 py-1 rounded-md border border-[var(--color-bk-lime)]/20">
                  {stat.subtitle}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
