import { generateWeightSortedSidebar, CONTENT_DIR } from './utils/sidebar.ts';

export function generateEnhancedDocsSidebar(): any {
  return generateWeightSortedSidebar({
    documentRootPath: `/${CONTENT_DIR}`,
    scanStartPath: 'docs',
    resolvePath: '/docs/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
  });
}
