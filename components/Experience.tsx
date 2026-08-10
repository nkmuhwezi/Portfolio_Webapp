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
                    {/* The org name is a real link when we have one, so it can't
                        live inside the toggle <button> below — an <a> nested in
                        a <button> is invalid HTML. They're visually stacked as
                        one header but interactively independent. */}
                    <h3 className={styles.name}>
                      {entry.orgUrl ? (
                        <a
                          className={styles.nameLink}
                          href={entry.orgUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {entry.primary}
                        </a>
                      ) : (
                        entry.primary
                      )}
                    </h3>

                    <button
                      type="button"
                      className={styles.head}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} details for ${entry.primary}`}
                      onClick={() => toggle(entry.id)}
                    >
                      <span className={styles.secondary}>{entry.secondary}</span>

                      <span className={styles.toggle} aria-hidden="true">
                        <span className={styles.toggleBar} />
                        <span
                          className={`${styles.toggleBar} ${styles.toggleBarVertical}`}
                        />
                      </span>
                    </button>

                    {/* Scannable evidence, visible without opening the row —
                        a recruiter reading collapsed rows still sees this. */}
                    <p className={styles.proof}>{entry.proof}</p>

                    {/* Always visible, unlike the bullets below — a personal
                        aside, not detail that should be hidden behind a click. */}
                    {entry.subtitle ? (
                      <p className={styles.subtitle}>{entry.subtitle}</p>
                    ) : null}

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
