"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Mail, GraduationCap, Phone, Users } from "lucide-react";

export default function Profile() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Basic parallax effect calculating mouse distance from center
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  // 1. Antigravity Shimmering Skeleton Loader
  if (loading || (!userData && user)) {
    return (
      <div className="flex items-center justify-center min-h-[85vh] pt-24 pb-12 px-4 relative">
        <div className="w-full max-w-2xl glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden animate-pulse">
           <div className="flex flex-col items-center">
             <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-white/5 mb-6"></div>
             <div className="w-48 h-6 bg-white/5 rounded mt-2 mb-2"></div>
             <div className="w-32 h-4 bg-white/5 rounded"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
             <div className="h-32 bg-white/5 rounded-[1.5rem]"></div>
             <div className="h-32 bg-white/5 rounded-[1.5rem]"></div>
           </div>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  // Stream Conditional Logic for glow
  const streamColors: Record<string, string> = {
    "PCB": "var(--color-bk-lime)", // Greenish glow
    "PCM": "var(--color-viz-cyan)", // Blue glow
    "Arts": "var(--color-viz-purple)", // Purple glow
    "Commerce": "#F59E0B", // Amber glow
    "None": "#6B7280" // Gray/subtle glow
  };
  
  const streamGlowColor = streamColors[userData.stream || "None"] || "var(--color-viz-cyan)";

  return (
    <div 
      className="flex items-center justify-center min-h-screen pt-24 pb-16 px-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Parallax Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-viz-purple)] rounded-full blur-[150px] opacity-20 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-viz-cyan)] rounded-full blur-[120px] opacity-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)` }}
      ></div>

      {/* Profile ID Card Container */}
      <div className="w-full max-w-2xl glass-card rounded-[2.5rem] p-8 md:p-12 border border-[var(--color-glass-border)] shadow-[0_40px_80px_rgba(0,0,0,0.8)] backdrop-blur-[40px] relative z-10 overflow-hidden group">
        
        {/* Neon Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-viz-cyan)] to-transparent opacity-50"></div>

        {/* Header - Global Identity */}
        <div className="flex flex-col items-center relative z-20">
          <div className="relative">
            {/* Outer spinning pulse rings */}
            <div className="absolute -inset-4 border-2 border-[var(--color-viz-cyan)]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-2 border border-[var(--color-viz-purple)]/30 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
            
            {/* Avatar Body */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#0B0B0C] to-[#1a1a1c] border-4 border-[#0B0B0C] shadow-[0_0_30px_rgba(0,180,216,0.2)] flex items-center justify-center relative">
               <span className="text-4xl md:text-5xl font-black text-white/80">{userData.name.charAt(0).toUpperCase()}</span>
               {/* Internal Glow relative to stream */}
               <div className="absolute bottom-0 w-full h-1/3 blur-xl opacity-30" style={{ backgroundColor: streamGlowColor }}></div>
            </div>
          </div>
          
          <h1 className="mt-8 text-3xl font-black text-white uppercase tracking-tight text-center">
            {userData.name}
          </h1>
          <p className="mt-1 text-xs text-[var(--color-subtle-grey)] font-mono flex flex-col items-center gap-1 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 mt-3 shadow-inner">
             <span className="uppercase text-[8px] tracking-widest text-[var(--color-viz-purple)] font-bold">Database UID</span>
             {userData.uid}
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 relative z-20">
           
           {/* Academic Status Card */}
           <div className="bg-[#050505]/60 border border-[var(--color-glass-border)] rounded-2xl p-6 group/card hover:border-[var(--color-viz-cyan)]/50 transition-colors relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-viz-cyan)] blur-[80px] opacity-0 group-hover/card:opacity-10 transition-opacity"></div>
              <h3 className="text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                 <GraduationCap size={14} className="text-[var(--color-viz-cyan)]" /> Academic Status
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest mb-1">Enrolled Class</span>
                    <span className="text-white font-bold text-lg">{userData.class}</span>
                 </div>
                 {userData.stream && userData.stream !== "None" && (
                   <div>
                      <span className="text-[9px] uppercase text-white/30 block tracking-widest mb-1">Academic Stream</span>
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded bg-black/50 border shadow-[0_0_15px_rgba(0,0,0,0.5)] font-bold tracking-wider"
                        style={{ borderColor: `${streamGlowColor}40`, color: streamGlowColor }}
                      >
                         <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse" style={{ backgroundColor: streamGlowColor }}></span>
                         {userData.stream}
                      </span>
                   </div>
                 )}
              </div>
           </div>

           {/* Contact Details Card */}
           <div className="bg-[#050505]/60 border border-[var(--color-glass-border)] rounded-2xl p-6 group/card hover:border-[var(--color-viz-purple)]/50 transition-colors relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-viz-purple)] blur-[80px] opacity-0 group-hover/card:opacity-10 transition-opacity"></div>
              <h3 className="text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                 <Mail size={14} className="text-[var(--color-viz-purple)]" /> Contact Details
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <span className="text-[9px] uppercase text-white/30 block tracking-widest mb-1">Email Address</span>
                    <span className="text-white/90 font-medium text-sm break-all">{userData.email}</span>
                 </div>
                 {userData.mobile && (
                   <div>
                      <span className="text-[9px] uppercase text-white/30 block tracking-widest mb-1">Mobile Number</span>
                      <span className="text-white/90 font-medium text-sm flex items-center gap-2">
                         <Phone size={12} className="text-white/30" /> {userData.mobile}
                      </span>
                   </div>
                 )}
              </div>
           </div>

           {/* Guardian Info Card (Spans full width if needed, or placed structurally) */}
           {(userData.parentName || userData.parentMobile) && (
              <div className="bg-[#050505]/60 border border-[var(--color-glass-border)] rounded-2xl p-6 md:col-span-2 group/card hover:border-[var(--color-bk-lime)]/50 transition-colors relative overflow-hidden shadow-inner flex flex-col md:flex-row gap-6 md:items-center justify-between">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--color-bk-lime)] blur-[100px] opacity-0 group-hover/card:opacity-5 transition-opacity pointer-events-none"></div>
                 
                 <div className="flex-1">
                    <h3 className="text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest flex items-center gap-2 mb-2">
                       <Users size={14} className="text-[var(--color-bk-lime)]" /> Guardian Info
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold tracking-wide">{userData.parentName}</span>
                      {userData.parentMobile && (
                        <span className="text-[var(--color-subtle-grey)] text-xs flex items-center gap-2">
                           <Phone size={10} className="text-white/20"/> {userData.parentMobile}
                        </span>
                      )}
                    </div>
                 </div>
                 
                 <div className="h-px w-full md:w-px md:h-12 bg-white/5 hidden md:block"></div>

                 <div className="flex-1 md:text-right">
                    <span className="inline-flex items-center justify-center px-4 py-2 border border-white/5 bg-black/30 rounded-lg text-[10px] text-white/50 tracking-widest uppercase shadow-inner">
                      Role: Student
                    </span>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
