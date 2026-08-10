import { about } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import SectionHeading from "./SectionHeading";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <SectionHeading title="About" />

        <div className={styles.copy}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {highlight(paragraph, about.emphasis, styles.emphasis)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
