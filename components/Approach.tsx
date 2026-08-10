import { approach } from "@/lib/content";
import styles from "./Approach.module.css";

export default function Approach() {
  return (
    <section className={styles.section} id="approach">
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>{approach.eyebrow}</p>

        <p className={styles.lead}>{approach.leadStatement}</p>

        <ol className={styles.blocks}>
          {approach.blocks.map((block) => (
            <li className={styles.block} key={block.number}>
              <span className={styles.number}>{block.number}</span>
              <h3 className={styles.title}>{block.title}</h3>
              <p className={styles.body}>{block.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
