import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.K. Singh Classes",
  description: "The Gold Standard of Academic Excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <div className="bg-blob-purple"></div>
        <div className="bg-blob-cyan"></div>
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
