"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";

/* ── abbreviation helper ── */
const ABBREV: Record<string, string> = {
  Python: "Py",
  SQL: "SQL",
  JavaScript: "JS",
  TypeScript: "TS",
  "C++": "C++",
  Java: "Ja",
  "ETL / ELT Pipeline Design": "ETL",
  "Data Warehousing": "DW",
  "Data Modeling": "DM",
  "Schema Design": "SD",
  "Batch & Stream Processing": "BSP",
  "Data Quality Monitoring": "DQM",
  PostgreSQL: "PG",
  MySQL: "My",
  ChromaDB: "Ch",
  DynamoDB: "Dy",
  "SQL Optimization": "SO",
  "Data Lake Architecture": "DLA",
  "Amazon S3": "S3",
  "AWS Glue": "Gl",
  "Amazon Redshift": "RS",
  "AWS Lambda": "λ",
  "Amazon Athena": "Ath",
  "Cloud Pipeline Automation": "CPA",
  FastAPI: "FA",
  "Apache Kafka": "Kf",
  Pandas: "Pd",
  NumPy: "Np",
  LangGraph: "LG",
  React: "Re",
  "Node.js": "No",
  "Next.js": "Nx",
  Streamlit: "St",
  "OpenAI Agents SDK": "AI",
  "Groq LLaMA 3.3 70B": "LLM",
  "Multi-Agent Orchestration": "MAO",
  RAG: "RAG",
  "Semantic Search": "SS",
  "Prompt Engineering": "PE",
  "ElevenLabs TTS": "TTS",
  Git: "Git",
  "REST API Design": "API",
  WebSockets: "WS",
  "DuckDuckGo API": "DDG",
  "Stripe API": "Str",
  "Distributed Systems": "DS",
  "Stateful Pipeline Orchestration": "SPO",
  "Real-Time Event Processing": "RTE",
  "Full-Stack Development": "FS",
};

function abbrev(name: string): string {
  if (ABBREV[name]) return ABBREV[name];
  const words = name.split(/[\s/]+/);
  if (words.length > 1)
    return words
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  return name.slice(0, 2).toUpperCase();
}

/* ── skill data (unchanged from resume) ── */
const SKILLS = [
  {
    name: "Languages",
    items: ["Python", "SQL", "JavaScript", "TypeScript", "C++", "Java"],
  },
  {
    name: "Data Engineering",
    items: [
      "ETL / ELT Pipeline Design",
      "Data Warehousing",
      "Data Modeling",
      "Schema Design",
      "Batch & Stream Processing",
      "Data Quality Monitoring",
    ],
  },
  {
    name: "Databases & Storage",
    items: [
      "PostgreSQL",
      "MySQL",
      "ChromaDB",
      "DynamoDB",
      "SQL Optimization",
      "Data Lake Architecture",
    ],
  },
  {
    name: "AWS & Cloud",
    items: [
      "Amazon S3",
      "AWS Glue",
      "Amazon Redshift",
      "AWS Lambda",
      "Amazon Athena",
      "Cloud Pipeline Automation",
    ],
  },
  {
    name: "Frameworks & Tools",
    items: [
      "FastAPI",
      "Apache Kafka",
      "Pandas",
      "NumPy",
      "LangGraph",
      "React",
      "Node.js",
      "Next.js",
      "Streamlit",
      "OpenAI Agents SDK",
    ],
  },
  {
    name: "AI / ML",
    items: [
      "Groq LLaMA 3.3 70B",
      "Multi-Agent Orchestration",
      "RAG",
      "Semantic Search",
      "Prompt Engineering",
      "ElevenLabs TTS",
    ],
  },
  {
    name: "DevOps & APIs",
    items: [
      "Git",
      "REST API Design",
      "WebSockets",
      "DuckDuckGo API",
      "Stripe API",
    ],
  },
  {
    name: "Concepts",
    items: [
      "Distributed Systems",
      "Stateful Pipeline Orchestration",
      "Real-Time Event Processing",
      "Semantic Search",
      "Full-Stack Development",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section">
      <SectionHeader
        number="02"
        title="Technology Stack"
        subtitle="Tools and technologies I work with"
      />
      <div className="skills-dock-grid">
        {SKILLS.map((category, i) => (
          <ScrollReveal key={category.name} delay={i * 70}>
            <h3 className="skill-card__name">{category.name}</h3>
            <div className="skill-dock-wrap">
              <Dock magnification={56} distance={100}>
                {category.items.map((item) => (
                  <DockItem
                    key={item}
                    className="aspect-square rounded-full bg-[rgba(237,245,255,0.75)]"
                  >
                    <DockLabel>{item}</DockLabel>
                    <DockIcon>
                      <span className="select-none font-mono text-[0.5rem] font-medium text-foreground">
                        {abbrev(item)}
                      </span>
                    </DockIcon>
                  </DockItem>
                ))}
              </Dock>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
