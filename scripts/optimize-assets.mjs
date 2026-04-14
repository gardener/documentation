/**
 * Converts PNG/JPG/JPEG images to WebP in the website/ directory.
 * GIFs are skipped (animated GIFs cannot be converted to WebP simply).
 * Favicons and web manifest icons are also skipped.
 *
 * Usage:
 *   node scripts/optimize-assets.mjs              ← dry run, shows what would happen
 *   node scripts/optimize-assets.mjs --write       ← actually converts files
 *   node scripts/optimize-assets.mjs --dir website ← target a specific subdirectory
 */

import sharp from 'sharp'
import { readdir, stat, unlink } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Parse args
const DRY_RUN = !process.argv.includes('--write')
const dirArg = process.argv.find((a, i) => process.argv[i - 1] === '--dir')
const TARGET_DIR = join(ROOT, dirArg ?? 'website')

// Only convert PNG files — JPG/JPEG are photos that lose quality when re-compressed
const CONVERTIBLE = ['.png']
const SKIP_BELOW_KB = 5

// These files must stay as PNG — browsers require specific formats for them
const SKIP_FILENAMES = new Set([
  'favicon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-96x96.png',
  'apple-touch-icon.png',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png',
])

// helpers

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

//main

async function main() {
  if (DRY_RUN) {
    console.log('DRY RUN — nothing will be changed. Pass --write to convert.\n')
  }

  console.log(`Scanning: ${TARGET_DIR}\n`)

  const candidates = []
  for await (const file of walk(TARGET_DIR)) {
    if (CONVERTIBLE.includes(extname(file).toLowerCase())) {
      candidates.push(file)
    }
  }

  if (candidates.length === 0) {
    console.log('No convertible images found.')
    return
  }

  let totalBefore = 0
  let totalAfter = 0
  let converted = 0
  let skipped = 0
  let skippedFavicon = 0

  for (const src of candidates) {
    const name = basename(src)
    const kb = parseFloat(await fileSizeKB(src))

    // Skip favicons and manifest icons
    if (SKIP_FILENAMES.has(name)) {
      skippedFavicon++
      if (DRY_RUN) console.log(`Skipping ${name} (favicon/manifest — must stay PNG)`)
      continue
    }

    if (kb < SKIP_BELOW_KB) {
      skipped++
      continue
    }

    const dest = src.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    const relSrc = src.replace(ROOT + '/', '')

    totalBefore += kb

    if (DRY_RUN) {
      console.log(`  ${relSrc}  (${kb}KB)  →  ${basename(dest)}`)
      continue
    }

    await sharp(src).webp({ quality: 85 }).toFile(dest)

    const kbAfter = parseFloat(await fileSizeKB(dest))
    totalAfter += kbAfter
    const saved = (((kb - kbAfter) / kb) * 100).toFixed(0)

    await unlink(src)

    console.log(`${relSrc}  ${kb}KB → ${kbAfter}KB  (-${saved}%)`)
    converted++
  }

  console.log('\n' + '─'.repeat(60))

  if (DRY_RUN) {
    const toConvert = candidates.length - skipped - skippedFavicon
    console.log(`Would convert ${toConvert} file(s).`)
    console.log(`Skipped ${skipped} tiny files, ${skippedFavicon} favicon/manifest file(s) (must stay PNG).`)
    console.log(`\nRun with --write to apply changes.`)
  } else {
    const savedMB = ((totalBefore - totalAfter) / 1024).toFixed(1)
    console.log(`Converted ${converted} file(s). Skipped ${skipped} tiny + ${skippedFavicon} favicon files.`)
    console.log(`Space saved: ~${savedMB}MB  (${totalBefore.toFixed(0)}KB → ${totalAfter.toFixed(0)}KB)`)
    console.log(`\nRun update-asset-refs.mjs --write to update .md/.vue references.`)
  }
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
