"use client";

import React from "react";
import { MessageSquare, Sparkles } from "lucide-react";

export default function FloatingChat() {
  return (
    <button 
      title="Chat with AI Mentor"
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] shadow-[0_0_30px_rgba(0,180,216,0.3)] hover:shadow-[0_0_40px_rgba(157,78,221,0.5)] hover:scale-110 transition-all duration-300 pointer-events-auto border border-white/20"
    >
      <div className="absolute inset-1 rounded-full bg-[#0B0B0C] flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-[#111115]">
        <Sparkles className="absolute text-[var(--color-viz-cyan)]/30 animate-spin-slow duration-[3000ms]" size={36} />
        <MessageSquare className="text-white relative z-10 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" size={24} />
        
        {/* Active Ping Dot */}
        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[var(--color-bk-lime)] rounded-full border-2 border-[#0B0B0C] shadow-[0_0_10px_var(--color-bk-lime)] z-20">
          <div className="absolute inset-0 bg-[var(--color-bk-lime)] rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
    </button>
  );
}
