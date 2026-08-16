"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

/* ──────────────── Dock context ──────────────── */
interface DockContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockCtx = createContext<DockContextType | null>(null);

function useDock() {
  const ctx = useContext(DockCtx);
  if (!ctx) throw new Error("Dock* components must be used within <Dock>");
  return ctx;
}

/* ──────────────── Item hover context ──────────────── */
const HoverCtx = createContext(false);

/* ──────────────── Dock ──────────────── */
interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

export function Dock({
  className = "",
  magnification = 68,
  distance = 140,
  children,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <DockCtx.Provider value={{ mouseX, mouseY, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          mouseY.set(Infinity);
        }}
        className={`mx-auto flex gap-2 rounded-2xl border border-[rgba(170,190,215,0.25)] bg-white/50 px-3 pb-2.5 pt-2.5 backdrop-blur-xl ${className}`}
        role="toolbar"
      >
        {children}
      </motion.div>
    </DockCtx.Provider>
  );
}

/* ──────────────── DockItem ──────────────── */
interface DockItemProps {
  className?: string;
  isTextPill?: boolean;
  children: React.ReactNode;
}

export function DockItem({ className = "", isTextPill = false, children }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY, magnification, distance } = useDock();
  const [hovered, setHovered] = useState(false);

  const baseSize = 42;
  const maxMagnification = magnification;

  const distFromMouse = useTransform(mouseX, (x: number) => {
    const y = mouseY.get();
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || x === Infinity || y === Infinity) return distance + 1;
    
    const cx = rect.x + rect.width / 2;
    const cy = rect.y + rect.height / 2;
    
    const dx = x - cx;
    const dy = y - cy;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const sizeSync = useTransform(
    distFromMouse,
    [0, distance],
    [maxMagnification, baseSize],
    { clamp: true }
  );

  const size = useSpring(sizeSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const fontSize = useTransform(
    size,
    [baseSize, maxMagnification],
    [0.72, 1.1]
  );

  const paddingX = useTransform(
    size,
    [baseSize, maxMagnification],
    [0.8, 1.5]
  );

  const style = isTextPill
    ? {
        height: size,
        paddingLeft: paddingX.get() + "rem", // Using raw value or transform
        paddingRight: paddingX.get() + "rem",
      }
    : { width: size, height: size };

  // For framer-motion to interpolate values automatically, we should pass the MotionValues directly to the style prop
  const motionStyle = isTextPill
    ? {
        height: size,
        paddingLeft: useTransform(paddingX, (v) => `${v}rem`),
        paddingRight: useTransform(paddingX, (v) => `${v}rem`),
        fontSize: useTransform(fontSize, (v) => `${v}rem`),
      }
    : { width: size, height: size };

  return (
    <HoverCtx.Provider value={hovered}>
      <motion.div
        ref={ref}
        style={motionStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap ${
          !isTextPill ? "aspect-square" : ""
        } ${className}`}
      >
        {children}
      </motion.div>
    </HoverCtx.Provider>
  );
}

/* ──────────────── DockLabel ──────────────── */
export function DockLabel({ children }: PropsWithChildren) {
  const isHovered = useContext(HoverCtx);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/90 px-2 py-1 text-[0.65rem] text-background"
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────── DockIcon ──────────────── */
export function DockIcon({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
