"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";

const EXPERIENCE = [
  {
    year: "July 2026 – Present",
    title: "Data Analytics Intern (Growth & Business Intelligence)",
    company: "Bluestock Fintech | Remote",
    points: [
      "Accelerated business reporting cycles by 30% by writing optimized SQL queries on relational MySQL databases and building automated data pipelines that transform raw product and market data into decision-ready dashboards for leadership.",
      "Analyzing customer behavior and campaign performance across digital channels in a live fintech environment — tracking KPIs, uncovering insights, and recommending optimizations that improved funnel conversion visibility by 25%.",
      "Collaborating with product, marketing, and analytics teams in Agile; documenting clean, reproducible analyses in Advanced Excel / Google Sheets with Git version control.",
    ],
  },
  {
    year: "May 15, 2026 – Aug. 15, 2026",
    title: "Open Source Contributor Intern",
    company: "GirlScript Summer of Code (GSSoC) | Remote",
    points: [
      "Shipping merged pull requests in one of India’s largest open-source programs — building data-driven dashboard and analytics features for web platforms used by 10,000+ community users, validated through maintainer code reviews.",
      "Performing funnel and user-journey analysis on contributor onboarding flows; proposed UX and documentation optimizations that improved new-user activation across production codebases (JavaScript, PHP, SQL, Git/GitHub).",
    ],
  },
  {
    year: "Apr. 2026 – May 2026",
    title: "Product Growth & Analytics Intern",
    company: "inAmigos Foundation | Remote",
    points: [
      "Delivered a 40% lift in platform engagement and 99.9% service reliability for a live SaaS product serving real customers by running A/B tests, funnel optimization, and customer behavior analysis across the full product lifecycle.",
      "Built performance reports and dashboards for leadership using SQL (PostgreSQL/MySQL), Excel/Google Sheets, and interactive front ends (HTML, CSS, JavaScript, AJAX), tracking KPIs across customer segments and digital channels.",
      "Conducted competitor benchmarking and market research to identify emerging opportunities; partnered cross-functionally with product, marketing, and engineering in a fast-paced Agile/Scrum environment with a strong bias for action.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section">
      <SectionHeader
        number="03"
        title="Experience"
        subtitle="Professional roles and internships"
      />
      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 120} className="timeline-item">
            <span className="timeline-item__year">{exp.year}</span>
            <h3 className="timeline-item__title">{exp.title}</h3>
            <div className="text-blue-500/80 font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">
              {exp.company}
            </div>
            <ul className="project__points mt-4 list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              {exp.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
