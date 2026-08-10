"use client";

import { useState, type KeyboardEvent } from "react";
import type { CaseStudyImage } from "@/lib/content";
import CaseStudyPhoto from "./CaseStudyPhoto";
import styles from "./CaseStudyGallery.module.css";

type Props = {
  images: CaseStudyImage[];
  /** Used only in control labels ("Next photo, <label>"), never shown. */
  storyLabel: string;
};

/**
 * A single image slot that cycles through `images` — arrow buttons, dot
 * jump-to controls, and left/right arrow keys, never on a timer. A
 * one-image story renders as a plain photo: no controls, nothing to
 * switch between.
 */
export default function CaseStudyGallery({ images, storyLabel }: Props) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[index];

  const go = (delta: number) => {
    setIndex((current) => (current + delta + images.length) % images.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setIndex(images.length - 1);
    }
  };

  return (
    <div
      className={styles.wrap}
      role={hasMultiple ? "group" : undefined}
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={hasMultiple ? `${storyLabel} photos` : undefined}
      tabIndex={hasMultiple ? 0 : undefined}
      onKeyDown={hasMultiple ? onKeyDown : undefined}
    >
      <div className={styles.mediaWrap}>
        <CaseStudyPhoto image={current} />

        {hasMultiple ? (
          <>
            <button
              type="button"
              className={`${styles.control} ${styles.prev}`}
              onClick={() => go(-1)}
              aria-label={`Previous photo, ${storyLabel}`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className={`${styles.control} ${styles.next}`}
              onClick={() => go(1)}
              aria-label={`Next photo, ${storyLabel}`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : null}
      </div>

      <div className={styles.meta}>
        {/* Announces the swap for screen-reader users without a separate
            visually-hidden live-region element. */}
        <p className={styles.caption} aria-live="polite">
          {current.caption}
          {hasMultiple ? (
            <span className={styles.count}> · {index + 1}/{images.length}</span>
          ) : null}
        </p>

        {hasMultiple ? (
          <div className={styles.dots}>
            {images.map((image, i) => (
              <button
                key={image.src ?? i}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                aria-label={`Photo ${i + 1} of ${images.length}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
