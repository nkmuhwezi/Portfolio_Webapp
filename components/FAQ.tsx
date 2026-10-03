import { faq, personId, siteUrl } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import styles from "./FAQ.module.css";

/**
 * FAQPage structured data built from the very same entries the accordion
 * below renders, so the markup can never claim an answer the page doesn't
 * show. `about` points at the Person node in the site-wide graph
 * (app/layout.tsx) by @id.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  about: { "@id": personId },
  mainEntity: faq.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: { "@type": "Answer", text: entry.answer },
  })),
};

/**
 * Native <details>/<summary>: keyboard and screen-reader support come for
 * free, there's no client JavaScript at all, and every answer stays in
 * the DOM while collapsed (so crawlers and AI engines read all of them).
 * The first question starts open so the section never reads as a row of
 * empty bars.
 */
export default function FAQ() {
  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <SectionHeading title="Questions people ask" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />

        <div className={styles.list}>
          {faq.map((entry, index) => (
            <details className={styles.item} key={entry.question} open={index === 0}>
              <summary className={styles.question}>
                <span>{entry.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
