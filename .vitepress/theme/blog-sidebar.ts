import { generateSidebar } from 'vitepress-sidebar';
import { addTrailingSlashToLinks, removeIndexEntries } from './utils/sidebar.ts';

export const blogSidebarConfig = {
    documentRootPath: '/hugo/content',
    scanStartPath: 'blog',
    resolvePath: '/blog/',
    collapsed: false,
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
    useFolderTitleFromIndexFile: true,
}

const sortByLastSegmentDesc = (items: any[]): any[] =>
  [...items].sort((a: any, b: any) => {
    const la = a.link.split('/').at(-1)
    const lb = b.link.split('/').at(-1)
    return lb > la ? 1 : lb < la ? -1 : 0
  })

const sortSidebar = (sidebar: any): any => {
  if (sidebar['/blog/']) {
    // Sort year folders numerically in descending order (newest first)
    sidebar['/blog/'].items = [...sidebar['/blog/'].items]
      .sort((a: any, b: any) => parseInt(b.text) - parseInt(a.text))

    // Sort each year's blog posts by date prefix
    sidebar['/blog/'].items.forEach((yearItem: any) => {
      if (yearItem.items) {
        // Check if it's a normal year folder with blog posts
        if (yearItem.items[0] && yearItem.items[0].link) {
          yearItem.items = sortByLastSegmentDesc(yearItem.items)
        } else {
          // Handle nested month folders (like in 2025)
          yearItem.items = [...yearItem.items]
            .sort((a: any, b: any) => parseInt(b.text) - parseInt(a.text))
          if (yearItem.items) { // Additional check to satisfy TypeScript
            yearItem.items.forEach((monthItem: any) => {
              if (monthItem.items) {
                monthItem.items = sortByLastSegmentDesc(monthItem.items)
              }
            });
          }
        }
      }
    });
  }
  return sidebar;
};


function blogSidebar () {
  const sortedSidebar = sortSidebar(generateSidebar([blogSidebarConfig]));

  // Filter out all _index.md entries (called last)
  const filteredSidebar = removeIndexEntries(sortedSidebar);

  addTrailingSlashToLinks(filteredSidebar['/blog/'].items);

  return filteredSidebar;
}


export default blogSidebar;
