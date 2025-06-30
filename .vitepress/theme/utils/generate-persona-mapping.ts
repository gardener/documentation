/**
 * Persona Mapping Generator
 * 
 * This script recursively scans all markdown files in the content/docs directory
 * and extracts persona information from their frontmatter. It generates a JSON file
 * that maps URL paths to corresponding personas (Developers, Operators, or Users).
 * 
 * Key behavior:
 * - If an index.md or _index.md file is found, it applies the persona to the entire directory path
 * - Regular markdown files have their personas applied to their specific paths
 * - Each file/directory is processed independently - we never infer personas for paths
 * - Only root paths ('/' and '/docs/') are automatically added with all personas
 * - Files and subdirectories within a directory can have different personas than their parent directory
 * 
 * Usage:
 * npx ts-node scripts/generate-persona-mapping.ts
 * 
 * Output:
 * The script will generate 'generatedPersonaMapping.json' in the project root.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Type for the persona mapping
type PersonaMapping = Record<string, string[]>;

// Function to extract frontmatter from markdown content
function extractFrontmatter(content: string): any {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (match && match[1]) {
    try {
      return yaml.load(match[1]);
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return null;
    }
  }
  
  return null;
}

// Function to recursively scan directories
async function scanDirectory(dir: string, baseDir: string, mapping: PersonaMapping = {}): Promise<PersonaMapping> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  
  // First check for index files to set directory level personas
  let directoryPersonas: string[] | null = null;
  
  for (const entry of entries) {
    if (entry.isFile() && (entry.name === '_index.md' || entry.name === 'index.md')) {
      const filePath = path.join(dir, entry.name);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const frontmatter = extractFrontmatter(content);
      
      if (frontmatter && frontmatter.persona) {
        // Convert single value to array or split comma-separated string
        const personas = typeof frontmatter.persona === 'string' 
          ? frontmatter.persona.split(',').map((p: string) => p.trim())
          : [frontmatter.persona];
        
        // Get relative path from base dir
        const relativePath = path.relative(baseDir, dir).replace(/\\/g, '/');
        const urlPath = '/' + (relativePath ? relativePath + '/' : '');
        
        mapping[urlPath] = personas;
        directoryPersonas = personas;
      }
    }
  }
  
  // Process all entries
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      await scanDirectory(entryPath, baseDir, mapping);
    } else if (entry.isFile() && entry.name.endsWith('.md') && 
              entry.name !== '_index.md' && entry.name !== 'index.md') {
      // Process regular markdown files
      const content = await fs.promises.readFile(entryPath, 'utf8');
      const frontmatter = extractFrontmatter(content);
      
      if (frontmatter && frontmatter.persona) {
        // Convert single value to array or split comma-separated string
        const personas = typeof frontmatter.persona === 'string' 
          ? frontmatter.persona.split(',').map((p: string) => p.trim())
          : [frontmatter.persona];
        
        // Get relative path from base dir, remove .md extension and convert to URL path
        const relativePath = path.relative(baseDir, entryPath).replace(/\\/g, '/').replace(/\.md$/, '');
        const urlPath = '/' + relativePath + '/';
        
        mapping[urlPath] = personas;
      }
    }
  }
  
  return mapping;
}

// Function to add only the root paths
function addRootPaths(mapping: PersonaMapping): PersonaMapping {
  const updatedMapping = { ...mapping };
  
  // Add the standard base paths if they don't exist
  if (!updatedMapping['/']) {
    updatedMapping['/'] = ['Developers', 'Operators', 'Users']; // Default to all personas for root
  }
  
  if (!updatedMapping['/docs/']) {
    updatedMapping['/docs/'] = ['Developers', 'Operators', 'Users']; // Default to all personas for docs root
  }
  
  return updatedMapping;
}

// This function was removed as we don't want to copy entries from the existing mapping

// Compare two persona mappings to find differences
function comparePersonaMappings(existingMapping: PersonaMapping, newMapping: PersonaMapping): {
  pathsOnlyInExisting: string[];
  pathsOnlyInNew: string[];
  pathsWithDifferentPersonas: string[];
} {
  const pathsOnlyInExisting: string[] = [];
  const pathsOnlyInNew: string[] = [];
  const pathsWithDifferentPersonas: string[] = [];

  // Find paths that are only in existing mapping
  Object.keys(existingMapping).forEach(path => {
    if (!newMapping[path]) {
      pathsOnlyInExisting.push(path);
    } else {
      // Check for paths with different personas
      const existingPersonas = existingMapping[path].sort().join(',');
      const newPersonas = newMapping[path].sort().join(',');
      
      if (existingPersonas !== newPersonas) {
        pathsWithDifferentPersonas.push(path);
      }
    }
  });

  // Find paths that are only in new mapping
  Object.keys(newMapping).forEach(path => {
    if (!existingMapping[path]) {
      pathsOnlyInNew.push(path);
    }
  });

  return {
    pathsOnlyInExisting,
    pathsOnlyInNew,
    pathsWithDifferentPersonas
  };
}

async function main() {
  const contentDocsDir = path.join(process.cwd(), 'content', 'docs');
  const baseDir = path.join(process.cwd(), 'content');
  
  console.log(`Scanning directory: ${contentDocsDir}`);
  
  try {
    // Scan the content/docs directory
    console.log('Processing markdown files...');
    let mapping = await scanDirectory(contentDocsDir, baseDir);
    
    // Only add root paths, no inference
    mapping = addRootPaths(mapping);

    // Sort the mapping by keys (paths) for better readability
    const sortedMapping: PersonaMapping = {};
    Object.keys(mapping)
      .sort()
      .forEach(key => {
        sortedMapping[key] = mapping[key];
      });

    // Count personas
    const personaCounts = {
      Developers: 0,
      Operators: 0,
      Users: 0
    };
    
    Object.values(sortedMapping).forEach(personas => {
      personas.forEach(persona => {
        if (personaCounts[persona as keyof typeof personaCounts] !== undefined) {
          personaCounts[persona as keyof typeof personaCounts]++;
        }
      });
    });

    // Write the result to a JSON file
    const outputPath = path.join(process.cwd() + '/debug/', 'generatedPersonaMapping.json');
    await fs.promises.writeFile(
      outputPath, 
      JSON.stringify(sortedMapping, null, 2), 
      'utf8'
    );
    
    console.log(`\nGenerated persona mapping has been written to: ${outputPath}`);
    console.log(`\nFound ${Object.keys(sortedMapping).length} paths with persona information:`);
    console.log(`- Developers: ${personaCounts.Developers} paths`);
    console.log(`- Operators: ${personaCounts.Operators} paths`);
    console.log(`- Users: ${personaCounts.Users} paths`);
    
    // Compare with existing persona mapping if it exists
    const existingMapPath = path.join(process.cwd(), 'personaMapping.json');
    if (fs.existsSync(existingMapPath)) {
      try {
        const existingMapping: PersonaMapping = JSON.parse(
          await fs.promises.readFile(existingMapPath, 'utf8')
        );
        
        // Only compare with existing mapping, don't modify our output
        const comparison = comparePersonaMappings(existingMapping, sortedMapping);
        
        console.log('\nComparison with existing personaMapping.json:');
        console.log(`- Paths only in existing mapping: ${comparison.pathsOnlyInExisting.length}`);
        console.log(`- Paths only in new mapping: ${comparison.pathsOnlyInNew.length}`);
        console.log(`- Paths with different personas: ${comparison.pathsWithDifferentPersonas.length}`);
        
        if (comparison.pathsOnlyInExisting.length > 0 || 
            comparison.pathsOnlyInNew.length > 0 || 
            comparison.pathsWithDifferentPersonas.length > 0) {
          
          // Write detailed comparison to a file
          const comparisonPath = path.join(process.cwd() + '/debug/', 'personaMapping-comparison.json');
          await fs.promises.writeFile(
            comparisonPath,
            JSON.stringify({
              pathsOnlyInExisting: comparison.pathsOnlyInExisting,
              pathsOnlyInNew: comparison.pathsOnlyInNew,
              pathsWithDifferentPersonas: comparison.pathsWithDifferentPersonas.map(path => ({
                path,
                existing: existingMapping[path],
                new: sortedMapping[path]
              }))
            }, null, 2),
            'utf8'
          );
          
          console.log(`\nDetailed comparison has been written to: ${comparisonPath}`);
        }
      } catch (error) {
        console.error('Error comparing with existing mapping:', error);
      }
    }
  } catch (error) {
    console.error('Error generating persona mapping:', error);
  }
}

main().catch(console.error);
