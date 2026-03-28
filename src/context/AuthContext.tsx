"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

export interface UserData {
  name: string;
  email: string;
  class: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Absolute fail-safe override
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    if (!auth) {
      console.error("Firebase auth is null. Check NEXT_PUBLIC_FIREBASE_API_KEY.");
      setLoading(false);
      return;
    }

    try {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            setUser(firebaseUser);
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
              setUserData(docSnap.data() as UserData);
            } else {
              setUserData(null);
            }
          } else {
            setUser(null);
            setUserData(null);
          }
        } catch (error) {
          console.error("Firebase Auth State Error:", error);
        } finally {
          setLoading(false);
        }
      });
    } catch (initError) {
      console.error("Critical Firebase Initialization Error (Check API Keys):", initError);
      setLoading(false); // Force loading off if Firebase totally fails to boot
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
