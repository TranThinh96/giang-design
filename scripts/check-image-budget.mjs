#!/usr/bin/env node
/**
 * Guards the one risk that actually bites a git-based CMS: a 6 MB photo
 * straight off a phone, committed through /keystatic, in the repo forever.
 *
 *   node scripts/check-image-budget.mjs       (npm run check:images)
 *
 * Runs in CI rather than as a pre-commit hook on purpose: the client's uploads
 * are committed by the GitHub App on GitHub's servers, so a local hook would
 * never see them. This cannot prevent a large file — git has already recorded
 * it by the time CI runs — but it fails the build loudly, while the fix is
 * still one rewrite of a recent commit rather than a rewrite of the history.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.join(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

/** Per-file: the size we ask the client for, and the size we refuse. */
const WARN_BYTES = 1024 * 1024;
const FAIL_BYTES = 2 * 1024 * 1024;
/** Whole directory: past this, move the library to Cloudinary. */
const TOTAL_WARN_BYTES = 200 * 1024 * 1024;

/** Fonts are shipped by us, subset and deliberate — not client uploads. */
const EXEMPT_DIRS = new Set(["fonts"]);

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
const kb = (n) => `${Math.round(n / 1024)} KB`;

async function walk(dir, relBase = "") {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return out;
    throw err;
  }
  for (const entry of entries) {
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (!relBase && EXEMPT_DIRS.has(entry.name)) continue;
      out.push(...(await walk(path.join(dir, entry.name), rel)));
    } else if (entry.isFile()) {
      out.push({ rel, size: (await stat(path.join(dir, entry.name))).size });
    }
  }
  return out;
}

const files = await walk(PUBLIC_DIR);
const total = files.reduce((sum, f) => sum + f.size, 0);
const oversized = files.filter((f) => f.size > FAIL_BYTES);
const heavy = files.filter((f) => f.size > WARN_BYTES && f.size <= FAIL_BYTES);

console.log(
  `public/: ${files.length} file(s), ${mb(total)} (fonts excluded from this check)`,
);

for (const f of heavy) {
  console.log(`  warning  public/${f.rel} — ${kb(f.size)}, over the 1 MB target`);
}

if (total > TOTAL_WARN_BYTES) {
  console.log(
    `\n  warning  public/ is ${mb(total)}. Past 200 MB, move the image library to` +
      ` Cloudinary (fields.cloudImage) — see BACKEND-PLAN.md §7.`,
  );
}

if (oversized.length > 0) {
  console.error(`\nFAIL: ${oversized.length} file(s) over ${mb(FAIL_BYTES)}:`);
  for (const f of oversized) console.error(`  public/${f.rel} — ${mb(f.size)}`);
  console.error(
    "\nGit keeps large files forever, even after they are deleted. Re-export" +
      " these as JPEG or WebP, ~1600 px wide and under 1 MB, and replace them" +
      " before this reaches main.",
  );
  process.exit(1);
}

console.log("OK: no file over 2 MB.");
