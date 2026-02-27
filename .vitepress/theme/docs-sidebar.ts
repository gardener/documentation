import { generateSidebar } from 'vitepress-sidebar';
import {
  removeIndexEntries,
  sortByWeight,
  enhanceDirectoryTitles,
  removeEmptyItems,
  addTrailingSlashToLinks
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

  // Filter out all _index.md entries (called last)
  const filteredSidebar = removeIndexEntries(sortedSidebar);

  const cleandSidebar = removeEmptyItems(filteredSidebar)

  addTrailingSlashToLinks(cleandSidebar['/docs/'].items);

  return cleandSidebar;
}
