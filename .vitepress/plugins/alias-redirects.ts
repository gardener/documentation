import { type SiteConfig } from 'vitepress'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'path'

export type AliasEntry = {
  sourcePath: string
  targetPath: string
}

const createRedirectHtml = (targetPath: string) => {
  const escapedTarget = escapeHtml(targetPath)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${escapedTarget}">
    <link rel="canonical" href="${escapedTarget}">
    <script>window.location.replace(${JSON.stringify(targetPath).replace(/</g, '\u003c')})</script>
  </head>
  <body>
    <p>Redirecting to <a href="${escapedTarget}">${escapedTarget}</a>.</p>
  </body>
</html>
`
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeUrlPath(rawValue: string): string {
  const trimmed = rawValue.trim()
  if (!trimmed) return '/'

  const withoutFragments = trimmed.split('#', 1)[0]?.split('?', 1)[0] ?? ''
  const withLeadingSlash = withoutFragments.startsWith('/') ? withoutFragments : `/${withoutFragments}`
  const collapsedSlashes = withLeadingSlash.replace(/\/+/g, '/')

  if (collapsedSlashes === '/') return '/'

  if (collapsedSlashes.endsWith('.html')) {
    return collapsedSlashes
  }

  const withoutTrailingSlash = collapsedSlashes.replace(/\/+$/, '')
  return `${withoutTrailingSlash}/`
}

function hasDotSegment(urlPath: string): boolean {
  if (urlPath === '/..' || urlPath.includes('/../')) return true
  return urlPath.split('/').some((segment) => segment === '.' || segment === '..')
}

function isWithinOutDir(outDir: string, candidatePath: string): boolean {
  const resolvedOutDir = path.resolve(outDir)
  const resolvedCandidate = path.resolve(candidatePath)
  const relative = path.relative(resolvedOutDir, resolvedCandidate)

  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative)
}

function safeJoinOutDir(outDir: string, ...segments: string[]): string | null {
  const candidatePath = path.join(outDir, ...segments)
  return isWithinOutDir(outDir, candidatePath) ? candidatePath : null
}

function joinBasePath(base: string, routePath: string): string {
  const normalizedRoute = normalizeUrlPath(routePath)
  const normalizedBase = normalizeUrlPath(base || '/')

  if (normalizedBase === '/') return normalizedRoute
  if (normalizedRoute === '/') return normalizedBase

  return `${normalizedBase}${normalizedRoute.slice(1)}`
}

function toRoutePath(relativeMdPath: string): string {
  const normalizedPath = relativeMdPath.replace(/\\/g, '/')
  if (!normalizedPath.toLowerCase().endsWith('.md')) return '/'

  const withoutExtension = normalizedPath.slice(0, -3)
  const fileName = path.posix.basename(withoutExtension).toLowerCase()

  if (fileName === 'index' || fileName === '_index') {
    const directory = path.posix.dirname(withoutExtension)
    return directory === '.' ? '/' : `/${directory}/`
  }

  return `/${withoutExtension}/`
}

function normalizeAliases(rawAliases: unknown): string[] {
  if (Array.isArray(rawAliases)) {
    return rawAliases
      .filter((alias): alias is string => typeof alias === 'string')
      .map((alias) => alias.trim())
      .filter(Boolean)
  }

  if (typeof rawAliases === 'string') {
    const trimmed = rawAliases.trim()
    return trimmed ? [trimmed] : []
  }

  return []
}

function toRedirectOutputPath(outDir: string, aliasPath: string): string | null {
  const normalizedAliasPath = normalizeUrlPath(aliasPath)
  if (normalizedAliasPath === '/') return null

  if (hasDotSegment(normalizedAliasPath)) {
    console.warn(`[aliases] Skipping alias "${aliasPath}" because it contains dot segments.`)
    return null
  }

  if (normalizedAliasPath.toLowerCase().endsWith('.html')) {
    return safeJoinOutDir(outDir, normalizedAliasPath.slice(1))
  }

  const relativeAliasPath = normalizedAliasPath.slice(1, -1)
  return safeJoinOutDir(outDir, ...relativeAliasPath.split('/'), 'index.html')
}

async function collectMarkdownFiles(rootDir: string): Promise<string[]> {
  const results: string[] = []
  const entries = await fs.readdir(rootDir, { withFileTypes: true })
  entries.sort((a, b) => a.name.localeCompare(b.name))

  for (const entry of entries) {
    const absolutePath = path.join(rootDir, entry.name)

    if (entry.isDirectory()) {
      results.push(...await collectMarkdownFiles(absolutePath))
      continue
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      results.push(absolutePath)
    }
  }

  return results
}

async function collectAliasEntries(srcDir: string, basePath: string): Promise<Map<string, AliasEntry>> {
  const markdownFiles = await collectMarkdownFiles(srcDir)
  const redirects = new Map<string, AliasEntry>()
  const canonicalRoutes = new Set(
    markdownFiles.map((markdownFile) => {
      const sourcePath = path.relative(srcDir, markdownFile).replace(/\\/g, '/')
      return normalizeUrlPath(toRoutePath(sourcePath))
    }),
  )

  const CONCURRENCY = 32
  for (let i = 0; i < markdownFiles.length; i += CONCURRENCY) {
    const batch = markdownFiles.slice(i, i + CONCURRENCY)
    const results = await Promise.all(
      batch.map(async (markdownFile) => {
        const markdown = await fs.readFile(markdownFile, 'utf8')
        const frontmatter = matter(markdown).data as Record<string, unknown>
        const aliases = normalizeAliases(frontmatter.aliases)
        return { markdownFile, aliases }
      }),
    )

    for (const { markdownFile, aliases } of results) {
      if (aliases.length === 0) continue

      const sourcePath = path.relative(srcDir, markdownFile).replace(/\\/g, '/')
      const routePath = normalizeUrlPath(toRoutePath(sourcePath))
      const targetPath = normalizeUrlPath(joinBasePath(basePath, routePath))

      for (const alias of aliases) {
        const normalizedAlias = normalizeUrlPath(alias)

        if (canonicalRoutes.has(normalizedAlias)) {
          if (normalizedAlias !== routePath) {
            console.warn(`[aliases] Skipping alias "${normalizedAlias}" in "${sourcePath}" because it matches an existing page route.`)
          }
          continue
        }

        const existing = redirects.get(normalizedAlias)
        if (existing && existing.targetPath !== targetPath) {
          console.warn(`[aliases] Skipping duplicate alias "${normalizedAlias}" in "${sourcePath}". Already mapped to "${existing.targetPath}" by "${existing.sourcePath}".`)
          continue
        }

        redirects.set(normalizedAlias, {
          sourcePath,
          targetPath,
        })
      }
    }
  }

  return redirects
}

export async function generateAliasRedirects(siteConfig: SiteConfig): Promise<void> {
  const basePath = typeof siteConfig.site.base === 'string' ? siteConfig.site.base : '/'
  const redirects = await collectAliasEntries(siteConfig.srcDir, basePath)

  let redirectsWritten = 0

  for (const [aliasPath, redirect] of redirects.entries()) {
    const redirectFilePath = toRedirectOutputPath(siteConfig.outDir, aliasPath)
    if (!redirectFilePath) continue

    if (!isWithinOutDir(siteConfig.outDir, redirectFilePath)) {
      console.warn(`[aliases] Refusing to write redirect for "${aliasPath}" outside outDir.`)
      continue
    }

    await fs.mkdir(path.dirname(redirectFilePath), { recursive: true })
    await fs.writeFile(redirectFilePath, createRedirectHtml(redirect.targetPath), 'utf8')
    redirectsWritten++
  }

  if (redirectsWritten > 0) {
    const sortedAliases = [...redirects.entries()]
      .filter(([aliasPath]) => toRedirectOutputPath(siteConfig.outDir, aliasPath) !== null)
      .sort(([a], [b]) => a.localeCompare(b))
    for (const [aliasPath, redirect] of sortedAliases) {
      console.info(`[aliases]   ${aliasPath} -> ${redirect.targetPath}`)
    }
  }
  console.info(`[aliases] Generated ${redirectsWritten} alias redirect files.`)
}

function stripBasePath(pathname: string, basePath: string): string | null {
  const normalizedPathname = normalizeUrlPath(pathname)
  const normalizedBase = normalizeUrlPath(basePath || '/')

  if (normalizedBase === '/') {
    return normalizedPathname
  }

  const basePrefix = normalizedBase.slice(0, -1)
  if (normalizedPathname === basePrefix || normalizedPathname === normalizedBase) {
    return '/'
  }

  if (!normalizedPathname.startsWith(`${basePrefix}/`)) {
    return null
  }

  return normalizeUrlPath(normalizedPathname.slice(basePrefix.length))
}

export function createAliasRedirectDevPlugin(srcDir: string, basePath: string) {
  let cachedAliases: Promise<Map<string, AliasEntry>> | null = null

  const loadAliases = () => {
    if (!cachedAliases) {
      cachedAliases = collectAliasEntries(srcDir, basePath).catch((error) => {
        cachedAliases = null
        throw error
      })
    }

    return cachedAliases
  }

  const invalidateAliases = () => {
    cachedAliases = null
  }

  return {
    name: 'vitepress-aliases-dev-redirects',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const refreshOnMarkdownChange = (filePath: string) => {
        if (filePath.toLowerCase().endsWith('.md')) {
          invalidateAliases()
        }
      }

      server.watcher.on('add', refreshOnMarkdownChange)
      server.watcher.on('change', refreshOnMarkdownChange)
      server.watcher.on('unlink', refreshOnMarkdownChange)

      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          next()
          return
        }

        void (async () => {
          const requestUrl = new URL(req.url, 'http://localhost')
          const pathWithoutBase = stripBasePath(requestUrl.pathname, basePath)
          if (!pathWithoutBase) {
            next()
            return
          }

          const aliasPath = normalizeUrlPath(pathWithoutBase)
          const aliases = await loadAliases()
          const redirect = aliases.get(aliasPath)

          if (!redirect) {
            next()
            return
          }

          if (normalizeUrlPath(requestUrl.pathname) === normalizeUrlPath(redirect.targetPath)) {
            next()
            return
          }

          res.statusCode = 302
          res.setHeader('Location', redirect.targetPath)
          res.end()
        })().catch((error) => {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`[aliases] Dev redirect middleware error: ${message}`)
          next()
        })
      })

      void loadAliases()
        .then((aliases) => {
          if (aliases.size > 0) {
            const sortedAliases = [...aliases.entries()].sort(([a], [b]) => a.localeCompare(b))
            for (const [aliasPath, redirect] of sortedAliases) {
              console.info(`[aliases]   ${aliasPath} -> ${redirect.targetPath}`)
            }
          }
          console.info(`[aliases] Loaded ${aliases.size} aliases for dev redirects.`)
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`[aliases] Failed to load aliases for dev redirects: ${message}`)
        })
    },
  }
}
