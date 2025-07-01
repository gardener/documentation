import { generateSidebar } from 'vitepress-sidebar';
import { writeJsonDebug } from "./utils/debug-json.ts";
import {
  removeIndexEntries,
  sortByWeight,
  enhanceDirectoryTitles
} from './utils/sidebar.ts';

const communitySidebarConfig = {
  documentRootPath: '/hugo/content',
  scanStartPath: 'community',
  resolvePath: '/community/',
  collapsed: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  includeFolderLinksInFolder: true,
}

function generateBaseCommunity(): any {
  return generateSidebar([communitySidebarConfig]);
}

/**
 * Wrapper function that generates and enhances the community sidebar
 * @returns The enhanced sidebar with updated directory titles
 */
export function generateEnhancedCommunitySidebar(): any {
  // Generate the base sidebar
  const sidebar = generateBaseCommunity();
  
  // Recursively enhance directory titles from frontmatter
  const enhancedSidebar = enhanceDirectoryTitles(sidebar);

  // Sort entries by weight from frontmatter
  const sortedSidebar = sortByWeight(enhancedSidebar);

  writeJsonDebug(
    'enhancedCommunitySidebar.json',
      sortedSidebar
  );

  return sortedSidebar;
}

/**
 * Generate the community sidebar without persona filtering
 * @returns The complete community sidebar structure
 */
export function communitySidebar(): any {
  // Use the enhanced sidebar
  const generatedSidebar = generateEnhancedCommunitySidebar();


  // Write the final sidebar to file for debugging
  writeJsonDebug(
    'communitySidebar.json',
      generatedSidebar
  );

  return generatedSidebar;
}

export function staticCommunitySidebar(): any {
  return {
    "/community/": {
      "base": "/community/",
      "items": [
        {
          "text": "Review Meetings",
          "link": "review-meetings/index.md",
          "items": [
            {
              "text": "Gardener Review Meetings 2025",
              "link": "review-meetings/2025-reviews"
            },
            {
              "text": "Gardener Review Meetings 2024",
              "link": "review-meetings/2024-reviews"
            },
            {
              "text": "Gardener Review Meetings 2023",
              "link": "review-meetings/2023-reviews"
            },
            {
              "text": "Gardener Review Meetings 2022",
              "link": "review-meetings/2022-reviews"
            },
            {
              "text": "Gardener Community Meetings 2022",
              "link": "review-meetings/2022-community"
            }
          ],
          "collapsed": true
        },
        {
          "text": "Product Steering",
          "link": "product-steering/index.md"
        },
        {
          "text": "Technical Steering",
          "link": "technical-steering/index.md"
        }
      ],
      "text": "Community"
    }
  }
}