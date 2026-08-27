import fs from 'fs';
import path from 'path';
import { read, write } from './lib/frontmatter.js';
import {
  classify,
  buildUpstreamUrl,
  renderBanner,
  hasBanner,
  injectBanner,
} from './lib/banner.js';

function findMarkdownFiles(dir) {
  const results = [];

  function traverse(currentPath) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.name.endsWith('.md')) {
          results.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentPath}:`, error.message);
    }
  }

  traverse(dir);
  return results;
}

function main() {
  const targetDir = process.argv[2];

  if (!targetDir) {
    console.error('Usage: node part-banner.js <directory>');
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  try {
    const files = findMarkdownFiles(targetDir);

    let managed = 0;
    let local = 0;
    let skipped = 0;
    let written = 0;

    for (const file of files) {
      const { data, content } = read(file);
      const kind = classify(data, content);

      if (kind === 'skip') {
        skipped += 1;
        continue;
      }
      if (kind === 'managed') managed += 1;
      else local += 1;

      if (hasBanner(content)) continue;

      const url = kind === 'managed' ? buildUpstreamUrl(data, file) : null;
      const injected = injectBanner(content, renderBanner(kind, url));

      if (write(file, injected, data)) written += 1;
    }

    console.log(
      `Processed ${files.length} files (${managed} managed, ${local} local, ${skipped} skipped, ${written} written)`,
    );
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
