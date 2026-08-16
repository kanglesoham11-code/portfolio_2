"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";

export function AboutSection() {
  return (
    <section id="about" className="portfolio-section about-section">
      <SectionHeader number="01" title="About" />

      <div className="about-content">
        <ScrollReveal className="about-primary" delay={100}>
          <p className="about-lead">
            I&rsquo;m Soham Kangle — a Data Engineering&#8209;focused
            Information Technology student at PVG&nbsp;COET, Pune. I design and
            deploy automated data pipelines, ETL workflows, and distributed data
            processing systems.
          </p>
        </ScrollReveal>

        <ScrollReveal className="about-secondary" delay={250}>
          <p className="about-text">
            My work sits at the intersection of data engineering and artificial
            intelligence — from multi-source data ingestion systems and vector
            databases to real-time streaming pipelines. I build
            production&#8209;grade, data&#8209;intensive agentic systems that
            process, transform, and serve structured intelligence at&nbsp;scale.
          </p>
          <p className="about-text">
            Recognized as a GUVi National Hackathon Finalist for delivering
            novel adversarial&nbsp;AI applications in offensive cyber defense.
          </p>
          <div className="about-keywords">
            <span>Data Pipelines</span>
            <span>Distributed Systems</span>
            <span>AI&#8209;Powered Platforms</span>
            <span>ETL Workflows</span>
            <span>Real&#8209;Time Streaming</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
