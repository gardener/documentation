// Reads the .jsonl ledger the parts appended to (POST_PROCESSING_LEDGER) and
// writes post-processing-report.json. Run after the parts in `make post-process`.

import { promises as fs } from 'fs';
import { getEntries, toJSON } from './lib/ledger.js';

const REPORT_PATH = 'post-processing-report.json';

const entries = getEntries();
await fs.writeFile(REPORT_PATH, JSON.stringify(toJSON(), null, 2));

const byFn = new Map();
for (const e of entries) {
  const cur = byFn.get(e.fn) || { count: 0, repos: new Set() };
  cur.count += e.summary != null ? e.summary : 1;
  if (e.repo) cur.repos.add(e.repo);
  byFn.set(e.fn, cur);
}
console.log(`Wrote ${REPORT_PATH} (${entries.length} changes):`);
for (const [fn, s] of [...byFn.entries()].sort((a, b) => b[1].count - a[1].count)) {
  const repos = s.repos.size ? [...s.repos].map(r => r.replace('https://github.com/', '')).join(', ') : 'local';
  console.log(`  ${fn}: ${s.count} (${repos})`);
}
