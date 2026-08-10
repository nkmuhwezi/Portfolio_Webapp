import type { CaseStudy } from "@/lib/content";
import { caseStudyImages } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import CaseStudySteps from "./CaseStudySteps";
import PlaceholderFigure from "./PlaceholderFigure";
import styles from "./CaseStudyFeature.module.css";

export default function CaseStudyFeature({ story }: { story: CaseStudy }) {
  const images = caseStudyImages[story.id];

  return (
    <article className={styles.feature}>
      <p className={`eyebrow ${styles.eyebrow}`}>{story.eyebrow}</p>

      <h3 className={styles.headline}>
        {highlight(story.headline, story.highlight, styles.figure)}
      </h3>

      <p className={styles.supportingLine}>{story.supportingLine}</p>

      <div className={styles.body}>
        <PlaceholderFigure image={images.lead} caption={images.lead.caption} />

        <ul className={styles.proofPoints}>
          {story.proofPoints.map((point) => (
            <li className={styles.proofPoint} key={point}>
              {highlight(point, story.highlight, styles.figure)}
            </li>
          ))}
        </ul>
      </div>

      <CaseStudySteps steps={story.steps} cta={story.stepsCta} />

      {/* Extra evidence images a story picks up once real photography
          exists for it — smaller and narrower than the lead image so
          they read as supporting material, not a second hero shot. */}
      {images.supporting ? (
        <div className={styles.supportingMedia}>
          <PlaceholderFigure image={images.supporting} caption={images.supporting.caption} />
        </div>
      ) : null}

      {images.optional ? (
        <div className={styles.supportingMedia}>
          <PlaceholderFigure image={images.optional} caption={images.optional.caption} />
        </div>
      ) : null}
    </article>
  );
}
