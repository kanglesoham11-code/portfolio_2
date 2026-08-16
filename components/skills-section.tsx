"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";

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
      <div className="skills-grid">
        {SKILLS.map((category, i) => (
          <ScrollReveal key={category.name} delay={i * 70} className="skill-card">
            <h3 className="skill-card__name">{category.name}</h3>
            <div className="skill-card__items">
              {category.items.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
