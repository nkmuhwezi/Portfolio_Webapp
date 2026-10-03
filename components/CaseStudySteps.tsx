"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import type { CaseStudyStep } from "@/lib/content";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import styles from "./CaseStudySteps.module.css";

const BOX_WIDTH = 135;
const BOX_HEIGHT = 56;
const GAP = 15;
const MARGIN_X = 40;
const BOX_Y = 20;
const VIEW_HEIGHT = 96;

/**
 * One color family stepping from lightest to darkest/most-saturated across
 * the four boxes — each value is how much `--accent` to mix into
 * `--bg-raised`. Built from the site's own palette variables, so it
 * re-derives correctly for Lumen and Vast rather than assuming which
 * theme's accent is the "dark" end. Stays under ~45% for every step but
 * the last so --heading text keeps safe contrast; only the final, fully
 * saturated step switches to --bg text.
 */
const RAMP_PERCENT = [10, 28, 45, 100];

function stepColors(index: number) {
  const fillPercent = RAMP_PERCENT[index];
  const strokePercent = Math.min(fillPercent + 20, 100);
  const isFinal = fillPercent === 100;

  return {
    fill: `color-mix(in srgb, var(--accent) ${fillPercent}%, var(--bg-raised))`,
    stroke: `color-mix(in srgb, var(--accent) ${strokePercent}%, var(--bg-raised))`,
    text: isFinal ? "var(--bg)" : "var(--heading)",
    label: isFinal ? "var(--bg)" : "var(--muted)",
  };
}

/**
 * The tokens this reads (--bg-raised, --heading, --muted, --accent, --bg)
 * are inline SVG presentation attributes, not a separate image file —
 * that's what lets them resolve against the page's live CSS custom
 * properties and adapt to Lumen/Vast automatically.
 */
function StepDiagram({
  steps,
  activeIndex,
  onSelect,
  onNavigate,
}: {
  steps: CaseStudyStep[];
  activeIndex: number | null;
  /** Click / Enter / Space: toggles, so picking the open step closes it. */
  onSelect: (index: number) => void;
  /** Arrow keys: always lands on the step, never toggles it off. */
  onNavigate: (index: number) => void;
}) {
  const n = steps.length;
  const totalWidth = MARGIN_X * 2 + n * BOX_WIDTH + (n - 1) * GAP;
  const arrowId = useId();
  // A second arrowhead in the accent color: SVG markers can't take a
  // per-line color, so a lit connector swaps to this one.
  const litArrowId = useId();
  const stepRefs = useRef<(SVGGElement | null)[]>([]);
  // Entrance: the boxes rise in one after another and the connectors draw
  // between them, once, when the diagram scrolls into view. Same reveal
  // hook and html.js gate as the page's other sections.
  const { ref: scrollRef, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      className={`${styles.diagramScroll} ${revealed ? styles.revealed : ""}`}
      ref={scrollRef}
    >
      <svg
        className={styles.diagram}
        viewBox={`0 0 ${totalWidth} ${VIEW_HEIGHT}`}
        width="100%"
        role="img"
        aria-label={`Delivery steps: ${steps.map((s) => `${s.label}`).join(", then ")}`}
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
          <marker
            id={litArrowId}
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
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {steps.map((step, index) => {
          const x = MARGIN_X + index * (BOX_WIDTH + GAP);
          const cx = x + BOX_WIDTH / 2;
          const { fill, stroke, text: valueColor, label: labelColor } =
            stepColors(index);

          const isActive = activeIndex === index;
          // The path up to the chosen step lights up: every step before it,
          // and every connector leading into it or into an earlier step.
          const isDone = activeIndex !== null && index < activeIndex;
          const connectorLit = activeIndex !== null && index <= activeIndex;
          // Lighting sweeps left to right; un-lighting (a later pick, or
          // closing the step) is immediate, since the delay only applies
          // to the state being transitioned *into*.
          const sweepDelay = { transitionDelay: `${index * 70}ms` };

          return (
            <g
              key={step.label}
              className={styles.entry}
              style={{ "--i": index } as CSSProperties}
            >
              {index > 0 ? (
                <line
                  className={`${styles.connector} ${connectorLit ? styles.connectorLit : ""}`}
                  style={connectorLit ? sweepDelay : undefined}
                  x1={x - GAP}
                  y1={BOX_Y + BOX_HEIGHT / 2}
                  x2={x}
                  y2={BOX_Y + BOX_HEIGHT / 2}
                  stroke="var(--muted)"
                  strokeWidth="1"
                  markerEnd={`url(#${connectorLit ? litArrowId : arrowId})`}
                />
              ) : null}

              {/* A real focusable, clickable group rather than a <div> with a
                  mouse-only handler — Enter/Space fire the same onSelect a
                  click would. No aria-label: the two <text> children below
                  ("01", "Context") already give this its accessible name by
                  content, and a manually-written label ("01: Context") can
                  never literally match that concatenated text — screen
                  readers and voice control then hear two different labels
                  for what's visibly one control. */}
              <g
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isDone ? styles.stepDone : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => onSelect(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(index);
                    return;
                  }

                  // Left/Right (and Home/End) walk the steps, moving focus
                  // and opening each one as you land on it, so the detail
                  // follows the arrow keys. It stops at the ends rather
                  // than wrapping.
                  const target =
                    event.key === "ArrowRight"
                      ? index + 1
                      : event.key === "ArrowLeft"
                        ? index - 1
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? n - 1
                            : null;
                  if (target === null) return;
                  event.preventDefault();
                  if (target < 0 || target >= n || target === index) return;
                  onNavigate(target);
                  stepRefs.current[target]?.focus();
                }}
              >
                {/* Invisible, larger than the visible box it sits behind —
                    widens the tap target on touch devices without
                    changing anything a reader actually sees. Fully
                    transparent fills are still hit-tested in SVG (unlike
                    fill="none"), so this alone makes the whole padded
                    area clickable. */}
                <rect
                  x={x - 6}
                  y={BOX_Y - 15}
                  width={BOX_WIDTH + 12}
                  height={BOX_HEIGHT + 30}
                  fill="transparent"
                />
                <rect
                  className={styles.stepRect}
                  x={x}
                  y={BOX_Y}
                  width={BOX_WIDTH}
                  height={BOX_HEIGHT}
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.75"
                  style={isDone ? sweepDelay : undefined}
                />
                <text
                  x={cx}
                  y={BOX_Y + 18}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  fontWeight="500"
                  letterSpacing="0.05em"
                  fill={valueColor}
                >
                  {step.number}
                </text>
                <text
                  x={cx}
                  y={BOX_Y + 40}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-sans)"
                  fontSize="13"
                  fontWeight="500"
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

export default function CaseStudySteps({
  steps,
  cta,
}: {
  steps: CaseStudyStep[];
  cta: string;
}) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const selectStep = (index: number) => {
    setActiveStep((current) => (current === index ? null : index));
  };

  const goToStep = (index: number) => setActiveStep(index);

  return (
    <div className={styles.wrap} data-has-active={activeStep !== null}>
      <p className={`eyebrow ${styles.caption}`}>{cta}</p>

      <StepDiagram
        steps={steps}
        activeIndex={activeStep}
        onSelect={selectStep}
        onNavigate={goToStep}
      />

      {/*
        Every step's detail stays in the DOM at all times, not just the
        active one — on screen only the active item is shown (CSS, driven
        by data-active), but the print stylesheet forces all of them open.
        A conditionally-*rendered* single paragraph would silently drop the
        other three steps from a printed page, since there'd be nothing
        there for print CSS to reveal.
      */}
      <dl className={styles.stepDetailList} aria-live="polite">
        {steps.map((step, index) => (
          <div
            className={styles.stepDetailItem}
            data-active={activeStep === index}
            key={step.label}
          >
            <dt className={styles.stepDetailLabel}>
              {step.number} · {step.label}
            </dt>
            <dd className={styles.stepDetailBody}>{step.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
