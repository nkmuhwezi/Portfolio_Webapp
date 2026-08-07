"use client";

import { useState } from "react";
import { experience } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Experience.module.css";

export default function Experience() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      experience.map((entry) => [entry.id, entry.defaultOpen === true]),
    ),
  );

  const toggle = (id: string) =>
    setOpen((current) => ({ ...current, [id]: !current[id] }));

  return (
    <section className={styles.section} id="experience">
      <div className="container">
        <SectionHeading title="Experience" />

        <ol className={styles.list}>
          {experience.map((entry) => {
            const isOpen = open[entry.id];
            const panelId = `${entry.id}-panel`;

            return (
              <li className={styles.item} key={entry.id}>
                <article className={styles.row}>
                  {/* Where and when — the dateline this posting was filed under. */}
                  <div className={styles.rail}>
                    {entry.location ? (
                      <p className={styles.dateline}>{entry.location}</p>
                    ) : null}
                    <p className={styles.dates}>{entry.dates}</p>
                  </div>

                  <div className={styles.main}>
                    <h3 className={styles.headingReset}>
                      <button
                        type="button"
                        className={styles.head}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(entry.id)}
                      >
                        <span className={styles.headText}>
                          <span className={styles.primary}>{entry.primary}</span>
                          <span className={styles.secondary}>
                            {entry.secondary}
                          </span>
                        </span>

                        <span className={styles.toggle} aria-hidden="true">
                          <span className={styles.toggleBar} />
                          <span
                            className={`${styles.toggleBar} ${styles.toggleBarVertical}`}
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      className={styles.panel}
                      id={panelId}
                      data-open={isOpen}
                      // Keeps collapsed bullets out of the tab order and the
                      // accessibility tree while still animating smoothly.
                      inert={!isOpen}
                    >
                      <div className={styles.panelInner}>
                        <ul className={styles.bullets}>
                          {entry.bullets.map((bullet) => (
                            <li className={styles.bullet} key={bullet}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
