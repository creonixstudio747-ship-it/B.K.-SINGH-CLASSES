"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, Search, Video, FileText, Lightbulb, FileQuestion } from "lucide-react";
import { fetchLearningHubData, ChapterResource } from "@/actions/learningHub";

type BoardType = "BSEB" | "CBSE";

const MOCK_CHAPTERS_9_10: ChapterResource[] = [
  { subject: "Placeholder", chapterName: "Chapter 1", notes: "#", pyqs: "#", lectures: "#", extraTips: "Focus on basics." },
  { subject: "Placeholder", chapterName: "Chapter 2", notes: "#", pyqs: "#", lectures: "#", extraTips: "Practice problems." },
  { subject: "Placeholder", chapterName: "Chapter 3", notes: "#", pyqs: "#", lectures: "#", extraTips: "Review formulas." }
];

export default function LearningHub() {
  const [board, setBoard] = useState<BoardType>("CBSE");
  const [path, setPath] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<ChapterResource[]>([]);

  // Derived state based on path
  const currentClass = path[0];
  const currentStreamOrSubject910 = path[1];
  const currentSubject1112 = path[2];
  const currentChapter = path[3]; // For 11/12. For 9/10 it would be path[2], but we'll map uniformly if possible

  const is11or12 = currentClass === "11th" || currentClass === "12th";
  const is9or10 = currentClass === "9th" || currentClass === "10th";

  // Fetch logic when stream is selected
  useEffect(() => {
    async function loadData() {
      if (is11or12 && currentClass && currentStreamOrSubject910 && path.length >= 2) {
        setLoading(true);
        const data = await fetchLearningHubData(currentClass, currentStreamOrSubject910);
        setResources(data);
        setLoading(false);
      }
    }
    loadData();
  }, [currentClass, currentStreamOrSubject910, is11or12]);

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const handleNavigate = (nextStep: string) => {
    setPath((prev) => [...prev, nextStep]);
  };

  const openLink = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank");
    } else {
      alert("Resource coming soon!");
    }
  };

  // UI Renders for different levels
  const renderLevel1 = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {["9th", "10th", "11th", "12th"].map((cls) => (
        <button
          key={cls}
          onClick={() => handleNavigate(cls)}
          className="group flex flex-col items-center justify-center p-8 bg-white/5 border border-[var(--color-glass-border)] rounded-2xl hover:bg-white/10 hover:border-[var(--color-bk-lime)] transition-colors duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[var(--color-bk-lime)] transition-colors">
            <span className="text-2xl font-black text-white">{cls}</span>
          </div>
          <h3 className="text-white font-bold uppercase tracking-wider">Class {cls}</h3>
        </button>
      ))}
    </div>
  );

  const renderLevel2 = () => {
    if (is9or10) {
      // Show Subjects for 9/10
      const subjects = ["Maths", "Science", "Geography", "History", "Political Science", "Economics", "Hindi", "English"];
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => handleNavigate(sub)}
              className="p-6 bg-white/5 border border-[var(--color-glass-border)] rounded-xl hover:bg-white/10 hover:border-[var(--color-viz-cyan)] transition-colors flex items-center justify-center text-white font-semibold uppercase tracking-wide text-sm"
            >
              {sub}
            </button>
          ))}
        </div>
      );
    } else {
      // Show Streams for 11/12
      const streams = ["PCM", "PCB", "ARTS", "COMMERCE"];
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {streams.map((stream) => (
            <button
              key={stream}
              onClick={() => handleNavigate(stream)}
              className="group p-8 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl hover:bg-white/10 hover:border-[var(--color-viz-purple)] transition-colors flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 mb-4 bg-black/40 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-viz-purple)]/20 transition-colors border border-white/5">
                <Layers className="text-[var(--color-subtle-grey)] group-hover:text-white" />
              </div>
              <span className="text-white font-bold uppercase tracking-widest">{stream}</span>
            </button>
          ))}
        </div>
      );
    }
  };

  const renderSubjects1112 = () => {
    if (loading) return <div className="text-center text-[var(--color-subtle-grey)] py-10 animate-pulse">Loading Subjects...</div>;
    
    // Extract unique subjects
    const subjects = Array.from(new Set(resources.map(r => r.subject)));
    if (subjects.length === 0) return <div className="text-center text-white py-10">No subjects found for this stream.</div>;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => handleNavigate(sub)}
            className="p-6 bg-white/5 border border-[var(--color-glass-border)] rounded-xl hover:bg-[var(--color-bk-lime)]/10 hover:border-[var(--color-bk-lime)]/50 transition-colors flex items-center justify-center text-white font-semibold uppercase tracking-wide text-sm text-center"
          >
            {sub}
          </button>
        ))}
      </div>
    );
  };

  const renderChapters = () => {
    const subject = is11or12 ? currentSubject1112 : currentStreamOrSubject910;
    const chapters = is11or12 ? resources.filter(r => r.subject === subject) : MOCK_CHAPTERS_9_10;

    return (
      <div className="overflow-y-auto max-h-[500px] flex flex-col gap-3 pr-2 custom-scrollbar">
        {chapters.map((chap, idx) => (
          <button
            key={idx}
            onClick={() => handleNavigate(chap.chapterName)}
            className="flex items-center justify-between p-5 bg-black/20 border border-[var(--color-glass-border)] rounded-xl hover:bg-white/10 hover:border-white/20 transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <span className="text-[var(--color-subtle-grey)] font-mono text-sm group-hover:text-white transition-colors">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-white font-medium text-lg">{chap.chapterName}</span>
            </div>
            <ArrowLeft className="rotate-180 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-bk-lime)]" size={18} />
          </button>
        ))}
      </div>
    );
  };

  const renderResourceHub = () => {
    const targetChapter = is11or12 ? currentChapter : path[2]; // For 9/10 it's path[2]
    const subject = is11or12 ? currentSubject1112 : currentStreamOrSubject910;
    
    // Find the exact resource row
    const chapData = (is11or12 ? resources : MOCK_CHAPTERS_9_10).find(
      r => r.subject === subject && r.chapterName === targetChapter
    );

    if (!chapData) return <div className="text-center text-white py-10">Chapter data not found.</div>;

    const resourceSections = [
      { key: "notes", title: "Notes", icon: <FileText size={24} />, url: chapData.notes, color: "var(--color-viz-cyan)" },
      { key: "pyqs", title: "PYQs", icon: <FileQuestion size={24} />, url: chapData.pyqs, color: "var(--color-bk-lime)" },
      { key: "lectures", title: "Lectures", icon: <Video size={24} />, url: chapData.lectures, color: "var(--color-viz-purple)" },
      { key: "extraTips", title: "Extra Tips", icon: <Lightbulb size={24} />, url: chapData.extraTips, color: "#f59e0b" },
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white text-center mb-8 border-b border-white/10 pb-4">{targetChapter}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {resourceSections.map((res) => (
            <button
              key={res.key}
              onClick={() => openLink(res.url)}
              className="group flex flex-col items-center justify-center p-8 bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-2xl hover:bg-white/10 transition-all duration-300"
              style={{ '--hover-color': res.color } as React.CSSProperties}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors bg-black/30 border border-white/5 group-hover:border-[var(--hover-color)]"
                style={{ color: "var(--color-subtle-grey)" }}
              >
                <div className="group-hover:text-[var(--hover-color)] transition-colors">
                  {res.icon}
                </div>
              </div>
              <span className="text-white font-bold uppercase tracking-widest text-sm">{res.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Resolve which level to render based on path
  const getRenderLevel = () => {
    if (path.length === 0) return renderLevel1();
    if (path.length === 1) return renderLevel2();
    if (is11or12) {
      if (path.length === 2) return renderSubjects1112();
      if (path.length === 3) return renderChapters();
      if (path.length === 4) return renderResourceHub();
    } else {
      if (path.length === 2) return renderChapters();
      if (path.length === 3) return renderResourceHub();
    }
  };

  // Breadcrumb string
  const breadcrumb = path.join(" / ");

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
          <BookOpen className="text-[var(--color-bk-lime)]" size={36} />
          Learning Hub
        </h2>
        <p className="text-[var(--color-subtle-grey)] mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Navigate your curriculum, access structured chapters, and download premium resources directly from our curated cloud libraries.
        </p>
      </div>

      {/* Main Glassmorphism Rectangle */}
      <div className="w-full glass-card rounded-3xl p-6 lg:p-10 min-h-[600px] flex flex-col relative overflow-hidden ring-1 ring-white/5 backdrop-blur-[16px] bg-black/40">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-[var(--color-glass-border)] pb-6 mb-8 min-h-[40px]">
          <div className="flex-1">
            <AnimatePresence>
              {path.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm hover:text-[var(--color-bk-lime)] transition-colors"
                >
                  <ArrowLeft size={18} /> BACK
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex-1 text-center">
            {path.length > 0 && (
              <span className="text-[10px] uppercase text-[var(--color-subtle-grey)] tracking-widest font-mono">
                {breadcrumb}
              </span>
            )}
          </div>

          <div className="flex-1 flex justify-end">
            {/* Board Selector Toggle */}
            <div className="flex items-center bg-black/50 rounded-full p-1 border border-[var(--color-glass-border)]">
              {(["BSEB", "CBSE"] as BoardType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    board === b 
                      ? "bg-[var(--color-viz-cyan)] text-black shadow-[0_0_10px_var(--color-viz-cyan)]" 
                      : "text-[var(--color-subtle-grey)] hover:text-white"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={path.length}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {getRenderLevel()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
