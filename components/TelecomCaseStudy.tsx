"use client";

import { caseStudies, telecomSchematic } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import CaseStudySteps from "./CaseStudySteps";
import featureStyles from "./CaseStudyFeature.module.css";
import styles from "./TelecomCaseStudy.module.css";

const story = caseStudies.find((s) => s.id === "telecom")!;

/**
 * The MTN story has no historical project photography available, and
 * none is faked to fill the slot — a stock tower or an AI-generated
 * scene would be exactly the kind of decoration the rest of this site
 * avoids. This renders a custom, code-built schematic instead: every
 * label and number is real text in the DOM, not an image, so it holds
 * up without color and without JavaScript.
 */
function Schematic() {
  const { ref: rowRef, revealed } = useRevealOnScroll<HTMLOListElement>();

  return (
    <ol
      className={`${styles.stages} ${revealed ? styles.stagesRevealed : ""}`}
      ref={rowRef}
      aria-label="Network modernisation programme, five stages"
    >
      {telecomSchematic.stages.map((stage, index) => (
        <li
          className={styles.stage}
          key={stage.label}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <p className={styles.stageNumber}>{stage.number}</p>
          <h4 className={styles.stageLabel}>{stage.label}</h4>
          <p className={styles.stageDetail}>{stage.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function Evidence() {
  const [primary, ...supporting] = telecomSchematic.evidence;

  return (
    <div className={styles.evidence}>
      <div className={styles.evidencePrimary}>
        <p className={styles.evidencePrimaryValue}>{primary.value}</p>
        <p className={styles.evidencePrimaryLabel}>{primary.label}</p>
      </div>

      <ul className={styles.evidenceSupporting}>
        {supporting.map((metric) => (
          <li className={styles.evidenceItem} key={metric.value}>
            <p className={styles.evidenceValue}>{metric.value}</p>
            <p className={styles.evidenceLabel}>{metric.label}</p>
          </li>
        ))}
      </ul>

      <p className={styles.evidenceNote}>{telecomSchematic.evidenceNote}</p>
    </div>
  );
}

export default function TelecomCaseStudy() {
  return (
    <article className={featureStyles.feature}>
      <p className={`eyebrow ${featureStyles.eyebrow}`}>{story.eyebrow}</p>

      <h3 className={featureStyles.headline}>
        {highlight(story.headline, story.highlight, featureStyles.figure)}
      </h3>

      <p className={featureStyles.supportingLine}>{story.supportingLine}</p>

      <div className={styles.schematicPanel}>
        <p className={styles.panelCaption}>Network modernisation programme</p>
        <Schematic />
      </div>

      <div className={styles.schematicPanel}>
        <p className={styles.panelCaption}>Evidence</p>
        <Evidence />
      </div>

      <CaseStudySteps steps={story.steps} cta={story.stepsCta} />
    </article>
  );
}
