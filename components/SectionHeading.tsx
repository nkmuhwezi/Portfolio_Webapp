import styles from "./SectionHeading.module.css";

type Props = {
  title: string;
};

export default function SectionHeading({ title }: Props) {
  return (
    <div className={styles.heading}>
      <h2 className={`sectionTitle ${styles.title}`}>{title}</h2>
    </div>
  );
}
