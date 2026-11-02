import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateWeightSortedSidebar, CONTENT_DIR } from './utils/sidebar.ts';

export function contributeSidebar(): any {
  const contributeDir = join(process.cwd(), CONTENT_DIR, 'contribute');

  if (!existsSync(contributeDir)) {
    return { '/contribute/': { items: [] } };
  }

  return generateWeightSortedSidebar({
    documentRootPath: `/${CONTENT_DIR}`,
    scanStartPath: 'contribute',
    resolvePath: '/contribute/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
  });
}
