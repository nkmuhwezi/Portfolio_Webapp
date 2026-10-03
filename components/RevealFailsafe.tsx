"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealFailsafe?: number;
  }
}

/**
 * Half of the "never leave content invisible" gate (the other half is the
 * inline script in app/layout.tsx).
 *
 * Sections that fade in on scroll are only hidden while `html.js` is set,
 * and that script also starts a timer that removes the class. If the
 * page's JavaScript never arrives, the timer fires and everything shows.
 * If it does arrive, this runs after hydration and cancels the timer, so
 * the scroll reveals work normally. Renders nothing.
 */
export default function RevealFailsafe() {
  useEffect(() => {
    window.clearTimeout(window.__revealFailsafe);
  }, []);

  return null;
}
