import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateWeightSortedSidebar } from './utils/sidebar.ts';

function groupExistingProjects(sidebar: any): any {
  const section = sidebar['/contribute/'];
  const items: any[] = section.items;

  const groupLinks = [
    '/contribute/extensions/',
    '/contribute/other-components/',
    '/contribute/dashboard/',
  ];

  const groupItems: any[] = [];
  const remainingItems: any[] = [];
  let insertIndex = -1;

  for (const item of items) {
    if (groupLinks.includes(item.link)) {
      if (insertIndex === -1) insertIndex = remainingItems.length;
      groupItems.push(item);
    } else {
      remainingItems.push(item);
    }
  }

  if (groupItems.length > 0) {
    remainingItems.splice(insertIndex, 0, {
      text: 'Contribute to Existing Projects',
      items: groupItems,
      // collapsed intentionally absent — VitePress renders no toggle button
    });
  }

  return { '/contribute/': { ...section, items: remainingItems } };
}

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

  return groupExistingProjects(sidebar);
}
