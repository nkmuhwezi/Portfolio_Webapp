import { contact, hero } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./Contact.module.css";

const links = [
  {
    label: "Email",
    // The address itself never appears as visible text, only as the mailto
    // target — same rule the Hero CTA follows.
    value: "Send an email",
    href: `mailto:${contact.email}`,
  },
  {
    label: "LinkedIn",
    value: contact.linkedinLabel,
    href: contact.linkedinUrl,
    external: true,
  },
];

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <SectionHeading title="Contact" />

        <p className={styles.opening}>{contact.opening}</p>

        <ul className={styles.list}>
          {links.map((link) => (
            <li className={styles.item} key={link.label}>
              <span className={styles.label}>{link.label}</span>
              <a
                className={styles.value}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {link.value}
              </a>
            </li>
          ))}

          <li className={styles.item}>
            <span className={styles.label}>Location</span>
            <span className={styles.valueStatic}>{contact.location}</span>
          </li>
        </ul>

        <footer className={styles.footer}>
          <p className={styles.colophon}>
            © {new Date().getFullYear()} {hero.name}
          </p>
        </footer>
      </div>
    </section>
  );
}
