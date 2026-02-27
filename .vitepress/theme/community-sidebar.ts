import { generateSidebar } from 'vitepress-sidebar';
import {
  removeIndexEntries,
  sortByWeight,
  enhanceDirectoryTitles,
  removeEmptyItems,
  addTrailingSlashToLinks,
} from './utils/sidebar.ts';

const communitySidbarConfig =  {
  documentRootPath: '/hugo/content',
  scanStartPath: 'community',
  resolvePath: '/community/',
  collapsed: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  includeFolderLinksInFolder: true,
  excludeFilesByFrontmatterFieldName: 'exclude',
}

export function communitySidebar(): any {
    // Generate the base sidebar
    const sidebar = generateSidebar([communitySidbarConfig]);

    // Recursively enhance directory titles from frontmatter
    const enhancedSidebar = enhanceDirectoryTitles(sidebar, 'community');

    // Sort entries by weight from frontmatter
    const sortedSidebar = sortByWeight(enhancedSidebar, 'community');

    // Filter out all _index.md entries (called last)
    const filteredSidebar = removeIndexEntries(sortedSidebar)

    const cleandSidebar = removeEmptyItems(filteredSidebar)

    addTrailingSlashToLinks(cleandSidebar['/community/'].items);

    return cleandSidebar;
}
