import { caseStudies } from "@/lib/content";
import CaseStudyFeature from "./CaseStudyFeature";
import SectionHeading from "./SectionHeading";
import TelecomCaseStudy from "./TelecomCaseStudy";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section className={styles.section} id="work">
      <div className="container">
        <SectionHeading title="Selected Transformation Stories" />

        <div className={styles.list}>
          {caseStudies.map((story) =>
            // Telecom has no project photography, and none is faked to
            // fill the gap — it gets a dedicated code-built schematic
            // instead of the photo carousel the other two stories use.
            story.id === "telecom" ? (
              <TelecomCaseStudy key={story.id} />
            ) : (
              <CaseStudyFeature story={story} key={story.id} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
