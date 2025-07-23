import { generateSidebar } from 'vitepress-sidebar';
import { writeJsonDebug } from "./utils/debug-json.ts";
import {
  type SidebarItem,
  removeIndexEntries,
  sortByWeight,
  enhanceDirectoryTitles,
  createLeafMap,
  extractItems,
  filterLeafMapByPersona,
  filterSidebarByLeafMap,
  removeEmptyItems,
  promoteSingleChildLeafs
} from './utils/sidebar.ts';

const docsSidbarConfig =  {
  documentRootPath: '/hugo/content',
  scanStartPath: 'docs',
  resolvePath: '/docs/',
  collapsed: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  includeFolderLinksInFolder: true,
}

function generateDocsSidebar(): any {
    return generateSidebar([docsSidbarConfig]);
}

/**
 * Wrapper function that generates and enhances the docs sidebar
 * @returns The enhanced sidebar with updated directory titles
 */
export function generateEnhancedDocsSidebar(): any {
  // Generate the base sidebar
  const sidebar = generateDocsSidebar();
  
  // Recursively enhance directory titles from frontmatter
  const enhancedSidebar = enhanceDirectoryTitles(sidebar, 'docs');

  // Sort entries by weight from frontmatter
  const sortedSidebar = sortByWeight(enhancedSidebar, 'docs');

  // NEW: Promote single child leafs to eliminate unnecessary nesting
  const { transformed: promotedSidebar, promotedLeafs } = promoteSingleChildLeafs(sortedSidebar);
  
  // Log the promoted leafs for debugging
  writeJsonDebug('promotedLeafs.json', promotedLeafs);
  writeJsonDebug('promotedSidebar.json', promotedSidebar);

  // Filter out all _index.md entries (called last)
  const filteredSidebar = removeIndexEntries(promotedSidebar);

  writeJsonDebug(
    'filteredSidebar.json',
    filteredSidebar
  );

  const cleandSidebar = removeEmptyItems(filteredSidebar)

  writeJsonDebug(
    'cleandSidebar.json',
    cleandSidebar
  );

  return cleandSidebar;
}

export function personaSidebar(persona: 'Users' | 'Developers' | 'Operators') {
  // Use the enhanced sidebar instead of the basic one
  const generatedSidebar = generateEnhancedDocsSidebar();
  
  // Get all items from all sections of the sidebar
  const allItems: SidebarItem[] = Object.values(generatedSidebar)
    .flatMap(section => extractItems(section));
  
  // Create the leaf map
  const leafMap = createLeafMap(allItems);
  
  // Write both the generated sidebar and the leaf map to files
  writeJsonDebug(
    'generatedSidebar.json',
    generatedSidebar
  );

  writeJsonDebug(
    `${persona}leafMap.json`,
    Object.fromEntries(leafMap)
  );


  // Apply filtering for persona and write to file
  const personaLeafMap = filterLeafMapByPersona(leafMap, persona);
    writeJsonDebug(
    `/${persona}LeafMap.json`,
    Object.fromEntries(personaLeafMap)
  );

  // Create sidebar by filtering the generated sidebar
  const { filtered: sidebar, deleted: deletedItems } = filterSidebarByLeafMap(
    generatedSidebar,
    personaLeafMap
  );

  // Write the filtered sidebar and debug info to files
    writeJsonDebug(
    `/${persona}Sidebar.json`,
    sidebar
  );

    writeJsonDebug(
    'deletedItems.json',
    deletedItems
  );


  return sidebar
}
