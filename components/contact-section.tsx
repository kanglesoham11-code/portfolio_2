"use client";

import { ScrollReveal } from "./scroll-reveal";

export function ContactSection() {
  return (
    <section id="contact" className="portfolio-section contact-section">
      <ScrollReveal>
        <p className="contact__label">08 — CONNECT</p>
        <h2 className="contact__heading">
          Let&rsquo;s build
          <br />
          something together.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="contact__links">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kanglesoham11@gmail.com&su=Reaching%20Out:%20Let's%20Connect!&body=Hi%20Soham,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20was%20really%20impressed%20by%20your%20work.%20I%20would%20love%20to%20connect%20and%20discuss%20a%20potential%20opportunity%20with%20you!%0D%0A%0D%0ABest%20regards," target="_blank" rel="noreferrer" className="contact__link">
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
