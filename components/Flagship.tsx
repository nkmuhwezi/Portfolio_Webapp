"use client";

import { useId, useState } from "react";
import { flagship, flagshipCaseStudy, flagshipFlow } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import styles from "./Flagship.module.css";

const BOX_WIDTH = 135;
const BOX_HEIGHT = 56;
const GAP = 15;
const MARGIN_X = 40;
const BOX_Y = 20;
const VIEW_HEIGHT = 96;

/**
 * The tokens this reads (--bg-raised, --rule, --heading, --muted, --accent,
 * --accent-wash, --accent-rule, --bg) are inline SVG presentation
 * attributes, not a separate image file — that's what lets them resolve
 * against the page's live CSS custom properties and adapt to Lumen/Vast
 * automatically. An <img src="diagram.svg"> can't do this: an externally
 * loaded SVG has no access to the parent document's CSS.
 */
function FlowDiagram({
  activeIndex,
  onSelect,
}: {
  activeIndex: number | null;
  onSelect: (index: number) => void;
}) {
  const n = flagshipFlow.length;
  const totalWidth = MARGIN_X * 2 + n * BOX_WIDTH + (n - 1) * GAP;
  const arrowId = useId();

  return (
    <div className={styles.diagramScroll}>
      <svg
        className={styles.diagram}
        viewBox={`0 0 ${totalWidth} ${VIEW_HEIGHT}`}
        width="100%"
        role="img"
        aria-label={`Flow diagram: ${flagshipFlow.map((s) => `${s.value} ${s.label}`).join(", then ")}`}
      >
        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1L8 5L2 9"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {flagshipFlow.map((step, index) => {
          const x = MARGIN_X + index * (BOX_WIDTH + GAP);
          const cx = x + BOX_WIDTH / 2;

          const fill =
            step.tone === "solid"
              ? "var(--accent)"
              : step.tone === "accent"
                ? "var(--accent-wash)"
                : "var(--bg-raised)";
          const stroke =
            step.tone === "solid"
              ? "var(--accent)"
              : step.tone === "accent"
                ? "var(--accent-rule)"
                : "var(--rule)";
          const valueColor = step.tone === "solid" ? "var(--bg)" : "var(--heading)";
          const labelColor =
            step.tone === "solid"
              ? "var(--bg)"
              : step.tone === "accent"
                ? "var(--accent)"
                : "var(--muted)";

          const isActive = activeIndex === index;

          return (
            <g key={step.label}>
              {index > 0 ? (
                <line
                  x1={x - GAP}
                  y1={BOX_Y + BOX_HEIGHT / 2}
                  x2={x}
                  y2={BOX_Y + BOX_HEIGHT / 2}
                  stroke="var(--muted)"
                  strokeWidth="1"
                  markerEnd={`url(#${arrowId})`}
                />
              ) : null}

              {/* A real focusable, clickable group rather than a <div> with a
                  mouse-only handler — Enter/Space fire the same onSelect a
                  click would. */}
              <g
                className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${step.value} ${step.label}`}
                onClick={() => onSelect(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(index);
                  }
                }}
              >
                <rect
                  className={styles.stepRect}
                  x={x}
                  y={BOX_Y}
                  width={BOX_WIDTH}
                  height={BOX_HEIGHT}
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.5"
                />
                <text
                  x={cx}
                  y={BOX_Y + 18}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-sans)"
                  fontSize="14"
                  fontWeight="500"
                  fill={valueColor}
                >
                  {step.value}
                </text>
                <text
                  x={cx}
                  y={BOX_Y + 40}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-sans)"
                  fontSize="12"
                  fill={labelColor}
                >
                  {step.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Flagship() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const panelId = "flagship-case-study";

  const selectStep = (index: number) => {
    setActiveStep((current) => (current === index ? null : index));
  };

  return (
    <aside className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{flagship.eyebrow}</p>
        <p className={styles.body}>
          {highlight(flagship.body, flagship.highlight, styles.figure)}
        </p>

        <FlowDiagram activeIndex={activeStep} onSelect={selectStep} />

        {/* Reserves its height even when empty so revealing a detail
            doesn't shift the "Read the full story" control below it. */}
        <p className={styles.stepDetail} aria-live="polite">
          {activeStep !== null ? (
            <>
              <span className={styles.stepDetailLabel}>
                {flagshipFlow[activeStep].label}
              </span>
              {flagshipFlow[activeStep].detail}
            </>
          ) : (
            <span className={styles.stepDetailHint}>
              Tap a step above for more detail.
            </span>
          )}
        </p>

        <button
          type="button"
          className={styles.expandButton}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className={styles.toggle} aria-hidden="true">
            <span className={styles.toggleBar} />
            <span
              className={`${styles.toggleBar} ${styles.toggleBarVertical}`}
            />
          </span>
          {isOpen ? "Hide the full story" : "Read the full story"}
        </button>

        <div
          className={styles.panel}
          id={panelId}
          data-open={isOpen}
          inert={!isOpen}
        >
          <div className={styles.panelInner}>
            <dl className={styles.caseStudy}>
              {flagshipCaseStudy.map((section) => (
                <div className={styles.caseStudyItem} key={section.label}>
                  <dt className={styles.caseStudyLabel}>{section.label}</dt>
                  <dd className={styles.caseStudyBody}>{section.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </aside>
  );
}
