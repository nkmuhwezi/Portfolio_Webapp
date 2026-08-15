// One-off/rerunnable build tool: generates right-sized WebP variants for
// every photo actually used in the page (not the schema.org headshot,
// which stays at full size on purpose — see app/layout.tsx) and shrinks
// the JPEG fallback each <picture> falls back to for pre-WebP browsers.
// Re-run this whenever a photo in public/images is added or replaced:
//
//   npm run optimize-images
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.join(import.meta.dirname, "..", "public", "images");
const caseStudiesDir = path.join(imagesDir, "case-studies");

async function makeVariants(
  inputPath,
  { widths, jpegFallbackWidth, quality, outputBase },
) {
  const dir = path.dirname(inputPath);
  const base = outputBase ?? path.basename(inputPath, path.extname(inputPath));

  for (const width of widths) {
    const out = path.join(dir, `${base}-${width}.webp`);
    await sharp(inputPath).resize({ width }).webp({ quality }).toFile(out);
    console.log(`  ${path.relative(imagesDir, out)}`);
  }

  // Overwrites the original JPEG in place, right-sized, as the <picture>
  // fallback for browsers that don't support WebP — same file path, so
  // nothing in lib/content.ts needs to change.
  const fallback = await sharp(inputPath)
    .resize({ width: jpegFallbackWidth })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  await sharp(fallback).toFile(inputPath);
  console.log(`  ${path.relative(imagesDir, inputPath)} (fallback, resized in place)`);
}

console.log("Headshot (displays at ~320-420px CSS width):");
// 600w fills the gap PageSpeed flagged: at common mobile DPRs the portrait
// needs ~560-600px, which used to force the browser up to the 800w file
// (wasting ~54KB) since 400w wasn't enough — this tier lets it stop closer
// to what's actually needed.
await makeVariants(path.join(imagesDir, "headshot-800.jpg"), {
  widths: [400, 600, 800, 1200],
  jpegFallbackWidth: 800,
  quality: 82,
  outputBase: "headshot",
});

console.log("\nCase study photos (display at ~380-560px CSS width):");
// quality 72, down from 78 — PageSpeed's image-delivery audit flagged one
// of these (a busier, high-detail crowd photo) purely on compression
// efficiency, not wrong sizing. A uniform step down keeps every photo on
// the same setting rather than special-casing just that one file.
const caseStudyFiles = (await readdir(caseStudiesDir)).filter((f) =>
  f.endsWith(".jpg"),
);
for (const file of caseStudyFiles) {
  console.log(`${file}:`);
  await makeVariants(path.join(caseStudiesDir, file), {
    widths: [480, 900, 1300],
    jpegFallbackWidth: 900,
    quality: 72,
  });
}

console.log("\nDone. headshot-1600.jpg was left untouched (used at full size by the Person schema in app/layout.tsx, not by the page itself).");
