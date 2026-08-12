import type { CaseStudy } from "@/lib/content";
import { caseStudyImages } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import CaseStudyGallery from "./CaseStudyGalleryLazy";
import CaseStudySteps from "./CaseStudyStepsLazy";
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
        <CaseStudyGallery images={images} storyLabel={story.headline} />

        <ul className={styles.proofPoints}>
          {story.proofPoints.map((point) => (
            <li className={styles.proofPoint} key={point}>
              {highlight(point, story.highlight, styles.figure)}
            </li>
          ))}
        </ul>
      </div>

      <CaseStudySteps steps={story.steps} cta={story.stepsCta} />
    </article>
  );
}
