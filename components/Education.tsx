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
              <div className={styles.text}>
                <h3 className={styles.credential}>{item.credential}</h3>
                {item.institution ? (
                  <p className={styles.institution}>{item.institution}</p>
                ) : null}
              </div>
              <span className={styles.year}>{item.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
