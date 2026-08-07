"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

const THEME_COLOR: Record<Theme, string> = {
  dark: "#1a1817",
  light: "#f1f3f4",
};

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
}

export default function ThemeToggle() {
  // The blocking script in layout.tsx has already set data-theme on <html>
  // before this component mounts, preventing a flash of the wrong theme —
  // this just reads back whatever it decided.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Syncing from an external system (the DOM attribute the blocking
    // script already set) on mount, not a state cascade — the lint rule
    // can't tell the two apart.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "light" ? "light" : "dark");
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
        aria-pressed={theme === "dark"}
        onClick={() => choose("dark")}
      >
        Noir
      </button>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.option}
        aria-pressed={theme === "light"}
        onClick={() => choose("light")}
      >
        Daylight
      </button>
    </div>
  );
}
