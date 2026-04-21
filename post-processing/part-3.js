import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Base path configuration - can be overridden by command line argument
const BASE_PATH = './hugo/content/';
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build'];

await main();

// Main function
async function main() {
    try {
        if (process.argv.includes('--update-report-link') || process.argv.includes('-r')) {
            await updateReportLink(path.join(BASE_PATH, 'docs/security-and-compliance/report.md'));
        }

        if (process.argv.includes('--process-api-html') || process.argv.includes('-a')) {
            await processApiHtml(BASE_PATH);
        }

        if (process.argv.includes('--escape-angle-brackets') || process.argv.includes('-e')) {
            await escapeAngleBrackets(BASE_PATH);
        }

        if (!process.argv.includes('--update-report-link') &&
            !process.argv.includes('-r') &&
            !process.argv.includes('--process-api-html') &&
            !process.argv.includes('-a') &&
            !process.argv.includes('--escape-angle-brackets') &&
            !process.argv.includes('-e')) {
            // If no specific action is specified, show usage
            console.log('Available commands:');
            console.log('--update-report-link, -r : Update the report link in security-and-compliance/report.md');
            console.log('--process-api-html, -a : Extract HTML content to Vue script setup for API reference files');
            console.log('--escape-angle-brackets, -e : Escape angle-bracket placeholders in markdown files');
            console.log(`\nExample: node post-processing/part-3.js --update-report-link`);
            console.log(`Example: node post-processing/part-3.js --process-api-html`);
            console.log(`Example: node post-processing/part-3.js --escape-angle-brackets`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

/**
 * Updates the report link in the security-and-compliance/report.md file
 * Replaces the download link with a direct view link
 */
async function updateReportLink(filePath) {
    try {
        console.log(`\nUpdating report link in: ${filePath}`);
        
        // Check if file exists
        try {
            await fs.access(filePath);
        } catch (error) {
            console.error(`Error: File not found: ${filePath}`);
            return;
        }
        
        // Read file content
        let content = await fs.readFile(filePath, 'utf-8');
        
        // Define the strings to replace
        const oldString = `The report can be reviewed directly or downloaded by <a href="/html/hardened_shoots_report/" download="">clicking here</a>.`;
        const newString = `The report can be directly viewed by clicking <a href='/hardend_shoots_report.html' target="_self">here</a> or downloaded by clicking <a href="/hardened_shoots_report.html" download="hardened_shoots_report">here</a>`;
        
        // Check if the old string exists in the content
        if (!content.includes(oldString)) {
            console.log(`Warning: Could not find the text to replace in ${filePath}`);
            return;
        }
        
        // Replace the string
        const updatedContent = content.replace(oldString, newString);
        
        // Write the updated content back to file
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        
        console.log(`Successfully updated report link in: ${path.basename(filePath)}`);
    } catch (err) {
        console.error(`Error updating report link: ${err.message}`);
    }
}

/**
 * Post-processing function to extract HTML content from API reference files
 * and convert them to Vue script setup format with apiHtml variable
 */
async function processApiHtml(basePath) {
    const API_REFERENCE_DIRS = [
        'docs/other-components/etcd-druid/api-reference',
        'docs/gardener/api-reference',
        'docs/other-components/machine-controller-manager/documents',
        'docs/other-components/etcd-druid/'
    ];

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
                        if (!IGNORE_DIRS.includes(file)) {
                            const subdirFiles = await findMarkdownFiles(fullPath);
                            foundFiles = foundFiles.concat(subdirFiles);
                        }
                    } else if (file.endsWith('.md')) {
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

    async function processApiFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const parsed = matter(content);
            
            // Check if file already has script setup
            if (parsed.content.includes('<script setup>')) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Already has script setup'
                };
            }
            
            // Find where HTML content starts
            const htmlStartIndex = findHtmlStart(parsed.content);
            
            if (htmlStartIndex === -1) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'No HTML content found'
                };
            }
            
            // Split content into markdown and HTML parts more carefully
            const markdownContent = parsed.content.substring(0, htmlStartIndex).trim();
            const htmlContent = parsed.content.substring(htmlStartIndex).trim();
            
            // Validate that we actually have substantial HTML content
            const htmlLineCount = (htmlContent.match(/<[^>]+>/g) || []).length;
            if (htmlLineCount < 5) {
                return {
                    file: filePath,
                    modified: false,
                    reason: 'Not enough HTML content to warrant extraction'
                };
            }
            
            // Log what we're about to do for debugging
            console.log(`  Processing ${path.basename(filePath)}:`);
            console.log(`    Markdown content length: ${markdownContent.length} chars`);
            console.log(`    HTML content length: ${htmlContent.length} chars`);
            console.log(`    HTML tags found: ${htmlLineCount}`);
            
            // Escape any backticks in the HTML content to prevent template literal issues
            const escapedHtmlContent = htmlContent.replace(/`/g, '\\`').replace(/\${/g, '\\${');
            
            // Create the script setup section
            const scriptSetup = `<script setup>
const apiHtml = \`${escapedHtmlContent}\`;
</script>

`;
            
            // Create the new content structure
            let newContent = '';
            
            // Add markdown content if it exists
            if (markdownContent) {
                newContent = markdownContent + '\n\n';
            }
            
            // Add script setup
            newContent += scriptSetup;
            
            // Add the Vue template
            newContent += '<div v-html="apiHtml"></div>';
            
            // Reconstruct the file with updated content
            const updatedContent = matter.stringify(newContent, parsed.data);
            await fs.writeFile(filePath, updatedContent, 'utf-8');
            
            return {
                file: filePath,
                modified: true,
                action: 'Extracted HTML to Vue script setup'
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

    /**
     * Find the starting position of HTML content in the markdown
     * Returns -1 if no HTML content is found
     * This function is very conservative to avoid cutting off markdown content
     */
    function findHtmlStart(content) {
        if (!content || typeof content !== 'string') {
            return -1;
        }
        
        const lines = content.split('\n');
        let htmlStartLine = -1;
        
        // Look for patterns that indicate the start of substantial HTML content
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines
            if (line === '') continue;
            
            // Skip markdown headers (they should be preserved)
            if (line.match(/^#{1,6}\s/)) continue;
            
            // Skip markdown content that starts with text
            if (line.match(/^[a-zA-Z0-9]/)) continue;
            
            // Skip markdown lists
            if (line.match(/^[-*+]\s/) || line.match(/^\d+\.\s/)) continue;
            
            // Skip markdown blockquotes
            if (line.match(/^>\s/)) continue;
            
            // Skip markdown code blocks
            if (line.match(/^```/) || line.match(/^    /)) continue;
            
            // Look for block-level HTML that indicates start of API documentation
            if (line.match(/^<p>/i) || 
                line.match(/^<div>/i) ||
                line.match(/^<ul>/i) ||
                line.match(/^<ol>/i) ||
                line.match(/^<table>/i) ||
                line.match(/^<h[1-6].*>/i)) {
                
                // Additional check: look ahead to see if this is substantial HTML content
                let htmlLineCount = 0;
                for (let j = i; j < Math.min(i + 10, lines.length); j++) {
                    const nextLine = lines[j].trim();
                    if (nextLine.match(/<[^>]+>/)) {
                        htmlLineCount++;
                    }
                }
                
                // If we find multiple HTML lines, consider this the start
                if (htmlLineCount >= 3) {
                    htmlStartLine = i;
                    break;
                }
            }
        }
        
        if (htmlStartLine === -1) {
            return -1;
        }
        
        // Convert line number back to character index
        let charIndex = 0;
        for (let i = 0; i < htmlStartLine; i++) {
            charIndex += lines[i].length + 1; // +1 for newline
        }
        
        return charIndex;
    }

    console.log(`Processing API reference files in specified directories...`);
    
    let allFiles = [];
    
    // Process each API reference directory
    for (const dir of API_REFERENCE_DIRS) {
        const fullDirPath = path.join(basePath, dir);
        
        try {
            await fs.access(fullDirPath);
            console.log(`Searching for .md files in: ${fullDirPath}`);
            const files = await findMarkdownFiles(fullDirPath);
            allFiles = allFiles.concat(files);
            console.log(`Found ${files.length} .md files in ${dir}`);
        } catch (error) {
            console.log(`Directory not found: ${fullDirPath} - skipping`);
        }
    }
    
    console.log(`\nTotal found: ${allFiles.length} .md files`);

    if (allFiles.length > 0) {
        console.log('\nProcessing API reference files for HTML content...');
        const results = [];

        for (const file of allFiles) {
            const result = await processApiFile(file);
            results.push(result);

            if (result.modified) {
                console.log(`- ${result.action}: ${path.relative(basePath, file)}`);
            }
        }

        const modifiedCount = results.filter(r => r.modified).length;
        const skippedCount = results.filter(r => !r.modified).length;
        const noHtmlCount = results.filter(r => !r.modified && r.reason === 'No HTML content found').length;
        const alreadyProcessedCount = results.filter(r => !r.modified && r.reason === 'Already has script setup').length;
        const notEnoughHtmlCount = results.filter(r => !r.modified && r.reason === 'Not enough HTML content to warrant extraction').length;
        const errorCount = results.filter(r => !r.modified && r.reason !== 'No HTML content found' && r.reason !== 'Already has script setup' && r.reason !== 'Not enough HTML content to warrant extraction').length;
        
        console.log(`\nSummary: Modified ${modifiedCount} of ${allFiles.length} files.`);
        console.log(`- Files with HTML extracted: ${modifiedCount}`);
        console.log(`- Files without HTML content: ${noHtmlCount}`);
        console.log(`- Files with insufficient HTML content: ${notEnoughHtmlCount}`);
        console.log(`- Files already processed: ${alreadyProcessedCount}`);
        console.log(`- Files skipped (errors): ${errorCount}`);
        
        // Show detailed breakdown of modified files
        if (modifiedCount > 0) {
            console.log(`\n✅ Files successfully processed (${modifiedCount}):`);
            results.filter(r => r.modified).forEach(r => {
                console.log(`   - ${path.relative(basePath, r.file)}`);
            });
        }
        
        // Show detailed breakdown of skipped files
        if (skippedCount > 0) {
            console.log(`\n⏭️  Files skipped (${skippedCount}):`);
            
            if (noHtmlCount > 0) {
                console.log(`   📄 No HTML content (${noHtmlCount}):`);
                results.filter(r => !r.modified && r.reason === 'No HTML content found').forEach(r => {
                    console.log(`      - ${path.relative(basePath, r.file)}`);
                });
            }
            
            if (notEnoughHtmlCount > 0) {
                console.log(`   🔍 Insufficient HTML content (${notEnoughHtmlCount}):`);
                results.filter(r => !r.modified && r.reason === 'Not enough HTML content to warrant extraction').forEach(r => {
                    console.log(`      - ${path.relative(basePath, r.file)}`);
                });
            }
            
            if (alreadyProcessedCount > 0) {
                console.log(`   ✨ Already has script setup (${alreadyProcessedCount}):`);
                results.filter(r => !r.modified && r.reason === 'Already has script setup').forEach(r => {
                    console.log(`      - ${path.relative(basePath, r.file)}`);
                });
            }
            
            if (errorCount > 0) {
                console.log(`   ❌ Processing errors (${errorCount}):`);
                results.filter(r => !r.modified && r.reason !== 'No HTML content found' && r.reason !== 'Already has script setup' && r.reason !== 'Not enough HTML content to warrant extraction').forEach(r => {
                    console.log(`      - ${path.relative(basePath, r.file)}: ${r.reason}`);
                });
            }
        }
        
        if (modifiedCount > 0) {
            console.log('\nAPI HTML processing completed!');
            console.log('Files with HTML content now have Vue script setup with apiHtml variable.');
        }
    }
}

/**
 * Escapes angle-bracket placeholders (e.g. <some-name>) in markdown files
 * that are not inside inline code or fenced code blocks.
 * The Vue/VitePress compiler treats these as HTML elements and fails
 * when they have no closing tag.
 */
async function escapeAngleBrackets(basePath) {
    async function findMarkdownFiles(directory) {
        let foundFiles = [];

        try {
            const files = await fs.readdir(directory);

            for (const file of files) {
                const fullPath = path.join(directory, file);

                try {
                    const stats = await fs.stat(fullPath);

                    if (stats.isDirectory()) {
                        if (!IGNORE_DIRS.includes(file)) {
                            const subdirFiles = await findMarkdownFiles(fullPath);
                            foundFiles = foundFiles.concat(subdirFiles);
                        }
                    } else if (file.endsWith('.md')) {
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

    function escapeAngleBracketsInContent(content) {
        const lines = content.split('\n');
        let inCodeBlock = false;
        let modified = false;

        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trimStart();

            // Track fenced code blocks
            if (trimmed.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                continue;
            }

            if (inCodeBlock) continue;

            // Skip lines that are entirely inside HTML tags (e.g. <script setup>)
            if (trimmed.startsWith('<script') || trimmed.startsWith('</script') ||
                trimmed.startsWith('<div ') || trimmed.startsWith('</div')) {
                continue;
            }

            // Replace angle-bracket placeholders that are NOT inside backticks.
            // Match <word> patterns where word contains letters, digits, hyphens, or underscores.
            // Use a state machine approach to skip backtick-delimited sections.
            const line = lines[i];
            let result = '';
            let j = 0;

            while (j < line.length) {
                // Skip inline code
                if (line[j] === '`') {
                    const start = j;
                    j++;
                    while (j < line.length && line[j] !== '`') j++;
                    if (j < line.length) j++; // skip closing backtick
                    result += line.substring(start, j);
                    continue;
                }

                // Check for angle-bracket placeholder
                if (line[j] === '<') {
                    const match = line.substring(j).match(/^<([a-zA-Z][a-zA-Z0-9_-]*)>/);
                    if (match) {
                        // Check this is not a known HTML tag
                        const tag = match[1].toLowerCase();
                        const htmlTags = new Set([
                            'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
                            'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
                            'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
                            'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
                            'em', 'embed',
                            'fieldset', 'figcaption', 'figure', 'footer', 'form',
                            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
                            'i', 'iframe', 'img', 'input', 'ins',
                            'kbd',
                            'label', 'legend', 'li', 'link',
                            'main', 'map', 'mark', 'menu', 'meta', 'meter',
                            'nav', 'noscript',
                            'object', 'ol', 'optgroup', 'option', 'output',
                            'p', 'param', 'picture', 'pre', 'progress',
                            'q',
                            'rp', 'rt', 'ruby',
                            's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span',
                            'strong', 'style', 'sub', 'summary', 'sup',
                            'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
                            'u', 'ul',
                            'var', 'video',
                            'wbr',
                        ]);
                        if (!htmlTags.has(tag)) {
                            result += '`' + match[0] + '`';
                            j += match[0].length;
                            modified = true;
                            continue;
                        }
                    }
                }

                result += line[j];
                j++;
            }

            lines[i] = result;
        }

        return { content: lines.join('\n'), modified };
    }

    console.log(`\nEscaping angle-bracket placeholders in: ${basePath}`);
    const markdownFiles = await findMarkdownFiles(basePath);
    console.log(`Found ${markdownFiles.length} markdown files`);

    let modifiedCount = 0;

    for (const file of markdownFiles) {
        try {
            const content = await fs.readFile(file, 'utf-8');
            const { content: newContent, modified } = escapeAngleBracketsInContent(content);

            if (modified) {
                await fs.writeFile(file, newContent, 'utf-8');
                modifiedCount++;
                console.log(`- Escaped angle brackets in: ${path.relative(basePath, file)}`);
            }
        } catch (err) {
            console.error(`Error processing ${file}: ${err.message}`);
        }
    }

    console.log(`\nSummary: Escaped angle-bracket placeholders in ${modifiedCount} of ${markdownFiles.length} files.`);
}
