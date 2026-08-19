"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";

import {
  SiStreamlit,
  SiDuckduckgo,
  SiStripe,
} from "react-icons/si";

import {
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
      { label: "Python", devicon: "devicon-python-plain colored" },
      { label: "SQL", devicon: "devicon-azuresql-plain colored" },
      { label: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { label: "TypeScript", devicon: "devicon-typescript-plain colored" },
      { label: "C++", devicon: "devicon-cplusplus-plain colored" },
      { label: "Java", devicon: "devicon-java-plain colored" },
    ],
  },
  {
    name: "Data Engineering",
    items: [
      { label: "ETL / ELT Pipeline Design", icon: FaCogs, color: "#1565C0" },
      { label: "Data Warehousing", icon: FaWarehouse, color: "#607D8B" },
      { label: "Data Modeling", icon: FaSitemap, color: "#FF7043" },
      { label: "Schema Design", icon: FaProjectDiagram, color: "#8D6E63" },
      { label: "Batch & Stream Processing", icon: FaStream, color: "#42A5F5" },
      { label: "Data Quality Monitoring", icon: FaCheckCircle, color: "#66BB6A" },
    ],
  },
  {
    name: "Databases & Storage",
    items: [
      { label: "PostgreSQL", devicon: "devicon-postgresql-plain colored" },
      { label: "MySQL", devicon: "devicon-mysql-plain colored" },
      { label: "ChromaDB", icon: FaDatabase, color: "#FF5722" },
      { label: "DynamoDB", icon: FaAws, color: "#FF9900" },
      { label: "SQL Optimization", icon: FaTachometerAlt, color: "#E53935" },
      { label: "Data Lake Architecture", icon: FaWater, color: "#29B6F6" },
    ],
  },
  {
    name: "AWS & Cloud",
    items: [
      { label: "Amazon S3", devicon: "devicon-amazonwebservices-original colored" },
      { label: "AWS Glue", devicon: "devicon-amazonwebservices-original colored" },
      { label: "Amazon Redshift", devicon: "devicon-amazonwebservices-original colored" },
      { label: "AWS Lambda", devicon: "devicon-amazonwebservices-original colored" },
      { label: "Amazon Athena", devicon: "devicon-amazonwebservices-original colored" },
      { label: "Cloud Pipeline Automation", icon: FaCloudUploadAlt, color: "#42A5F5" },
    ],
  },
  {
    name: "Frameworks & Tools",
    items: [
      { label: "FastAPI", devicon: "devicon-fastapi-plain colored" },
      { label: "Apache Kafka", devicon: "devicon-apachekafka-original colored" },
      { label: "Pandas", devicon: "devicon-pandas-original colored" },
      { label: "NumPy", devicon: "devicon-numpy-original colored" },
      { label: "LangGraph", icon: FaProjectDiagram, color: "#3F51B5" },
      { label: "React", devicon: "devicon-react-original colored" },
      { label: "Node.js", devicon: "devicon-nodejs-plain colored" },
      { label: "Next.js", devicon: "devicon-nextjs-original colored" },
      { label: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { label: "OpenAI Agents SDK", icon: FaRobot, color: "#00A67E" },
    ],
  },
  {
    name: "AI / ML",
    items: [
      { label: "Groq LLaMA 3.3 70B", icon: FaBrain, color: "#F55036" },
      { label: "Multi-Agent Orchestration", icon: FaRobot, color: "#7E57C2" },
      { label: "RAG", icon: FaSearch, color: "#26A69A" },
      { label: "Semantic Search", icon: FaSearch, color: "#26A69A" },
      { label: "Prompt Engineering", icon: FaKeyboard, color: "#FFCA28" },
      { label: "ElevenLabs TTS", icon: FaVolumeUp, color: "#111111" },
    ],
  },
  {
    name: "DevOps & APIs",
    items: [
      { label: "Git", devicon: "devicon-git-plain colored" },
      { label: "REST API Design", icon: FaPlug, color: "#43A047" },
      { label: "WebSockets", icon: FaNetworkWired, color: "#FF9800" },
      { label: "DuckDuckGo API", icon: SiDuckduckgo, color: "#DE5833" },
      { label: "Stripe API", icon: SiStripe, color: "#008CDD" },
    ],
  },
  {
    name: "Concepts",
    items: [
      { label: "Distributed Systems", icon: FaNetworkWired, color: "#607D8B" },
      { label: "Stateful Pipeline Orchestration", icon: FaCogs, color: "#5C6BC0" },
      { label: "Real-Time Event Processing", icon: FaBolt, color: "#FFCA28" },
      { label: "Semantic Search", icon: FaSearch, color: "#26A69A" },
      { label: "Full-Stack Development", icon: FaLayerGroup, color: "#00ACC1" },
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
                        {item.devicon ? (
                          <i className={`${item.devicon} text-[1.2rem]`} />
                        ) : item.icon ? (
                          <item.icon className="h-[1.2em] w-[1.2em]" color={item.color} />
                        ) : null}
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
