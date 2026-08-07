import { contact, hero, images, resumePath } from "@/lib/content";
import styles from "./Hero.module.css";

export default function Hero() {
  const [role, credential] = hero.title.split(" · ");

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.body}>
          <p className={styles.location}>{hero.location}</p>

          <h1 className={styles.name}>{hero.name}</h1>

          <p className={styles.title}>
            <span className={styles.role}>{role}</span>
            {credential ? (
              <>
                <span className={styles.sep} aria-hidden="true">
                  ·
                </span>
                <span className={styles.credential}>{credential}</span>
              </>
            ) : null}
          </p>

          <div className={styles.actions}>
            {/* LinkedIn has no universal "compose message" link — this opens
                the profile, where a visitor can message (if connected) or
                connect first. */}
            <a
              className={styles.primaryAction}
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Get in touch
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
          {/* Swap the file at `images.headshot` in lib/content.ts. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.portrait}
            src={images.headshot}
            alt={`Portrait of ${hero.name}`}
            width={800}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
