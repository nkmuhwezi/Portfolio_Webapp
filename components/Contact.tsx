import { contact, hero } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <SectionHeading title="Contact" />

        <p className={styles.openingHeadline}>{contact.openingHeadline}</p>
        <p className={styles.openingSupport}>{contact.openingSupport}</p>

        <div className={styles.actions}>
          <a className={styles.primaryAction} href={`mailto:${contact.email}`}>
            Email Norman
            <span aria-hidden="true">→</span>
          </a>
          <a
            className={styles.secondaryAction}
            href={contact.linkedinUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className={styles.supportingLine}>{contact.supportingLine}</p>

        <footer className={styles.footer}>
          <p className={styles.colophon}>
            © {new Date().getFullYear()} {hero.name}
          </p>
        </footer>
      </div>
    </section>
  );
}
