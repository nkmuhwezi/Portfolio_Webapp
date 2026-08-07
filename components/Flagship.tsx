import { flagship } from "@/lib/content";
import { highlight } from "@/lib/highlight";
import styles from "./Flagship.module.css";

export default function Flagship() {
  return (
    <aside className={styles.callout}>
      <p className={`eyebrow ${styles.eyebrow}`}>{flagship.eyebrow}</p>
      <p className={styles.body}>
        {highlight(flagship.body, flagship.highlight, styles.figure)}
      </p>
    </aside>
  );
}
