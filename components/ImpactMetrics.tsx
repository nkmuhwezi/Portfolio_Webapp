import { impactMetrics } from "@/lib/content";
import styles from "./ImpactMetrics.module.css";

export default function ImpactMetrics() {
  return (
    <section className={styles.section} aria-label="Proof">
      <div className="container">
        <dl className={styles.grid}>
          {impactMetrics.map((metric) => (
            <div className={styles.metric} key={metric.value + metric.label}>
              <dt className={styles.value}>{metric.value}</dt>
              <dd className={styles.label}>{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
