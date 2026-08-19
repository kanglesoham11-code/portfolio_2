"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiPostgresql,
  SiMysql,
  SiAmazondynamodb,
  SiAmazons3,
  SiAmazonredshift,
  SiAwslambda,
  SiFastapi,
  SiApachekafka,
  SiPandas,
  SiNumpy,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiStreamlit,
  SiOpenai,
  SiDuckduckgo,
  SiStripe,
  SiGit,
} from "react-icons/si";

import {
  FaJava,
  FaDatabase,
  FaCogs,
  FaWarehouse,
  FaSitemap,
  FaProjectDiagram,
  FaStream,
  FaCheckCircle,
  FaTachometerAlt,
  FaWater,
  FaAws,
  FaCloudUploadAlt,
  FaBrain,
  FaRobot,
  FaSearch,
  FaKeyboard,
  FaVolumeUp,
  FaPlug,
  FaNetworkWired,
  FaBolt,
  FaLayerGroup,
} from "react-icons/fa";

/* ── skill data ── */
const SKILLS = [
  {
    name: "Languages",
    items: [
      { label: "Python", icon: SiPython },
      { label: "SQL", icon: FaDatabase },
      { label: "JavaScript", icon: SiJavascript },
      { label: "TypeScript", icon: SiTypescript },
      { label: "C++", icon: SiCplusplus },
      { label: "Java", icon: FaJava },
    ],
  },
  {
    name: "Data Engineering",
    items: [
      { label: "ETL / ELT Pipeline Design", icon: FaCogs },
      { label: "Data Warehousing", icon: FaWarehouse },
      { label: "Data Modeling", icon: FaSitemap },
      { label: "Schema Design", icon: FaProjectDiagram },
      { label: "Batch & Stream Processing", icon: FaStream },
      { label: "Data Quality Monitoring", icon: FaCheckCircle },
    ],
  },
  {
    name: "Databases & Storage",
    items: [
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "MySQL", icon: SiMysql },
      { label: "ChromaDB", icon: FaDatabase },
      { label: "DynamoDB", icon: SiAmazondynamodb },
      { label: "SQL Optimization", icon: FaTachometerAlt },
      { label: "Data Lake Architecture", icon: FaWater },
    ],
  },
  {
    name: "AWS & Cloud",
    items: [
      { label: "Amazon S3", icon: SiAmazons3 },
      { label: "AWS Glue", icon: FaAws },
      { label: "Amazon Redshift", icon: SiAmazonredshift },
      { label: "AWS Lambda", icon: SiAwslambda },
      { label: "Amazon Athena", icon: FaAws },
      { label: "Cloud Pipeline Automation", icon: FaCloudUploadAlt },
    ],
  },
  {
    name: "Frameworks & Tools",
    items: [
      { label: "FastAPI", icon: SiFastapi },
      { label: "Apache Kafka", icon: SiApachekafka },
      { label: "Pandas", icon: SiPandas },
      { label: "NumPy", icon: SiNumpy },
      { label: "LangGraph", icon: FaProjectDiagram },
      { label: "React", icon: SiReact },
      { label: "Node.js", icon: SiNodedotjs },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Streamlit", icon: SiStreamlit },
      { label: "OpenAI Agents SDK", icon: SiOpenai },
    ],
  },
  {
    name: "AI / ML",
    items: [
      { label: "Groq LLaMA 3.3 70B", icon: FaBrain },
      { label: "Multi-Agent Orchestration", icon: FaRobot },
      { label: "RAG", icon: FaSearch },
      { label: "Semantic Search", icon: FaSearch },
      { label: "Prompt Engineering", icon: FaKeyboard },
      { label: "ElevenLabs TTS", icon: FaVolumeUp },
    ],
  },
  {
    name: "DevOps & APIs",
    items: [
      { label: "Git", icon: SiGit },
      { label: "REST API Design", icon: FaPlug },
      { label: "WebSockets", icon: FaNetworkWired },
      { label: "DuckDuckGo API", icon: SiDuckduckgo },
      { label: "Stripe API", icon: SiStripe },
    ],
  },
  {
    name: "Concepts",
    items: [
      { label: "Distributed Systems", icon: FaNetworkWired },
      { label: "Stateful Pipeline Orchestration", icon: FaCogs },
      { label: "Real-Time Event Processing", icon: FaBolt },
      { label: "Semantic Search", icon: FaSearch },
      { label: "Full-Stack Development", icon: FaLayerGroup },
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
                    key={item.label}
                    isTextPill={true}
                    className="rounded-full bg-[rgba(237,245,255,0.75)] shadow-sm hover:bg-[rgba(255,255,255,0.95)]"
                  >
                    <DockIcon>
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-[1.2em] w-[1.2em] text-foreground/80" />
                        <span className="select-none font-display font-medium text-foreground">
                          {item.label}
                        </span>
                      </div>
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
