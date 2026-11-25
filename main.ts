// Midnight Fridge Roast — make.fun entry
// (u-carbon-forge-midnight-fridge-roast-fc5d44a7)
//
// Writes one roast line (one line of text, 1-200 chars) to /output/entry.txt.
// The line roasts a smart fridge that refuses to open after midnight.
// Deterministic: the same line on every run. No network, no input files,
// no randomness.
//
// The line: "Midnight: my fridge locks and the light goes out, like it's
// the bouncer and I'm underage in my own kitchen."
//
// Why this line: it makes the midnight refusal itself the target. The
// fridge is not just broken or annoying — it has taken on the role of a
// bouncer, and the owner is the one who fails the door policy, in their
// own kitchen. The turn lands on "underage in my own kitchen": the
// person who bought the fridge, stocks it, and pays for its electricity
// is treated as a minor at its door. The light going out is the fridge
// pretending nobody is home — in its own house. One joke, one image,
// tight enough to say aloud at the door.
//
// Gate: /output/entry.txt must be UTF-8 text of 1-200 characters, not
// only whitespace, a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Midnight: my fridge locks and the light goes out, like it's the bouncer and I'm underage in my own kitchen.";

// The gate: 1-200 characters, not only whitespace, a single line.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-200 gate`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Create /output only if it is missing. Never delete it: the grader
// bind-mounts it, and removing it fails the run.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");

// Self-check: read the file back and confirm it holds exactly the line.
const WRITTEN = readFileSync(OUT_FILE, "utf8");
if (WRITTEN !== ENTRY) {
  throw new Error("entry.txt does not match the roast after writing");
}

console.log(`wrote ${ENTRY.length} chars to ${OUT_FILE}`);
