"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { CaseStudyImage } from "@/lib/content";
import { projectMomentum, springConstants, springStep } from "@/lib/spring";
import CaseStudyPhoto, {
  CASE_STUDY_IMAGE_SIZES,
  webpSrcSet,
} from "./CaseStudyPhoto";
import styles from "./CaseStudyGallery.module.css";

type Props = {
  images: CaseStudyImage[];
  /** Used only in control labels ("Next photo, <label>"), never shown. */
  storyLabel: string;
};

/** Minimum horizontal travel, in px, before a slow drag counts as a
 * deliberate swipe rather than a wobble mid-scroll. A fast flick doesn't
 * need to cover this much ground — see FAST_SWIPE_* below. Used only by
 * the reduced-motion fallback path, which keeps the exact threshold logic
 * this site shipped with before the spring rewrite. */
const SWIPE_THRESHOLD = 40;
const FAST_SWIPE_MIN_DISTANCE = 18;
const FAST_SWIPE_VELOCITY = 0.45; // px/ms

/** How far a pointer has to travel before it commits to being a
 * horizontal swipe or a vertical scroll — see apple-design skill §10.
 * Below this, nothing happens: no preventDefault, no transform, so a tap
 * or the start of a scroll is indistinguishable from today. */
const DIRECTION_HYSTERESIS = 10; // px

/** Exponential-decay momentum model, matches native scroll deceleration
 * (apple-design skill §6). */
const DECELERATION_RATE = 0.998;

/** Spring settle timing. Critical damping (no bounce) when the gesture is
 * rejected and the photo returns to rest; a touch of underdamped give
 * only when real release velocity carried the swipe past the midpoint —
 * bounce is reserved for momentum, never used on a plain drag. */
const SETTLE_RESPONSE = 0.32; // seconds
const SETTLE_DAMPING_REJECT = 1;
const SETTLE_DAMPING_COMMIT = 0.86;

/** Pointer position history kept for release-velocity smoothing, so one
 * jittery sample right at lift-off can't dominate the read. */
const VELOCITY_SAMPLE_WINDOW = 100; // ms

type DragState = {
  reducedMotion: boolean;
  startX: number;
  startY: number;
  startTime: number;
  /** Live translateX at the moment this gesture began — lets a re-grab
   * mid-settle continue from the on-screen position instead of resetting. */
  baseX: number;
  committed: "x" | "y" | null;
  peekDirection: 1 | -1 | null;
  history: { x: number; time: number }[];
};

type Peek = { index: number; direction: 1 | -1 };

/**
 * A single image slot that cycles through `images` — arrow buttons, dot
 * jump-to controls, left/right arrow keys, and a drag/swipe gesture (touch,
 * mouse, or pen, via the Pointer Events API), never on a timer. A
 * one-image story renders as a plain photo: no controls, nothing to
 * switch between.
 */
export default function CaseStudyGallery({ images, storyLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [peek, setPeek] = useState<Peek | null>(null);
  const hasMultiple = images.length > 1;
  const current = images[index];

  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef<HTMLDivElement>(null);
  const peekSlideRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<DragState | null>(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0); // px/s
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const containerWidthRef = useRef(0);

  const go = (delta: number) => {
    setIndex((current) => (current + delta + images.length) % images.length);
  };

  // Once this gallery is on screen, warm the browser's cache for every
  // slide, not just the current one — otherwise swiping to a slide that's
  // still loading="lazy" and never been requested means a real network
  // fetch sits between the gesture and the photo appearing, which reads
  // as the swipe itself being slow even though it fired instantly.
  useEffect(() => {
    if (!hasMultiple) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        for (const image of images) {
          if (!image.src) continue;
          const preload = new Image();
          preload.srcset = webpSrcSet(image.src);
          preload.sizes = CASE_STUDY_IMAGE_SIZES;
        }
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, [hasMultiple, images]);

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

  const applyTransform = (x: number, direction: 1 | -1) => {
    if (currentSlideRef.current) {
      currentSlideRef.current.style.transform = `translateX(${x}px)`;
    }
    if (peekSlideRef.current) {
      const base = direction === 1 ? containerWidthRef.current : -containerWidthRef.current;
      peekSlideRef.current.style.transform = `translateX(${x + base}px)`;
    }
  };

  const cancelSettle = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Positions a freshly-mounted peek slide correctly on its very first
  // paint — without this, it would briefly render at transform: none
  // (fully overlapping the current photo) for one frame before the next
  // touchmove gets a chance to place it off to the side.
  useLayoutEffect(() => {
    if (!peek) return;
    if (currentSlideRef.current) {
      currentSlideRef.current.style.transform = `translateX(${xRef.current}px)`;
    }
    if (peekSlideRef.current) {
      const base = peek.direction === 1 ? containerWidthRef.current : -containerWidthRef.current;
      peekSlideRef.current.style.transform = `translateX(${xRef.current + base}px)`;
    }
  }, [peek]);

  // Whenever the visible index changes — from a completed swipe as much
  // as from the arrow buttons, dots, or keyboard — the current slide's
  // transform (left over from a swipe that just finished) needs clearing
  // synchronously before paint, or the newly-current photo would render
  // wherever the outgoing one last sat.
  useLayoutEffect(() => {
    if (currentSlideRef.current) {
      currentSlideRef.current.style.transform = "";
    }
  }, [index]);

  const runSettle = (
    target: number,
    dampingRatio: number,
    direction: 1 | -1,
    onComplete: () => void,
  ) => {
    cancelSettle();
    const { stiffness, damping } = springConstants(dampingRatio, SETTLE_RESPONSE);
    lastFrameTimeRef.current = performance.now();

    const step = (now: number) => {
      const dt = Math.min(Math.max((now - lastFrameTimeRef.current) / 1000, 0), 0.032);
      lastFrameTimeRef.current = now;

      const next = springStep(xRef.current, velocityRef.current, target, stiffness, damping, dt);
      xRef.current = next.position;
      velocityRef.current = next.velocity;
      applyTransform(xRef.current, direction);

      const settled = Math.abs(next.position - target) < 0.5 && Math.abs(next.velocity) < 20;
      if (settled) {
        xRef.current = target;
        velocityRef.current = 0;
        rafRef.current = null;
        onComplete();
      } else {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => cancelSettle, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // Only the primary mouse button starts a drag — a right-click or a
    // hover-only pointermove (no button held) should never engage this.
    // Touch and pen contacts don't carry a meaningful button state, so
    // they're unaffected by this check.
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wasSettling = rafRef.current !== null;

    if (!reducedMotion) {
      // Interrupt an in-flight settle rather than letting it fight the new
      // gesture — the drag continues from wherever the photo actually is
      // on screen right now (xRef), never from a reset position.
      cancelSettle();
      containerWidthRef.current = mediaWrapRef.current?.getBoundingClientRect().width ?? 0;
    }

    const resuming = !reducedMotion && wasSettling && peek !== null;

    dragRef.current = {
      reducedMotion,
      startX: event.clientX,
      startY: event.clientY,
      startTime: performance.now(),
      baseX: xRef.current,
      committed: resuming ? "x" : null,
      peekDirection: resuming ? peek!.direction : null,
      history: [{ x: event.clientX, time: performance.now() }],
    };
  };

  useEffect(() => {
    if (!hasMultiple) return;
    const el = mediaWrapRef.current;
    if (!el) return;

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.reducedMotion) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      if (drag.committed === null) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < DIRECTION_HYSTERESIS) return;
        drag.committed = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (drag.committed === "x") {
          const direction: 1 | -1 = dx < 0 ? 1 : -1;
          drag.peekDirection = direction;
          const nextIndex = (index + direction + images.length) % images.length;
          setPeek({ index: nextIndex, direction });
        }
      }

      if (drag.committed !== "x" || drag.peekDirection === null) return;

      // Only ever suppressed once a horizontal swipe is confirmed — a
      // vertical drag never reaches this line, so native scroll is
      // untouched for it.
      event.preventDefault();

      const now = performance.now();
      drag.history.push({ x: event.clientX, time: now });
      while (drag.history.length > 1 && now - drag.history[0].time > VELOCITY_SAMPLE_WINDOW) {
        drag.history.shift();
      }

      const width = containerWidthRef.current || 1;
      const direction = drag.peekDirection;
      let proposed = drag.baseX + dx;
      // Clamp to the single slide's worth of travel in the committed
      // direction — reversing past the resting point just re-reveals the
      // current photo, it doesn't chain into the opposite neighbour
      // within the same gesture.
      proposed = direction === 1
        ? Math.min(Math.max(proposed, -width), 0)
        : Math.max(Math.min(proposed, width), 0);

      xRef.current = proposed;
      applyTransform(proposed, direction);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: false });
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, [hasMultiple, images, index]);

  const settleToRest = (direction: 1 | -1) => {
    runSettle(0, SETTLE_DAMPING_REJECT, direction, () => {
      if (currentSlideRef.current) currentSlideRef.current.style.transform = "";
      setPeek(null);
      xRef.current = 0;
      velocityRef.current = 0;
    });
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;

    if (drag.reducedMotion) {
      // Exactly today's instant, unanimated threshold check.
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      const absDeltaX = Math.abs(deltaX);
      const elapsed = Math.max(performance.now() - drag.startTime, 1);
      const velocity = absDeltaX / elapsed;

      const clearsSlowDrag = absDeltaX >= SWIPE_THRESHOLD;
      const clearsFastFlick =
        absDeltaX >= FAST_SWIPE_MIN_DISTANCE && velocity >= FAST_SWIPE_VELOCITY;

      if ((!clearsSlowDrag && !clearsFastFlick) || absDeltaX <= Math.abs(deltaY)) {
        return;
      }
      go(deltaX < 0 ? 1 : -1);
      return;
    }

    if (drag.committed !== "x" || drag.peekDirection === null) {
      // Never crossed into a horizontal swipe — nothing was ever mounted
      // or transformed, so there's nothing to settle.
      return;
    }

    const direction = drag.peekDirection;
    const width = containerWidthRef.current || 1;

    const recent = drag.history;
    const first = recent[0];
    const last = recent[recent.length - 1];
    const dt = Math.max(last.time - first.time, 1);
    const releaseVelocity = ((last.x - first.x) / dt) * 1000; // px/s
    velocityRef.current = releaseVelocity;

    const projected = xRef.current + projectMomentum(releaseVelocity, DECELERATION_RATE);
    const pastHalfway = direction === 1 ? projected <= -width / 2 : projected >= width / 2;

    if (pastHalfway) {
      const target = direction === 1 ? -width : width;
      runSettle(target, SETTLE_DAMPING_COMMIT, direction, () => {
        go(direction);
        setPeek(null);
        xRef.current = 0;
        velocityRef.current = 0;
      });
    } else {
      settleToRest(direction);
    }
  };

  const onPointerCancel = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.reducedMotion || drag.committed !== "x" || drag.peekDirection === null) {
      return;
    }
    settleToRest(drag.peekDirection);
  };

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      role={hasMultiple ? "group" : undefined}
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-label={hasMultiple ? `${storyLabel} photos` : undefined}
      tabIndex={hasMultiple ? 0 : undefined}
      onKeyDown={hasMultiple ? onKeyDown : undefined}
    >
      <div
        className={styles.mediaWrap}
        ref={mediaWrapRef}
        onPointerDown={hasMultiple ? onPointerDown : undefined}
        onPointerUp={hasMultiple ? onPointerUp : undefined}
        onPointerCancel={hasMultiple ? onPointerCancel : undefined}
      >
        <div className={styles.slide} ref={currentSlideRef}>
          <CaseStudyPhoto image={current} />
        </div>

        {peek ? (
          <div className={styles.slide} ref={peekSlideRef}>
            <CaseStudyPhoto image={images[peek.index]} />
          </div>
        ) : null}

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
