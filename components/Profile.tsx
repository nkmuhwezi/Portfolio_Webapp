import { profile, stats } from "@/lib/content";
import Flagship from "./Flagship";
import SectionHeading from "./SectionHeading";
import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <section className={styles.section} id="profile">
      <div className="container">
        <SectionHeading title="Profile" />

        <p className={styles.summary}>{profile}</p>

        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.value + stat.label}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <Flagship />
      </div>
    </section>
  );
}
