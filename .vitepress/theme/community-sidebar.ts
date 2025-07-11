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
  removeEmptyItems
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

    writeJsonDebug(
        'filteredCommunitySidebar.json',
        filteredSidebar
    );

    const cleandSidebar = removeEmptyItems(filteredSidebar)

    writeJsonDebug(
        'cleandCommunitySidebar.json',
        cleandSidebar
    );

    return cleandSidebar;
}