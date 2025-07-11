import { generateSidebar } from 'vitepress-sidebar';
import _ from 'lodash-es';
import {removeIndexEntries} from "./utils/sidebar.ts";

export const blogSidebarConfig = {
    documentRootPath: '/hugo/content',
    scanStartPath: 'blog',
    resolvePath: '/blog/',
    collapsed: true,
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
}

const sortSidebar = (sidebar: any): any => {
  if (sidebar['/blog/']) {
    // Sort year folders numerically in descending order (newest first)
    sidebar['/blog/'].items = _.orderBy(sidebar['/blog/'].items, [(item: any) => parseInt(item.text)], ['desc']);
    
    // Sort each year's blog posts by date prefix
    sidebar['/blog/'].items.forEach((yearItem: any) => {
      if (yearItem.items) {
        // Check if it's a normal year folder with blog posts
        if (yearItem.items[0] && yearItem.items[0].link) {
          // Extract the last part after the last / from the link
          yearItem.items = _.orderBy(yearItem.items, [(item: any) => {
            const linkParts = item.link.split('/');
            return linkParts[linkParts.length - 1];
          }], ['desc']);
        } else {
          // Handle nested month folders (like in 2025)
          yearItem.items = _.orderBy(yearItem.items, [(item: any) => parseInt(item.text)], ['desc']);
          if (yearItem.items) { // Additional check to satisfy TypeScript
            yearItem.items.forEach((monthItem: any) => {
              if (monthItem.items) {
                // Extract the last part after the last / from the link
                monthItem.items = _.orderBy(monthItem.items, [(item: any) => {
                  const linkParts = item.link.split('/');
                  return linkParts[linkParts.length - 1];
                }], ['desc']);
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

  return filteredSidebar;
}


export default blogSidebar;
