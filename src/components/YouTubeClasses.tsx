"use client";

import React, { useState, useEffect } from "react";
import { Play, Radio, MonitorPlay, Loader2 } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  isLive: boolean;
  duration: string;
  publishedAt: string;
}

// Helper to decode basic HTML entities from YouTube API
const decodeHTMLEntities = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

export default function YouTubeClasses() {
  const [activeTab, setActiveTab] = useState<"videos" | "live">("videos");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to load videos");
        const data = await res.json();
        
        // Decode HTML titles
        const cleanData = data.videos?.map((v: YouTubeVideo) => ({
          ...v,
          title: decodeHTMLEntities(v.title)
        })) || [];
        
        setVideos(cleanData);
      } catch (err: any) {
        setError(err.message || "Failed to load channel data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);
  
  const liveCount = videos.filter(v => v.isLive).length;
  const displayVideos = activeTab === "videos" 
    ? videos.filter(v => !v.isLive).slice(0, 8)
    : videos.filter(v => v.isLive);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative pt-16">
      
      {/* Background Ambience effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-full bg-[var(--color-viz-purple)]/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Centered Heading Layout per Prompt */}
      <div className="flex flex-col items-center justify-center text-center mb-10 relative z-20">
         <div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              YouTube <span className="text-[var(--color-viz-purple)]">Classes</span>
            </h2>
            <p className="text-[var(--color-subtle-grey)] font-medium mt-4 max-w-xl mx-auto text-sm md:text-base">
              Access B.K. Singh's massive academic video library. Active streams will automatically migrate to the Live Class panel.
            </p>
         </div>

         {/* Neon Glass Toggle Navigation Centered */}
         <div className="flex bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-8">
            <button 
              onClick={() => setActiveTab("videos")}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'videos' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {activeTab === 'videos' && (
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] -z-10"></div>
              )}
              <MonitorPlay size={14} /> Recorded
            </button>
            
            <button 
              onClick={() => setActiveTab("live")}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'live' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {activeTab === 'live' && (
                <div className="absolute inset-0 bg-[var(--color-viz-purple)]/20 border border-[var(--color-viz-purple)]/50 rounded-full shadow-[0_0_20px_rgba(157,78,221,0.4)] -z-10"></div>
              )}
              <Radio size={14} className={activeTab === 'live' ? 'text-[var(--color-viz-purple)] animate-pulse' : ''} /> 
              Live Class
              {liveCount > 0 && <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
            </button>
         </div>
      </div>

      {/* Primary Glassmorphism Container */}
      <div className="w-full glass-card rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-[30px] relative z-20 overflow-hidden min-h-[400px]">
         {/* Subtle internal glow */}
         <div className="absolute -top-40 -left-20 w-80 h-80 bg-[var(--color-viz-purple)]/10 blur-[100px] rounded-full pointer-events-none"></div>

         {isLoading ? (
           <div className="flex flex-col items-center justify-center w-full h-[300px] gap-4">
             <Loader2 size={40} className="text-[var(--color-viz-purple)] animate-spin" />
             <p className="text-[var(--color-subtle-grey)] font-bold tracking-widest uppercase text-[10px] animate-pulse">
               Syncing with YouTube Servers...
             </p>
           </div>
         ) : error ? (
           <div className="flex flex-col items-center justify-center w-full h-[300px]">
             <p className="text-red-400 font-bold tracking-widest uppercase text-xs">{error}</p>
             <button onClick={() => window.location.reload()} className="mt-4 text-white/50 hover:text-white text-xs underline">Retry Connection</button>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {displayVideos.length > 0 ? (
                 displayVideos.map((video) => (
                   <a 
                     key={video.id} 
                     href={`https://www.youtube.com/watch?v=${video.id}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="group flex flex-col gap-4"
                   >
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#0B0B0C] shadow-lg cursor-pointer">
                         {/* Thumbnail */}
                         <img 
                           src={video.thumbnail} 
                           alt={video.title} 
                           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                         />
                         
                         {/* Frosted Duration/Live Badge */}
                         <div className="absolute items-center gap-2 bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded overflow-hidden z-20 flex">
                           {video.isLive ? (
                              <>
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                                <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">LIVE</span>
                              </>
                           ) : (
                              <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Watch</span>
                           )}
                         </div>

                         {/* Central Play Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/30 backdrop-blur-[2px]">
                           <div className="w-14 h-14 rounded-full bg-white/10 border border-white/30 backdrop-blur-lg flex items-center justify-center shadow-[0_0_30px_rgba(157,78,221,0.4)] group-hover:scale-110 transition-transform">
                              <Play size={24} className="text-white ml-1 fill-white" />
                           </div>
                         </div>
                      </div>
                      
                      <div>
                         <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-[var(--color-viz-purple)] transition-colors">
                           {video.title}
                         </h3>
                         <p className="text-[var(--color-subtle-grey)] text-xs mt-1 font-medium">{new Date(video.publishedAt).toLocaleDateString()}</p>
                      </div>
                   </a>
                 ))
              ) : (
                 <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                    <Radio size={40} className="text-white/20 mb-4" />
                    <p className="text-[var(--color-subtle-grey)] font-bold tracking-widest uppercase text-xs">No Active Overrides</p>
                    <button onClick={() => setActiveTab("videos")} className="mt-4 text-[var(--color-viz-purple)] text-[10px] uppercase tracking-widest font-bold hover:brightness-150 transition-all bg-white/5 px-4 py-2 rounded-lg border border-white/10">Return to Recorded Videos</button>
                 </div>
              )}
           </div>
         )}
      </div>
    </section>
  );
}
