"use client";

import { careerStages } from "@/lib/content";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import styles from "./CareerTrajectory.module.css";

export default function CareerTrajectory() {
  const { ref: rowRef, revealed } = useRevealOnScroll<HTMLOListElement>();

  return (
    <section className={styles.section} aria-labelledby="career-trajectory-heading">
      <div className="container">
        {/* Visually hidden — the section has no visible title by design,
            but the four stage names below are h3s and need an h2 parent
            in the document outline. Labels the section landmark too, so
            there's one accessible name instead of a redundant aria-label. */}
        <h2 id="career-trajectory-heading" className="srOnly">
          Career trajectory
        </h2>

        <ol className={`${styles.row} ${revealed ? styles.revealed : ""}`} ref={rowRef}>
          {careerStages.map((item, index) => (
            <li
              className={styles.stage}
              key={item.stage}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <p className={styles.year}>{item.year}</p>
              <h3 className={styles.stageName}>{item.stage}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
