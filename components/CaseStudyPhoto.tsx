import type { CaseStudyImage } from "@/lib/content";
import styles from "./CaseStudyPhoto.module.css";

type Props = {
  image: CaseStudyImage;
  caption?: string;
};

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
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={image.src} alt={image.alt} />
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
