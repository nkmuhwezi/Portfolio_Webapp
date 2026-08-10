import type { CaseStudyImage } from "@/lib/content";
import styles from "./PlaceholderFigure.module.css";

type Props = {
  image: CaseStudyImage;
  caption?: string;
};

/**
 * Renders the real photo once `image.src` is set; until then, a quiet
 * editorial placeholder — a frame and an internal label, deliberately not
 * decorative art, stock photography, or AI-generated imagery. Swapping in
 * the final asset is a one-line change to `caseStudyImages` in content.ts,
 * not a change to this component.
 */
export default function PlaceholderFigure({ image, caption }: Props) {
  return (
    <figure className={styles.figure}>
      {image.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.media} src={image.src} alt={image.alt} />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={image.alt || image.label}>
          <span className={styles.placeholderLabel}>{image.label}</span>
        </div>
      )}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
