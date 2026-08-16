"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";

/* ── project data (unchanged from resume) ── */
const PROJECTS = [
  {
    num: "01",
    title: "Competitor Intelligence Engine",
    subtitle: "Automated ETL Data Pipeline",
    tech: [
      "Python",
      "FastAPI",
      "SQL",
      "AWS S3",
      "Pandas",
      "DuckDuckGo API",
      "Stripe API",
    ],
    points: [
      "Designed and implemented a 4-agent ETL pipeline that autonomously ingests multi-source competitor data (web scraping, API feeds), transforms raw HTML/JSON into structured intelligence reports, and loads outputs into a normalized SQL data store \u2014 eliminating ~8 hours/week of manual analyst research.",
      "Built a data schema for structured competitor records and sales battlecards; automated data quality validation and deduplication checks across ingestion runs to ensure report consistency.",
      "Architected a full-stack SaaS product with FastAPI backend, React dashboard for data visualization, and Stripe monetization layer \u2014 scoped for commercial deployment at subscription scale.",
    ],
  },
  {
    num: "02",
    title: "HIREPATH",
    subtitle: "Autonomous Recruitment Data Pipeline",
    tech: [
      "LangGraph",
      "FastAPI",
      "ChromaDB",
      "PostgreSQL",
      "SQL",
      "React",
      "Groq LLaMA 70B",
    ],
    points: [
      "Architected a 5-stage stateful data pipeline (SCOUT \u2192 SCREEN \u2192 ENGAGE \u2192 COORD \u2192 TRACK) using LangGraph orchestration; each stage ingests, transforms, and persists structured candidate records \u2014 replacing fragile single-prompt LLM calls with a fault-tolerant, multi-step data workflow.",
      "Built a FastAPI backend with ChromaDB vector storage and SQL-backed candidate profiles, enabling semantic candidate-to-role matching via embedding similarity search; processed a 50-candidate dataset with near-zero manual screening overhead.",
      "Developed a React frontend with real-time WebSocket pipeline visibility, parallelizing sourcing, screening, and scheduling stages \u2014 reducing end-to-end recruitment cycle time by an estimated 60%.",
    ],
  },
  {
    num: "03",
    title: "Verified Professional Network",
    subtitle: "Biometric Data Platform",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "Computer Vision",
      "SQL",
      "NoSQL",
    ],
    points: [
      "Designed and implemented a data schema for biometric authentication records and user identity logs; engineered a real-time facial-recognition data ingestion module at account creation and login, achieving sub-300ms authentication latency with 100% automated bot rejection.",
      "Secured enterprise-grade user data flows through multi-layer biometric verification; architected database models to store and query identity verification records for corporate clients, reducing fake-account creation rate to 0% across all test deployments.",
    ],
  },
  {
    num: "04",
    title: "Cybersecurity Threat Intelligence Pipeline",
    subtitle: "Adversarial AI System",
    tech: [
      "Python",
      "Adversarial AI",
      "Agentic Systems",
      "Pandas",
      "JSON Log Processing",
    ],
    points: [
      "Engineered a proactive adversarial AI agent that autonomously collects, parses, and stores Indicators of Compromise (IOC) data from attacker interactions into structured threat-intelligence logs for downstream analysis \u2014 enabling passive, real-time data harvesting from live cyber threats.",
      "Simulated multi-persona attacker engagement, increasing average session duration while capturing structured IOC records (IP addresses, phishing URLs, social-engineering patterns) in machine-readable format.",
      "GUVi National Hackathon Finalist (2024\u201325) \u2014 selected among top student teams nationally for a novel application of agentic AI in offensive cyber defense.",
    ],
  },
  {
    num: "05",
    title: "Voice Customer Support Agent",
    subtitle: "Real-Time Streaming System",
    tech: [
      "Groq LLaMA 70B",
      "ElevenLabs TTS",
      "Streamlit",
      "OpenAI SDK",
      "Python",
    ],
    points: [
      "Developed a real-time voice support agent integrating Groq LLM inference with ElevenLabs TTS; maintained full stateful conversation context (multi-turn session state stored in structured in-memory data structures) across extended support sessions.",
      "Resolved critical async/event-loop conflicts and SDK API mismatches to achieve production-grade streaming stability \u2014 delivering sub-second end-to-end voice response latency.",
    ],
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className="portfolio-section">
      <SectionHeader
        number="03"
        title="Selected Work"
        subtitle="Engineering production-grade systems"
      />
      <div className="projects">
        {PROJECTS.map((project) => (
          <ScrollReveal key={project.num} className="project">
            <div className="project__header">
              <span className="project__num">{project.num}</span>
              <div>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__subtitle">{project.subtitle}</p>
              </div>
            </div>

            <div className="project__dock-wrap">
              <Dock magnification={64} distance={110} className="flex-wrap items-center py-2">
                {project.tech.map((t) => (
                  <DockItem
                    key={t}
                    isTextPill={true}
                    className="rounded-full bg-[rgba(237,245,255,0.75)] shadow-sm hover:bg-[rgba(255,255,255,0.95)]"
                  >
                    <DockIcon>
                      <span className="select-none font-display font-medium text-foreground">
                        {t}
                      </span>
                    </DockIcon>
                  </DockItem>
                ))}
              </Dock>
            </div>

            <ul className="project__points">
              {project.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
