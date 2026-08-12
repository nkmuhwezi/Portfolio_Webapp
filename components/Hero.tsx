import { contact, hero, images, resumePath } from "@/lib/content";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.body}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>

          <h1 className={styles.name}>{hero.name}</h1>

          <p className={styles.title}>
            <span className={styles.role}>{hero.title}</span>
          </p>

          <p className={styles.copy}>{hero.copy}</p>

          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#work">
              View Selected Work
            </a>
            <a className={styles.secondaryAction} href={resumePath} download>
              Download CV
              <span className={styles.arrow} aria-hidden="true">
                ↓
              </span>
            </a>
            <a
              className={styles.tertiaryLink}
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.portraitWrap}>
          {/* The portrait is the LCP element on most viewports, so it loads
              eagerly at high priority — everything else on the page can
              wait behind it, not the other way round. WebP source with a
              right-sized JPEG fallback for the handful of browsers without
              WebP support (see scripts/optimize-images.mjs). */}
          <picture>
            <source
              type="image/webp"
              srcSet={images.headshotWebp
                .map((variant) => `${variant.src} ${variant.width}w`)
                .join(", ")}
              sizes="(max-width: 56rem) 320px, 420px"
            />
            <img
              className={styles.portrait}
              src={images.headshot}
              alt={`Portrait of ${hero.name}`}
              width={800}
              height={800}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
