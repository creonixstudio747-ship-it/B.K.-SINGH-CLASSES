"use client";

import React from "react";
import { MapPin, Navigation, Send, Loader2, Sparkles, MessageSquare } from "lucide-react";

export default function LocationMentor() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Bagaha Campus Stylized Map */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[var(--color-bk-lime)]/5 group-hover:scale-150"></div>
          
          <div className="relative z-10 mb-8 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <MapPin className="text-[var(--color-bk-lime)]" />
                Bagaha Campus
              </h3>
              <p className="text-[var(--color-subtle-grey)] mt-2 font-medium">Headquarters of Excellence</p>
            </div>
            <button className="h-10 px-6 bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] text-sm font-medium text-white rounded-lg hover:bg-[var(--color-bk-lime)] hover:text-black hover:border-[var(--color-bk-lime)] transition-all duration-300 flex items-center gap-2">
              <Navigation size={16} /> Get Directions
            </button>
          </div>

          {/* Minimalist Glass Map Placeholder */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[var(--color-glass-border)] bg-[#0B0B0C] group-hover:border-[var(--color-glass-border-highlight)] transition-colors duration-500">
            {/* Cyberpunk Map Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
            
            {/* Diffused Map Routes */}
            <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M-50,150 Q100,200 200,100 T450,50" fill="none" stroke="var(--color-viz-cyan)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
              <path d="M0,250 Q150,300 250,150 T400,200" fill="none" stroke="var(--color-viz-purple)" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Glowing Map Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="absolute w-16 h-16 bg-[var(--color-bk-lime)] rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute w-24 h-24 border border-[var(--color-bk-lime)] rounded-full opacity-30 animate-ping"></div>
              <div className="relative w-10 h-10 bg-[var(--color-bk-lime)] rounded-xl transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(163,255,0,0.5)] border border-white/20">
                <MapPin className="text-black transform -rotate-45 block m-auto w-5 h-5 absolute inset-0" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-[var(--color-glass-border)] flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">B.K. Singh Classes Hub</p>
                <p className="text-[var(--color-subtle-grey)] text-xs">Main Branch, Bagaha, Bihar</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-bk-lime)] shadow-[0_0_8px_rgba(163,255,0,1)]"></div>
            </div>
          </div>
        </div>

        {/* Right: AI Mentor Chat Widget */}
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col h-[500px] border border-[var(--color-glass-border)] shadow-2xl relative">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[var(--color-glass)] border-b border-[var(--color-glass-border)] flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] p-[2px]">
                <div className="w-full h-full bg-[#0B0B0C] rounded-full flex items-center justify-center overflow-hidden">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--color-bk-lime)] rounded-full border border-[#0B0B0C]"></div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">BK SINGH AI</h4>
                <p className="text-[10px] text-[var(--color-subtle-grey)] tracking-widest uppercase font-semibold">24/7 Academic Mentor</p>
              </div>
            </div>
            <MessageSquare size={18} className="text-[var(--color-subtle-grey)]" />
          </div>

          {/* Chat Messages */}
          <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-5 z-10 bg-[#0B0B0C]/40">
            {/* System Message */}
            <div className="text-center">
              <span className="text-[10px] text-[var(--color-subtle-grey)] uppercase font-semibold tracking-wider">Today, 09:41 AM</span>
            </div>
            
            {/* AI Message */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] flex-shrink-0 flex items-center justify-center mt-1">
                <Sparkles size={10} className="text-white" />
              </div>
              <div className="bg-[var(--color-glass-lighter)] rounded-2xl rounded-tl-sm p-4 border border-[var(--color-glass-border)]">
                <p className="text-sm text-white leading-relaxed">
                  Hello! I'm the BK Singh AI Mentor. I noticed you struggled with Trigonometric Identities in the last mock test. Would you like a quick review?
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 max-w-[85%] self-end">
              <div className="bg-[var(--color-viz-purple)]/20 rounded-2xl rounded-tr-sm p-4 border border-[var(--color-viz-purple)]/30 backdrop-blur-md">
                <p className="text-sm text-white leading-relaxed">
                  Yes, specifically proving tan(x) + cot(x) = sec(x)csc(x).
                </p>
              </div>
            </div>

            {/* AI Typing Indicator */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] flex-shrink-0 flex items-center justify-center mt-1">
                <Sparkles size={10} className="text-white" />
              </div>
              <div className="bg-[var(--color-glass-lighter)] rounded-2xl rounded-tl-sm px-4 py-3 border border-[var(--color-glass-border)] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-subtle-grey)] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-subtle-grey)] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-subtle-grey)] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[var(--color-glass)] border-t border-[var(--color-glass-border)] z-10">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Ask your mentor..." 
                className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder-[var(--color-subtle-grey)] focus:outline-none focus:border-[var(--color-viz-cyan)] transition-colors"
              />
              <button className="absolute right-2 w-8 h-8 rounded-full bg-[var(--color-viz-cyan)] flex items-center justify-center text-black hover:bg-white hover:text-black transition-colors">
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </div>

          {/* Background decoration in widget */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-viz-purple)]/5 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
