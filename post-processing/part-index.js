import fs from 'fs';
import path from 'path';

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

    for (const file of indexFiles) {
      const dir = path.dirname(file);
      const destinationFile = path.join(dir, 'index.md');

      fs.copyFileSync(file, destinationFile);
      console.log(`Copied ${file} to ${destinationFile}`);
    }

    console.log(`Processed ${indexFiles.length} files`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
