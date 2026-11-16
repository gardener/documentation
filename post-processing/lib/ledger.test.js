import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

const tmp = mkdtempSync(path.join(tmpdir(), 'ledger-test-'));
process.env.POST_PROCESSING_LEDGER = path.join(tmp, 'ledger.jsonl');

const { record, recordSummary, getEntries, toJSON } = await import('./ledger.js');

const managedData = {
  github_repo: 'https://github.com/gardener/gardener',
  github_subdir: 'docs/concepts',
  params: { github_branch: 'master' },
  path_base_for_github_subdir: { to: 'README.md' },
};

test('record appends a line resolving repo and upstream url', () => {
  const before = getEntries().length;
  record('addH1ToMarkdownFiles', 'hugo/content/docs/gardener/concepts/architecture.md', 'H1 added', managedData);
  const entries = getEntries();
  assert.equal(entries.length, before + 1);
  const e = entries.at(-1);
  assert.equal(e.fn, 'addH1ToMarkdownFiles');
  assert.equal(e.file, 'hugo/content/docs/gardener/concepts/architecture.md');
  assert.equal(e.repo, 'https://github.com/gardener/gardener');
  assert.equal(e.upstream, 'https://github.com/gardener/gardener/blob/master/docs/concepts/README.md');
});

test('record handles a file with no frontmatter (unreadable path)', () => {
  record('migrateHugoAlertsToGitHub', 'hugo/content/docs/local/page.md', 'alert migrated', {});
  const e = getEntries().at(-1);
  assert.equal(e.repo, null);
  assert.equal(e.upstream, null);
});

test('record resolves repo from the file frontmatter when data is omitted', () => {
  record('fixNetworkProblemDetectorDoc', 'hugo/content/docs/other-components/network-problem-detector/index.md', 'not-found');
  const e = getEntries().at(-1);
  assert.equal(e.repo, 'https://github.com/gardener/network-problem-detector');
});

test('record keeps the file path as-is', () => {
  record('x', 'hugo/content/docs/foo/index.md', 'a', {});
  assert.equal(getEntries().at(-1).file, 'hugo/content/docs/foo/index.md');
});

test('recordSummary stores a count summary entry', () => {
  recordSummary('addNavigationFrontmatter', 'added prev/next', 540);
  const e = getEntries().at(-1);
  assert.equal(e.fn, 'addNavigationFrontmatter');
  assert.equal(e.file, null);
  assert.match(e.action, /540/);
  assert.equal(e.summary, 540);
});

test('toJSON exposes run, date and all changes', () => {
  const json = toJSON();
  assert.ok('run' in json);
  assert.ok('date' in json);
  assert.ok(Array.isArray(json.changes));
  assert.ok(json.changes.length >= 5);
});

test('getEntries returns [] for a missing ledger file', () => {
  assert.deepEqual(getEntries(path.join(tmp, 'does-not-exist.jsonl')), []);
});

test('cleanup', () => {
  rmSync(tmp, { recursive: true, force: true });
  assert.ok(true);
});
