import type { SiteConfig } from 'vitepress'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'path'

export type AliasEntry = {
  sourcePath: string
  targetPath: string
}

export type PrefixRedirect = {
  from: string
  to: string
}

export const STATIC_REDIRECTS: Record<string, string> = {
  '/about/': '/',
  '/documentation/': '/docs/',
  '/030-architecture/': '/docs/getting-started/architecture/',
  '/documentation/030-architecture/': '/docs/getting-started/architecture/',
  '/docs/gardener/architecture/': '/docs/getting-started/architecture/',
  '/contribute/documentation/pr-guidelines/': '/contribute/contribution-process/pr-guidelines/',
  '/contribute/build-extensions/': '/docs/gardener/extensions/',
  '/contribute/build-extensions/overview/': '/docs/gardener/extensions/',
  '/docs/gardener/extensions/overview/': '/docs/gardener/extensions/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/ipv6/': '/docs/guides/networking/ipv6/',
  '/docs/extensions/others/gardener-extension-shoot-cert-service/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/docs/extensions/others/gardener-extension-shoot-cert-service/docs/usage/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/docs/guides/administer_shoots/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/documentation/guides/applications/https/': '/docs/guides/networking/certificate-extension/',
  '/050-tutorials/content/app/https/': '/docs/guides/networking/certificate-extension/',
  '/docs/extensions/others/gardener-extension-shoot-dns-service/docs/usage/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/documentation/guides/administer_shoots/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/050-tutorials/content/howto/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/docs/gardener/autoscaling/shoot_pod_autoscaling_best_practices/': '/docs/guides/applications/shoot-pod-autoscaling-best-practices/',
  '/docs/gardener/high-availability/': '/docs/guides/high-availability/',
  '/docs/references/core/': '/docs/gardener/api-reference/core/',
  '/documentation/references/core/': '/docs/gardener/api-reference/core/',
  '/docs/tutorials/': '/docs/guides/',
  '/tutorials/': '/docs/guides/',
  '/docs/tutorials/knative-install/': '/docs/guides/applications/knative-install/',
  '/050-tutorials/content/howto/antipattern/': '/docs/guides/applications/antipattern/',
  '/readmore/antipattern/': '/docs/guides/applications/antipattern/',
  '/readmore/insecure/': '/docs/guides/applications/insecure-configuration/',
  '/050-tutorials/content/howto/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/documentation/050-tutorials/content/howto/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/documentation/guides/administer_shoots/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/050-tutorials/content/howto/gardener_aws/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/kubernetes-cluster-on-aws-with-gardener/',
  '/050-tutorials/content/howto/working-with-kubeconfig/': '/docs/guides/client-tools/working-with-kubeconfig/',
  '/documentation/guides/client_tools/bash_kubeconfig/': '/docs/guides/client-tools/bash-kubeconfig/',
  '/v1.13.2/guides/client_tools/bash_kubeconfig/': '/docs/guides/client-tools/bash-kubeconfig/',
  '/documentation/guides/administer_shoots/hibernate-cluster/': '/docs/gardener/shoot/shoot_hibernate/',
  '/050-tutorials/content/howto/hibernate-cluster/': '/docs/gardener/shoot/shoot_hibernate/',
  '/documentation/guides/administer_shoots/trigger-shoot-operations/': '/docs/gardener/shoot-operations/shoot_operations/',
  '/documentation/guides/install_gardener/secure-setup/': '/docs/security-and-compliance/kubernetes-hardening/',
  '/040-usage/tasks/backup-etcd/': '/docs/guides/administer-shoots/backup-restore/',
  '/docs/contribute/20_documentation/20_formatting_guide/': '/contribute/documentation/formatting-guide/',
  '/docs/contribute/20_documentation/40_style_guide/': '/contribute/documentation/style-guide/',
  '/documentation/contribute/20_documentation/25_markup/notice/': '/contribute/documentation/shortcodes/',
  '/docs/dashboard/usage/gardener-api/': '/docs/dashboard/automated-resource-management/',
  '/docs/gardener/security/workload_identity/': '/docs/gardener/shoot/shoot-workload-identity/',
  '/docs/gardener/observability/logging/': '/docs/gardener/logging/',
  '/blog/2020-10/00/': '/blog/2020/10/10.19-gardener-integrates-with-kubevirt/',
  '/blog/2020-10/00/gardener-integrates-with-kubevirt/': '/blog/2020/10/10.19-gardener-integrates-with-kubevirt/',
  '/hardend_shoots_report.html': '/hardened_shoots_report.html',
}

export const PREFIX_REDIRECTS: PrefixRedirect[] = [
  { from: '/docs/proposals/*', to: 'https://github.com/gardener/enhancements/tree/main/geps' },
  { from: '/documentation/030-architecture/*', to: '/docs/getting-started/architecture/' },
  { from: '/030-architecture/*', to: '/docs/getting-started/architecture/' },
  { from: '/contribute/build-extensions/*', to: '/docs/gardener/extensions/:splat' },
  { from: '/documentation/*', to: '/docs/:splat' },
]

const createRedirectHtml = (targetPath: string) => {
  const escapedTarget = escapeHtml(targetPath)
  const serializedTarget = JSON.stringify(targetPath).replace(/</g, '\\u003c')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${escapedTarget}">
    <link rel="canonical" href="${escapedTarget}">
    <script>(function(){var t=${serializedTarget};window.location.replace(t+(t.indexOf('#')===-1?window.location.search+window.location.hash:''))})()</script>
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

export function normalizeTargetUrl(rawTarget: string, basePath = '/'): string {
  const trimmed = rawTarget.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  const hashIndex = trimmed.indexOf('#')
  const pathPart = hashIndex === -1 ? trimmed : trimmed.slice(0, hashIndex)
  const hashPart = hashIndex === -1 ? '' : trimmed.slice(hashIndex)

  return `${normalizeUrlPath(joinBasePath(basePath, pathPart))}${hashPart}`
}

export function deriveImplicitAliases(sourcePath: string): string[] {
  const normalizedPath = sourcePath.replace(/\\/g, '/')
  if (!normalizedPath.toLowerCase().endsWith('.md')) return []

  const withoutExt = normalizedPath.slice(0, -3)
  const fileName = path.posix.basename(withoutExt).toLowerCase()
  if (fileName === 'index' || fileName === '_index') return []

  const derived: string[] = []

  const blogMatch = /^blog\/(\d{4})\/\d{2}\/([^/]+)$/.exec(withoutExt)
  if (blogMatch) {
    derived.push(`/blog/${blogMatch[1]}/${blogMatch[2]}/`)
  }

  const gardenerUsageMatch = /^docs\/gardener\/(advanced|autoscaling|networking|project|security|shoot|shoot-operations)\/([^/]+)$/.exec(withoutExt)
  if (gardenerUsageMatch) {
    const [, category, slug] = gardenerUsageMatch
    derived.push(
      `/docs/gardener/${slug}/`,
      `/docs/gardener/usage/${slug}/`,
      `/docs/gardener/usage/${category}/${slug}/`,
    )
  }

  const starterKitMatch = /^contribute\/developer-starter-kit\/([^/]+)$/.exec(withoutExt)
  if (starterKitMatch) {
    const slug = starterKitMatch[1]
    derived.push(
      `/docs/gardener/${slug}/`,
      `/docs/gardener/development/${slug}/`,
      `/docs/gardener/deployment/${slug}/`,
    )
  }

  const contributeGardenerMatch = /^contribute\/gardener\/([^/]+)$/.exec(withoutExt)
  if (contributeGardenerMatch) {
    const slug = contributeGardenerMatch[1]
    derived.push(
      `/docs/gardener/${slug}/`,
      `/docs/gardener/development/${slug}/`,
    )
  }

  const otherComponentsMatch = /^contribute\/other-components\/(.+)$/.exec(withoutExt)
  if (otherComponentsMatch) {
    derived.push(`/docs/other-components/${otherComponentsMatch[1]}/`)
  }

  const contributeExtMatch = /^contribute\/extensions\/(.+)$/.exec(withoutExt)
  if (contributeExtMatch) {
    const rest = contributeExtMatch[1]
    derived.push(
      rest.startsWith('infrastructure-extensions/')
        ? `/docs/extensions/${rest}/`
        : `/docs/extensions/others/${rest}/`,
    )
  }

  const providerTutorialMatch = /^docs\/extensions\/infrastructure-extensions\/([^/]+)\/(kubernetes-cluster-on-.+)$/.exec(withoutExt)
  if (providerTutorialMatch) {
    derived.push(`/docs/extensions/infrastructure-extensions/${providerTutorialMatch[1]}/tutorials/${providerTutorialMatch[2]}/`)
  }

  const extDocMatch = /^docs\/extensions\/([^/]+)\/([^/]+)\/([^/]+)$/.exec(withoutExt)
  if (extDocMatch) {
    const [, category, ext, slug] = extDocMatch
    derived.push(`/docs/extensions/${category}/${ext}/docs/usage/${slug}/`)
    if (slug === 'usage') {
      derived.push(
        `/docs/extensions/${category}/${ext}/docs/usage/`,
        `/docs/extensions/${category}/${ext}/docs/usage-as-end-user/`,
        `/docs/extensions/${category}/${ext}/usage-as-end-user/`,
      )
    }
  }

  return derived
}

export function matchPrefixRedirect(urlPath: string, basePath = '/'): string | null {
  const normalizedPath = normalizeUrlPath(urlPath)
  const lowerPath = normalizedPath.toLowerCase()

  for (const rule of PREFIX_REDIRECTS) {
    const prefix = normalizeUrlPath(rule.from.replace(/\*$/, '')).toLowerCase()
    if (!lowerPath.startsWith(prefix)) continue

    const splat = normalizedPath.slice(prefix.length)
    if (/^https?:\/\//i.test(rule.to)) {
      return rule.to.includes(':splat') ? rule.to.replace(':splat', splat) : rule.to
    }
    const resolvedTarget = rule.to.includes(':splat')
      ? rule.to.replace(':splat', splat)
      : rule.to
    return normalizeTargetUrl(resolvedTarget, basePath)
  }

  return null
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

export type AliasCollectionResult = {
  redirects: Map<string, AliasEntry>
  warnings: string[]
}

export async function collectAliasEntries(srcDir: string, basePath: string): Promise<AliasCollectionResult> {
  const markdownFiles = await collectMarkdownFiles(srcDir)
  const redirects = new Map<string, AliasEntry>()
  const warnings: string[] = []
  const canonicalRoutes = new Set(
    markdownFiles.map((markdownFile) => {
      const sourcePath = path.relative(srcDir, markdownFile).replace(/\\/g, '/')
      return normalizeUrlPath(toRoutePath(sourcePath)).toLowerCase()
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
      const targetPath = normalizeTargetUrl(routePath, basePath)

      for (const alias of aliases) {
        const normalizedAlias = normalizeUrlPath(alias)
        const aliasKey = normalizedAlias.toLowerCase()

        if (canonicalRoutes.has(aliasKey)) {
          const isAncestorOnIndex =
            /(?:^|\/)_?index\.md$/i.test(sourcePath) &&
            routePath.toLowerCase().startsWith(aliasKey)
          if (aliasKey !== routePath.toLowerCase() && !isAncestorOnIndex) {
            warnings.push(`Skipping alias "${normalizedAlias}" in "${sourcePath}" because it matches an existing page route.`)
          }
          continue
        }

        const existing = redirects.get(aliasKey)
        if (existing && existing.targetPath !== targetPath) {
          warnings.push(`Skipping duplicate alias "${normalizedAlias}" in "${sourcePath}". Already mapped to "${existing.targetPath}" by "${existing.sourcePath}".`)
          continue
        }

        redirects.set(aliasKey, {
          sourcePath,
          targetPath,
        })
      }
    }
  }

  for (const [rawAlias, rawTarget] of Object.entries(STATIC_REDIRECTS)) {
    const normalizedAlias = normalizeUrlPath(rawAlias)
    const aliasKey = normalizedAlias.toLowerCase()
    const targetPath = normalizeTargetUrl(rawTarget, basePath)

    if (canonicalRoutes.has(aliasKey)) {
      warnings.push(`Skipping static redirect "${normalizedAlias}" because it matches an existing page route.`)
      continue
    }

    if (!redirects.has(aliasKey)) {
      redirects.set(aliasKey, {
        sourcePath: 'STATIC_REDIRECTS',
        targetPath,
      })
    }
  }

  for (const markdownFile of markdownFiles) {
    const sourcePath = path.relative(srcDir, markdownFile).replace(/\\/g, '/')
    const derivedAliases = deriveImplicitAliases(sourcePath)
    if (derivedAliases.length === 0) continue

    const routePath = normalizeUrlPath(toRoutePath(sourcePath))
    const targetPath = normalizeTargetUrl(routePath, basePath)

    for (const alias of derivedAliases) {
      const normalizedAlias = normalizeUrlPath(alias)
      const aliasKey = normalizedAlias.toLowerCase()

      if (canonicalRoutes.has(aliasKey) || redirects.has(aliasKey)) {
        continue
      }

      redirects.set(aliasKey, {
        sourcePath,
        targetPath,
      })
    }
  }

  return { redirects, warnings }
}

export function buildNetlifyRedirects(
  writtenAliases: { aliasPath: string; redirect: AliasEntry }[],
  basePath = '/',
): string {
  const lines: string[] = ['# Auto-generated by .vitepress/plugins/alias-redirects.ts']

  for (const { aliasPath, redirect } of writtenAliases) {
    const fromWithBase = normalizeUrlPath(joinBasePath(basePath, aliasPath))
    lines.push(`${fromWithBase} ${redirect.targetPath} 301!`)
  }

  for (const rule of PREFIX_REDIRECTS) {
    const prefixWithoutStar = rule.from.replace(/\*$/, '')
    const fromWithBase = `${normalizeUrlPath(joinBasePath(basePath, prefixWithoutStar))}*`
    const toWithBase = /^https?:\/\//i.test(rule.to)
      ? rule.to
      : rule.to.includes(':splat')
        ? `${normalizeUrlPath(joinBasePath(basePath, rule.to.replace(':splat', '')))}:splat`
        : normalizeTargetUrl(rule.to, basePath)
    lines.push(`${fromWithBase} ${toWithBase} 301!`)
  }

  lines.push('')
  return lines.join('\n')
}

export async function generateAliasRedirects(siteConfig: SiteConfig): Promise<void> {
  const basePath = typeof siteConfig.site.base === 'string' ? siteConfig.site.base : '/'
  const { redirects, warnings } = await collectAliasEntries(siteConfig.srcDir, basePath)

  const writtenAliases: { aliasPath: string; redirect: AliasEntry }[] = []

  for (const [aliasPath, redirect] of redirects.entries()) {
    const redirectFilePath = toRedirectOutputPath(siteConfig.outDir, aliasPath)
    if (!redirectFilePath) continue

    if (!isWithinOutDir(siteConfig.outDir, redirectFilePath)) {
      console.warn(`[aliases] Refusing to write redirect for "${aliasPath}" outside outDir.`)
      continue
    }

    await fs.mkdir(path.dirname(redirectFilePath), { recursive: true })
    await fs.writeFile(redirectFilePath, createRedirectHtml(redirect.targetPath), 'utf8')
    writtenAliases.push({ aliasPath, redirect })
  }

  writtenAliases.sort((a, b) => a.aliasPath.localeCompare(b.aliasPath))

  const netlifyRedirectsPath = path.join(siteConfig.outDir, '_redirects')
  await fs.writeFile(netlifyRedirectsPath, buildNetlifyRedirects(writtenAliases, basePath), 'utf8')

  const reportFilePath = path.join(path.dirname(siteConfig.outDir), 'alias-redirects.txt')
  const reportBody = buildAliasReport(writtenAliases, warnings, basePath)
  await fs.mkdir(path.dirname(reportFilePath), { recursive: true })
  await fs.writeFile(reportFilePath, reportBody, 'utf8')

  const warningSuffix = warnings.length > 0 ? `, ${warnings.length} skipped` : ''
  console.info(`[aliases] ${writtenAliases.length} redirects generated${warningSuffix}. Full list: ${reportFilePath}`)
}

function buildAliasReport(
  writtenAliases: { aliasPath: string; redirect: AliasEntry }[],
  warnings: string[],
  basePath = '/',
): string {
  const lines: string[] = []

  lines.push(`# Prefix redirects (${PREFIX_REDIRECTS.length})`)
  for (const rule of PREFIX_REDIRECTS) {
    const target = /^https?:\/\//i.test(rule.to) || rule.to.includes(':splat')
      ? rule.to
      : normalizeTargetUrl(rule.to, basePath)
    lines.push(`${rule.from} -> ${target}`)
  }
  lines.push('')

  lines.push(`# Alias redirects (${writtenAliases.length})`)
  for (const { aliasPath, redirect } of writtenAliases) {
    lines.push(`${aliasPath} -> ${redirect.targetPath}`)
  }

  if (warnings.length > 0) {
    lines.push('')
    lines.push(`# Warnings (${warnings.length})`)
    for (const warning of warnings) {
      lines.push(warning)
    }
  }

  lines.push('')
  return lines.join('\n')
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
      cachedAliases = collectAliasEntries(srcDir, basePath)
        .then((result) => result.redirects)
        .catch((error) => {
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
          const targetPath = aliases.get(aliasPath.toLowerCase())?.targetPath ?? matchPrefixRedirect(aliasPath, basePath)

          if (!targetPath) {
            next()
            return
          }

          if (!/^https?:\/\//i.test(targetPath) && normalizeUrlPath(requestUrl.pathname).toLowerCase() === normalizeUrlPath(targetPath).toLowerCase()) {
            next()
            return
          }

          res.statusCode = 302
          res.setHeader('Location', targetPath)
          res.end()
        })().catch((error) => {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`[aliases] Dev redirect middleware error: ${message}`)
          next()
        })
      })

      void loadAliases()
        .then((aliases) => {
          console.info(`[aliases] ${aliases.size} redirects loaded.`)
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`[aliases] Failed to load aliases for dev redirects: ${message}`)
        })
    },
  }
}
