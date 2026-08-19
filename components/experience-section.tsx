"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { SectionHeader } from "./section-header";
import { FaChartLine, FaCodeBranch, FaRocket } from "react-icons/fa";

const EXPERIENCE = [
  {
    year: "July 2026 – Present",
    title: "Data Analytics Intern (Growth & BI)",
    company: "Bluestock Fintech | Remote",
    points: [
      "Accelerated business reporting cycles by 30% by writing optimized SQL queries on relational MySQL databases and building automated data pipelines that transform raw product and market data into decision-ready dashboards for leadership.",
      "Analyzing customer behavior and campaign performance across digital channels in a live fintech environment — tracking KPIs, uncovering insights, and recommending optimizations that improved funnel conversion visibility by 25%.",
      "Collaborating with product, marketing, and analytics teams in Agile; documenting clean, reproducible analyses in Advanced Excel / Google Sheets with Git version control.",
    ],
    icon: FaChartLine,
    color: "from-blue-500 to-indigo-500",
  },
  {
    year: "May 2026 – Aug. 2026",
    title: "Open Source Contributor Intern",
    company: "GirlScript Summer of Code | Remote",
    points: [
      "Shipping merged pull requests in one of India’s largest open-source programs — building data-driven dashboard and analytics features for web platforms used by 10,000+ community users, validated through maintainer code reviews.",
      "Performing funnel and user-journey analysis on contributor onboarding flows; proposed UX and documentation optimizations that improved new-user activation across production codebases.",
    ],
    icon: FaCodeBranch,
    color: "from-emerald-400 to-teal-500",
  },
  {
    year: "Apr. 2026 – May 2026",
    title: "Product Growth & Analytics Intern",
    company: "inAmigos Foundation | Remote",
    points: [
      "Delivered a 40% lift in platform engagement and 99.9% service reliability for a live SaaS product serving real customers by running A/B tests, funnel optimization, and customer behavior analysis across the full product lifecycle.",
      "Built performance reports and dashboards for leadership using SQL (PostgreSQL/MySQL), Excel/Google Sheets, and interactive front ends (HTML, CSS, JavaScript, AJAX), tracking KPIs across customer segments and digital channels.",
      "Conducted competitor benchmarking and market research to identify emerging opportunities in a fast-paced Agile/Scrum environment.",
    ],
    icon: FaRocket,
    color: "from-orange-400 to-rose-500",
  },
];

function ExperienceCard({
  exp,
  index,
  progress,
  total,
  angleStep,
}: {
  exp: typeof EXPERIENCE[0];
  index: number;
  progress: MotionValue<number>;
  total: number;
  angleStep: number;
}) {
  // Dynamically build the input and output arrays for this specific card
  // This ensures monotonically increasing inputs and avoids WAAPI crashes.
  const inputRange = Array.from({ length: total }, (_, i) => i / (total - 1));
  const opacityRange = Array.from({ length: total }, (_, i) => (i === index ? 1 : 0.2));
  const scaleRange = Array.from({ length: total }, (_, i) => (i === index ? 1 : 0.8));
  const blurRange = Array.from({ length: total }, (_, i) => (i === index ? "blur(0px)" : "blur(12px)"));

  const opacity = useTransform(progress, inputRange, opacityRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const blur = useTransform(progress, inputRange, blurRange);

  const Icon = exp.icon;

  return (
    <div
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        transform: `rotateY(${index * angleStep}deg) translateZ(clamp(280px, 45vw, 550px))`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{ opacity, scale, filter: blur }}
        className="relative flex w-[90vw] max-w-[550px] flex-col rounded-3xl border border-white/20 bg-white/30 p-6 backdrop-blur-2xl shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-900/60 md:p-10"
      >
        <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${exp.color} opacity-20 blur-2xl`} />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 inline-flex rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground/80 dark:bg-white/10 dark:text-zinc-300">
              {exp.year}
            </div>
            <h3 className="mb-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {exp.title}
            </h3>
            <div className={`font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-6 text-sm md:text-base uppercase tracking-wide`}>
              {exp.company}
            </div>
          </div>
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${exp.color} shadow-lg md:h-16 md:w-16`}>
            <Icon className="h-6 w-6 text-white md:h-8 md:w-8" />
          </div>
        </div>

        <ul className="relative z-10 space-y-3 text-sm text-zinc-700 dark:text-zinc-300 md:text-base">
          {exp.points.map((point, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${exp.color}`} />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
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

  const totalCards = EXPERIENCE.length;
  const angleStep = 360 / totalCards; // e.g., 120 degrees
  const maxAngle = angleStep * (totalCards - 1); // e.g., 240 degrees

  // Global rotation of the cylinder
  // It rotates backwards so cards come from the right and move to the left
  const cylinderRotateY = useTransform(smoothProgress, [0, 1], [0, -maxAngle]);

  return (
    <section id="experience" className="relative bg-zinc-100 dark:bg-zinc-950">
      {/* Scrollable container: 300vh gives 100vh of scroll distance per card */}
      <div ref={containerRef} className="relative h-[300vh] w-full">
        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          
          <div className="absolute top-12 z-50 w-full md:top-24 [&_.sh__title]:text-zinc-900 dark:[&_.sh__title]:text-white [&_.sh__sub]:text-zinc-600 dark:[&_.sh__sub]:text-zinc-400 [&_.sh__num]:text-zinc-500 dark:[&_.sh__num]:text-zinc-500">
            <SectionHeader
              number="03"
              title="Experience"
              subtitle="Professional roles and internships"
            />
          </div>

          {/* 3D Cylinder Viewport */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ perspective: "1500px" }}
          >
            {/* The Rotating Cylinder */}
            <motion.div
              className="relative flex h-full w-full items-center justify-center"
              style={{
                rotateY: cylinderRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {EXPERIENCE.map((exp, i) => (
                <ExperienceCard
                  key={i}
                  exp={exp}
                  index={i}
                  progress={smoothProgress}
                  total={totalCards}
                  angleStep={angleStep}
                />
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.95, 1], [1, 0]),
            }}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-500"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Orbit</span>
            <div className="flex h-8 w-5 justify-center rounded-full border-2 border-zinc-400 dark:border-zinc-600">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
