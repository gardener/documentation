import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const ROOT = process.argv[2] || './hugo/content';
const TARGET_REPO = 'https://github.com/gardener/documentation';

const LOCAL_REPO_PATTERN = /^https?:\/\/github\.com\/gardener\/documentation\/?$/;
const LOCAL_SUBDIR_PATTERN = /^website(\/|$)/;
const LOCAL_PATH_ALLOWLIST = [/^_index\.md$/, /^index\.md$/];

function seedClassification(fm, relativePath) {
  if (LOCAL_PATH_ALLOWLIST.some(re => re.test(relativePath))) return 'local';
  if (typeof fm.github_repo === 'string'
      && typeof fm.github_subdir === 'string'
      && LOCAL_REPO_PATTERN.test(fm.github_repo)
      && LOCAL_SUBDIR_PATTERN.test(fm.github_subdir)) {
    return 'local';
  }
  return 'managed';
}

function rewriteLocalEditLink(fm, relativePath) {
  const dir = path.posix.dirname(relativePath);
  const base = path.posix.basename(relativePath);
  fm.github_repo = TARGET_REPO;
  fm.github_subdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
  fm.path_base_for_github_subdir = { from: `content/${relativePath}`, to: base };
}

async function walk(dir, root, counters) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, root, counters);
    else if (entry.isFile() && entry.name.endsWith('.md')) await processFile(full, root, counters);
  }
}

async function processFile(file, root, counters) {
  const raw = await fs.readFile(file, 'utf8');
  // gray-matter shares `data` refs for byte-identical inputs; part-index.js
  // creates _index.md/index.md byte-twins. Disable cache so mutations stay
  // file-local and idempotency holds.
  const parsed = matter(raw, { cache: false });
  const relativePath = path.relative(root, file).split(path.sep).join('/');
  const fm = parsed.data;

  const hasLocal = fm.local === true;
  const hasManaged = fm.managed === true;
  if (hasLocal && hasManaged) {
    throw new Error(
      `Data corruption: file has BOTH 'local: true' and 'managed: true' — ${file}. ` +
      `Resolve manually before re-running part-managed.js.`
    );
  }

  let classification;
  if (hasLocal) classification = 'local';
  else if (hasManaged) classification = 'managed';
  else classification = seedClassification(fm, relativePath);

  let mutated = false;
  if (classification === 'local') {
    counters.local += 1;
    if (!hasLocal) { fm.local = true; mutated = true; }
    if (hasManaged) { delete fm.managed; mutated = true; }
    const dir = path.posix.dirname(relativePath);
    const base = path.posix.basename(relativePath);
    const desiredSubdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
    const desiredFrom = `content/${relativePath}`;
    const pb = fm.path_base_for_github_subdir;
    const pbOk = pb && typeof pb === 'object' && pb.from === desiredFrom && pb.to === base;
    if (fm.github_repo !== TARGET_REPO || fm.github_subdir !== desiredSubdir || !pbOk) {
      rewriteLocalEditLink(fm, relativePath);
      mutated = true;
    }
  } else {
    counters.managed += 1;
    if (!hasManaged) { fm.managed = true; mutated = true; }
    if (hasLocal) { delete fm.local; mutated = true; }
  }

  if (mutated) {
    const rebuilt = matter.stringify(parsed.content, fm);
    await fs.writeFile(file, rebuilt, 'utf8');
    counters.mutated += 1;
  }
}

(async () => {
  try {
    const counters = { local: 0, managed: 0, mutated: 0 };
    await walk(ROOT, ROOT, counters);
    console.log(`Managed marker pass complete. local=${counters.local} managed=${counters.managed} mutated=${counters.mutated}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
