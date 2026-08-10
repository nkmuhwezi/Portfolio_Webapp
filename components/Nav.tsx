"use client";

import { useEffect, useState } from "react";
import { resumePath, sections } from "@/lib/content";
import styles from "./Nav.module.css";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setLifted(window.scrollY > 24);
      // Back at the hero, no section owns the page — clear the marker rather
      // than leaving the last-seen section highlighted.
      if (window.scrollY < 24) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // Highlight whichever section currently occupies the upper band of the
    // viewport, so the marker moves in step with what the reader is looking at.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`${styles.header} ${lifted ? styles.lifted : ""}`}>
      <nav className={styles.inner} aria-label="Section navigation">
        <a href="#top" className={styles.monogram}>
          NKM
        </a>

        <ul className={styles.links}>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.link} ${active === id ? styles.active : ""}`}
                aria-current={active === id ? "true" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            {/* Distinct from the section links: not part of the on-page
                scroll, so it isn't tracked by the active-section observer. */}
            <a className={styles.cv} href={resumePath} download>
              CV
              <span aria-hidden="true">↓</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
