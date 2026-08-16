"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MiniSohamDialogueProps {
  message: string;
  isVisible: boolean;
  position?: "left" | "right" | "top";
}

export function MiniSohamDialogue({ message, isVisible, position = "left" }: MiniSohamDialogueProps) {
  let alignmentClasses = "";
  let tailClasses = "";

  if (position === "left") {
    alignmentClasses = "right-[110%] top-[-20%]";
    tailClasses = "right-[-12px] top-[40%] border-t-[8px] border-t-transparent border-l-[14px] border-l-white dark:border-l-[#1a1a1a] border-b-[8px] border-b-transparent drop-shadow-[2px_0_2px_rgba(0,0,0,0.05)]";
  } else if (position === "right") {
    alignmentClasses = "left-[110%] top-[-20%]";
    tailClasses = "left-[-12px] top-[40%] border-t-[8px] border-t-transparent border-r-[14px] border-r-white dark:border-r-[#1a1a1a] border-b-[8px] border-b-transparent drop-shadow-[-2px_0_2px_rgba(0,0,0,0.05)]";
  } else if (position === "top") {
    alignmentClasses = "bottom-[110%] left-1/2 -translate-x-1/2";
    tailClasses = "bottom-[-12px] left-[50%] -translate-x-1/2 border-l-[8px] border-l-transparent border-t-[14px] border-t-white dark:border-t-[#1a1a1a] border-r-[8px] border-r-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]";
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && message && (
        <motion.div
          key={message} // Forces re-animation when message changes
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`absolute ${alignmentClasses} z-[150] min-w-[200px] max-w-[280px] pointer-events-none`}
        >
          <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-black/5 dark:border-white/5">
            <p className="text-[14px] md:text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200 font-medium tracking-tight">
              {message}
            </p>
            {/* The comic speech tail */}
            <div className={`absolute w-0 h-0 ${tailClasses}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
