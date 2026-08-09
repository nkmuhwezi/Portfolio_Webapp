"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

// wispr's own names for these two literal tones (lumen, vast) — kept
// rather than swapped for generic "Light/Dark" labels.
const THEME_COLOR: Record<Theme, string> = {
  dark: "#1a1a1a",
  light: "#ffffeb",
};

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
}

export default function ThemeToggle() {
  // The blocking script in layout.tsx has already set data-theme on <html>
  // before this component mounts (stored choice, or prefers-color-scheme
  // if there isn't one yet), preventing a flash of the wrong theme — this
  // just reads back whatever it decided.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Syncing from an external system (the DOM attribute the blocking
    // script already set) on mount, not a state cascade — the lint rule
    // can't tell the two apart.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    // Tracks the OS/browser theme live — but only until a visitor picks one
    // themselves. Once localStorage has a value, this handler becomes a
    // no-op rather than fighting a choice the visitor actually made; there's
    // no need to detach the listener to express that, just to check storage
    // on every firing.
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const next: Theme = e.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className={styles.toggle} role="group" aria-label="Colour theme">
      <button
        type="button"
        className={styles.option}
        aria-pressed={theme === "light"}
        aria-label="Switch to light theme"
        onClick={() => choose("light")}
      >
        Lumen
      </button>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.option}
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark theme"
        onClick={() => choose("dark")}
      >
        Vast
      </button>
    </div>
  );
}
