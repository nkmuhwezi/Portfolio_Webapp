import { education, professionalDevelopment } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section className={styles.section} id="credentials">
      <div className="container">
        <SectionHeading title="Education & Professional Development" />

        <div className={styles.groups}>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Education</h3>
            <ul className={styles.list}>
              {education.map((item) => (
                <li className={styles.item} key={item.credential}>
                  <div className={styles.rail}>
                    <span className={styles.year}>{item.year}</span>
                  </div>

                  <div className={styles.main}>
                    <h4 className={styles.credential}>{item.credential}</h4>
                    {item.institution ? (
                      <p className={styles.institution}>{item.institution}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Professional Development</h3>
            <ul className={styles.list}>
              {professionalDevelopment.map((item) => (
                <li className={styles.item} key={item.credential}>
                  <div className={styles.rail}>
                    <span className={styles.year}>{item.year}</span>
                  </div>

                  <div className={styles.main}>
                    <h4 className={styles.credential}>{item.credential}</h4>
                    {item.institution ? (
                      <p className={styles.institution}>{item.institution}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
