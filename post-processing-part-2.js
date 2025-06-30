import { promises as fs } from "fs";
import path from "path";

// Base path configuration - can be overridden by command line argument
const BASE_PATH = './hugo/content/';
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build'];

await main();

// Main function
async function main() {
    try {
        if (process.argv.includes('--migrate-alerts') || process.argv.includes('-a')) {
            await migrateHugoAlertsToGitHub(BASE_PATH);
        }
        
        if (process.argv.includes('--clean-layouts') || process.argv.includes('-l')) {
            await cleanLayoutEntries(BASE_PATH);
        }
        
        if (process.argv.includes('--flatten-single-dirs') || process.argv.includes('-f')) {
            await flattenSingleFileDirs(BASE_PATH);
        }
        
        if (!process.argv.includes('--migrate-alerts') &&
            !process.argv.includes('-a') &&
            !process.argv.includes('--clean-layouts') &&
            !process.argv.includes('-l') &&
            !process.argv.includes('--flatten-single-dirs') &&
            !process.argv.includes('-f')) {
            // Show usage if no specific action is specified
            console.log('Available commands:');
            console.log('--migrate-alerts, -a     : Migrate Hugo alert shortcodes to GitHub-style alerts');
            console.log('--clean-layouts, -l      : Remove layout entries that are not "doc", "home", or "page"');
            console.log('--flatten-single-dirs, -f: Flatten directories that contain only one file');
            console.log(`\nExample: node alert-migration.js --migrate-alerts --clean-layouts`);
            console.log(`Example with custom path: node alert-migration.js ./website/documentation --migrate-alerts`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

async function migrateHugoAlertsToGitHub(basePath) {
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
            
            // Regular expression to match Hugo alert shortcodes
            // Matches: {{% alert title="Title" color="primary" %}}content{{% /alert %}}
            const alertRegex = /\{\{\%\s*alert\s+title="([^"]*)"(?:\s+color="([^"]*)")?\s*\%\}\}([\s\S]*?)\{\{\%\s*\/alert\s*\%\}\}/g;
            
            let matches = [];
            let match;
            
            // Find all matches
            while ((match = alertRegex.exec(content)) !== null) {
                matches.push({
                    fullMatch: match[0],
                    title: match[1],
                    color: match[2] || 'note', // default to 'note' if no color specified
                    content: match[3].trim()
                });
            }
            
            if (matches.length === 0) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No Hugo alert shortcodes found'
                };
            }
            
            let newContent = content;
            let replacements = [];
            
            // Replace all Hugo alert shortcodes with GitHub-style alerts
            matches.forEach(alert => {
                const githubAlertType = mapHugoColorToGitHubType(alert.color);
                let githubAlert;
                
                if (alert.title) {
                    // If there's a custom title, use it
                    githubAlert = `> [!${githubAlertType.toUpperCase()}]\n> **${alert.title}**\n> ${alert.content.split('\n').join('\n> ')}`;
                } else {
                    // If no title, use the default GitHub alert format
                    githubAlert = `> [!${githubAlertType.toUpperCase()}]\n> ${alert.content.split('\n').join('\n> ')}`;
                }
                
                newContent = newContent.replace(alert.fullMatch, githubAlert);
                replacements.push({
                    from: alert.color,
                    to: githubAlertType,
                    title: alert.title
                });
            });
            
            await fs.writeFile(filePath, newContent, 'utf-8');
            
            return {
                file: filePath,
                modified: true,
                replacements: matches.length,
                details: replacements
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

    // Map Hugo alert colors to GitHub alert types
    function mapHugoColorToGitHubType(color) {
        const colorMap = {
            'primary': 'NOTE',
            'secondary': 'NOTE', 
            'success': 'TIP',
            'info': 'NOTE',
            'warning': 'WARNING',
            'danger': 'CAUTION',
            'light': 'NOTE',
            'dark': 'NOTE',
            // Additional mappings for common variations
            'tip': 'TIP',
            'note': 'NOTE',
            'important': 'IMPORTANT',
            'caution': 'CAUTION'
        };
        
        return colorMap[color.toLowerCase()] || 'NOTE';
    }

    console.log(`Searching for Hugo alert shortcodes in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        console.log('\nProcessing markdown files for Hugo alert shortcodes...');
        const results = [];

        for (const file of markdownFiles) {
            const result = await processMarkdownFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- Migrated ${result.replacements} alert(s) in: ${path.basename(file)}`);
                result.details.forEach(detail => {
                    console.log(`  → ${detail.from} → ${detail.to}${detail.title ? ` (Title: "${detail.title}")` : ''}`);
                });
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        const totalReplacements = results.reduce((sum, r) => sum + (r.replacements || 0), 0);
        console.log(`\nSummary: Migrated Hugo alerts in ${modifiedCount} files with ${totalReplacements} total replacements.`);
        
        if (modifiedCount > 0) {
            console.log('\nMigration completed! Hugo alert shortcodes have been converted to GitHub-style alerts.');
            console.log('Please review the changes before committing.');
        }
    }
}

async function cleanLayoutEntries(basePath) {
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

            // Check for layout entries that need to be removed
            const layoutMatch = frontmatter.match(/^layout:\s*["']?([^"'\n\r]+)["']?\s*$/m);
            if (!layoutMatch) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No layout entry found'
                };
            }

            const layoutValue = layoutMatch[1].trim();
            const allowedLayouts = ['doc', 'home', 'page'];
            
            if (allowedLayouts.includes(layoutValue)) {
                return {
                    file: filePath,
                    modified: false,
                    reason: `Layout "${layoutValue}" is allowed`
                };
            }

            // Remove the layout line from frontmatter
            const layoutLinePattern = new RegExp(`^layout:.*$`, 'm');
            let newFrontmatter = frontmatter.replace(layoutLinePattern, '');
            
            // Clean up any double newlines that might result from removing the line
            newFrontmatter = newFrontmatter.replace(/\n\n+/g, '\n\n');
            
            const newContent = newFrontmatter + contentAfterFrontmatter;
            
            await fs.writeFile(filePath, newContent, 'utf-8');
            
            return {
                file: filePath,
                modified: true,
                removedLayout: layoutValue
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

    console.log(`Searching for markdown files with layout entries in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`\nFound ${markdownFiles.length} markdown files`);

    if (markdownFiles.length > 0) {
        console.log('\nProcessing markdown files to clean layout entries...');
        const results = [];

        for (const file of markdownFiles) {
            const result = await processMarkdownFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- Removed layout "${result.removedLayout}" from: ${path.basename(file)}`);
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        console.log(`\nSummary: Cleaned layout entries in ${modifiedCount} of ${markdownFiles.length} files.`);
        
        if (modifiedCount > 0) {
            console.log('\nLayout cleanup completed! Non-standard layout entries have been removed.');
            console.log('Please review the changes before committing.');
        }
    }
}

async function flattenSingleFileDirs(basePath) {
    async function findSingleFileDirs(directory) {
        let dirsToFlatten = [];

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

                        // Check contents of this directory
                        const dirContents = await fs.readdir(fullPath);
                        const nonIgnoredContents = dirContents.filter(item => !IGNORE_DIRS.includes(item));

                        if (nonIgnoredContents.length === 1) {
                            const singleItemPath = path.join(fullPath, nonIgnoredContents[0]);
                            const singleItemStats = await fs.stat(singleItemPath);

                            // Only process if the single item is a file
                            if (singleItemStats.isFile()) {
                                dirsToFlatten.push({
                                    dirPath: fullPath,
                                    dirName: file,
                                    filePath: singleItemPath,
                                    fileName: nonIgnoredContents[0]
                                });
                            }
                        }

                        // Recursively search subdirectories
                        const nestedDirs = await findSingleFileDirs(fullPath);
                        dirsToFlatten = dirsToFlatten.concat(nestedDirs);
                    }
                } catch (err) {
                    console.error(`Error accessing ${fullPath}: ${err.message}`);
                }
            }
        } catch (err) {
            console.error(`Error reading directory ${directory}: ${err.message}`);
        }

        return dirsToFlatten;
    }

    async function addFrontmatterNote(content, originalPath, originalName) {
        // Check if file has frontmatter
        if (!content.startsWith('---')) {
            // No frontmatter, add it
            const note = `---\n# Note: This file was moved from ${originalPath}/${originalName}\n# Original location: ${originalPath}\n# Original filename: ${originalName}\n---\n\n${content}`;
            return note;
        }

        // Find the end of frontmatter
        const frontmatterEndIndex = content.indexOf('---', 3);
        if (frontmatterEndIndex === -1) {
            // Invalid frontmatter, add note at the beginning
            const note = `# Note: This file was moved from ${originalPath}/${originalName}\n# Original location: ${originalPath}\n# Original filename: ${originalName}\n\n${content}`;
            return note;
        }

        const frontmatter = content.substring(0, frontmatterEndIndex);
        const contentAfterFrontmatter = content.substring(frontmatterEndIndex + 3);

        // Add note to frontmatter
        const noteLines = [
            `# Note: This file was moved from ${originalPath}/${originalName}`,
            `# Original location: ${originalPath}`,
            `# Original filename: ${originalName}`
        ];

        const newFrontmatter = frontmatter + '\n' + noteLines.join('\n') + '\n';
        return newFrontmatter + '---' + contentAfterFrontmatter;
    }

    async function flattenDirectory(dirInfo) {
        try {
            const { dirPath, dirName, filePath, fileName } = dirInfo;
            
            // Read the file content
            const content = await fs.readFile(filePath, 'utf-8');
            
            // Determine new filename
            let newFileName;
            if (fileName === '_index.md' || fileName === 'index.md') {
                newFileName = `${dirName}.md`;
            } else {
                newFileName = fileName;
            }
            
            // Add frontmatter note with original path information
            const modifiedContent = await addFrontmatterNote(content, dirPath, fileName);
            
            // Determine new file path (in parent directory of the directory being flattened)
            const parentDir = path.dirname(dirPath);
            const newFilePath = path.join(parentDir, newFileName);
            
            // Write the file to its new location
            await fs.writeFile(newFilePath, modifiedContent, 'utf-8');
            
            // Remove the original directory and its contents
            await fs.rm(dirPath, { recursive: true, force: true });
            
            return {
                success: true,
                originalDir: dirPath,
                originalFile: fileName,
                newFile: newFilePath,
                newFileName: newFileName
            };
        } catch (err) {
            console.error(`Error flattening ${dirInfo.dirPath}: ${err.message}`);
            return {
                success: false,
                originalDir: dirInfo.dirPath,
                error: err.message
            };
        }
    }

    console.log(`Searching for single-file directories in: ${basePath}`);
    const singleFileDirs = await findSingleFileDirs(basePath);
    console.log(`\nFound ${singleFileDirs.length} directories with only one file`);

    if (singleFileDirs.length > 0) {
        console.log('\nFlattening single-file directories...');
        const results = [];

        for (const dirInfo of singleFileDirs) {
            const result = await flattenDirectory(dirInfo);
            results.push(result);

            if (result.success) {
                console.log(`- Flattened: ${path.basename(result.originalDir)}/${result.originalFile} → ${result.newFileName}`);
            } else {
                console.log(`- Failed to flatten: ${path.basename(result.originalDir)} (${result.error})`);
            }
        }

        const successCount = results.filter(r => r.success).length;
        console.log(`\nSummary: Successfully flattened ${successCount} of ${singleFileDirs.length} directories.`);
        
        if (successCount > 0) {
            console.log('\nDirectory flattening completed! Single-file directories have been flattened.');
            console.log('Files have been moved and original path information added to frontmatter.');
            console.log('Please review the changes before committing.');
        }
    }
}
