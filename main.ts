// ai-excited-01 — "Make the AI judge excited".
//
// What this program does: it takes the single entry image that ships next
// to this file (entry.png — a heroic penguin in a red cape leaping off a
// glowing iceberg into an aurora sky, captioned "ONE LEAP. ZERO FEAR.")
// and places an exact copy at $MAKEFUN_OUTPUT_DIR/entry.png
// (defaulting to /output/entry.png when the variable is unset).
//
// The run is fully deterministic: no network, no clock, no randomness.
// After writing, the copy is verified by comparing SHA-256 digests of the
// source and the written file, so a truncated or corrupted write can never
// slip through silently.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only.

import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pngPath = join(scriptDir, 'entry.png');
const destinationDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destinationPath = join(destinationDir, 'entry.png');

function sha256Hex(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function main() {
  const info = await stat(pngPath);
  if (info.size === 0) {
    throw new Error(`source image is empty: ${pngPath}`);
  }

  const pngBytes = await readFile(pngPath);
  const expectedDigest = sha256Hex(pngBytes);

  await mkdir(destinationDir, { recursive: true });
  await writeFile(destinationPath, pngBytes);

  // Second verification, cheap and early: the byte count must match before
  // we spend a hash comparison on the copy.
  const copiedInfo = await stat(destinationPath);
  if (copiedInfo.size !== pngBytes.length) {
    throw new Error(
      `output verification failed: wrote ${copiedInfo.size} bytes, expected ${pngBytes.length}`,
    );
  }

  const copiedBytes = await readFile(destinationPath);
  const actualDigest = sha256Hex(copiedBytes);
  if (actualDigest !== expectedDigest) {
    throw new Error(
      `output verification failed: sha256 ${actualDigest} != ${expectedDigest}`,
    );
  }

  console.log(
    `entry.png -> ${destinationPath} | ${copiedBytes.length} bytes | sha256 ${actualDigest}`,
  );
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exitCode = 1;
});
