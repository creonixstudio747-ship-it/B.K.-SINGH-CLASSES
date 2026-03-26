"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "glass-nav py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="text-xl font-light tracking-[0.2em] text-white leading-none">
              B.K. SINGH
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-subtle-grey)] group-hover:text-white transition-colors">
              CLASSES
            </span>
          </div>
        </Link>

        {/* Desktop Nav Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="group flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] transition-all duration-300 hover:border-[var(--color-bk-lime)] hover:shadow-[0_0_15px_rgba(163,255,0,0.15)]"
          >
            <User size={16} className="text-[var(--color-subtle-grey)] group-hover:text-[var(--color-bk-lime)] transition-colors" />
            <span className="text-sm font-medium text-white group-hover:text-[var(--color-bk-lime)] transition-colors">
              Login / Sign Up
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
