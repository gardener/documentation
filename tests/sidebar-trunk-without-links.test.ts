import { describe, it, expect, beforeAll } from 'vitest'
import sidebarData from '../.vitepress/data/sidebar.data.ts'

interface SidebarLeaf {
  text: string
  link: string
  collapsed?: boolean
}

interface SidebarBranch {
  text: string
  items: (SidebarLeaf | SidebarBranch)[]
  collapsed?: boolean
}

type SidebarItem = SidebarLeaf | SidebarBranch

describe('Sidebar Trunk Without Links Validation', () => {
  let sidebarDataResult: any

  beforeAll(async () => {
    sidebarDataResult = sidebarData.load()
  })

  const sections = ['usersSidebar', 'developersSidebar', 'operatorsSidebar', 'all']

  sections.forEach(sectionName => {
    it(`${sectionName}: should identify trunks without links (navigation folders)`, () => {
      const section = sidebarDataResult[sectionName]
      expect(section).toBeDefined()

      const trunksWithoutLinks: string[] = []

      function analyzeTrunksWithoutLinks(item: SidebarItem, path: string = '') {
        const currentPath = path ? `${path} > ${item.text}` : item.text

        // If it's a branch node (has items), check if it lacks a link
        if ('items' in item && Array.isArray(item.items)) {
          if (!('link' in item) || typeof item.link !== 'string') {
            trunksWithoutLinks.push(`${currentPath}`)
          }

          // Recursively analyze child items
          item.items.forEach(subItem => analyzeTrunksWithoutLinks(subItem, currentPath))
        }
      }

      // Handle different section structures
      if (Array.isArray(section)) {
        section.forEach(item => analyzeTrunksWithoutLinks(item))
      } else if (section && typeof section === 'object') {
        if ('items' in section && Array.isArray(section.items)) {
          section.items.forEach((item: SidebarItem) => analyzeTrunksWithoutLinks(item))
        } else {
          Object.values(section).forEach((item: any) => {
            if (item && typeof item === 'object') {
              analyzeTrunksWithoutLinks(item)
            }
          })
        }
      }
      report(0, sectionName, trunksWithoutLinks)
    })
  })
})


function report(expectation: number, sectionName: string, trunksWithoutLinks: string[]) {
  if (trunksWithoutLinks.length > expectation) {
    console.log(`\n❌ ${sectionName} - Found ${trunksWithoutLinks.length} trunks without links:`)
    trunksWithoutLinks.forEach(trunk => {
      console.log(`  📁 ${trunk}`)
    })
    console.log(`\n💡 All trunk nodes (branch nodes with items) should have link properties.`)
  } else {
    console.log(`\n✅ ${sectionName} - No trunks without links found`)
  }
  expect(trunksWithoutLinks).toHaveLength(expectation)
}