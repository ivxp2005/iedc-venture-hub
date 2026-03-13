import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const files = [
  "src/assets/images/eve2.jpg",
  "src/assets/images/eve3.jpg",
  "src/assets/images/IMG_7368.jpg",
  "src/assets/images/IMG_7374.jpg",
  "src/assets/images/IMG_7370.jpg",
  "src/assets/images/IMG_7454.jpg",
];

for (const input of files) {
  const output = input.replace(/\.jpe?g$/i, ".webp");

  await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 72, effort: 4 })
    .toFile(output);

  const [inStat, outStat] = await Promise.all([fs.stat(input), fs.stat(output)]);
  const saved = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
  console.log(`${path.basename(input)} -> ${path.basename(output)} | ${saved}% smaller`);
}
