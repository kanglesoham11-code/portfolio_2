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

  return (
    <DockCtx.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`mx-auto flex items-end gap-2 rounded-2xl border border-[rgba(170,190,215,0.25)] bg-white/50 px-3 pb-2.5 pt-2.5 backdrop-blur-xl ${className}`}
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
  children: React.ReactNode;
}

export function DockItem({ className = "", children }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance } = useDock();
  const [hovered, setHovered] = useState(false);

  const distFromMouse = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return distance + 1;
    return val - rect.x - rect.width / 2;
  });

  const sizeSync = useTransform(
    distFromMouse,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const size = useSpring(sizeSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <HoverCtx.Provider value={hovered}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-full ${className}`}
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
