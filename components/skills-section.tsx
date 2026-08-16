"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";

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
              <Dock magnification={64} distance={110} className="flex-wrap items-center justify-center py-4">
                {category.items.map((item) => (
                  <DockItem
                    key={item}
                    isTextPill={true}
                    className="rounded-full bg-[rgba(237,245,255,0.75)] shadow-sm hover:bg-[rgba(255,255,255,0.95)]"
                  >
                    <DockIcon>
                      <span className="select-none font-display font-medium text-foreground">
                        {item}
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

