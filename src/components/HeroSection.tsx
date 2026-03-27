"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import AdmissionEnquiryModal from "./AdmissionEnquiryModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-24 pb-16">
      {/* Subtle wireframe mesh background effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[linear-gradient(to_right,#88888C_1px,transparent_1px),linear-gradient(to_bottom,#88888C_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-xs font-semibold tracking-widest text-[var(--color-bk-lime)] uppercase mb-4">
            Welcome to the Future of Learning
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
            B.K. SINGH CLASSES: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-subtle-grey)] to-white">
              THE GOLD STANDARD
            </span>{" "}
            OF ACADEMIC EXCELLENCE
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-subtle-grey)] font-light leading-relaxed">
            Empowering minds, engineering futures. Join the leading digital ecosystem built for elite academic preparation and extraordinary success ratios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          {/* Exact replication of "Start Your Journey" lime green button */}
          <button className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-bk-lime)] text-black font-bold uppercase tracking-wider rounded-none hover:bg-[var(--color-bk-lime-hover)] shadow-[0_0_25px_rgba(163,255,0,0.3)] hover:shadow-[0_0_40px_rgba(163,255,0,0.5)] transition-all duration-300 transform hover:-translate-y-1">
            <span>Start Your Journey</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20"></div>
          </button>

          {/* Exact replication of "Admission Enquiry" line border button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[var(--color-glass-border-highlight)] text-white font-medium uppercase tracking-wider rounded-none hover:border-white hover:bg-[var(--color-glass)] transition-all duration-300"
          >
            <MessageCircle size={20} className="text-[var(--color-subtle-grey)] group-hover:text-white transition-colors" />
            <span>Admission Enquiry</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative neon glow below hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-bk-lime)] to-transparent opacity-30 shadow-[0_-10px_30px_rgba(163,255,0,0.4)]"></div>
      
      <AdmissionEnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
