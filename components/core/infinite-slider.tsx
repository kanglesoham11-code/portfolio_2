"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  direction?: "left" | "right";
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 24,
  direction = "left",
}: InfiniteSliderProps) {
  const [hovered, setHovered] = useState(false);

  const xStart = direction === "left" ? "0%" : `calc(-50% - ${gap / 2}px)`;
  const xEnd = direction === "left" ? `calc(-50% - ${gap / 2}px)` : "0%";

  return (
    <div
      className="relative flex overflow-hidden w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gap }}
    >
      <motion.div
        className="flex shrink-0 min-w-max items-center"
        style={{ gap }}
        animate={{ x: [xStart, xEnd] }}
        transition={{
          duration: hovered ? speedOnHover : speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
