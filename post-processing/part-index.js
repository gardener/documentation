import fs from 'fs';
import path from 'path';
import { read, write } from './lib/frontmatter.js';

function findIndexFiles(dir) {
  const results = [];

  function traverse(currentPath) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.name === '_index.md') {
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

// docforge aggregator index pages have an empty body (pure navigation stubs).
// After the rename they are indistinguishable from native local content by
// github_repo alone, so mark them editLink: false to suppress a pointless
// "Edit this page" button. Idempotent: only writes when the flag is missing.
function markEmptyAggregator(indexFile) {
  const parsed = read(indexFile);
  const bodyEmpty = parsed.content.trim().length === 0;
  if (!bodyEmpty) return false;
  if (parsed.data.editLink === false) return false;
  parsed.data.editLink = false;
  return write(indexFile, parsed.content, parsed.data);
}

function main() {
  const targetDir = process.argv[2];

  if (!targetDir) {
    console.error('Usage: node index.js <directory>');
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  try {
    const indexFiles = findIndexFiles(targetDir);

    let renamed = 0;
    let editLinkMarked = 0;
    for (const file of indexFiles) {
      const dir = path.dirname(file);
      const destinationFile = path.join(dir, 'index.md');

      // A native index.md without an _index.md sibling must never be clobbered.
      // docforge only ever emits _index.md, so an existing index.md here is
      // hand-authored content that owns the directory route.
      if (fs.existsSync(destinationFile)) {
        fs.rmSync(file);
        console.log(`Removed ${file} (index.md already present)`);
      } else {
        fs.renameSync(file, destinationFile);
        renamed += 1;
        console.log(`Renamed ${file} to ${destinationFile}`);
      }

      if (markEmptyAggregator(destinationFile)) {
        editLinkMarked += 1;
      }
    }

    console.log(`Processed ${indexFiles.length} files (${renamed} renamed, ${editLinkMarked} marked editLink:false)`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
