import { aiInPractice } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./AIInPractice.module.css";

export default function AIInPractice() {
  return (
    <section className={styles.section} id="ai-in-practice">
      <div className="container">
        <SectionHeading title="AI in Practice" />

        <p className={styles.intro}>{aiInPractice.intro}</p>

        <ul className={styles.entries}>
          {aiInPractice.entries.map((entry) => (
            <li className={styles.entry} key={entry.title}>
              <p className={styles.tag}>{entry.tag}</p>
              <h3 className={styles.title}>{entry.title}</h3>
              <p className={styles.body}>{entry.body}</p>
              {entry.list ? (
                <p className={styles.list}>
                  <span className={styles.listLabel}>{entry.list.label}</span>
                  {entry.list.items.join(" · ")}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
