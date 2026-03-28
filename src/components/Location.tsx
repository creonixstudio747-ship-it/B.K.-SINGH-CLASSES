"use client";

import React from "react";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Location() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16 px-4">
      {/* Centered Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-white text-center tracking-tight mb-16 uppercase font-sans">
        Location
      </h2>

      {/* Split Glassmorphism Card */}
      <div className="w-full glass-card rounded-3xl overflow-hidden border border-[var(--color-glass-border)] flex flex-col lg:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Left Side (Info) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center relative bg-black/40 backdrop-blur-xl z-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bk-lime)] blur-[150px] rounded-full opacity-10 pointer-events-none"></div>

          <h3 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">
            B.K. SINGH <span className="text-[var(--color-bk-lime)]">CLASSES</span>
          </h3>
          <p className="text-[var(--color-subtle-grey)] font-medium tracking-widest text-sm mb-10 uppercase border-b border-white/5 pb-4">
            Headquarters & Main Campus
          </p>

          <div className="space-y-8 flex-grow">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-viz-cyan)] group-hover:bg-[var(--color-viz-cyan)]/10 transition-colors">
                <MapPin className="text-[var(--color-viz-cyan)]" />
              </div>
              <div className="pt-2">
                <h4 className="text-white font-bold mb-1">Our Address</h4>
                <p className="text-[var(--color-subtle-grey)] leading-relaxed text-sm">
                  Bagaha, Bihar, India <br />
                  State Highway, Main Road Branch
                </p>
              </div>
            </div>

            <a href="tel:+919955490800" className="flex items-start gap-4 group hover:bg-white/5 p-3 sm:p-4 -ml-4 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-bk-lime)] group-hover:bg-[var(--color-bk-lime)]/10 transition-colors shadow-[0_0_15px_rgba(163,255,0,0)] group-hover:shadow-[0_0_15px_rgba(163,255,0,0.3)]">
                <Phone className="text-[var(--color-bk-lime)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="pt-2">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  Call Now 
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-bk-lime)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-bk-lime)]"></span>
                  </span>
                </h4>
                <p className="text-[var(--color-subtle-grey)] leading-relaxed text-sm font-mono group-hover:text-white transition-colors">
                  +91 99554 90800
                </p>
              </div>
            </a>

            <a href="mailto:bksinghclasses001@gmail.com" className="flex items-start gap-4 group hover:bg-white/5 p-3 sm:p-4 -ml-4 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-viz-purple)] group-hover:bg-[var(--color-viz-purple)]/10 transition-colors shadow-[0_0_15px_rgba(157,78,221,0)] group-hover:shadow-[0_0_15px_rgba(157,78,221,0.3)]">
                <Mail className="text-[var(--color-viz-purple)] group-hover:scale-110 transition-transform" />
              </div>
              <div className="pt-1.5">
                <h4 className="text-white font-bold mb-1">Electronic Mail</h4>
                <p className="text-[var(--color-subtle-grey)] leading-relaxed text-sm group-hover:text-white transition-colors break-all">
                  bksinghclasses001@gmail.com
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side (Map Embed) */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative overflow-hidden bg-black">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113695.535803875!2d83.94318355!3d27.1009131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39943b1b9e18b0c3%3A0xc3c6b2ba7d49b2cb!2sBagaha%2C%20Bihar!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 saturate-[1.2] invert-[0.9] hue-rotate-[180deg]"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
