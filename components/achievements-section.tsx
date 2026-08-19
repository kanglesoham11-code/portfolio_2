"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { SectionHeader } from "./section-header";
import { FaTrophy, FaMedal, FaStar, FaAward } from "react-icons/fa";

const ACHIEVEMENTS = [
  {
    year: "2024–25",
    title: "GUVi National Hackathon — Finalist",
    description:
      "Selected among top student teams nationally for the Cybersecurity Threat Intelligence Agent; recognized for novel adversarial AI application in offensive cyber defense and automated IOC data collection.",
    icon: FaTrophy,
    color: "from-blue-500 to-cyan-400",
  },
  {
    year: "2025",
    title: "Agentic AI Workshop — Winner",
    description:
      "Presented the production-grade HIREPATH 5-agent data pipeline system in live technical evaluations; demonstrated stateful LangGraph orchestration as an alternative to conventional single-step LLM architectures.",
    icon: FaMedal,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2026",
    title: "Speaker, SparkTech International Symposium 2K26",
    description:
      "Presented insights and technical deep dives at the international symposium, recognized as a top academic performer in Algorithms & DBMS.",
    icon: FaStar,
    color: "from-amber-400 to-orange-500",
  },
  {
    year: "Ongoing",
    title: "Academic Excellence",
    description:
      "Consistent top performer in Database Management Systems and Data Structures & Algorithms; independently built production-grade data engineering projects beyond academic curriculum.",
    icon: FaAward,
    color: "from-emerald-400 to-teal-500",
  },
];

function AchievementCard({
  achievement,
  index,
  progress,
  total,
}: {
  achievement: typeof ACHIEVEMENTS[0];
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // Calculate peak scroll positions for this card
  // The scroll progress goes from 0 to 1.
  // We want to divide the scroll space so each card has a "peak" moment.
  const step = 1 / total;
  const peak = index * step + step / 2;
  const start = peak - step;
  const end = peak + step;

  // Animate Z (depth) - comes from deep background (-2000px), stops at 0, goes past camera (+800px)
  const z = useTransform(progress, [start, peak, end], [-2500, 0, 1000]);
  
  // Opacity - fades in, stays solid, fades out quickly as it passes the camera
  const opacity = useTransform(progress, [start + 0.05, peak, peak + 0.1], [0, 1, 0]);
  
  // Rotate X - tilts up from below, flattens, tilts away
  const rotateX = useTransform(progress, [start, peak, end], [45, 0, -45]);
  
  // Y offset - moves up from bottom to center, then flies up
  const y = useTransform(progress, [start, peak, end], [300, 0, -500]);
  
  // Scale - slightly grows as it gets closer
  const scale = useTransform(progress, [start, peak, end], [0.6, 1, 1.4]);

  // Dynamic blur filter based on distance from peak
  const blur = useTransform(progress, [start, peak, end], ["blur(10px)", "blur(0px)", "blur(20px)"]);

  const Icon = achievement.icon;

  return (
    <motion.div
      style={{
        position: "absolute",
        z,
        opacity,
        rotateX,
        y,
        scale,
        filter: blur,
        transformOrigin: "center center",
      }}
      className="flex w-[90%] max-w-2xl flex-col items-center justify-center rounded-3xl border border-[rgba(170,190,215,0.3)] bg-white/40 p-8 text-center backdrop-blur-2xl shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-900/60 md:p-12"
    >
      {/* Decorative Glow Behind Icon */}
      <div className={`absolute -top-6 h-32 w-32 rounded-full bg-gradient-to-br ${achievement.color} opacity-20 blur-3xl`} />
      
      <div className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.color} shadow-lg`}>
        <Icon className="h-10 w-10 text-white drop-shadow-md" />
      </div>

      <div className="mb-3 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-semibold tracking-wider text-foreground/80 ring-1 ring-foreground/10 dark:bg-white/10 dark:text-zinc-300">
        {achievement.year}
      </div>

      <h3 className="mb-4 bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-400 md:text-4xl">
        {achievement.title}
      </h3>

      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
        {achievement.description}
      </p>
    </motion.div>
  );
}

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  return (
    <section id="journey" className="relative bg-zinc-50 dark:bg-zinc-950">
      {/* The scrollable height container (400vh for 4 items means 100vh scroll per item) */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        {/* The sticky viewport container */}
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          
          {/* Header remains fixed at the top of the viewport */}
          <div className="absolute top-12 z-50 w-full md:top-24">
            <SectionHeader
              number="05"
              title="Achievements"
              subtitle="Recognition and milestones"
            />
          </div>

          {/* 3D Perspective Scene */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {ACHIEVEMENTS.map((achievement, i) => (
              <AchievementCard
                key={i}
                achievement={achievement}
                index={i}
                progress={smoothProgress}
                total={ACHIEVEMENTS.length}
              />
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
            }}
            className="absolute bottom-12 flex flex-col items-center gap-2 text-zinc-400"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Scroll to explore</span>
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-700">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-2 h-2 w-2 rounded-full bg-zinc-400"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
