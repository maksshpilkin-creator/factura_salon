/**
 * Writes width-limited WebP variants next to sources in assets/images/.
 * Run: npm run build:images
 *
 * Hero/interior: emits -w640 / -w1280 only when the source is wider than that
 * width (current placeholder WebPs are 512px, so no extra files).
 * Masters: always emits -w384 / -w768 from PNGs when wider than those widths.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'assets', 'images');

const widthsHeroInterior = [640, 1280];
const widthsMasters = [384, 768];

async function resizeWebp(baseName, widths) {
  const src = path.join(imagesDir, `${baseName}.webp`);
  if (!fs.existsSync(src)) {
    console.warn('skip (missing):', src);
    return;
  }
  const meta = await sharp(src).metadata();
  for (const w of widths) {
    if (meta.width && meta.width <= w) continue;
    const out = path.join(imagesDir, `${baseName}-w${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    console.log('wrote', path.basename(out));
  }
}

async function resizeMasterPng(n) {
  const base = `master-${n}`;
  const src = path.join(imagesDir, `${base}.png`);
  if (!fs.existsSync(src)) {
    console.warn('skip (missing):', src);
    return;
  }
  const meta = await sharp(src).metadata();
  for (const w of widthsMasters) {
    if (meta.width && meta.width <= w) continue;
    const out = path.join(imagesDir, `${base}-w${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(out);
    console.log('wrote', path.basename(out));
  }
}

await resizeWebp('hero-bg', widthsHeroInterior);
for (const i of [1, 2, 3, 4]) {
  await resizeWebp(`interior-${i}`, widthsHeroInterior);
}
for (const n of [1, 2, 3]) {
  await resizeMasterPng(n);
}
console.log('done');
