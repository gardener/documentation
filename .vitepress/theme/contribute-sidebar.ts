import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateWeightSortedSidebar } from './utils/sidebar.ts';

export function contributeSidebar(): any {
  const contributeDir = join(process.cwd(), 'hugo', 'content', 'contribute');

  if (!existsSync(contributeDir)) {
    return { '/contribute/': { items: [] } };
  }

  return generateWeightSortedSidebar({
    documentRootPath: '/hugo/content',
    scanStartPath: 'contribute',
    resolvePath: '/contribute/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
  });
}
