"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { Loader2 } from "lucide-react";

export default function AuthPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    class: "11th",
    stream: "None",
    parentName: "",
    parentMobile: "",
    password: ""
  });

  // Architect's Stream Logic: Force disable/reset Stream if Class is 9 or 10
  const isStreamDisabled = signupData.class === "9th" || signupData.class === "10th";
  
  useEffect(() => {
    if (isStreamDisabled) {
      setSignupData(prev => ({ ...prev, stream: "None" }));
    }
  }, [isStreamDisabled]);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      router.push("/");
    } catch {
      setError("Invalid Email or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: signupData.name });

      // Save complex fields to Firestore matching Architect's request
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: signupData.name,
        email: signupData.email,
        mobile: signupData.mobile,
        class: signupData.class,
        stream: signupData.stream,
        parentName: signupData.parentName,
        parentMobile: signupData.parentMobile,
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create an account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          name: result.user.displayName || "Google User",
          email: result.user.email,
          class: "11th", 
          stream: "None",
          mobile: "",
          parentName: "",
          parentMobile: "",
          createdAt: serverTimestamp(),
        });
      }
      
      router.push("/");
    } catch (err: any) {
      setError("Failed to authenticate with Google. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-12 px-4 relative">
      {/* Floating Geometric Orbs (Antigravity background feel) */}
      <div className="fixed top-20 left-[10%] w-64 h-64 bg-[var(--color-viz-cyan)] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse duration-10000"></div>
      <div className="fixed bottom-10 right-[10%] w-80 h-80 bg-[var(--color-viz-purple)] rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse duration-7000"></div>

      {/* Main Glassmorphism Container */}
      <div className={`w-full glass-card rounded-[2rem] p-6 sm:p-10 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-[30px] relative z-10 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${activeTab === 'login' ? 'max-w-md' : 'max-w-2xl'}`}>
        
        {/* Toggle Tabs */}
        <div className="flex bg-white/5 rounded-full p-1 mb-8 border border-white/5">
          <button 
            type="button"
            onClick={() => { setError(""); setActiveTab("login"); }}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === "login" ? "bg-[var(--color-viz-cyan)] text-black shadow-[0_0_15px_rgba(0,180,216,0.3)]" : "text-[var(--color-subtle-grey)] hover:text-white"}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => { setError(""); setActiveTab("signup"); }}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === "signup" ? "bg-[var(--color-viz-purple)] text-white shadow-[0_0_15px_rgba(157,78,221,0.3)]" : "text-[var(--color-subtle-grey)] hover:text-white"}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm p-3 rounded-xl mb-6 text-center backdrop-blur-md">
            {error}
          </div>
        )}

        {/* --- LOGIN VIEW --- */}
        {activeTab === "login" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[var(--color-viz-cyan)] focus:bg-[#0A0A0C]/80 focus:shadow-[0_0_20px_rgba(0,180,216,0.1)] transition-all placeholder:text-white/20"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[var(--color-viz-cyan)] focus:bg-[#0A0A0C]/80 focus:shadow-[0_0_20px_rgba(0,180,216,0.1)] transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-8 h-14 bg-white text-black font-extrabold uppercase tracking-widest text-sm rounded-2xl hover:bg-[var(--color-viz-cyan)] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,180,216,0.4)]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign In"}
              </button>
            </form>
          </div>
        )}

        {/* --- SIGN UP VIEW --- */}
        {activeTab === "signup" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleSignupSubmit} className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-4">
              
              {/* Full Name (Single Column) */}
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 focus:shadow-[0_0_20px_rgba(157,78,221,0.1)] transition-all placeholder:text-white/20"
                  placeholder="Student Name"
                />
              </div>

              {/* Email & Mobile (Two Column) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all placeholder:text-white/20"
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    name="mobile"
                    value={signupData.mobile}
                    onChange={handleSignupChange}
                    required
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all placeholder:text-white/20"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* Class & Stream (Two Column) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Class</label>
                  <select 
                    name="class"
                    value={signupData.class}
                    onChange={handleSignupChange}
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all appearance-none cursor-pointer"
                  >
                    <option value="9th">9th Standard</option>
                    <option value="10th">10th Standard</option>
                    <option value="11th">11th Standard</option>
                    <option value="12th">12th Standard</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ml-1 transition-colors ${isStreamDisabled ? 'text-white/20' : 'text-[var(--color-subtle-grey)]'}`}>Academic Stream</label>
                  <select 
                    name="stream"
                    value={signupData.stream}
                    onChange={handleSignupChange}
                    disabled={isStreamDisabled}
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all appearance-none disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="None">None (General)</option>
                    {!isStreamDisabled && (
                      <>
                        <option value="PCM">PCM</option>
                        <option value="PCB">PCB</option>
                        <option value="Arts">Arts</option>
                        <option value="Commerce">Commerce</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Parent Info (Two Column) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Parent's Name</label>
                  <input 
                    type="text" 
                    name="parentName"
                    value={signupData.parentName}
                    onChange={handleSignupChange}
                    required
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all placeholder:text-white/20"
                    placeholder="Guardian Name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Parent's Mobile</label>
                  <input 
                    type="tel" 
                    name="parentMobile"
                    value={signupData.parentMobile}
                    onChange={handleSignupChange}
                    required
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all placeholder:text-white/20"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-subtle-grey)] uppercase tracking-widest mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-viz-purple)] focus:bg-[#0A0A0C]/80 transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-[var(--color-viz-purple)] to-[var(--color-viz-cyan)] text-white font-extrabold uppercase tracking-widest text-sm rounded-2xl hover:brightness-125 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_20px_rgba(157,78,221,0.2)] hover:shadow-[0_0_30px_rgba(157,78,221,0.5)] hidden-scroll"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : "Register Now"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="w-full flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-[var(--color-subtle-grey)] text-[10px] uppercase font-bold tracking-widest">Or</span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

      </div>
    </div>
  );
}
