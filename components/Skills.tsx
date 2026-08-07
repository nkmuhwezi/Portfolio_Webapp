import { coreCompetencies, languages, platformsAndTools } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className="container">
        <SectionHeading title="Skills" />

        <div className={styles.groups}>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Core Competencies</h3>
            <ul className={styles.flow}>
              {coreCompetencies.map((item) => (
                <li className={styles.flowItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Platforms & Tools</h3>
            <ul className={`${styles.flow} ${styles.flowMono}`}>
              {platformsAndTools.map((item) => (
                <li className={styles.flowItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Languages</h3>
            <ul className={styles.languages}>
              {languages.map((language) => (
                <li className={styles.language} key={language.name}>
                  <span className={styles.languageName}>{language.name}</span>
                  <span className={styles.languageLevel}>{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
