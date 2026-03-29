"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserData } from "@/context/AuthContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Search, ShieldCheck, Users, Mail, GraduationCap, Phone, User as UserIcon } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [students, setStudents] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
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
      console.error("Failed to fetch students.", err);
    } finally {
      setFetching(false);
    }
  };

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

  if (!user || user.email !== "bksinghclasses001@gmail.com") return null;

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-[85vh] w-full max-w-[95%] mx-auto px-4">
      {/* Header Panel */}
      <div className="glass-card rounded-[2rem] p-6 lg:p-8 mb-8 border border-[var(--color-glass-border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bk-lime)] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-glass)] border border-[var(--color-glass-border)] flex items-center justify-center">
            <ShieldCheck className="text-[var(--color-bk-lime)]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Admin Terminal</h1>
            <p className="text-[var(--color-subtle-grey)] text-xs tracking-widest uppercase font-bold flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bk-lime)] animate-ping"></span>
              Live Database Access
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-grey)]" size={16} />
          <input 
            type="text" 
            placeholder="Search name, email, or class..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050505]/50 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-viz-cyan)] shadow-inner transition-colors"
          />
        </div>
      </div>

      {/* Database Table Panel */}
      <div className="glass-card rounded-[2rem] py-6 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden relative">
        <div className="px-6 pb-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
            <Users size={16} className="text-[var(--color-viz-cyan)]" /> 
            Registered Students <span className="bg-[var(--color-viz-cyan)]/20 text-[var(--color-viz-cyan)] px-2 py-0.5 rounded border border-[var(--color-viz-cyan)]/30 text-xs ml-2">{filteredStudents.length}</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-black/40 text-[var(--color-subtle-grey)] text-[10px] uppercase tracking-widest">
                <th className="px-6 py-5 font-bold">Student Identity</th>
                <th className="px-6 py-5 font-bold">Father's Name</th>
                <th className="px-6 py-5 font-bold">Class & Stream</th>
                <th className="px-6 py-5 font-bold">Mobile / Parents Mobile</th>
                <th className="px-6 py-5 font-bold">Email Address</th>
                <th className="px-6 py-5 font-bold">Database UID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold group-hover:text-[var(--color-viz-cyan)] transition-colors">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white/80 flex items-center gap-2"><UserIcon size={12} className="text-[var(--color-subtle-grey)]"/> {student.parentName || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 bg-[#050505]/80 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-inner">
                        <GraduationCap size={14} className="text-[var(--color-viz-purple)]" />
                        {student.class} <span className="text-white/30 mx-1">|</span> <span className={student.stream === 'None' ? 'text-white/40 font-normal' : 'text-[var(--color-viz-cyan)]'}>{student.stream || "None"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1 text-xs">
                          <span className="text-white/90 flex items-center gap-2"><Phone size={10} className="text-[var(--color-viz-cyan)]"/> User: {student.mobile || "N/A"}</span>
                          <span className="text-white/60 flex items-center gap-2"><Phone size={10} className="text-[var(--color-viz-purple)]"/> Guar: {student.parentMobile || "N/A"}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[var(--color-subtle-grey)] text-xs flex items-center gap-2">
                        <Mail size={12} /> {student.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-[10px] text-white/40 bg-black/60 px-2 py-1 rounded border border-white/5 group-hover:border-white/20 transition-colors">
                        {student.uid}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-16 text-center text-[var(--color-subtle-grey)] text-sm">
                    No student records found.
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
