"use client";

import { ScrollReveal } from "./scroll-reveal";

export function ContactSection() {
  return (
    <section id="contact" className="portfolio-section contact-section">
      <ScrollReveal>
        <p className="contact__label">06 — CONNECT</p>
        <h2 className="contact__heading">
          Let&rsquo;s build
          <br />
          something together.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="contact__links">
          <a href="mailto:kanglesoham11@gmail.com" className="contact__link">
            kanglesoham11@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/soham-kangle-404ab6366"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kanglesoham11-code"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            GitHub
          </a>
        </div>
      </ScrollReveal>

      <footer className="contact__footer">
        <span>© 2025 Soham Kangle</span>
        <span>Pune, India</span>
      </footer>
    </section>
  );
}
