import { generateWeightSortedSidebar, CONTENT_DIR } from './utils/sidebar.ts';

export function communitySidebar(): any {
  return generateWeightSortedSidebar({
    documentRootPath: `/${CONTENT_DIR}`,
    scanStartPath: 'community',
    resolvePath: '/community/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    excludeFilesByFrontmatterFieldName: 'exclude',
  });
}
