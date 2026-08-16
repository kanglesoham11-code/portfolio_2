"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TUTORIAL_DATA } from "./mini-soham/tutorial-data";
import { MiniSohamDialogue } from "./mini-soham/mini-soham-dialogue";
import { ChatBox } from "./mini-soham/chat-box";

const DESKTOP_POSITIONS = {
  hidden: { opacity: 0, x: "0vw", y: "60vh", scale: 0.5, rotateY: 0 },
  about: { opacity: 1, x: "32vw", y: "-5vh", scale: 1, rotateY: -10 },
  skills: { opacity: 1, x: "-32vw", y: "-2vh", scale: 0.9, rotateY: 10 },
  work: { opacity: 1, x: "32vw", y: "5vh", scale: 1.15, rotateY: -15 }, // WOW moment
  experience: { opacity: 1, x: "32vw", y: "-5vh", scale: 0.9, rotateY: -10 },
  journey: { opacity: 1, x: "32vw", y: "-5vh", scale: 0.9, rotateY: -10 }, // Anchor Right
  education: { opacity: 1, x: "32vw", y: "0vh", scale: 0.9, rotateY: -10 }, // Anchor Right
  contact: { opacity: 1, x: "32vw", y: "-5vh", scale: 1.1, rotateY: -10 }, // Anchor Right
};

const MOBILE_POSITIONS = {
  hidden: { opacity: 0, x: "0vw", y: "50vh", scale: 0.4, rotateY: 0 },
  about: { opacity: 1, x: "25vw", y: "25vh", scale: 0.6, rotateY: -5 },
  skills: { opacity: 1, x: "-25vw", y: "25vh", scale: 0.6, rotateY: 5 },
  work: { opacity: 1, x: "25vw", y: "20vh", scale: 0.7, rotateY: -10 },
  experience: { opacity: 1, x: "25vw", y: "25vh", scale: 0.6, rotateY: -5 },
  journey: { opacity: 1, x: "25vw", y: "25vh", scale: 0.6, rotateY: -5 },
  education: { opacity: 1, x: "25vw", y: "25vh", scale: 0.6, rotateY: -5 },
  contact: { opacity: 1, x: "25vw", y: "20vh", scale: 0.7, rotateY: -5 },
};

export function MiniSoham() {
  const [activeSection, setActiveSection] = useState<keyof typeof DESKTOP_POSITIONS>("hidden");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const ids = ["about", "skills", "experience", "work", "journey", "education", "contact"];
          let newActive: keyof typeof DESKTOP_POSITIONS = "hidden";
          let activeRect: DOMRect | null = null;

          if (window.scrollY < 200) {
            if (activeSection !== "hidden") {
              setActiveSection("hidden");
              setDialogueIndex(0);
            }
            ticking = false;
            return;
          }

          for (const id of ids) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
                 newActive = id as keyof typeof DESKTOP_POSITIONS;
                 activeRect = rect;
              } else if (rect.top < window.innerHeight * 0.7) {
                 newActive = id as keyof typeof DESKTOP_POSITIONS;
                 activeRect = rect;
              }
            }
          }

          if (newActive !== activeSection) {
            setActiveSection(newActive);
          }

          if (newActive !== "hidden" && activeRect) {
            const startY = window.innerHeight * 0.7;
            const totalScrollable = activeRect.height; 
            const currentScroll = startY - activeRect.top;
            
            // Map the scroll distance completely to 0->1
            const rawProgress = currentScroll / totalScrollable;
            const progress = Math.max(0, Math.min(1, rawProgress));
            
            const scriptLen = TUTORIAL_DATA[newActive]?.length || 0;
            if (scriptLen > 0) {
              const targetIndex = Math.floor(Math.min(progress, 0.999) * scriptLen);
              setDialogueIndex(targetIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const POSITIONS = isMobile ? MOBILE_POSITIONS : DESKTOP_POSITIONS;
  const currentScript = TUTORIAL_DATA[activeSection] || [];
  const currentMessage = currentScript[dialogueIndex];
  
  const isDialogueVisible = activeSection !== "hidden" && !!currentMessage;

  let bubblePosition: "left" | "right" | "top" = "left";
  if (activeSection === "skills") {
    bubblePosition = "right";
  } else if (["experience", "journey", "education", "contact"].includes(activeSection)) {
    bubblePosition = "left"; 
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <motion.div
        initial="hidden"
        animate={activeSection}
        variants={POSITIONS}
        transition={{ type: "spring", stiffness: 40, damping: 18, mass: 1.2 }}
        className="relative"
      >
        <div className="relative drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full scale-75 mix-blend-screen pointer-events-none" />
          
          <motion.img
            animate={{
              y: ["-8px", "8px", "-8px"],
              rotateZ: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            src="/images/soham_clone.png"
            alt="Mini Soham Guide"
            onClick={() => setIsChatOpen((prev) => !prev)}
            className="w-[22vh] md:w-[32vh] h-auto object-contain relative z-10 select-none pointer-events-auto cursor-pointer drop-shadow-xl hover:scale-105 transition-transform"
            draggable={false}
          />

          <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} position={bubblePosition} />

          <MiniSohamDialogue 
            message={currentMessage} 
            isVisible={isDialogueVisible} 
            position={bubblePosition}
          />
        </div>
      </motion.div>
    </div>
  );
}
