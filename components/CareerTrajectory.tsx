"use client";

import { useEffect, useRef, useState } from "react";
import { careerStages } from "@/lib/content";
import styles from "./CareerTrajectory.module.css";

export default function CareerTrajectory() {
  const rowRef = useRef<HTMLOListElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Reveals once, the first time the row enters view — not a repeating
    // effect on every scroll past it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-label="Career trajectory">
      <div className="container">
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
