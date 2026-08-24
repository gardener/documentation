import fs from 'fs';
import path from 'path';
import { read, write, stringify } from './lib/frontmatter.js';

const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'images', 'assets', 'content', 'logo'];

function generateTitleFromDirName(dirName) {
  const spaced = dirName.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// Creates an index.md stub in directories that hold more than one entry but no
// own index page. docforge only emits _index.md, so a directory that already
// has either index.md or _index.md owns its route and is left untouched.
// The stub carries its final frontmatter inline: prev/next false (this step runs
// after part-2's addNavigationFrontmatter, so the stub would otherwise miss it)
// and editLink false (empty body, no source to edit, same as markEmptyAggregator).
function addMissingIndexFiles(docsDir) {
  let created = 0;

  function traverse(directory) {
    let entries;
    try {
      entries = fs.readdirSync(directory);
    } catch (err) {
      console.error(`Error reading directory ${directory}: ${err.message}`);
      return;
    }

    if (entries.length > 1) {
      const hasIndex = entries.includes('index.md');
      const hasUnderscoreIndex = entries.includes('_index.md');
      if (!hasIndex && !hasUnderscoreIndex) {
        const title = generateTitleFromDirName(path.basename(directory));
        const content = stringify('', {
          title,
          auto_generated: true,
          generated_by: 'post-processing/part-index.js addMissingIndexFiles function',
          prev: false,
          next: false,
          editLink: false,
        });
        const indexPath = path.join(directory, 'index.md');
        try {
          fs.writeFileSync(indexPath, content, 'utf-8');
          created += 1;
          console.log(`Created ${indexPath} (${entries.length} entries) - Title: "${title}"`);
        } catch (err) {
          console.error(`Error creating index.md in ${directory}: ${err.message}`);
        }
      }
    }

    for (const entry of entries) {
      const fullPath = path.join(directory, entry);
      try {
        if (fs.statSync(fullPath).isDirectory() && !IGNORE_DIRS.includes(entry)) {
          traverse(fullPath);
        }
      } catch (err) {
        console.error(`Error accessing ${fullPath}: ${err.message}`);
      }
    }
  }

  traverse(docsDir);
  return created;
}

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
    console.error('Usage: node part-index.js <directory>');
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  try {
    // Stubs must be created before the rename so the collision guard below sees
    // them as index.md and never clobbers them with a docforge _index.md.
    const docsPath = path.join(targetDir, 'docs');
    const createdStubs = fs.existsSync(docsPath) ? addMissingIndexFiles(docsPath) : 0;

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

    console.log(`Created ${createdStubs} index stubs`);
    console.log(`Processed ${indexFiles.length} files (${renamed} renamed, ${editLinkMarked} marked editLink:false)`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
