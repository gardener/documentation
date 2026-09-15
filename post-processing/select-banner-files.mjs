import { read } from './lib/frontmatter.js';
import { splitLeadingBanner } from './lib/banner.js';

// Reads NUL-delimited candidate paths from stdin and prints back, NUL-delimited,
// only the files whose body begins with a MANAGED or GENERATED banner. This
// mirrors post-processing/part-1.js: parse frontmatter, then run
// splitLeadingBanner on the body so a marker buried in prose or a fenced code
// block never counts. LOCAL banners are the source of truth and are excluded.

// Reads NUL-delimited candidate paths from stdin and prints back, NUL-delimited,
// only the files whose body begins with a MANAGED banner (or a legacy GENERATED
// banner). This mirrors post-processing/part-1.js: parse frontmatter, then run
// splitLeadingBanner on the body so a marker buried in prose or a fenced code
// block never counts. LOCAL banners are the source of truth and are excluded.
//
// GENERATED was dropped as a banner type (those files are MANAGED now), but a
// leftover GENERATED banner from before the change must still be deletable, so
// the aggregation run recreates the file cleanly. splitLeadingBanner no longer
// recognizes GENERATED, so it is matched separately here.
const MANAGED = /^<!-- BANNER:MANAGED -->/;
const LEGACY_GENERATED = /^<!-- BANNER:GENERATED -->/;

function hasLeadingManagedOrGeneratedBanner(filePath) {
  let parsed;
  try {
    parsed = read(filePath);
  } catch {
    // Unreadable or invalid YAML: not a validatable banner file, so skip it.
    return false;
  }
  // A local:true file may still carry a stale MANAGED/GENERATED marker from a
  // previous run; it must survive deletion so part-banner can reclassify it to
  // LOCAL on the next pass.
  if (parsed.data.local === true) return false;
  const body = parsed.content.trimStart();
  const { banner } = splitLeadingBanner(body);
  if (banner !== null && MANAGED.test(banner)) return true;
  return LEGACY_GENERATED.test(body);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf-8');
}

const raw = await readStdin();
// GNU grep -Z separates with NUL; BSD/macOS grep -l ignores -Z and separates
// with newlines. Split on either so the helper works with both greps.
const candidates = raw.split(/\0|\r?\n/).filter((p) => p.length > 0);

const out = [];
for (const filePath of candidates) {
  if (hasLeadingManagedOrGeneratedBanner(filePath)) out.push(filePath);
}

if (out.length > 0) process.stdout.write(out.join('\0') + '\0');
