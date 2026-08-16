"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  /* Show nav after scrolling past the hero */
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* Track active section */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`snav ${visible ? "snav--visible" : ""}`}
      aria-label="Section navigation"
    >
      <a href="/" className="snav__brand" aria-label="Soham Kangle — home">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="snav__logo"
        >
          <path
            d="M8 10.5C8 7.46 10.46 5 13.5 5H16C18.21 5 20 6.79 20 9C20 11.21 18.21 13 16 13H13C10.79 13 9 14.79 9 17C9 19.21 10.79 21 13 21H15.5C18.54 21 21 18.54 21 15.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 8V24M22 16L28 8M22 16L28 24"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="27" r="1.2" fill="currentColor" />
        </svg>
      </a>

      <div className="snav__links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`snav__link ${active === link.id ? "snav__link--active" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="mailto:kanglesoham11@gmail.com"
        className="snav__cta"
        target="_blank"
        rel="noreferrer"
      >
        Let&apos;s talk
      </a>
    </nav>
  );
}
