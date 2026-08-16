import { useEffect, useRef, useState } from "react";

/**
 * Reveals once, the first time the returned ref's element enters view —
 * not a repeating effect on every scroll past it. Shared by every section
 * that fades/rises its content in on first scroll (CareerTrajectory,
 * TelecomCaseStudy's stage diagram, OtherSystems).
 */
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
