"use client";

import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  User,
  Layers,
  FolderKanban,
  Trophy,
  Mail,
  Send,
  Award,
  Briefcase,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";
import useClickOutside from "@/hooks/useClickOutside";

const transition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.25,
};

const NAV_ITEMS = [
  {
    id: "about",
    title: "About",
    icon: User,
    href: "#about",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-zinc-700">
          <span className="font-medium text-base">Soham Kangle</span>
          <span className="text-sm">Data Engineering & AI Architect</span>
        </div>
        <a
          href="#about"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          View Full Profile
        </a>
      </div>
    ),
  },
  {
    id: "skills",
    title: "Skills",
    icon: Layers,
    href: "#skills",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700 text-sm">
          Core competencies in Distributed Systems, Pipelines, and Vector DBs.
        </div>
        <a
          href="#skills"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          Explore Skills
        </a>
      </div>
    ),
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    href: "#experience",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700 text-sm">
          Professional roles in Data Analytics & Product Growth.
        </div>
        <a
          href="#experience"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          View Experience
        </a>
      </div>
    ),
  },
  {
    id: "work",
    title: "Work",
    icon: FolderKanban,
    href: "#work",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-zinc-700 text-sm">
          <div className="space-y-1">
            <div>HIREPATH_AI.prod</div>
            <div>Identity_Network.sys</div>
            <div>Agentic_Platform.exe</div>
          </div>
        </div>
        <a
          href="#work"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          Manage Projects
        </a>
      </div>
    ),
  },
  {
    id: "journey",
    title: "Journey",
    icon: Trophy,
    href: "#journey",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700 text-sm">
          GUVi National Hackathon Finalist and Open Source Contributor.
        </div>
        <a
          href="#journey"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          View Timeline
        </a>
      </div>
    ),
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: Award,
    href: "#certificates",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-zinc-700 text-sm">
          <span>10+ Professional Certifications</span>
          <span className="text-zinc-500">Cloud & Data Engineering</span>
        </div>
        <a
          href="#certificates"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          Verify Credentials
        </a>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    href: "#contact",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700 text-sm">
          Ready to architect scalable solutions? Let's connect.
        </div>
        <a
          href="#contact"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          Send Message
        </a>
      </div>
    ),
  },
  {
    id: "talk",
    title: "Let’s talk",
    icon: Send,
    href: "mailto:kanglesoham11@gmail.com",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700 text-sm">
          Open mail client to send a direct email to kanglesoham11@gmail.com.
        </div>
        <a
          href="mailto:kanglesoham11@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="relative h-8 w-full scale-100 select-none appearance-none flex items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
        >
          Open Mail
        </a>
      </div>
    ),
  },
];

export function NavDock() {
  const [active, setActive] = useState<string | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  // Handle clicking link inside panel to close panel
  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(false);
      setActive(null);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <MotionConfig transition={transition}>
      <div
        className="fixed bottom-4 left-1/2 z-[101] -translate-x-1/2 max-w-[95vw]"
        ref={ref}
      >
        <div className="h-full w-full rounded-2xl border border-[rgba(170,190,215,0.25)] bg-[rgba(237,245,255,0.7)] backdrop-blur-xl shadow-lg">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{
                    width: maxWidth,
                  }}
                >
                  <div ref={contentRef} className="p-4">
                    {NAV_ITEMS.map((item) => {
                      const isSelected = active === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
                            className={`px-2 pt-2 ${
                              isSelected ? "block" : "hidden"
                            }`}
                          >
                            {item.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div ref={menuRef} className="flex justify-center">
            <Dock className="!border-none !bg-transparent !backdrop-blur-none !shadow-none !px-3 !pb-2.5 !pt-2.5 items-end flex-nowrap w-max">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!isOpen) setIsOpen(true);
                      if (active === item.id) {
                        setIsOpen(false);
                        setActive(null);
                        return;
                      }
                      setActive(item.id);
                    }}
                    className="focus:outline-none"
                    aria-label={item.title}
                  >
                    <DockItem
                      className={`aspect-square rounded-full transition-colors ${
                        isActive
                          ? "bg-[rgba(170,190,215,0.5)]"
                          : "bg-[rgba(237,245,255,0.75)] hover:bg-[rgba(170,190,215,0.4)]"
                      }`}
                    >
                      <DockLabel>{item.title}</DockLabel>
                      <DockIcon>
                        <item.icon className={`h-1/2 w-1/2 text-foreground transition-transform ${
                          isActive ? "scale-110" : ""
                        }`} />
                      </DockIcon>
                    </DockItem>
                  </button>
                );
              })}
            </Dock>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
