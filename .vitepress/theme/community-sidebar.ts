import { generateWeightSortedSidebar } from './utils/sidebar.ts';

export function communitySidebar(): any {
  return generateWeightSortedSidebar({
    documentRootPath: '/hugo/content',
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
