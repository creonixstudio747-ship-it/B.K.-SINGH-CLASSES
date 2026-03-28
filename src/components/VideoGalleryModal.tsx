"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface VideoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VideoData {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const API_KEY = "AIzaSyCNPaAfcscCFRKogR_hpnj7M0zhQYQCgTM";
const CHANNEL_ID = "UCQ9Mr2KzICkZzoc6r5R-h3w";

export default function VideoGalleryModal({ isOpen, onClose }: VideoGalleryModalProps) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchVideos();
    } else {
      document.body.style.overflow = "unset";
      setPlayingVideoId(null);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      
      const baseUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`;
      
      const [mediumRes, longRes] = await Promise.all([
        fetch(`${baseUrl}&videoDuration=medium`),
        fetch(`${baseUrl}&videoDuration=long`)
      ]);
      
      const mediumData = await mediumRes.json();
      const longData = await longRes.json();
      
      const combinedItems = [
        ...(mediumData.items || []),
        ...(longData.items || [])
      ];

      // Sort by descending publish time and slice top 6
      combinedItems.sort((a, b) => {
        return new Date(b.snippet.publishTime).getTime() - new Date(a.snippet.publishTime).getTime();
      });
      const top6 = combinedItems.slice(0, 6);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchedVideos: VideoData[] = top6.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.high.url,
      }));
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Failed to fetch videos from YouTube", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Modal Overlay Background */}
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(50px) saturate(180%)",
              background: "rgba(10, 10, 10, 0.8)",
            }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-6"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-transparent">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                English Course <span className="text-[var(--color-viz-cyan)]">Gallery</span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                // Shimmering Skeletons
                Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="w-full aspect-video rounded-xl bg-white/5 animate-pulse border border-white/10" />
                    <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-white/5 animate-pulse" />
                  </div>
                ))
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="group relative flex flex-col gap-3">
                    <div className="w-full aspect-video rounded-xl overflow-hidden relative border border-white/10 transition-all duration-300 group-hover:border-[var(--color-viz-cyan)] group-hover:shadow-[0_0_20px_rgba(0,180,216,0.3)] bg-black/50">
                      {playingVideoId === video.id ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div 
                          className="w-full h-full relative cursor-pointer overflow-hidden"
                          onClick={() => setPlayingVideoId(video.id)}
                        >
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 rounded-full bg-[var(--color-viz-cyan)]/20 flex items-center justify-center backdrop-blur-sm border border-[var(--color-viz-cyan)] shadow-[0_0_15px_rgba(0,180,216,0.5)]">
                              <Play className="text-white w-8 h-8 ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="line-clamp-2 text-sm font-medium text-[var(--color-subtle-grey)] group-hover:text-white transition-colors">
                      {/* Unescape html entities returned by YouTube API */}
                      <span dangerouslySetInnerHTML={{ __html: video.title }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
