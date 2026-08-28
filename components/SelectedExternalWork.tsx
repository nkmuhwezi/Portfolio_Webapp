"use client";

import { selectedExternalWork } from "@/lib/content";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import styles from "./SelectedExternalWork.module.css";

/**
 * External features and contributions with no other home on the site —
 * a thin, evidence-only strip between AI in Practice and About, not a
 * press page. Text/link items only: no embed, no thumbnail, no logo,
 * nothing fetched until a reader actually clicks through. Same
 * eyebrow-as-heading and reveal-once-on-scroll pattern as Other Systems
 * Delivered, deliberately kept just as quiet.
 */
export default function SelectedExternalWork() {
  const { ref: listRef, revealed } = useRevealOnScroll<HTMLUListElement>();

  return (
    <section className={styles.section} aria-labelledby="selected-external-work-heading">
      <div className="container">
        <h2 id="selected-external-work-heading" className={`eyebrow ${styles.eyebrow}`}>
          Selected external work
        </h2>

        <ul className={`${styles.list} ${revealed ? styles.revealed : ""}`} ref={listRef}>
          {selectedExternalWork.map((entry, index) => (
            <li
              className={styles.item}
              key={entry.href}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <p className={styles.publication}>{entry.publication}</p>
              <p className={styles.title}>{entry.title}</p>
              <p className={styles.role}>{entry.role}</p>
              <a
                className={styles.link}
                href={entry.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {entry.cta}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
