import { useEffect, useState, type RefObject } from "react";

/** Leading edge of the fill sits this far down the viewport for a tall
 * (vertical) list, roughly where a reader's eye rests while scrolling. */
const READING_LINE = 0.7;

/** For a single horizontal row there's no height to scrub through, so the
 * fill is tied to the row's own travel up the viewport instead: it starts
 * once the row's top clears this line... */
const ROW_START = 0.85;
/** ...and finishes after the row has moved this fraction of a viewport. */
const ROW_TRAVEL = 0.3;

/** How far past an item's start the fill must run before it counts as
 * reached — about where its marker dot sits. */
const DOT_OFFSET = 8;

/**
 * Scroll-linked progress for a timeline-style list: a line that fills as
 * the reader scrolls, and the number of items it has reached so far.
 *
 * Writes the fill amount (0 to 1) to the container's `--p` custom
 * property every frame, straight on the element — never through React
 * state, so scrolling causes no re-renders. The returned count is state,
 * but it changes at most once per item. Works for both layouts this site
 * uses: it reads the items' own positions to tell a stacked list from a
 * single row.
 *
 * Does nothing under prefers-reduced-motion; the stylesheet shows the
 * finished state there instead of an animation.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
) {
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;

    let scheduled = false;

    const update = () => {
      scheduled = false;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const vertical =
        items.length > 1 &&
        items[items.length - 1].offsetTop - items[0].offsetTop > 4;

      const raw = vertical
        ? (viewport * READING_LINE - rect.top) / Math.max(1, rect.height)
        : (viewport * ROW_START - rect.top) / Math.max(1, viewport * ROW_TRAVEL);
      const progress = Math.min(1, Math.max(0, raw));

      el.style.setProperty("--p", progress.toFixed(4));

      const fill = progress * (vertical ? el.offsetHeight : el.offsetWidth);
      let count = 0;
      for (const item of items) {
        const start = vertical ? item.offsetTop : item.offsetLeft;
        if (start + DOT_OFFSET <= fill) count += 1;
      }
      setReached(count);
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return reached;
}
