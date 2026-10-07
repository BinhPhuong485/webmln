import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const source = resolve(projectRoot, 'scripts', 'og-image.svg');
const outputDirectory = resolve(projectRoot, 'public');
const output = resolve(outputDirectory, 'og-image.png');

await mkdir(outputDirectory, { recursive: true });

const svg = await readFile(source);
await sharp(svg)
  .resize(1200, 630, { fit: 'fill' })
  .flatten({ background: '#f5f1e9' })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(output);

console.log(`Created ${output}`);
