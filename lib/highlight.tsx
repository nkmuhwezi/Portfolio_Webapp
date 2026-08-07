import type { ReactNode } from "react";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Wraps each occurrence of `terms` in `text` with a <mark>-style span.
 *
 * This only ever *wraps* substrings — it never rewrites, reorders, or omits
 * any of the source text, so the rendered copy stays verbatim. Terms that
 * aren't found simply have no effect.
 */
export function highlight(
  text: string,
  terms: readonly string[],
  className: string,
): ReactNode[] {
  if (terms.length === 0) return [text];

  // Longest first, so a term that contains another still matches as a whole.
  const pattern = [...terms]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  const matcher = new RegExp(`(${pattern})`, "g");
  const lookup = new Set(terms);

  return text.split(matcher).map((part, index) =>
    lookup.has(part) ? (
      <span className={className} key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
