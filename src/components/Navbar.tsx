"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "glass-nav py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Side: Logo & Welcome Banner */}
        <Link href="/" className="flex flex-col gap-1 group">
          {user && userData && (
            <span className="text-[10px] uppercase font-bold text-[var(--color-bk-lime)] tracking-widest pl-0.5 animate-in fade-in duration-500">
              Welcome, {userData.name.split(" ")[0]}
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-light tracking-[0.2em] text-white leading-none">
              B.K. SINGH
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-subtle-grey)] group-hover:text-white transition-colors">
              CLASSES
            </span>
          </div>
        </Link>

        {/* Right Side: Navbar Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {loading ? (
             <div className="w-5 h-5 border-2 border-[var(--color-glass-border)] border-t-[var(--color-viz-cyan)] rounded-full animate-spin"></div>
          ) : user ? (
            <>
              {/* Specialized Admin Button Route Guard */}
              {user.email === "bksinghclasses001@gmail.com" && (
                <Link href="/admin-dashboard" className="hidden sm:block text-xs font-bold text-white uppercase tracking-wider hover:text-[var(--color-bk-lime)] transition-colors">
                  Admin Hub
                </Link>
              )}
              
              <Link href="/profile" className="hidden sm:block text-xs font-bold text-[var(--color-subtle-grey)] uppercase tracking-wider hover:text-white transition-colors">
                Profile
              </Link>
              
              <button 
                onClick={handleLogout}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-300 hover:border-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
              >
                <LogOut size={16} className="text-red-400/70 group-hover:text-red-400 transition-colors" />
                <span className="text-sm font-medium text-red-50 group-hover:text-red-300 transition-colors hidden sm:block">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] transition-all duration-300 hover:border-[var(--color-bk-lime)] hover:shadow-[0_0_15px_rgba(163,255,0,0.15)]"
            >
              <User size={16} className="text-[var(--color-subtle-grey)] group-hover:text-[var(--color-bk-lime)] transition-colors" />
              <span className="text-sm font-medium text-white group-hover:text-[var(--color-bk-lime)] transition-colors">
                Login / Sign Up
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
