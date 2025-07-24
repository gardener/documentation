import { promises as fs } from "fs";
import path from "path";
import matter from 'gray-matter';


// Base path configuration - can be overridden by command line argument
const BASE_PATH = './hugo/content/';
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'images', 'assets', 'content', 'logo'];

await main();

// Main function
async function main() {
    try {
        if (process.argv.includes('--rename-images') || process.argv.includes('-r')) {
            await renameImagesToLowercase(BASE_PATH);
        }

        // Added to prevent errors when reading the title form website/blog/2025/_index.md files where the title could be a number
        if (process.argv.includes('--fix-titles') || process.argv.includes('-t')) {
            await fixFrontmatterTitles(BASE_PATH);
        }

        if (process.argv.includes('--add-h1-title') || process.argv.includes('-m')) {
            await addH1ToMarkdownFiles(BASE_PATH);
        }

        if (process.argv.includes('--youtube') || process.argv.includes('-y')) {
            await replaceYouTubeShortcodes(BASE_PATH);
        }

        if (process.argv.includes('--fix-network-doc')) {
            await fixNetworkProblemDetectorDoc();
        }

        if (process.argv.includes('--add-missing-index') || process.argv.includes('-i')) {
            await addMissingIndexFiles(BASE_PATH);
        }

        if (!process.argv.includes('--rename-images') &&
            !process.argv.includes('-r') &&
            !process.argv.includes('--add-h1-title') &&
            !process.argv.includes('-m') &&
            !process.argv.includes('--youtube') &&
            !process.argv.includes('-y') &&
            !process.argv.includes('--fix-titles') &&
            !process.argv.includes('-t') &&
            !process.argv.includes('--add-missing-index') &&
            !process.argv.includes('-i')) {
            // If no specific action is specified, show usage
            console.log('Available commands:');
            console.log('--rename-images, -r      : Rename image files to lowercase');
            console.log('--add-h1-title, -m       : Add H1 headings to markdown files');
            console.log('--youtube, -y            : Replace YouTube shortcodes with VitePress components');
            console.log('--fix-titles, -t         : Wrap frontmatter titles in quotes');
            console.log(`\nExample: node post-processing.js --add-h1-title --youtube --fix-titles`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

async function addH1ToMarkdownFiles(basePath){
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
                        if (IGNORE_DIRS.includes(file)) {
                            continue;
                        }
                        // Recursively search subdirectories
                        const nestedFiles = await findMarkdownFiles(fullPath);
                        foundFiles = foundFiles.concat(nestedFiles);
                    } else if (stats.isFile() && file.endsWith('.md')) {
                        // Skip index.md and _index.md files, except _index.md files in community directory
                        if (file === 'index.md' || (file === '_index.md' && !fullPath.includes('/community/'))) {
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

            // Extract title from frontmatter - be more specific to avoid matching other fields
            const titleMatch = frontmatter.match(/^title:\s*["']?(.*?)["']?\s*$/m);
            const title = titleMatch ? titleMatch[1].trim() : null;

            if (!title) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No title in frontmatter'
                };
            }

            // Check if content already starts with an h1 heading (after any whitespace)
            if (contentAfterFrontmatter.match(/^\s*#\s+.+/)) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Already has H1 heading'
                };
            }

            // Check if there's an H2 heading that matches the frontmatter title
            // Look for H2 at the beginning of content (after any whitespace/newlines)
            const h2Match = contentAfterFrontmatter.match(/^(\s*)(##\s+)(.+?)(\r?\n|$)/);
            if (h2Match && h2Match[3].trim() === title.trim()) {
                // Replace the H2 with H1, preserving the content structure
                const afterH2Title = contentAfterFrontmatter.substring(h2Match.index + h2Match[0].length);
                const newContent = `${frontmatter}\n\n# ${title}\n${afterH2Title}`;
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

    console.log(`Searching for markdown files in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        console.log('\nProcessing markdown files...');
        const results = [];

        for (const file of markdownFiles) {
            const result = await processMarkdownFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- ${result.action}: ${path.basename(file)} (Title: "${result.addedTitle}")`);
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        console.log(`\nSummary: Added H1 headings to ${modifiedCount} of ${markdownFiles.length} files.`);
    }
}


async function renameImagesToLowercase(basePath){
    const IGNORE_IMAGE_DIRS = ['node_modules', '.git', 'dist', 'build'];

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
                        if (IGNORE_IMAGE_DIRS.includes(file)) {
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

    console.log(`Searching for image files with uppercase letters in: ${basePath}`);

    const matchingFiles = await findFiles(basePath);

    console.log('\nMatching files:');
    matchingFiles.forEach(file => console.log(`- ${file}`));
    console.log(`\nTotal: ${matchingFiles.length} files found`);

    // Ask for confirmation before renaming
    if (matchingFiles.length > 0) {
        const shouldRename = process.argv.includes('--rename-images') || process.argv.includes('-r');

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
            console.log(`node post-processing.js ${basePath} --rename`);
        }
    }
}

async function replaceYouTubeShortcodes(basePath) {
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
                        if (IGNORE_DIRS.includes(file)) {
                            continue;
                        }
                        // Recursively search subdirectories
                        const nestedFiles = await findMarkdownFiles(fullPath);
                        foundFiles = foundFiles.concat(nestedFiles);
                    } else if (stats.isFile() && file.endsWith('.md')) {
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
            
            // Regular expression to match YouTube shortcodes
            const youtubeRegex = /\{\{<\s*youtube\s+id="([^"]+)"(?:\s+title="[^"]*")?\s*>\}\}/g;
            
            let matches = [];
            let match;
            
            // Find all matches
            while ((match = youtubeRegex.exec(content)) !== null) {
                matches.push({
                    fullMatch: match[0],
                    videoId: match[1]
                });
            }
            
            if (matches.length === 0) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No YouTube shortcodes found'
                };
            }
            
            // Replace all YouTube shortcodes
            let newContent = content;
            matches.forEach(match => {
                const replacement = `<YouTubeVideo videoId="${match.videoId}" />`;
                newContent = newContent.replace(match.fullMatch, replacement);
            });
            
            await fs.writeFile(filePath, newContent, 'utf-8');
            
            return {
                file: filePath,
                modified: true,
                replacements: matches.length,
                videoIds: matches.map(m => m.videoId)
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

    console.log(`Searching for YouTube shortcodes in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        console.log('\nProcessing markdown files for YouTube shortcodes...');
        const results = [];

        for (const file of markdownFiles) {
            const result = await processMarkdownFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- Replaced ${result.replacements} YouTube shortcode(s) in: ${path.basename(file)}`);
                result.videoIds.forEach(videoId => {
                    console.log(`  → Video ID: ${videoId}`);
                });
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        const totalReplacements = results.reduce((sum, r) => sum + (r.replacements || 0), 0);
        console.log(`\nSummary: Replaced YouTube shortcodes in ${modifiedCount} files with ${totalReplacements} total replacements.`);
    }
}

async function fixFrontmatterTitles(basePath) {
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
                        if (IGNORE_DIRS.includes(file)) {
                            continue;
                        }
                        // Recursively search subdirectories
                        const nestedFiles = await findMarkdownFiles(fullPath);
                        foundFiles = foundFiles.concat(nestedFiles);
                    } else if (stats.isFile() && file.endsWith('.md')) {
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
            const contentAfterFrontmatter = content.substring(frontmatterEndIndex + 3);

            // Check if title is already quoted
            const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?\s*(\n|$)/);
            if (!titleMatch) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No title found in frontmatter'
                };
            }

            const titleValue = titleMatch[1];
            const fullTitleLine = titleMatch[0];
            
            // Check if title is already quoted
            if (frontmatter.match(/title:\s*["'].*?["']\s*(\n|$)/)) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Title already quoted'
                };
            }

            // Wrap title in quotes, ensuring proper newline formatting
            const newTitleLine = `title: "${titleValue}"`;
            
            // Replace the title line, ensuring proper spacing
            let newFrontmatter;
            if (fullTitleLine.endsWith('\n')) {
                // Title already has newline, just replace it
                newFrontmatter = frontmatter.replace(fullTitleLine, newTitleLine + '\n');
            } else {
                // Title doesn't have newline (likely last field), add one
                newFrontmatter = frontmatter.replace(fullTitleLine, newTitleLine + '\n');
            }
            
            const newContent = newFrontmatter + contentAfterFrontmatter;

            await fs.writeFile(filePath, newContent, 'utf-8');
            
            return {
                file: filePath,
                modified: true,
                title: titleValue
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

    console.log(`Searching for markdown files in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        console.log('\nProcessing markdown files to fix frontmatter titles...');
        const results = [];

        for (const file of markdownFiles) {
            const result = await processMarkdownFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- Fixed title in: ${path.basename(file)} (Title: "${result.title}")`);
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        console.log(`\nSummary: Fixed titles in ${modifiedCount} of ${markdownFiles.length} files.`);
    }
}

async function fixNetworkProblemDetectorDoc() {
    const filePath = 'hugo/content/docs/other-components/network-problem-detector/_index.md';
    
    try {
        let content = await fs.readFile(filePath, 'utf-8');

        const lineToDelete = `| The job IDs of the default configuration on the host (=node) network are using the naming convention \`<jobtype-shortcut>-n[2<destination>][-(int | ext | ipv6)]\`. |`;
        const lineToAdd = `The job IDs of the default configuration on the host (=node) network are using the naming convention \`<jobtype-shortcut>-n[2<destination>][-(int | ext | ipv6)]\`.`;

        if (content.includes(lineToDelete)) {
            // Replace the line with a newline followed by the new line
            content = content.replace(lineToDelete, `\n${lineToAdd}`);
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`Successfully updated ${filePath}`);
            console.log(`- Deleted table row and added new line`);
            return {
                file: filePath,
                modified: true,
                action: 'Replaced table row with plain text line'
            };
        } else {
            console.log(`Line to delete not found in ${filePath}. No changes made.`);
            return {
                file: filePath,
                modified: false,
                reason: 'Target line not found'
            };
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
        return {
            file: filePath,
            modified: false,
            reason: err.message
        };
    }
}

/**
 * Post-processing function to add empty index.md files to directories
 * that have more than one file and don't already have an index.md or _index.md file
 */
async function addMissingIndexFiles(basePath) {
    async function traverseDirectories(directory) {
        let results = [];

        try {
            const files = await fs.readdir(directory);

            // Check if this directory needs an index file
            const directoryResult = await checkDirectoryForIndex(directory, files);
            if (directoryResult) {
                results.push(directoryResult);
            }

            // Recursively process subdirectories
            for (const file of files) {
                const fullPath = path.join(directory, file);

                try {
                    const stats = await fs.stat(fullPath);

                    if (stats.isDirectory()) {
                        // Skip ignored directories
                        if (!IGNORE_DIRS.includes(file)) {
                            const subdirResults = await traverseDirectories(fullPath);
                            results = results.concat(subdirResults);
                        }
                    }
                } catch (err) {
                    console.error(`Error accessing ${fullPath}: ${err.message}`);
                }
            }
        } catch (err) {
            console.error(`Error reading directory ${directory}: ${err.message}`);
        }

        return results;
    }

    async function checkDirectoryForIndex(directory, files) {
        // Check if directory has more than one file/subdirectory
        if (files.length <= 1) {
            return null;
        }

        // Check if index.md or _index.md already exists
        const hasIndex = files.includes('index.md');
        const hasUnderscoreIndex = files.includes('_index.md');

        if (hasIndex || hasUnderscoreIndex) {
            return null;
        }

        // Create index.md file
        try {
            const dirName = path.basename(directory);
            const title = generateTitleFromDirName(dirName);
            
            const frontmatter = {
                title: title,
                auto_generated: true,
                generated_by: "post-processing/part-3.js addMissingIndexFiles function"
            };

            const content = matter.stringify('', frontmatter);
            const indexPath = path.join(directory, '_index.md');
            
            await fs.writeFile(indexPath, content, 'utf-8');

            return {
                directory: directory,
                created: true,
                title: title,
                fileCount: files.length
            };
        } catch (err) {
            console.error(`Error creating index.md in ${directory}: ${err.message}`);
            return {
                directory: directory,
                created: false,
                error: err.message,
                fileCount: files.length
            };
        }
    }

    /**
     * Generate a title from directory name
     * Capitalizes first letter and replaces hyphens with spaces
     */
    function generateTitleFromDirName(dirName) {
        return dirName.replace(/-/g, ' ').charAt(0).toUpperCase() + dirName.replace(/-/g, ' ').slice(1);
    }

    const docsPath = path.join(basePath, 'docs');
    console.log(`Searching for directories needing index.md files in: ${docsPath}`);
    const results = await traverseDirectories(docsPath);
    
    const createdCount = results.filter(r => r.created).length;
    const errorCount = results.filter(r => !r.created).length;

    console.log(`\nSummary: Processed directories and created ${createdCount} index.md files.`);
    
    if (createdCount > 0) {
        console.log(`\n✅ Created index.md files (${createdCount}):`);
        results.filter(r => r.created).forEach(r => {
            console.log(`   - ${path.relative(basePath, r.directory)} (${r.fileCount} files) - Title: "${r.title}"`);
        });
    }

    if (errorCount > 0) {
        console.log(`\n❌ Failed to create index.md files (${errorCount}):`);
        results.filter(r => !r.created).forEach(r => {
            console.log(`   - ${path.relative(basePath, r.directory)}: ${r.error}`);
        });
    }

    if (createdCount > 0) {
        console.log('\nMissing index files processing completed!');
        console.log('Empty index.md files have been added to directories with multiple files.');
    } else {
        console.log('\nNo directories found that need index.md files.');
    }
}
