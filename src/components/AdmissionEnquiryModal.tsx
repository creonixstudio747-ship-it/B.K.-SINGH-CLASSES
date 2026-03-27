"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdmissionEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionEnquiryModal({ isOpen, onClose }: AdmissionEnquiryModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    class: "",
    stream: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://sheetdb.io/api/v1/jyo8f6wd62qm9", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              "FULL NAME": formData.name,
              "EMAIL": formData.email,
              "MOBILE": formData.mobile,
              "CLASS": formData.class,
              "STREAM": formData.stream,
            }
          ]
        }),
      });

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          router.push("/");
          // Reset status and form data
          setStatus("idle");
          setFormData({ name: "", email: "", mobile: "", class: "", stream: "" });
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#111111] border border-[var(--color-glass-border)] rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-glass-border)]">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">Admission Enquiry</h2>
              <button
                onClick={onClose}
                className="p-2 text-[var(--color-subtle-grey)] hover:text-white hover:bg-[var(--color-glass)] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <CheckCircle size={64} className="text-[var(--color-bk-lime)]" />
                  <h3 className="text-2xl font-bold text-white">Success!</h3>
                  <p className="text-[var(--color-subtle-grey)]">
                    Your enquiry has been submitted. We will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 border border-red-500/50 bg-red-500/10 text-red-500 rounded-lg">
                      <AlertCircle size={20} />
                      <span className="text-sm">Failed to submit. Please try again.</span>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-subtle-grey)] uppercase tracking-wider">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] p-3 text-white rounded-md focus:border-[var(--color-bk-lime)] focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-subtle-grey)] uppercase tracking-wider">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] p-3 text-white rounded-md focus:border-[var(--color-bk-lime)] focus:outline-none transition-colors"
                      placeholder="example@domain.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-subtle-grey)] uppercase tracking-wider">Mobile *</label>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] p-3 text-white rounded-md focus:border-[var(--color-bk-lime)] focus:outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--color-subtle-grey)] uppercase tracking-wider">Class *</label>
                      <select
                        required
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] p-3 text-white rounded-md focus:border-[var(--color-bk-lime)] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" disabled className="bg-[#111111]">Select Class</option>
                        <option value="11th" className="bg-[#111111]">11th</option>
                        <option value="12th" className="bg-[#111111]">12th</option>
                        <option value="Dropper" className="bg-[#111111]">Dropper</option>
                        <option value="Foundation" className="bg-[#111111]">Foundation (9th/10th)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--color-subtle-grey)] uppercase tracking-wider">Stream</label>
                      <select
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className="w-full bg-[var(--color-glass)] border border-[var(--color-glass-border-highlight)] p-3 text-white rounded-md focus:border-[var(--color-bk-lime)] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#111111]">N/A / None</option>
                        <option value="PCM" className="bg-[#111111]">PCM</option>
                        <option value="PCB" className="bg-[#111111]">PCB</option>
                        <option value="PCMB" className="bg-[#111111]">PCMB</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-[var(--color-bk-lime)] text-black font-bold uppercase tracking-wider rounded-none hover:bg-[var(--color-bk-lime-hover)] shadow-[0_0_20px_rgba(163,255,0,0.2)] hover:shadow-[0_0_30px_rgba(163,255,0,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
