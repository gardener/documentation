import { read } from './lib/frontmatter.js';
import { splitLeadingBanner } from './lib/banner.js';

// Reads NUL-delimited candidate paths from stdin and prints back, NUL-delimited,
// only the files whose body begins with a MANAGED or GENERATED banner. This
// mirrors post-processing/part-1.js: parse frontmatter, then run
// splitLeadingBanner on the body so a marker buried in prose or a fenced code
// block never counts. LOCAL banners are the source of truth and are excluded.

const MANAGED_OR_GENERATED = /^<!-- BANNER:(?:MANAGED|GENERATED) -->/;

function hasLeadingManagedBanner(filePath) {
  let parsed;
  try {
    parsed = read(filePath);
  } catch {
    // Unreadable or invalid YAML: not a validatable banner file, so skip it.
    return false;
  }
  const { banner } = splitLeadingBanner(parsed.content.trimStart());
  return banner !== null && MANAGED_OR_GENERATED.test(banner);
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
  if (hasLeadingManagedBanner(filePath)) out.push(filePath);
}

if (out.length > 0) process.stdout.write(out.join('\0') + '\0');
