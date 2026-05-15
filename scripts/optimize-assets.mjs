/**
 * Converts large PNG images to WebP and updates all references.
 * Fully configurable via CLI arguments — no project-specific defaults.
 *
 * Usage:
 *   node scripts/optimize-assets.mjs --dir website --min-kb 200   ← dry run
 *   node scripts/optimize-assets.mjs --dir website --min-kb 200 --write
 *
 * Arguments:
 *   --dir       Target directory to scan for images (required)
 *   --min-kb    Only convert files above this size in KB (default: 0 = all)
 *   --skip      Comma-separated list of filenames to skip
 *   --write     Apply changes (default is dry run)
 */

import sharp from 'sharp'
import { readdir, stat, unlink, readFile, writeFile } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// parse args 
const args = process.argv.slice(2)
const DRY_RUN = !args.includes('--write')

function getArg(flag) {
  const i = args.indexOf(flag)
  return i !== -1 ? args[i + 1] : null
}

const dirArg = getArg('--dir')
if (!dirArg) {
  console.error('Error: --dir argument is required')
  console.error('Usage: node scripts/optimize-assets.mjs --dir website --min-kb 200')
  process.exit(1)
}

const TARGET_DIR = join(ROOT, dirArg)
const MIN_SIZE_KB = parseFloat(getArg('--min-kb') ?? '0')
const skipArg = getArg('--skip')
const SKIP_FILENAMES = new Set(skipArg ? skipArg.split(',') : [])

//config

// Directories to search for references to update
const REF_DIRS = [
  TARGET_DIR,
  join(ROOT, '.vitepress', 'theme'),
]

const CONVERTIBLE = new Set(['.png'])
const REF_EXTENSIONS = new Set(['.md', '.vue', '.html', '.js', '.ts'])

//helpers 

async function fileSizeKB(p) {
  return ((await stat(p)).size / 1024).toFixed(1)
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

/**
 * Find and optionally replace partialOld → partialNew in all ref files.
 * Uses partial path (e.g. "images/foo.png") for more precise matching.
 * Returns list of affected files.
 */
async function updateRefs(partialOld, partialNew) {
  const affected = []
  for (const refDir of REF_DIRS) {
    for await (const file of walk(refDir)) {
      if (!REF_EXTENSIONS.has(extname(file))) continue
      const content = await readFile(file, 'utf8')
      if (!content.includes(partialOld)) continue
      if (!DRY_RUN) {
        await writeFile(file, content.replaceAll(partialOld, partialNew), 'utf8')
      }
      affected.push(file.replace(ROOT + '/', ''))
    }
  }
  return affected
}

//main 

async function main() {
  if (DRY_RUN) {
    console.log('DRY RUN — nothing will be changed. Pass --write to convert.\n')
  }

  console.log(`Scanning:  ${TARGET_DIR}`)
  console.log(`Threshold: files over ${MIN_SIZE_KB}KB`)
  if (SKIP_FILENAMES.size > 0) {
    console.log(`Skipping:  ${[...SKIP_FILENAMES].join(', ')}`)
  }
  console.log()

  let converted = 0
  let skippedSize = 0
  let skippedName = 0
  let totalBefore = 0
  let totalAfter = 0

  for await (const src of walk(TARGET_DIR)) {
    if (!CONVERTIBLE.has(extname(src).toLowerCase())) continue

    const name = basename(src)

    if (SKIP_FILENAMES.has(name)) {
      skippedName++
      continue
    }

    const kb = parseFloat(await fileSizeKB(src))

    if (kb < MIN_SIZE_KB) {
      skippedSize++
      continue
    }

    const dest = src.replace(/\.png$/i, '.webp')
    const relSrc = src.replace(ROOT + '/', '')
    const partialOld = `images/${name}`
    const partialNew = `images/${basename(dest)}`
    totalBefore += kb

    if (DRY_RUN) {
      console.log(`  CONVERT  ${relSrc} (${kb}KB) → ${basename(dest)}`)
      const refs = await updateRefs(partialOld, partialNew)
      for (const r of refs) {
        console.log(`           ref in: ${r}`)
      }
      continue
    }

    // Convert PNG → WebP
    await sharp(src).webp({ quality: 85 }).toFile(dest)

    const kbAfter = parseFloat(await fileSizeKB(dest))
    totalAfter += kbAfter
    const saved = (((kb - kbAfter) / kb) * 100).toFixed(0)

    // Update references only for converted files
    const refs = await updateRefs(partialOld, partialNew)

    // Delete original
    await unlink(src)

    console.log(`${relSrc}`)
    console.log(`  ${kb}KB → ${kbAfter}KB (-${saved}%)`)
    for (const r of refs) {
      console.log(`  ref: ${r}`)
    }

    converted++
  }

  console.log('\n' + '─'.repeat(60))

  if (DRY_RUN) {
    console.log(`Skipped ${skippedSize} files under ${MIN_SIZE_KB}KB.`)
    console.log(`Skipped ${skippedName} files by name.`)
    console.log('\nRun with --write to apply changes.')
  } else {
    const savedMB = ((totalBefore - totalAfter) / 1024).toFixed(1)
    console.log(`Converted: ${converted} file(s)`)
    console.log(`Skipped:   ${skippedSize} under ${MIN_SIZE_KB}KB + ${skippedName} by name`)
    console.log(`Saved:     ~${savedMB}MB (${totalBefore.toFixed(0)}KB → ${totalAfter.toFixed(0)}KB)`)
  }
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})