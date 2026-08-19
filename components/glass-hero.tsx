"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ──────────────────────── constants ──────────────────────── */
const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;
const POS_LERP = 0.14;
const RAD_LERP = 0.12;

/* ──────────────────────── component ──────────────────────── */
export function GlassHero() {
  const heroRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  /* mutable pointer state — never triggers a React render */
  const rawX = useRef(-999);
  const rawY = useRef(-999);
  const smoothX = useRef(-999);
  const smoothY = useRef(-999);
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouching = useRef(false);
  const frameId = useRef(0);

  /* ── animation loop ── */
  const tick = useCallback(function tickFn() {
    const el = revealRef.current;
    if (!el) {
      frameId.current = requestAnimationFrame(tickFn);
      return;
    }

    /* respect prefers-reduced-motion */
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pFactor = reduced ? 1 : POS_LERP;
    const rFactor = reduced ? 1 : RAD_LERP;

    smoothX.current += (rawX.current - smoothX.current) * pFactor;
    smoothY.current += (rawY.current - smoothY.current) * pFactor;
    currentRadius.current +=
      (targetRadius.current - currentRadius.current) * rFactor;

    el.style.setProperty("--reveal-x", `${smoothX.current}px`);
    el.style.setProperty("--reveal-y", `${smoothY.current}px`);
    el.style.setProperty("--reveal-radius", `${currentRadius.current}px`);

    frameId.current = requestAnimationFrame(tickFn);
  }, []);

  /* ── pointer handlers ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isMobile = () => window.innerWidth <= 767;

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      smoothX.current = e.clientX;
      smoothY.current = e.clientY;
      targetRadius.current = DESKTOP_RADIUS;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        rawX.current = e.clientX;
        rawY.current = e.clientY;
      } else if (isTouching.current) {
        rawX.current = e.clientX;
        rawY.current = e.clientY;
      }
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetRadius.current = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      isTouching.current = true;
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      smoothX.current = e.clientX;
      smoothY.current = e.clientY;
      targetRadius.current = isMobile() ? MOBILE_RADIUS : DESKTOP_RADIUS;
      // Removed setPointerCapture so the browser can still handle vertical scrolling on mobile.
    };

    const onPointerUp = () => {
      isTouching.current = false;
      targetRadius.current = 0;
    };

    const onPointerCancel = () => {
      isTouching.current = false;
      targetRadius.current = 0;
    };

    hero.addEventListener("pointerenter", onPointerEnter);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("pointerdown", onPointerDown);
    hero.addEventListener("pointerup", onPointerUp);
    hero.addEventListener("pointercancel", onPointerCancel);

    /* start rAF loop */
    frameId.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("pointerenter", onPointerEnter);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("pointerdown", onPointerDown);
      hero.removeEventListener("pointerup", onPointerUp);
      hero.removeEventListener("pointercancel", onPointerCancel);
      cancelAnimationFrame(frameId.current);
    };
  }, [tick]);

  /* ── grid cells ── */
  const desktopCells = Array.from({ length: 12 * 4 }, (_, i) => (
    <span key={i} />
  ));
  const mobileCells = Array.from({ length: 4 * 6 }, (_, i) => (
    <span key={`m${i}`} />
  ));

  return (
    <section ref={heroRef} className="hero" aria-label="Hero">
      {/* 1 — Base portrait */}
      <div
        className="hero__portrait hero__portrait--base anim-portrait"
        role="img"
        aria-hidden="true"
      />

      {/* 2 — Reveal portrait */}
      <div
        ref={revealRef}
        className="hero__portrait hero__portrait--reveal"
        aria-hidden="true"
      />

      {/* 3 — Technical grid + circle */}
      <div className="hero__grid" aria-hidden="true">
        {/* desktop grid */}
        <div className="hero__grid-lines hidden md:grid">{desktopCells}</div>
        {/* mobile grid */}
        <div className="hero__grid-lines grid md:hidden">{mobileCells}</div>
        <div className="hero__circle" />
      </div>

      {/* 4 — Navigation */}
      <header>
        <nav className="hero__nav anim-nav" aria-label="Primary navigation">
          <Link href="/" className="hero__brand" aria-label="Soham Kangle home">
            {/* Original inline-SVG monogram: stylised "S" + "K" */}
            <span className="hero__monogram">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* S letter form */}
                <path
                  d="M8 10.5C8 7.46 10.46 5 13.5 5H16C18.21 5 20 6.79 20 9C20 11.21 18.21 13 16 13H13C10.79 13 9 14.79 9 17C9 19.21 10.79 21 13 21H15.5C18.54 21 21 18.54 21 15.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* K letter form */}
                <path
                  d="M22 8V24M22 16L28 8M22 16L28 24"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Decorative dot */}
                <circle cx="6" cy="27" r="1.2" fill="currentColor" />
              </svg>
            </span>
            <span className="hero__name">Soham Kangle</span>
          </Link>

          <ul className="hero__links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#journey">Journey</a>
            </li>
          </ul>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=kanglesoham11@gmail.com&su=Reaching%20Out:%20Let's%20Connect!&body=Hi%20Soham,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20was%20really%20impressed%20by%20your%20work.%20I%20would%20love%20to%20connect%20and%20discuss%20a%20potential%20opportunity%20with%20you!%0D%0A%0D%0ABest%20regards,"
            className="hero__cta"
            target="_blank"
            rel="noreferrer"
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>

      {/* 5 — Headline */}
      <div className="hero__headline-wrap">
        <h1 className="hero__headline">
          <span className="anim-headline-1">Building</span>
          <span className="anim-headline-2">Distributed</span>
          <span className="anim-headline-3">Systems.</span>
        </h1>
      </div>

      {/* 6 — Bottom-left intro */}
      <div className="hero__intro anim-intro">
        <p className="hero__intro-text">
          I architect distributed, multi-tiered backend services and AI-powered
          platforms.
        </p>
        <a
          href="https://github.com/kanglesoham11-code"
          className="hero__btn"
          target="_blank"
          rel="noreferrer"
        >
          Explore my work
        </a>
      </div>

      {/* 7 — Right tagline */}
      <div className="hero__tagline anim-tagline">
        <span>ENGINEERING</span>
        <span>PRODUCTION-GRADE</span>
        <span>SOFTWARE</span>
      </div>
    </section>
  );
}
