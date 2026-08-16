"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";

const ACHIEVEMENTS = [
  {
    year: "2024–25",
    title: "GUVi National Hackathon — Finalist",
    description:
      "Selected among top student teams nationally for the Cybersecurity Threat Intelligence Agent; recognized for novel adversarial AI application in offensive cyber defense and automated IOC data collection.",
  },
  {
    year: "2025",
    title: "Agentic AI Workshop — Winner",
    description:
      "Presented the production-grade HIREPATH 5-agent data pipeline system in live technical evaluations; demonstrated stateful LangGraph orchestration as an alternative to conventional single-step LLM architectures.",
  },
  {
    year: "2026",
    title: "Speaker, SparkTech International Symposium 2K26",
    description:
      "Presented insights and technical deep dives at the international symposium, recognized as a top academic performer in Algorithms & DBMS.",
  },
  {
    year: "Ongoing",
    title: "Academic Excellence",
    description:
      "Consistent top performer in Database Management Systems and Data Structures & Algorithms; independently built production-grade data engineering projects beyond academic curriculum.",
  },
];

export function AchievementsSection() {
  return (
    <section id="journey" className="portfolio-section">
      <SectionHeader
        number="04"
        title="Achievements"
        subtitle="Recognition and milestones"
      />
      <div className="timeline">
        {ACHIEVEMENTS.map((achievement, i) => (
          <ScrollReveal key={i} delay={i * 120} className="timeline-item">
            <span className="timeline-item__year">{achievement.year}</span>
            <h3 className="timeline-item__title">{achievement.title}</h3>
            <p className="timeline-item__desc">{achievement.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
