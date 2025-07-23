import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';

// Type definitions for sidebar items
export interface SidebarLeaf {
  text: string;
  link: string;
  collapsed?: boolean;
}

export interface SidebarBranch {
  text: string;
  items: (SidebarLeaf | SidebarBranch)[];
  collapsed?: boolean;
}

export type SidebarItem = SidebarLeaf | SidebarBranch;


/**
 * Recursively removes all _index.md entries from the sidebar
 */
export function removeIndexEntries(sidebar: any): any {
  if (Array.isArray(sidebar)) {
    return sidebar
      .map(item => removeIndexEntries(item))
      .filter(item => item !== null);
  }
  
  if (typeof sidebar !== 'object' || sidebar === null) {
    return sidebar;
  }
  
  // Create a copy of the object
  const filtered = { ...sidebar };
  
  // If this object has items, filter them
  if (filtered.items && Array.isArray(filtered.items)) {
    filtered.items = filtered.items
      .map((item: any) => {
        // Filter out items that are _index entries
        if (item.link && (item.link === '_index' || item.link.endsWith('/_index'))) {
          return null;
        }
        // Recursively process remaining items
        return removeIndexEntries(item);
      })
      .filter((item: any) => item !== null);
  }
  
  // Process other properties recursively
  for (const [key, value] of Object.entries(filtered)) {
    if (key !== 'items' && typeof value === 'object') {
      filtered[key] = removeIndexEntries(value);
    }
  }
  
  return filtered;
}

/**
 * Recursively sorts sidebar entries by weight from frontmatter
 */
export function sortByWeight(sidebar: any, base): any {
  if (Array.isArray(sidebar)) {
    // Sort the array by weight and recursively process items
    return sidebar
      .map(item => sortByWeight(item, base))
      .sort((a, b) => {
        const weightA = getWeightForItem(a, base);
        const weightB = getWeightForItem(b, base);
        return weightA - weightB;
      });
  }
  
  if (typeof sidebar !== 'object' || sidebar === null) {
    return sidebar;
  }
  
  // Create a copy of the object
  const sorted = { ...sidebar };
  
  // If this object has items, sort them
  if (sorted.items && Array.isArray(sorted.items)) {
    sorted.items = sorted.items
      .map((item: any) => sortByWeight(item, base))
      .sort(compareItemsByWeight);
  }
  
  // Process other properties recursively
  for (const [key, value] of Object.entries(sorted)) {
    if (key !== 'items' && typeof value === 'object') {
      sorted[key] = sortByWeight(value, base);
    }
  }


  function compareItemsByWeight(a: any, b: any): number
  {
    const weightA = getWeightForItem(a, base);
    const weightB = getWeightForItem(b, base);
    return weightA - weightB;
  }
  
  return sorted;
}


/**
 * Gets the weight for a sidebar item from its frontmatter
 */
export function getWeightForItem(item: any, base): number {
  if (!item || typeof item !== 'object') {
    return Number.MAX_SAFE_INTEGER; // Put invalid items at the end
  }
  
  // If it's a directory with items, check for _index file
  if (item.items && Array.isArray(item.items)) {
    const indexItem = item.items.find((subItem: any) => 
      subItem.link && (subItem.link === '_index' || subItem.link.endsWith('/_index'))
    );
    
    if (indexItem) {
      const weight = getWeightFromFile(indexItem.link, base);
      if (weight !== null) {
        return weight;
      }
    }
  }
  
  // If it's a leaf item with a link, get weight from that file
  if (item.link && typeof item.link === 'string') {
    const weight = getWeightFromFile(item.link, base);
    if (weight !== null) {
      return weight;
    }
  }
  
  // Default weight if no weight found
  return Number.MAX_SAFE_INTEGER;
}

/**
 * Reads the weight from a file's frontmatter
 */
export function getWeightFromFile(link: string, base?: string): number | null {
  try {
    // Construct the file path
    let filePath: string;
    
    if (link === '_index') {
      // For root _index files
      filePath = join(process.cwd(), 'hugo', 'content', base, '_index.md');
    } else if (link.endsWith('/_index')) {
      // For nested _index files
      const relativePath = link.replace('/_index', '');
      filePath = join(process.cwd(), 'hugo', 'content', base, relativePath, '_index.md');
    } else {
      // For regular files
      filePath = join(process.cwd(), 'hugo', 'content', base, `${link}.md`);
    }
    
    // Check if file exists
    if (!existsSync(filePath)) {
      return null;
    }
    
    // Read the file content
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      return null;
    }
    
    // Parse YAML frontmatter
    const frontmatter = load(frontmatterMatch[1]) as any;
    
    // Return the weight if it exists and is a number
    const weight = frontmatter?.weight;
    return typeof weight === 'number' ? weight : null;
    
  } catch (error) {
    console.warn(`Error reading weight from ${link}:`, error);
    return null;
  }
}

/**
 * Recursively enhances directory titles by reading from _index.md frontmatter
 */
export function enhanceDirectoryTitles(sidebar: any, base): any {
  if (Array.isArray(sidebar)) {
    return sidebar.map(item => enhanceDirectoryTitles(item, base));
  }
  
  if (typeof sidebar !== 'object' || sidebar === null) {
    return sidebar;
  }
  
  // Create a copy of the object
  const enhanced = { ...sidebar };
  
  // If this object has items (indicating it's a directory), enhance it
  if (enhanced.items && Array.isArray(enhanced.items)) {
    // Look for _index.md file in the items
    const indexItem = enhanced.items.find((item: any) => 
      item.link && (item.link === '_index' || item.link.endsWith('/_index'))
    );
    
    if (indexItem) {
      // Try to read the frontmatter and update the title
      const title = getTitleFromIndexFile(indexItem.link, base);
      if (title) {
        enhanced.text = title;
      }
    }
    
    // Recursively process all items
    enhanced.items = enhanced.items.map((item: any) => enhanceDirectoryTitles(item, base));
  }
  
  // If it's a top-level section with items, process those too
  if (enhanced.base && enhanced.items) {
    enhanced.items = enhanced.items.map((item: any) => enhanceDirectoryTitles(item, base));
  }
  
  // Process other properties recursively
  for (const [key, value] of Object.entries(enhanced)) {
    if (key !== 'items' && typeof value === 'object') {
      enhanced[key] = enhanceDirectoryTitles(value, base);
    }
  }
  
  return enhanced;
}

/**
 * Reads the title from an _index.md file's frontmatter
 */
export function getTitleFromIndexFile(link: string, base?: string): string | null {
  try {
    // Construct the file path
    let filePath: string;
    
    if (link === '_index') {
      // For root _index files
      filePath = join(process.cwd(), 'hugo', 'content', base, '_index.md');
    } else if (link.endsWith('/_index')) {
      // For nested _index files
      const relativePath = link.replace('/_index', '');
      filePath = join(process.cwd(), 'hugo', 'content', base, relativePath, '_index.md');
    } else {
      return null;
    }
    
    // Check if file exists
    if (!existsSync(filePath)) {
      return null;
    }
    
    // Read the file content
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      return null;
    }
    
    // Parse YAML frontmatter
    const frontmatter = load(frontmatterMatch[1]) as any;
    
    // Return the title if it exists
    return frontmatter?.title || null;
    
  } catch (error) {
    console.warn(`Error reading title from ${link}:`, error);
    return null;
  }
}

/**
 * Function to create a map of all leaf nodes
 */
export function createLeafMap(items: SidebarItem[]): Map<string, SidebarLeaf> {
  const leafMap = new Map<string, SidebarLeaf>();
  
  function processItem(item: SidebarItem) {
    // If the item has a link and no items, it's a leaf node
    if ('link' in item && !('items' in item)) {
      leafMap.set(item.link, item);
    }
    // If it has items, process them recursively
    if ('items' in item) {
      item.items.forEach(processItem);
    }
  }
  
  items.forEach(processItem);
  return leafMap;
}

/**
 * Function to recursively extract all items from a section
 */
export function extractItems(section: any): SidebarItem[] {
  if (Array.isArray(section)) {
    return section as SidebarItem[];
  }
  if (section && typeof section === 'object' && 'items' in section) {
    return section.items as SidebarItem[];
  }
  return [];
}


function removeTrailingSlash (str: string) {
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

/**
 * Function to filter leaf map based on persona permissions
 * Only removes entries that are explicitly restricted for the persona.
 * Entries not mentioned in the persona mapping are kept (available to all personas).
 */
export function filterLeafMapByPersona(leafMap: Map<string, SidebarLeaf>, persona: string): Map<string, SidebarLeaf> {
  // Create a copy of the original map
  const filteredMap = new Map(leafMap);
  
  // Read the persona mapping
  const personaMapping = JSON.parse(
    readFileSync(`${import.meta.dirname}/personaMapping.json`, 'utf-8')
  ) as Record<string, string[]>;

  // Process each entry in the persona mapping
  for (const [path, allowedPersonas] of Object.entries(personaMapping)) {
    // Only remove entries that are explicitly restricted (don't include this persona)
    if (!allowedPersonas.includes(persona)) {
      // Remove /docs/ prefix from the path
      let strippedPath = path.replace('/docs/', '');
      strippedPath = removeTrailingSlash(strippedPath);

      // Find and remove all matching entries from filteredMap
      for (const [leafKey] of filteredMap) {
        if (leafKey.includes(strippedPath+ '/')) {
          //delete dirs
          filteredMap.delete(leafKey);
        }
        if (leafKey === strippedPath) {
            //delete files
          filteredMap.delete(leafKey);
        }
      }
    }
  }

  return filteredMap;
}

/**
 * Function to filter sidebar based on allowed leaf nodes
 */
export function filterSidebarByLeafMap(
  sidebar: Record<string, any>,
  allowedLeafMap: Map<string, SidebarLeaf>
): { filtered: Record<string, any>, deleted: SidebarLeaf[] } {
  const deletedItems: SidebarLeaf[] = [];
  
  function filterItem(item: SidebarItem): SidebarItem | null {
    // If it's a leaf node (has link but no items)
    if ('link' in item && !('items' in item)) {
      // If this leaf is not in the allowed map, add to deleted items
      if (!allowedLeafMap.has(item.link)) {
        deletedItems.push(item as SidebarLeaf);
        return null;
      }

      //Prefix the link with /docs/
      item.link = `/docs/${item.link}`;
      return item;
    }
    
    // If it's a branch node (has items)
    if ('items' in item && Array.isArray(item.items)) {
      const branch = item as SidebarBranch;
      const filteredItems = branch.items
        .map((subItem: SidebarItem) => filterItem(subItem))
        .filter((subItem): subItem is SidebarItem => subItem !== null);
      
      // If all items were filtered out, remove this branch too
      if (filteredItems.length === 0) {
        return null;
      }
      
      return {
        ...branch,
        items: filteredItems
      };
    }
    
    return item;
  }

  // Create a deep copy of the sidebar
  const filteredSidebar = JSON.parse(JSON.stringify(sidebar));
  
  // Filter each section of the sidebar
  for (const [path, section] of Object.entries(filteredSidebar)) {
    if (Array.isArray(section)) {
      // If the section is an array, filter its items
      filteredSidebar[path] = section
        .map(item => filterItem(item))
        .filter((item): item is SidebarItem => item !== null);
    } else if (section && typeof section === 'object' && 'items' in section) {
      // If the section has items, filter them
      const sectionWithItems = section as { items: SidebarItem[] };
      const filteredItems = sectionWithItems.items
        .map((item: SidebarItem) => filterItem(item))
        .filter((item): item is SidebarItem => item !== null);

      if (filteredItems.length === 0) {
        // If all items were filtered out, remove the section
        delete filteredSidebar[path];
      } else {
        // Update the section with filtered items
        filteredSidebar[path] = {
          ...section,
          items: filteredItems
        };
      }
    }
  }
  
  return { filtered: filteredSidebar, deleted: deletedItems };
}

/**
 * Recursively removes all items fields from the sidebar object that are empty arrays
 */
export function removeEmptyItems(sidebar: any): any {
  if (Array.isArray(sidebar)) {
    return sidebar
      .map(item => removeEmptyItems(item))
      .filter(item => item !== null && item !== undefined);
  }

  if (sidebar && typeof sidebar === 'object') {
    // Create a copy of the object
    const cleaned = { ...sidebar };
    
    // If this object has items, process them
    if (cleaned.items && Array.isArray(cleaned.items)) {
      if (cleaned.items.length === 0) {
        // Remove empty items array
        delete cleaned.items;
      } else {
        // Recursively process items
        cleaned.items = removeEmptyItems(cleaned.items);
        
        // If after processing, items becomes empty, remove it
        if (cleaned.items.length === 0) {
          delete cleaned.items;
        }
      }
    }
    
    // Process other properties recursively
    for (const [key, value] of Object.entries(cleaned)) {
      if (key !== 'items' && typeof value === 'object' && value !== null) {
        cleaned[key] = removeEmptyItems(value);
      }
    }
    
    return cleaned;
  }

  return sidebar;
}

/**
 * Promotes single child leafs by replacing parent branches that contain only one leaf
 * with the leaf itself, using the leaf's title and link
 */
export function promoteSingleChildLeafs(sidebar: any): { 
  transformed: any, 
  promotedLeafs: Array<{from: string, to: string, originalParent: string, newTitle: string}> 
} {
  const promotedLeafs: Array<{from: string, to: string, originalParent: string, newTitle: string}> = [];
  
  function processItem(item: any): any {
    // If it's an array, process each item
    if (Array.isArray(item)) {
      return item.map(subItem => processItem(subItem)).filter(subItem => subItem !== null);
    }
    
    // If it's not an object, return as-is
    if (!item || typeof item !== 'object') {
      return item;
    }
    
    // Create a copy of the item
    const processedItem = { ...item };
    
    // If this item has items (it's a branch)
    if (processedItem.items && Array.isArray(processedItem.items)) {
      // First, recursively process all child items
      processedItem.items = processedItem.items
        .map(subItem => processItem(subItem))
        .filter(subItem => subItem !== null);
      
      // After processing children, check if this branch has exactly one leaf child
      if (processedItem.items.length === 1) {
        const singleChild = processedItem.items[0];
        
        // Check if the single child is a leaf (has link but no items)
        if (singleChild && 'link' in singleChild && !('items' in singleChild)) {
          // Log the promotion
          promotedLeafs.push({
            from: `${processedItem.text} > ${singleChild.text}`,
            to: singleChild.text,
            originalParent: processedItem.text,
            newTitle: singleChild.text
          });
          
          // Return the child leaf with its own title and link
          return {
            text: singleChild.text,
            link: singleChild.link,
            ...(singleChild.collapsed !== undefined && { collapsed: singleChild.collapsed })
          };
        }
      }
    }
    
    // Process other properties recursively
    for (const [key, value] of Object.entries(processedItem)) {
      if (key !== 'items' && typeof value === 'object' && value !== null) {
        processedItem[key] = processItem(value);
      }
    }
    
    return processedItem;
  }
  
  const transformed = processItem(sidebar);
  return { transformed, promotedLeafs };
}
