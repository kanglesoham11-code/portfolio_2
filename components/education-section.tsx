"use client";

import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./section-header";

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Data Modeling",
  "Distributed Systems",
];

export function EducationSection() {
  return (
    <section className="portfolio-section">
      <SectionHeader number="05" title="Education" />

      <ScrollReveal className="edu-card">
        <div className="edu-card__header">
          <h3 className="edu-card__institution">
            Pune Vidyarthi Griha&rsquo;s College of Engineering and Technology
          </h3>
          <span className="edu-card__timeline">Expected May 2028</span>
        </div>
        <p className="edu-card__degree">
          Bachelor of Engineering — Information Technology
        </p>
        <p className="edu-card__location">Pune, India · 2nd Year</p>
        <div className="edu-card__coursework">
          <span className="edu-card__label">Relevant Coursework</span>
          <div className="edu-card__chips">
            {COURSEWORK.map((course) => (
              <span key={course} className="coursework-chip">
                {course}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
