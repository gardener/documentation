#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const BASE_DIR = 'hugo';
const INDEX_FILES = ['index.md', '_index.md'];

function analyzeDirectory(dirPath, results = []) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // Separate files and subdirectories
    const files = entries.filter(e => e.isFile());
    const subdirs = entries.filter(e => e.isDirectory());
    
    // Only consider .md files
    const mdFiles = files.filter(f => f.name.endsWith('.md'));
    
    // Filter out index files for counting
    const nonIndexFiles = mdFiles.filter(f => !INDEX_FILES.includes(f.name));
    const indexFiles = mdFiles.filter(f => INDEX_FILES.includes(f.name));
    
    // Analyze current directory
    if (files.length === 0 && subdirs.length === 0) {
      // Truly empty directory
      results.push({
        path: dirPath,
        type: 'TRULY_EMPTY',
        files: []
      });
    } else if (nonIndexFiles.length === 0 && indexFiles.length > 0 && subdirs.length === 0) {
      // Only has index files, no other content
      results.push({
        path: dirPath,
        type: 'ONLY_INDEX_FILES',
        files: indexFiles.map(f => f.name)
      });
    } else if (nonIndexFiles.length === 1) {
      // Has exactly one non-index file
      results.push({
        path: dirPath,
        type: 'LONE_FILE',
        files: files.map(f => f.name),
        loneFile: nonIndexFiles[0].name,
        hasIndexFiles: indexFiles.length > 0
      });
    }
    
    // Recursively analyze subdirectories
    for (const subdir of subdirs) {
      const subdirPath = path.join(dirPath, subdir.name);
      analyzeDirectory(subdirPath, results);
    }
    
    return results;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return results;
  }
}

function buildTreeStructure(results) {
  // Sort results by path
  const sortedResults = [...results].sort((a, b) => a.path.localeCompare(b.path));
  
  const tree = {};
  
  for (const result of sortedResults) {
    const pathParts = result.path.split(path.sep);
    let currentLevel = tree;
    
    // Build nested structure
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      
      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }
      
      // If this is the last part, add the metadata
      if (i === pathParts.length - 1) {
        currentLevel[part]._meta = {
          type: result.type,
          loneFile: result.loneFile || null,
          hasIndexFiles: result.hasIndexFiles || false,
          allFiles: result.files || []
        };
      }
      
      currentLevel = currentLevel[part];
    }
  }
  
  return tree;
}

function convertToYAML(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  let yaml = '';
  
  // Sort keys, but put _meta last
  const keys = Object.keys(obj).sort((a, b) => {
    if (a === '_meta') return 1;
    if (b === '_meta') return -1;
    return a.localeCompare(b);
  });
  
  for (const key of keys) {
    const value = obj[key];
    
    if (key === '_meta') {
      // Format metadata
      yaml += `${spaces}type: ${value.type}\n`;
      if (value.loneFile) {
        yaml += `${spaces}loneFile: "${value.loneFile}"\n`;
      }
      if (value.hasIndexFiles) {
        yaml += `${spaces}hasIndexFiles: ${value.hasIndexFiles}\n`;
      }
      if (value.allFiles && value.allFiles.length > 0) {
        yaml += `${spaces}allFiles:\n`;
        value.allFiles.forEach(file => {
          yaml += `${spaces}  - "${file}"\n`;
        });
      }
    } else {
      // Format directory
      yaml += `${spaces}${key}:\n`;
      yaml += convertToYAML(value, indent + 1);
    }
  }
  
  return yaml;
}

function formatResults(results) {
  console.log('# Hugo Directory Analysis\n');
  console.log('# Analysis of directories with lone files or only index files\n');
  
  // Group by type for summary
  const trulyEmpty = results.filter(r => r.type === 'TRULY_EMPTY');
  const onlyIndexFiles = results.filter(r => r.type === 'ONLY_INDEX_FILES');
  const loneFiles = results.filter(r => r.type === 'LONE_FILE');
  
  console.log('summary:');
  console.log(`  totalFlagged: ${results.length}`);
  console.log(`  trulyEmpty: ${trulyEmpty.length}`);
  console.log(`  onlyIndexFiles: ${onlyIndexFiles.length}`);
  console.log(`  loneFiles: ${loneFiles.length}`);
  console.log();
  
  console.log('directories:');
  const tree = buildTreeStructure(results);
  console.log(convertToYAML(tree, 1));
}

// Main execution
if (!fs.existsSync(BASE_DIR)) {
  console.error(`Error: Directory '${BASE_DIR}' does not exist!`);
  process.exit(1);
}

console.log(`Analyzing ${BASE_DIR} directory...`);
console.log();

const results = analyzeDirectory(BASE_DIR);
formatResults(results);

// Export results to JSON file
const outputFile = 'hugo-directory-analysis.json';
fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
console.log(`📁 Full results exported to: ${outputFile}`);