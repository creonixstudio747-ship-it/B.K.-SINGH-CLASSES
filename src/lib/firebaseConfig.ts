import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: any;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (err) {
  console.error("Firebase app init error:", err);
}

let auth: any = null;
let db: any = null;

if (app) {
  try {
    auth = getAuth(app);
  } catch (err) {
    console.warn("Firebase Auth bypassed during SSR or due to missing config:", err);
  }
  try {
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase DB bypassed during SSR or due to missing config:", err);
  }
}

export { app, auth, db };
