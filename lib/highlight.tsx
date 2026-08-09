import type { ReactNode } from "react";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type Rule =
  | { term: string; type: "mark"; className: string }
  | { term: string; type: "link"; href: string; className: string };

/**
 * Wraps each occurrence of a rule's `term` in `text` accordingly — "mark"
 * rules get a <span>, "link" rules get an external <a>. Only ever *wraps*
 * substrings — never rewrites, reorders, or omits any of the source text,
 * so the rendered copy stays verbatim. Terms that aren't found simply have
 * no effect.
 */
function annotate(text: string, rules: Rule[]): ReactNode[] {
  if (rules.length === 0) return [text];

  // Longest first, so a term that contains another still matches as a whole.
  const byTerm = new Map(rules.map((rule) => [rule.term, rule]));
  const pattern = [...byTerm.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  const matcher = new RegExp(`(${pattern})`, "g");

  return text.split(matcher).map((part, index) => {
    const rule = byTerm.get(part);
    if (!rule) return part;

    if (rule.type === "link") {
      return (
        <a
          className={rule.className}
          key={index}
          href={rule.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {part}
        </a>
      );
    }

    return (
      <span className={rule.className} key={index}>
        {part}
      </span>
    );
  });
}

/** Wraps each occurrence of `terms` in `text` with a <mark>-style span. */
export function highlight(
  text: string,
  terms: readonly string[],
  className: string,
): ReactNode[] {
  return annotate(
    text,
    terms.map((term) => ({ term, type: "mark", className })),
  );
}

/** Wraps each occurrence of `term` in `text` with an external link. */
export function linkify(
  text: string,
  term: string,
  href: string,
  className: string,
): ReactNode[] {
  return annotate(text, [{ term, type: "link", href, className }]);
}

export { annotate };
