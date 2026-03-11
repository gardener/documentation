/*
MIT License

Copyright (c) 2019-present, Yuxi (Evan) You

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copied and adapted from -> https://github.com/vitejs/vite/blob/9b98dcbf75546240e1609185828e18a77bac8c8d/docs/_data/blog.data.ts
*/

import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  authors: Author[]
  tags: string[]
  preview: string | undefined
}
interface Author {
  name: string
  avatar?: string
  login?: string
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  render: true,
  transform(raw): Post[] {

    return raw
      .filter(page => {
        // Filter out index files and images
        const isIndex = page.url.includes('_index') || page.url === '/blog/' || page.url.includes('/images/')

        // Check if it's not a folder
        const isNotFolder = !page.url.endsWith('/')

        // Check if page has a date in frontmatter or in filename
        let hasDate = !!(page.frontmatter.publishdate || page.frontmatter.date)

        // If no date in frontmatter, try to extract from filename
        if (!hasDate && page.url) {
          // URLs like /blog/2019/06.11-Feature-Flags...
          const datePattern = /\/(\d{4})\/(\d{2})\.(\d{2})-/
          hasDate = datePattern.test(page.url)
        }

        return !isIndex && isNotFolder
      })
      .map(page => {
        const { url, frontmatter, excerpt, html } = page
        const source = getSourceMarkdown(page)

        // Try to get date from frontmatter
        let dateValue = frontmatter.publishdate || frontmatter.date

        // If no date in frontmatter, try to extract from URL/filename
        if (!dateValue && url) {
          const match = url.match(/\/(\d{4})\/(\d{2})\.(\d{2})-/)
          if (match) {
            const [, year, month, day] = match
            dateValue = `${year}-${month}-${day}`
          }
        }

        return {
          title: frontmatter.title || frontmatter.linkTitle || 'Untitled',
          url,
          authors: normalizeAuthors(frontmatter.authors),
          tags: normalizeTags(frontmatter.tags),
          preview: extractPreview(source, html, excerpt),
          date: formatDate(dateValue, frontmatter.title)
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string | Date | undefined, title: string | undefined): Post['date'] {
  if (!raw) {
    // Fallback for posts without dates
    if (title !== 'Overview') {
      console.warn(`Post: ${title} missing date, using current date as fallback`)
    }
    const now = new Date()
    return {
      time: +now,
      string: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  const date = raw instanceof Date ? raw : new Date(raw)

  // If the date is invalid, try parsing with a different format
  if (isNaN(date.getTime())) {
    // Try to parse from format like "2019-05-24" or other common formats
    console.warn(`Invalid date format: ${raw}, attempting to parse differently`)

    // Try different parsing strategies
    if (typeof raw === 'string') {
      // Try to extract a date from formats like "2019/06.11-Feature..."
      const match = raw.match(/(\d{4})[-/.](\d{2})[-/.](\d{2})/)
      if (match) {
        const [, year, month, day] = match
        const parsedDate = new Date(`${year}-${month}-${day}`)
        if (!isNaN(parsedDate.getTime())) {
          return {
            time: +parsedDate,
            string: parsedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        }
      }
    }

    // If all else fails, use current date
    const fallback = new Date()
    return {
      time: +fallback,
      string: fallback.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  // Normal case - valid date
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

function normalizeTags(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return uniqueNonEmpty(raw)
  }

  if (typeof raw === 'string') {
    return uniqueNonEmpty(raw.split(','))
  }

  return []
}

function normalizeAuthors(raw: unknown): Author[] {
  if (!Array.isArray(raw)) {
    return []
  }

  const unique: Author[] = []
  const seen = new Set<string>()

  for (const value of raw) {
    const author = normalizeAuthor(value)
    if (!author) {
      continue
    }

    const key = `${author.name.toLowerCase()}::${(author.login ?? '').toLowerCase()}`
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    unique.push(author)
  }

  return unique
}

function normalizeAuthor(value: unknown): Author | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return undefined
    }

    const login = getGitHubLogin(trimmed)
    return {
      name: trimmed.startsWith('@') ? trimmed.slice(1) : trimmed,
      login,
      avatar: toGitHubAvatar(login)
    }
  }

  if (!value || typeof value !== 'object') {
    return undefined
  }

  const rawAuthor = value as {
    name?: unknown
    avatar?: unknown
    login?: unknown
    github?: unknown
    url?: unknown
  }

  const explicitName = asNonEmptyString(rawAuthor.name)
  const login = getGitHubLogin(rawAuthor.login)
    ?? getGitHubLogin(rawAuthor.github)
    ?? getGitHubLogin(rawAuthor.url)
  const name = explicitName || login

  if (!name) {
    return undefined
  }

  const avatar = asNonEmptyString(rawAuthor.avatar) || toGitHubAvatar(login)

  return {
    name,
    login: login || undefined,
    avatar: avatar || undefined
  }
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim()
  return normalized || undefined
}

function getGitHubLogin(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  const withoutPrefix = trimmed.startsWith('@') ? trimmed.slice(1) : trimmed

  if (isGitHubLogin(withoutPrefix)) {
    return withoutPrefix
  }

  const match = withoutPrefix.match(/github\.com\/([A-Za-z0-9-]+)/i)
  if (match && isGitHubLogin(match[1])) {
    return match[1]
  }

  return undefined
}

function isGitHubLogin(value: string): boolean {
  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(value)
}

function toGitHubAvatar(login: string | undefined): string | undefined {
  if (!login) {
    return undefined
  }

  return `https://avatars.githubusercontent.com/${login}`
}
function uniqueNonEmpty(values: unknown[]): string[] {
  const unique: string[] = []

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const normalized = value.trim()
    if (!normalized || unique.indexOf(normalized) !== -1) {
      continue
    }

    unique.push(normalized)
  }

  return unique
}

function getSourceMarkdown(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const src = (value as { src?: unknown }).src
  return typeof src === 'string' ? src : undefined
}

function extractPreview(
  source: string | undefined,
  html: string | undefined,
  fallbackExcerpt: string | undefined
): string | undefined {
  const fromSource = extractPreviewFromMarkdown(source)
  if (fromSource) {
    return fromSource
  }

  const fromHtml = extractPreviewFromHtml(html)
  if (fromHtml) {
    return fromHtml
  }

  return normalizePreviewText(fallbackExcerpt)
}

function extractPreviewFromMarkdown(markdown: string | undefined): string | undefined {
  if (!markdown) {
    return undefined
  }

  const withoutFrontmatter = markdown.replace(/^\uFEFF?---\s*[\r\n][\s\S]*?[\r\n]---\s*[\r\n]?/, '')
  const lines = withoutFrontmatter.split(/\r?\n/)
  const paragraphLines: string[] = []

  let inFence = false
  let fenceToken = ''

  for (const rawLine of lines) {
    const line = rawLine.trim()

    const fenceMatch = line.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      const token = fenceMatch[1]
      if (!inFence) {
        inFence = true
        fenceToken = token[0]
      } else if (line.startsWith(fenceToken.repeat(3))) {
        inFence = false
        fenceToken = ''
      }
      continue
    }

    if (inFence) {
      continue
    }

    if (!line) {
      if (paragraphLines.length) {
        break
      }
      continue
    }

    if (!paragraphLines.length) {
      if (line.startsWith('#') || line.startsWith(':::')) {
        continue
      }

      if (/^(-|\*|\+)\s/.test(line) || /^\d+\.\s/.test(line)) {
        continue
      }

      if (line.startsWith('|') || /^<\w+/.test(line)) {
        continue
      }
    }

    paragraphLines.push(line)
  }

  if (!paragraphLines.length) {
    return undefined
  }

  return normalizePreviewText(stripMarkdownFormatting(paragraphLines.join(' ')))
}

function extractPreviewFromHtml(html: string | undefined): string | undefined {
  if (!html) {
    return undefined
  }

  const trimmedHtml = html.trimStart()
  const afterTitleHeading = trimmedHtml.replace(/^<h1\b[^>]*>[\s\S]*?<\/h1>/i, '')

  // Prefer the first paragraph after the title.
  const firstParagraph = afterTitleHeading.match(/<p\b[^>]*>[\s\S]*?<\/p>/i)
  if (firstParagraph) {
    const text = normalizePreviewText(firstParagraph[0])
    if (text) {
      return text
    }
  }

  const divBlocks = afterTitleHeading.match(/<div\b[^>]*>[\s\S]*?<\/div>/gi) || []
  for (const div of divBlocks) {
    if (/<pre\b|<code\b|class="[^"]*language-/.test(div)) {
      continue
    }

    const text = normalizePreviewText(div)
    if (text) {
      return text
    }
  }

  const blocks = afterTitleHeading.match(/<(blockquote|ul|ol|pre|table)\b[^>]*>[\s\S]*?<\/\1>/gi) || []
  for (const block of blocks) {
    const text = normalizePreviewText(block)
    if (text) {
      return text
    }
  }

  return normalizePreviewText(afterTitleHeading)
}

function stripMarkdownFormatting(raw: string): string {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
}

function normalizePreviewText(raw: string | undefined, maxLength = 360): string | undefined {
  if (!raw) {
    return undefined
  }

  const text = raw
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) {
    return undefined
  }

  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}...`
    : text
}


