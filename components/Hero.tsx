import { contact, hero, images, resumePath } from "@/lib/content";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.body}>
          <p className={styles.location}>{hero.location}</p>

          <h1 className={styles.name}>{hero.name}</h1>

          <p className={styles.title}>
            <span className={styles.role}>{hero.title}</span>
          </p>

          <p className={styles.hook}>{hero.hook}</p>

          <div className={styles.actions}>
            {/* The email address only ever appears as a mailto target, never
                as visible text — see Contact for the same rule. */}
            <a className={styles.primaryAction} href={`mailto:${contact.email}`}>
              Get in touch
            </a>
            <a
              className={styles.secondaryAction}
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
            <a className={styles.secondaryAction} href={resumePath} download>
              Download CV
              <span className={styles.arrow} aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className={styles.portraitWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.portrait}
            src={images.headshot}
            srcSet={`${images.headshot} 1x, ${images.headshotLarge} 2x`}
            alt={`Portrait of ${hero.name}`}
            width={800}
            height={800}
          />
        </div>
      </div>
    </section>
  );
}
