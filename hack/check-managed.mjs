import fs from 'node:fs/promises'
import process from 'node:process'
import matter from 'gray-matter'

const files = process.argv.slice(2)
const violations = []

for (const file of files) {
  try {
    const raw = await fs.readFile(file, 'utf8')
    const parsed = matter(raw)
    if (parsed.data.managed === true) {
      const upstream = parsed.data.github_repo && parsed.data.github_subdir
        ? `${parsed.data.github_repo}/blob/master/${parsed.data.github_subdir}`
        : '(unknown source)'
      violations.push({ file, upstream })
    }
  } catch (err) {
    console.error(`Error parsing ${file}: ${err.message}`)
    process.exit(2)
  }
}

if (violations.length > 0) {
  console.error('\nThe following files are aggregated from upstream sources:\n')
  for (const { file, upstream } of violations) {
    console.error(`  ${file}`)
    console.error(`    -> edit upstream: ${upstream}\n`)
  }
  console.error('Local edits will be overwritten by the next nightly aggregation run.')
  console.error('Open a PR against the upstream source repository instead.\n')
  process.exit(1)
}

console.log('All changed content files are locally maintained.')
