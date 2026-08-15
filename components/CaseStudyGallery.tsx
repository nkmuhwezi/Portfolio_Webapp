"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { CaseStudyImage } from "@/lib/content";
import CaseStudyPhoto from "./CaseStudyPhoto";
import styles from "./CaseStudyGallery.module.css";

type Props = {
  images: CaseStudyImage[];
  /** Used only in control labels ("Next photo, <label>"), never shown. */
  storyLabel: string;
};

/** Minimum horizontal travel, in px, before a touch drag counts as a
 * deliberate swipe rather than a finger wobble mid-scroll. */
const SWIPE_THRESHOLD = 40;

/**
 * A single image slot that cycles through `images` — arrow buttons, dot
 * jump-to controls, left/right arrow keys, and touch swipe, never on a
 * timer. A one-image story renders as a plain photo: no controls, nothing
 * to switch between.
 */
export default function CaseStudyGallery({ images, storyLabel }: Props) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[index];
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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

  // touchmove is never preventDefault'd, so the page keeps scrolling
  // natively the whole time — the swipe only ever fires as a side effect
  // read off the start/end coordinates on lift, not by hijacking the
  // gesture. That's also why a diagonal drag with more vertical than
  // horizontal travel is treated as a scroll, not a swipe.
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    // Swipe left (negative deltaX) reveals what's next, matching every
    // native photo gallery's convention.
    go(deltaX < 0 ? 1 : -1);
  };

  const onTouchCancel = () => {
    touchStart.current = null;
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
      <div
        className={styles.mediaWrap}
        onTouchStart={hasMultiple ? onTouchStart : undefined}
        onTouchEnd={hasMultiple ? onTouchEnd : undefined}
        onTouchCancel={hasMultiple ? onTouchCancel : undefined}
      >
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
