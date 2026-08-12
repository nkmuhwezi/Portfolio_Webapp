import type { CaseStudyImage } from "@/lib/content";
import styles from "./CaseStudyPhoto.module.css";

type Props = {
  image: CaseStudyImage;
  caption?: string;
};

/** Matches the -480/900/1300 WebP variants scripts/optimize-images.mjs
 * generates alongside each case-study JPEG. */
const WEBP_WIDTHS = [480, 900, 1300];

function webpSrcSet(src: string) {
  const base = src.replace(/\.jpe?g$/i, "");
  return WEBP_WIDTHS.map((width) => `${base}-${width}.webp ${width}w`).join(
    ", ",
  );
}

/**
 * A single, non-interactive photo (or its neutral placeholder) with an
 * optional caption. Shared by CaseStudyGallery, which wraps this with
 * carousel controls for the "current" slide, and by CaseStudyFeature
 * directly for stories that place images in a fixed sequence instead.
 */
export default function CaseStudyPhoto({ image, caption }: Props) {
  return (
    <figure className={styles.figure}>
      {image.src ? (
        <picture>
          <source
            type="image/webp"
            srcSet={webpSrcSet(image.src)}
            sizes="(max-width: 48rem) 100vw, 53vw"
          />
          {/* Case-study photos only ever appear well below the fold (the
              hero portrait is the page's LCP element), so every one of
              these lazy-loads regardless of carousel position. */}
          <img
            className={styles.media}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : (
        <div
          className={styles.placeholder}
          role="img"
          aria-label={image.alt || image.label}
        >
          <span className={styles.placeholderLabel}>{image.label}</span>
        </div>
      )}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
