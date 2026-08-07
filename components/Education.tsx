import { education } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section className={styles.section} id="education">
      <div className="container">
        <SectionHeading title="Education & Certifications" />

        <ul className={styles.list}>
          {education.map((item) => (
            <li className={styles.item} key={item.credential}>
              {/* Same metadata rail as Experience — here it carries the year. */}
              <div className={styles.rail}>
                <span className={styles.year}>{item.year}</span>
              </div>

              <div className={styles.main}>
                <h3 className={styles.credential}>{item.credential}</h3>
                {item.institution ? (
                  <p className={styles.institution}>{item.institution}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
