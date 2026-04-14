/**
 * After running optimize-assets.mjs --write, updates .md/.vue/.ts/.html files
 * that still reference old .png/.jpg/.jpeg filenames.
 *
 * Skips external URLs (http/https) — only local file references are updated.
 *
 * Usage:
 *   node scripts/update-asset-refs.mjs           ← dry run
 *   node scripts/update-asset-refs.mjs --write   ← actually updates files
 */

import { readdir, readFile, writeFile } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DRY_RUN = !process.argv.includes('--write')

const SEARCH_EXTENSIONS = ['.md', '.vue', '.ts', '.js', '.html']

// Files to skip entirely
const SKIP_FILES = new Set(['README.md'])

// Only replaces .png → .webp (JPG/JPEG photos are not converted)
const LOCAL_IMAGE_PATTERN = /(?<!https?:\/\/[^\s"')]*)\.(png)(?=[)"'\s])/gi

if (DRY_RUN) {
  console.log('DRY RUN — nothing will be changed. Pass --write to apply.\n')
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function main() {
  let totalFiles = 0
  let totalReplacements = 0

  for await (const file of walk(ROOT)) {
    if (!SEARCH_EXTENSIONS.includes(extname(file).toLowerCase())) continue
    if (SKIP_FILES.has(basename(file))) continue

    const content = await readFile(file, 'utf-8')

    // Count replacements
    const matches = [...content.matchAll(LOCAL_IMAGE_PATTERN)]
    if (matches.length === 0) continue

    const updated = content.replace(LOCAL_IMAGE_PATTERN, '.webp')
    const relPath = file.replace(ROOT + '/', '')

    totalFiles++
    totalReplacements += matches.length

    if (DRY_RUN) {
      console.log(`  ${relPath}  (${matches.length} replacement${matches.length > 1 ? 's' : ''})`)
      const lines = content.split('\n')
      lines.forEach((line, i) => {
        if (LOCAL_IMAGE_PATTERN.test(line)) {
          LOCAL_IMAGE_PATTERN.lastIndex = 0
          console.log(`    line ${i + 1}: ${line.trim().slice(0, 90)}`)
        }
        LOCAL_IMAGE_PATTERN.lastIndex = 0
      })
      console.log()
    } else {
      await writeFile(file, updated, 'utf-8')
      console.log(`${relPath}  (${matches.length} replacement${matches.length > 1 ? 's' : ''})`)
    }
  }

  console.log('─'.repeat(60))
  if (totalFiles === 0) {
    console.log('No files need updating.')
  } else if (DRY_RUN) {
    console.log(`Would update ${totalFiles} file(s) with ${totalReplacements} total replacements.`)
    console.log('\nRun with --write to apply.')
  } else {
    console.log(`Updated ${totalFiles} file(s), ${totalReplacements} references replaced.`)
  }
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
