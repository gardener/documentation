import { promises as fs } from "fs";
import path from "path";


await main();

// Main function
async function main() {
    try {
        if (process.argv.includes('--rename') || process.argv.includes('-r')) {
            await renameImagesToLowercase();
        }

        if (process.argv.includes('--modify-md') || process.argv.includes('-m')) {
            await addH1ToMarkdownFiles();
        }

        if (!process.argv.includes('--rename') &&
            !process.argv.includes('-r') &&
            !process.argv.includes('--modify-md') &&
            !process.argv.includes('-m')) {
            // If no specific action is specified, show usage
            console.log('Available commands:');
            console.log('--rename, -r      : Rename image files to lowercase');
            console.log('--modify-md, -m   : Add H1 headings to markdown files');
            console.log('\nExample: node post-processing.js ./content --rename --modify-md');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

async function addH1ToMarkdownFiles(){
    async function findMarkdownFiles(directory) {
        let foundFiles = [];

        try {
            const files = await fs.readdir(directory);

            for (const file of files) {
                const fullPath = path.join(directory, file);

                try {
                    const stats = await fs.stat(fullPath);

                    if (stats.isDirectory()) {
                        // Skip ignored directories
                        if (ignoreDirs.includes(file)) {
                            continue;
                        }
                        // Recursively search subdirectories
                        const nestedFiles = await findMarkdownFiles(fullPath);
                        foundFiles = foundFiles.concat(nestedFiles);
                    } else if (stats.isFile() && file.endsWith('.md')) {
                        // Skip index.md and _index.md files
                        if (file === 'index.md' || file === '_index.md') {
                            continue;
                        }
                        foundFiles.push(fullPath);
                    }
                } catch (err) {
                    console.error(`Error accessing ${fullPath}: ${err.message}`);
                }
            }
        } catch (err) {
            console.error(`Error reading directory ${directory}: ${err.message}`);
        }

        return foundFiles;
    }

    async function processMarkdownFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');

            // Check if file has frontmatter
            if (!content.startsWith('---')) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No frontmatter found'
                };
            }

            // Find the end of frontmatter
            const frontmatterEndIndex = content.indexOf('---', 3);
            if (frontmatterEndIndex === -1) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Invalid frontmatter format'
                };
            }

            const frontmatter = content.substring(0, frontmatterEndIndex + 3);
            let contentAfterFrontmatter = content.substring(frontmatterEndIndex + 3).trimStart();

            // Extract title from frontmatter
            const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?\s*(\n|$)/);
            const title = titleMatch ? titleMatch[1] : null;

            if (!title) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No title in frontmatter'
                };
            }

            // Check if content already starts with an h1 heading
            if (contentAfterFrontmatter.match(/^#\s+.+/m)) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Already has H1 heading'
                };
            }

            // Check if there's an H2 heading that matches the frontmatter title
            const h2Match = contentAfterFrontmatter.match(/^##\s+(.+)(?:\r?\n|$)/m);
            if (h2Match && h2Match[1].trim() === title.trim()) {
                // Replace the H2 with H1
                const newContent = `${frontmatter}\n\n# ${title}\n\n${contentAfterFrontmatter.replace(/^##\s+(.+)(\r?\n|$)/m, '')}`;
                await fs.writeFile(filePath, newContent, 'utf-8');
                return {
                    file: filePath,
                    modified: true,
                    addedTitle: title,
                    action: 'H2 promoted to H1'
                };
            }

            // If no H1 heading and title exists in frontmatter, add H1
            const newContent = `${frontmatter}\n\n# ${title}\n\n${contentAfterFrontmatter}`;
            await fs.writeFile(filePath, newContent, 'utf-8');
            return {
                file: filePath,
                modified: true,
                addedTitle: title,
                action: 'H1 added'
            };
        } catch (err) {
            console.error(`Error processing ${filePath}: ${err.message}`);
            return {
                file: filePath,
                modified: false,
                reason: err.message
            };
        }
    }

    const ignoreDirs = ['node_modules', '.git', 'dist', 'build'];
    const startDir = process.argv[2] || '.';

    console.log(`Searching for markdown files in: ${startDir}`);
    const markdownFiles = await findMarkdownFiles(startDir);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        const shouldModify = process.argv.includes('--modify-md') || process.argv.includes('-m');

        if (shouldModify) {
            console.log('\nProcessing markdown files...');
            const results = [];

            for (const file of markdownFiles) {
                const result = await processMarkdownFile(file);
                results.push(result);

                if (result.modified) {
                    console.log(`- Added H1 heading to: ${path.basename(file)} (Title: "${result.addedTitle}")`);
                }
            }

            const modifiedCount = results.filter(r => r.modified).length;
            console.log(`\nSummary: Added H1 headings to ${modifiedCount} of ${markdownFiles.length} files.`);
        } else {
            console.log('\nTo add H1 headings to markdown files, run the script with the --modify-md or -m flag:');
            console.log(`node post-processing.js ${startDir} --modify-md`);
        }
    }
}


async function renameImagesToLowercase(){
    async function findFiles(directory) {
        let foundFiles = [];

        try {
            // Match any file with uppercase letters and image extensions
            const regex = /[A-Z]+.*\.(png|jpg|jpeg|svg)$/i;
            const files = await fs.readdir(directory);

            for (const file of files) {
                const fullPath = path.join(directory, file);

                try {
                    const stats = await fs.stat(fullPath);

                    if (stats.isDirectory()) {
                        // Skip ignored directories
                        if (ignoreDirs.includes(file)) {
                            continue;
                        }
                        // Recursively search subdirectories
                        const nestedFiles = await findFiles(fullPath);
                        foundFiles = foundFiles.concat(nestedFiles);
                    } else if (stats.isFile()) {
                        // Check if the filename matches our pattern
                        if (regex.test(file)) {
                            // Additional check to ensure the filename has uppercase letters
                            if (file.toLowerCase() !== file) {
                                foundFiles.push(fullPath);
                            }
                        }
                    }
                } catch (err) {
                    console.error(`Error accessing ${fullPath}: ${err.message}`);
                }
            }
        } catch (err) {
            console.error(`Error reading directory ${directory}: ${err.message}`);
        }

        return foundFiles;
    }

// Function to rename a file to lowercase
    async function renameToLowercase(filePath) {
        try {
            const directory = path.dirname(filePath);
            const fileName = path.basename(filePath);
            const lowerCaseFileName = fileName.toLowerCase();
            const newPath = path.join(directory, lowerCaseFileName);

            // Only rename if the filename is different in lowercase
            if (fileName !== lowerCaseFileName) {
                await fs.rename(filePath, newPath);
                console.log(`Renamed: ${fileName} → ${lowerCaseFileName}`);
                return {
                    original: filePath,
                    renamed: newPath,
                    success: true
                };
            } else {
                return {
                    original: filePath,
                    renamed: null,
                    success: false,
                    reason: "Already lowercase"
                };
            }
        } catch (err) {
            console.error(`Error renaming ${filePath}: ${err.message}`);
            return {
                original: filePath,
                renamed: null,
                success: false,
                reason: err.message
            };
        }
    }

    const ignoreDirs = ['node_modules', '.git', 'dist', 'build'];

    const startDir = process.argv[2] || '.';
    console.log(`Searching for image files with uppercase letters in: ${startDir}`);

    const matchingFiles = await findFiles(startDir);

    console.log('\nMatching files:');
    matchingFiles.forEach(file => console.log(`- ${file}`));
    console.log(`\nTotal: ${matchingFiles.length} files found`);

    // Ask for confirmation before renaming
    if (matchingFiles.length > 0) {
        const shouldRename = process.argv.includes('--rename') || process.argv.includes('-r');

        if (shouldRename) {
            console.log('\nRenaming files to lowercase...');
            const renameResults = [];

            for (const file of matchingFiles) {
                const result = await renameToLowercase(file);
                renameResults.push(result);
            }

            const successCount = renameResults.filter(r => r.success).length;
            console.log(`\nRename summary: ${successCount} of ${matchingFiles.length} files renamed successfully.`);
        } else {
            console.log('\nTo rename these files to lowercase, run the script with the --rename or -r flag:');
            console.log(`node post-processing.js ${startDir} --rename`);
        }
    }
}