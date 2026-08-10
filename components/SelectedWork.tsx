import { caseStudies } from "@/lib/content";
import CaseStudyFeature from "./CaseStudyFeature";
import SectionHeading from "./SectionHeading";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section className={styles.section} id="work">
      <div className="container">
        <SectionHeading title="Selected Transformation Stories" />

        <div className={styles.list}>
          {caseStudies.map((story) => (
            <CaseStudyFeature story={story} key={story.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
