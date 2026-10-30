import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateWeightSortedSidebar, groupSidebarItems } from './utils/sidebar.ts';

export function contributeSidebar(): any {
  const contributeDir = join(process.cwd(), 'hugo', 'content', 'contribute');

  if (!existsSync(contributeDir)) {
    return { '/contribute/': { items: [] } };
  }

  const sidebar = generateWeightSortedSidebar({
    documentRootPath: '/hugo/content',
    scanStartPath: 'contribute',
    resolvePath: '/contribute/',
    collapsed: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
  });

  return groupSidebarItems(
    sidebar,
    '/contribute/',
    ['extensions/index.md', 'other-components/index.md', 'dashboard/index.md'],
    'Contribute to Existing Projects',
  );
}
