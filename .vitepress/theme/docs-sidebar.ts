import { generateWeightSortedSidebar } from './utils/sidebar.ts';

export function generateEnhancedDocsSidebar(): any {
  return generateWeightSortedSidebar({
    documentRootPath: '/hugo/content',
    scanStartPath: 'docs',
    resolvePath: '/docs/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
  });
}
