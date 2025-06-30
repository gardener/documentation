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
  useTitleFromFrontmatter: true
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