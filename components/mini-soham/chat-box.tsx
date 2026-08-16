"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User } from "lucide-react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top";
}

export function ChatBox({ isOpen, onClose, position = "left" }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Mini Soham. Ask me anything about my work, skills, or journey!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading && isOpen) {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Send history (excluding the first welcome message if we want to save tokens, but keeping it is fine)
      const apiMessages = [...messages, userMsg].filter(m => m.role !== "system");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error(data.error || "Failed to fetch");
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm experiencing some neural interference right now. Try again!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute bottom-[110%] left-1/2 -translate-x-1/2 md:bottom-auto md:top-0 w-[85vw] max-w-[320px] h-[400px] z-[120] pointer-events-auto ${
            position === "right" 
              ? "md:left-full md:translate-x-4 md:right-auto" 
              : "md:right-full md:-translate-x-4 md:left-auto"
          }`}
        >
          {/* Glassmorphic Container */}
          <div className="flex flex-col h-full w-full rounded-2xl border border-[rgba(170,190,215,0.4)] bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(170,190,215,0.3)] bg-white/30 dark:bg-black/20">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Bot size={14} />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
                </div>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Mini Soham</span>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-full ${
                    msg.role === "user" 
                      ? "bg-zinc-800 text-white" 
                      : "bg-blue-500 text-white"
                  }`}>
                    {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`px-3 py-2 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-zinc-800 text-white rounded-tr-sm"
                      : "bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-tl-sm border border-zinc-200/50"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 mr-auto"
                >
                  <div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white">
                    <Bot size={12} />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-white/80 dark:bg-zinc-800/80 rounded-tl-sm border border-zinc-200/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/50 dark:bg-black/50 border-t border-[rgba(170,190,215,0.3)]">
              <form 
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-inner px-2 py-1"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
