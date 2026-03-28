"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", class: "11th" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        class: formData.class,
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create an account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
          class: "11th", // Defaulting to 11th
          createdAt: serverTimestamp(),
        });
      }
      
      router.push("/");
    } catch (err: any) {
      setError("Failed to sign up with Google. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] pt-20 pb-10 px-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-[var(--color-glass-border)] shadow-2xl relative overflow-hidden">
        {/* Neon Glow Behind */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--color-viz-purple)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[var(--color-viz-cyan)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-2 text-center">
            Join <span className="text-[var(--color-bk-lime)]">B.K. Singh</span>
          </h2>
          <p className="text-[var(--color-subtle-grey)] text-sm text-center mb-8 font-medium">Create your premium academic account.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-6 text-center break-words">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[var(--color-subtle-grey)] uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-xl px-4 py-3 text-white placeholder-[var(--color-subtle-grey)] focus:outline-none focus:border-[var(--color-viz-cyan)] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-subtle-grey)] uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-xl px-4 py-3 text-white placeholder-[var(--color-subtle-grey)] focus:outline-none focus:border-[var(--color-viz-cyan)] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--color-subtle-grey)] uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-xl px-4 py-3 text-white placeholder-[var(--color-subtle-grey)] focus:outline-none focus:border-[var(--color-viz-cyan)] transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-subtle-grey)] uppercase tracking-wider mb-2">Class</label>
                <select 
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-viz-cyan)] transition-colors appearance-none cursor-pointer"
                >
                  <option value="9th">9th Class</option>
                  <option value="10th">10th Class</option>
                  <option value="11th">11th Class</option>
                  <option value="12th">12th Class</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full group mt-4 h-12 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[var(--color-bk-lime)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  Register Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="w-full flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--color-glass-border)]"></div>
            <span className="text-[var(--color-subtle-grey)] text-xs uppercase font-bold">Or</span>
            <div className="flex-1 h-px bg-[var(--color-glass-border)]"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-12 bg-[#0B0B0C] border border-[var(--color-glass-border)] text-white font-bold uppercase tracking-wider rounded-xl hover:border-[var(--color-viz-purple)] hover:bg-[#1a1a1c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-[var(--color-subtle-grey)] text-sm mt-6">
            Already have an account? <Link href="/login" className="text-white hover:text-[var(--color-bk-lime)] hover:underline transition-colors font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
