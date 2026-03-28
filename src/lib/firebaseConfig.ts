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

const app = !getApps().length ? initializeApp({
  ...firebaseConfig,
  // Provide dummy strings during Vercel SSR build to prevent "auth/invalid-api-key" crashes.
  // The client will use the real keys securely populated by Webpack.
  apiKey: firebaseConfig.apiKey || "dummy-api-key-for-ssr-build",
  projectId: firebaseConfig.projectId || "dummy-project-for-ssr-build"
}) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
