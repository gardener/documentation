// Ledger: every post-processing function appends one JSON line per change to
// POST_PROCESSING_LEDGER (a .jsonl temp file). Because the record is a file,
// the five parts can run as separate processes (plain CLI scripts, no shared
// memory) and still aggregate. toJSON() slurps the lines into the report.

import { appendFileSync, readFileSync, existsSync } from 'fs';
import { buildUpstreamUrl } from './upstream-url.js';
import { read } from './frontmatter.js';

const LEDGER_PATH = process.env.POST_PROCESSING_LEDGER || null;

function resolveUpstream(frontmatterData, filePath) {
  let data = frontmatterData;
  if (!data) {
    try { data = read(filePath).data; } catch { data = null; }
  }
  if (!data || !data.github_repo) return { repo: null, upstream: null };
  try {
    return {
      repo: data.github_repo,
      upstream: buildUpstreamUrl(data, filePath),
    };
  } catch {
    return { repo: data.github_repo, upstream: null };
  }
}

function append(entry) {
  if (!LEDGER_PATH) return;
  try {
    appendFileSync(LEDGER_PATH, JSON.stringify(entry) + '\n');
  } catch {
    // Telemetry must never fail the build.
  }
}

// Record one action by one function on one file.
//   fn:     function name, e.g. 'addH1ToMarkdownFiles'
//   file:   file path, e.g. 'hugo/content/docs/foo/bar.md'
//   action: what happened, e.g. 'H1 added' | 'not-found'
//   data:   frontmatter data object when the caller already parsed it;
//           otherwise resolved lazily from the file.
export function record(fn, file, action, data) {
  const { repo, upstream } = resolveUpstream(data, file);
  append({ fn, file: String(file).replace(/\\/g, '/'), action, repo, upstream });
}

// Bulk steps (banner, nav frontmatter, index rename) record once per run with
// a count, not per file.
export function recordSummary(fn, action, count) {
  append({ fn, file: null, action: `${action} (${count})`, repo: null, upstream: null, summary: count });
}

export function getEntries(ledgerPath = LEDGER_PATH) {
  if (!ledgerPath || !existsSync(ledgerPath)) return [];
  return readFileSync(ledgerPath, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

// Serialize the run's ledger file to the report structure.
export function toJSON(ledgerPath = LEDGER_PATH) {
  return {
    run: process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT || '1'}`
      : null,
    date: new Date().toISOString(),
    changes: getEntries(ledgerPath),
  };
}
