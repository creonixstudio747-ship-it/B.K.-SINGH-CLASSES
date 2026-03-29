"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your AI Mentor for B.K. Singh Classes. I can help you find notes, PYQs, and answer questions. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.response || "Sorry, I received an empty response."
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I encountered a glitch in my system. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#0B0B0C] rounded-2xl border border-[var(--color-viz-cyan)]/30 shadow-[0_0_30px_rgba(0,180,216,0.2)] transition-all duration-500 origin-bottom-right ${isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[var(--color-viz-cyan)]/10 to-[var(--color-viz-purple)]/10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">AI Mentor</h3>
              <p className="text-[var(--color-bk-lime)] text-[10px] uppercase font-mono tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bk-lime)] animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 pb-0 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-white/10 text-white" : "bg-[var(--color-viz-cyan)]/20 text-[var(--color-viz-cyan)] border border-[var(--color-viz-cyan)]/30"}`}>
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-white/10 to-white/5 text-white rounded-tr-sm border border-white/5" 
                    : "bg-[#111115] text-white/90 rounded-tl-sm border border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.5)] whitespace-pre-wrap"
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 shrink-0 rounded-full bg-[var(--color-viz-cyan)]/20 text-[var(--color-viz-cyan)] border border-[var(--color-viz-cyan)]/30 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#111115] text-white/90 rounded-tl-sm border border-white/5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[var(--color-viz-cyan)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[var(--color-viz-cyan)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[var(--color-viz-cyan)] rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0B0B0C] rounded-b-2xl">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-[#111115] text-white text-sm rounded-full pl-5 pr-12 py-3 border border-white/10 focus:outline-none focus:border-[var(--color-viz-cyan)]/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.1)] transition-all placeholder:text-white/30"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI Mentor"
        className={`fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-viz-cyan)] to-[var(--color-viz-purple)] shadow-[0_0_30px_rgba(0,180,216,0.3)] hover:shadow-[0_0_40px_rgba(157,78,221,0.5)] transition-all duration-300 pointer-events-auto border border-white/20 ${isOpen ? "rotate-90 scale-90" : "hover:scale-110"}`}
      >
        <div className="absolute inset-1 rounded-full bg-[#0B0B0C] flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-[#111115]">
          <Sparkles className={`absolute text-[var(--color-viz-cyan)]/30 animate-spin-slow duration-[3000ms] transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} size={36} />
          
          {isOpen ? (
            <X className="text-white relative z-10 transition-transform duration-300 rotate-0" size={24} />
          ) : (
            <MessageSquare className="text-white relative z-10 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" size={24} />
          )}
          
          {/* Active Ping Dot */}
          {!isOpen && (
            <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[var(--color-bk-lime)] rounded-full border-2 border-[#0B0B0C] shadow-[0_0_10px_var(--color-bk-lime)] z-20">
              <div className="absolute inset-0 bg-[var(--color-bk-lime)] rounded-full animate-ping opacity-75"></div>
            </div>
          )}
        </div>
      </button>
    </>
  );
}
