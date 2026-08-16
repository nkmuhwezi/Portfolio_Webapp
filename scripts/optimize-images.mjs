// Generates right-sized WebP variants and a compressed JPEG fallback for
// every photo used on the page. Reads from assets/original-photos/ (the
// untouched, full-resolution source) and only ever writes into
// public/images/ — never reads from its own previous output, so re-running
// this can't compound generation loss the way overwriting-in-place did
// before. Re-run whenever a photo in assets/original-photos/ changes:
//
//   npm run optimize-images
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.join(import.meta.dirname, "..");
const sourceDir = path.join(rootDir, "assets", "original-photos");
const sourceCaseStudiesDir = path.join(sourceDir, "case-studies");
const outDir = path.join(rootDir, "public", "images");
const outCaseStudiesDir = path.join(outDir, "case-studies");

async function makeVariants(
  sourcePath,
  outDir,
  outBase,
  { widths, jpegFallbackWidth, quality, jpegPath },
) {
  for (const width of widths) {
    const out = path.join(outDir, `${outBase}-${width}.webp`);
    await sharp(sourcePath).resize({ width }).webp({ quality }).toFile(out);
    console.log(`  ${path.relative(rootDir, out)}`);
  }

  await sharp(sourcePath)
    .resize({ width: jpegFallbackWidth })
    .jpeg({ quality, mozjpeg: true })
    .toFile(jpegPath);
  console.log(`  ${path.relative(rootDir, jpegPath)} (fallback)`);
}

console.log("Headshot (displays at ~320-420px CSS width):");
// 600w fills the gap PageSpeed flagged: at common mobile DPRs the portrait
// needs ~560-600px, which used to force the browser up to the 800w file
// (wasting ~54KB) since 400w wasn't enough — this tier lets it stop closer
// to what's actually needed.
await makeVariants(
  path.join(sourceDir, "headshot.jpg"),
  outDir,
  "headshot",
  {
    widths: [400, 600, 800, 1200],
    jpegFallbackWidth: 800,
    quality: 82,
    jpegPath: path.join(outDir, "headshot-800.jpg"),
  },
);

console.log("\nCase study photos (display at ~380-560px CSS width):");
// quality 72 — PageSpeed's image-delivery audit flagged one of these (a
// busier, high-detail crowd photo) purely on compression efficiency, not
// wrong sizing. A uniform step down keeps every photo on the same setting
// rather than special-casing just that one file.
const caseStudyFiles = (await readdir(sourceCaseStudiesDir)).filter((f) =>
  f.endsWith(".jpg"),
);
for (const file of caseStudyFiles) {
  const base = path.basename(file, ".jpg");
  console.log(`${file}:`);
  await makeVariants(
    path.join(sourceCaseStudiesDir, file),
    outCaseStudiesDir,
    base,
    {
      widths: [480, 900, 1300],
      jpegFallbackWidth: 900,
      quality: 72,
      jpegPath: path.join(outCaseStudiesDir, file),
    },
  );
}

console.log("\nDone. headshot-1600.jpg was left untouched (used at full size by the Person schema in app/layout.tsx, not by the page itself).");
