"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserData } from "@/context/AuthContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Loader2, Search, ShieldCheck, Users, Mail, GraduationCap } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [students, setStudents] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Wait until auth state is resolved
    if (!loading) {
      // Route Guard
      if (!user || user.email !== "bksinghclasses001@gmail.com") {
        router.replace("/");
      } else {
        fetchStudents();
      }
    }
  }, [user, loading, router]);

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const studentData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        studentData.push(doc.data() as UserData);
      });
      setStudents(studentData);
    } catch (err) {
      console.error("Failed to fetch students, ensuring Vercel stability.", err);
    } finally {
      setFetching(false);
    }
  };

  // 1. Loading State Blockade
  if (loading || fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <div className="w-16 h-16 border-4 border-white/5 border-t-[var(--color-bk-lime)] rounded-full animate-spin"></div>
        <p className="text-[var(--color-subtle-grey)] text-xs tracking-widest uppercase font-bold animate-pulse">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  // 2. Secondary render blockade (prevent flashing before router.replace visually kicks in)
  if (!user || user.email !== "bksinghclasses001@gmail.com") return null;

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-[85vh] w-full max-w-7xl mx-auto px-4">
      {/* Header Panel */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 mb-8 border border-[var(--color-glass-border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bk-lime)] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center">
            <ShieldCheck className="text-[var(--color-bk-lime)]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Admin Terminal</h1>
            <p className="text-[var(--color-subtle-grey)] text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-bk-lime)] animate-pulse"></span>
              Live Database Access
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-grey)]" size={18} />
          <input 
            type="text" 
            placeholder="Search name, email, or class..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0B0C] border border-[var(--color-glass-border)] rounded-full py-3.5 pl-12 pr-6 text-sm text-white placeholder-[var(--color-subtle-grey)] focus:outline-none focus:border-[var(--color-bk-lime)] transition-colors"
          />
        </div>
      </div>

      {/* Database Table Panel */}
      <div className="glass-card rounded-3xl py-6 border border-[var(--color-glass-border)] shadow-xl overflow-hidden relative">
        <div className="px-6 pb-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-bold flex items-center gap-2">
            <Users size={18} className="text-[var(--color-viz-cyan)]" /> 
            Registered Students <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-md text-xs ml-2">{filteredStudents.length}</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[var(--color-subtle-grey)] text-xs uppercase tracking-wider">
                <th className="p-5 font-semibold">Student Identity</th>
                <th className="p-5 font-semibold">Class</th>
                <th className="p-5 font-semibold">Database UID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-white font-bold group-hover:text-[var(--color-viz-cyan)] transition-colors">{student.name}</span>
                        <span className="text-[var(--color-subtle-grey)] text-xs flex items-center gap-1 mt-1">
                          <Mail size={12} /> {student.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="inline-flex items-center gap-2 bg-[var(--color-glass)] border border-[var(--color-glass-border)] px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-sm">
                        <GraduationCap size={16} className="text-[var(--color-viz-purple)]" />
                        {student.class}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="font-mono text-xs text-[var(--color-subtle-grey)] bg-black/40 px-2 py-1 rounded border border-white/5">
                        {student.uid}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-[var(--color-subtle-grey)]">
                    No student records found in current database criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
