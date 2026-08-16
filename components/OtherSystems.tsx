"use client";

import { otherSystems } from "@/lib/content";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import styles from "./OtherSystems.module.css";

/**
 * A quieter breadth strip between Selected Transformation Stories and How
 * I Work — evidence, not another case study. Same reveal-once-on-scroll
 * pattern as CareerTrajectory and the MTN schematic (see
 * lib/useRevealOnScroll), and the same eyebrow-as-heading trick Approach
 * uses: the visible label doubles as the section's accessible name
 * instead of a redundant hidden h2 beside it.
 */
export default function OtherSystems() {
  const { ref: rowRef, revealed } = useRevealOnScroll<HTMLDListElement>();

  return (
    <section className={styles.section} aria-labelledby="other-systems-heading">
      <div className="container">
        <h2 id="other-systems-heading" className={`eyebrow ${styles.eyebrow}`}>
          Other systems delivered
        </h2>

        <dl
          className={`${styles.grid} ${revealed ? styles.revealed : ""}`}
          ref={rowRef}
        >
          {otherSystems.map((metric, index) => (
            <div
              className={styles.metric}
              key={metric.value + metric.label}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <dt className={styles.value}>{metric.value}</dt>
              <dd className={styles.label}>{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
