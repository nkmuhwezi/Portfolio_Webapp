import { capabilities, languages, platformsAndTools } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Capabilities.module.css";

export default function Capabilities() {
  return (
    <section className={styles.section} id="capabilities">
      <div className="container">
        <SectionHeading title="Capabilities" />

        <div className={styles.groups}>
          {capabilities.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.items}>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>

        {/* Deliberately quieter than the capability groups above — tools
            are secondary evidence, not the headline. */}
        <p className={styles.tools}>
          <span className={styles.toolsLabel}>Platforms & tools</span>
          {platformsAndTools.join(" · ")}
        </p>

        <ul className={styles.languages}>
          {languages.map((language) => (
            <li className={styles.language} key={language.name}>
              <span className={styles.languageName}>{language.name}</span>
              <span className={styles.languageLevel}>{language.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
