#!/usr/bin/env node
// CI check: scans all markdown files under hugo/content/ and fails (exit 1) when
// a file's frontmatter misclassifies local content as aggregated.
//
// It catches two cases (see lib/selfref.js):
//  - github_repo pointing at gardener/documentation itself (self-reference)
//  - local: true combined with github_repo (contradictory)
//
// This guards against the class of bug where a locally committed file (e.g.
// hugo/content/community/hackathons/2026-11.md) gets a self-referencing
// github_repo injected and is then wrongly treated as a read-only MANAGED file.

import { readdirSync } from 'fs';
import path from 'path';
import process from 'process';

import { read } from './lib/frontmatter.js';
import { findViolations } from './lib/selfref.js';

const CONTENT_DIR = path.resolve(process.cwd(), 'hugo/content');

// Recursively collects every *.md file below dir.
function collectMarkdown(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectMarkdown(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  let files;
  try {
    files = collectMarkdown(CONTENT_DIR);
  } catch (err) {
    console.error(`check-frontmatter: cannot scan ${CONTENT_DIR}: ${err.message}`);
    process.exit(2);
  }

  const violations = [];
  for (const file of files) {
    let data;
    try {
      ({ data } = read(file));
    } catch (err) {
      // A parse failure is itself a problem worth surfacing, but keep it
      // distinct from a clean check so CI logs point at the offending file.
      console.error(`check-frontmatter: ${err.message}`);
      process.exit(2);
    }
    violations.push(...findViolations(path.relative(process.cwd(), file), data));
  }

  if (violations.length > 0) {
    console.error('\nMisclassified frontmatter detected:\n');
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    [${v.rule}] ${v.message}\n`);
    }
    console.error(
      'These files are local content but are tagged as aggregated from upstream.',
    );
    console.error(
      'Remove the offending github_repo (and any contradictory local: true) so the',
    );
    console.error('banner step classifies them as LOCAL.\n');
    process.exit(1);
  }

  console.log(`check-frontmatter: ${files.length} files OK, no self-references.`);
}

main();
