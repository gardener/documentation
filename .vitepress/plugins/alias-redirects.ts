import type { SiteConfig } from 'vitepress'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'path'

export type AliasEntry = {
  // Original casing; the map key is lowercased for lookups only.
  aliasPath: string
  sourcePath: string
  targetPath: string
}

export type PrefixRedirect = {
  from: string
  to: string
}

// Old URL -> current URL. Keys: paths that Plausible recorded as 404 (keep the observed casing).
export const STATIC_REDIRECTS: Record<string, string> = {
  '/040-usage/tasks/backup-etcd/': '/docs/guides/administer-shoots/backup-restore/',
  '/050-tutorials/content/app/https/': '/docs/guides/networking/certificate-extension/',
  '/050-tutorials/content/howto/antipattern/': '/docs/guides/applications/antipattern/',
  '/050-tutorials/content/howto/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/050-tutorials/content/howto/gardener_aws/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/kubernetes-cluster-on-aws-with-gardener/',
  '/050-tutorials/content/howto/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/050-tutorials/content/howto/hibernate-cluster/': '/docs/gardener/shoot/shoot_hibernate/',
  '/050-tutorials/content/howto/working-with-kubeconfig/': '/docs/guides/client-tools/working-with-kubeconfig/',
  '/about/': '/',
  '/blog/2018/06.11-Namespace-Scope/': '/blog/2018/06/06.11-namespace-scope/',
  '/blog/2018/_print/': '/blog/2018/',
  '/blog/2019/06.11-Feature-Flags-in-Kubernetes-Applications/': '/blog/2019/06/06.11-feature-flags-in-kubernetes-applications/',
  '/blog/2020-10/00/': '/blog/2020/10/10.19-gardener-integrates-with-kubevirt/',
  '/blog/2020-10/00/gardener-integrates-with-kubevirt/': '/blog/2020/10/10.19-gardener-integrates-with-kubevirt/',
  '/blog/2020/05.11-New-Website-Same-Green-Flower/': '/blog/2020/05/05.11-new-website-same-green-flower/',
  '/blog/2020/08.06-Gardener-v1.8.0-Released/': '/blog/2020/08/08.06-gardener-v1.8.0-released/',
  '/blog/2020/10.19-Gardener-Integrates-with-KubeVirt/': '/blog/2020/10/10.19-gardener-integrates-with-kubevirt/',
  '/blog/2020/10.19-Shoot-Reconciliation-Details/': '/blog/2020/10/10.19-shoot-reconciliation-details/',
  '/blog/2020/11.23-Gardener-v1.13-Released/': '/blog/2020/11/11.23-gardener-v1.13-released/',
  '/blog/2020/12.03-STACKIT-Kubernetes-Engine-with-Gardener/': '/blog/2020/12/12.03-stackit-kubernetes-engine-with-gardener/',
  '/blog/2021/01.25-Machine-Controller-Manager/': '/blog/2021/01/01.25-machine-controller-manager/',
  '/blog/2021/02.01-Happy-anniversary-Gardener/': '/blog/2021/02/02.01-happy-anniversary-gardener/',
  '/blog/2023/03-27-High-Availability-and-Zone-Outage-Toleration/': '/blog/2023/03/03-27-high-availability-and-zone-outage-toleration/',
  '/blog/2024/04-05-KubeCon-CloudNativeCon-Europe-2024-Highlights/': '/blog/2024/04/04-05-kubecon-cloudnativecon-europe-2024-highlights/',
  '/blog/2024/05-21-Innovation-Unleashed-A-Deep-Dive-into-the-5th-Gardener-Community-Hackathon/': '/blog/2024/05/05-21-innovation-unleashed-a-deep-dive-into-the-5th-gardener-community-hackathon/',
  '/blog/2024/11-06-PromCon-EU-2024/': '/blog/2024/11/11-06-promcon-eu-2024/',
  '/blog/2025/03-18-gardener-kubecon-cloudnativecon-europe-2025-announcement/': '/blog/2025/03/03-18-gardener-kubecon-cloudnativecon-europe-2025-announcement/',
  '/blog/2025/06-25-enhanced-health-checks-for-node-rolling-updates/': '/blog/2025/06/06-25-enhanced-health-checks-for-node-rolling-updates/',
  '/blog/2025/06-25-introducing-gardenadm-bootstrap-for-autonomous-shoots/': '/blog/2025/06/06-25-introducing-gardenadm-bootstrap-for-autonomous-shoots/',
  '/contribute/build-extensions/overview/': '/docs/gardener/extensions/',
  '/contribute/documentation/pr-guidelines/': '/contribute/contribution-process/pr-guidelines/',
  '/docs/contribute/20_documentation/20_formatting_guide/': '/contribute/documentation/formatting-guide/',
  '/docs/contribute/20_documentation/40_style_guide/': '/contribute/documentation/style-guide/',
  '/docs/contribute/documentation/adding-existing-documentation/_print/': '/contribute/documentation/adding-existing-documentation/',
  '/docs/dashboard/usage/gardener-api/': '/docs/dashboard/automated-resource-management/',
  '/docs/extensions/container-runtime-extensions/gardener-extension-runtime-gvisor/_print/': '/docs/extensions/container-runtime-extensions/gardener-extension-runtime-gvisor/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/index.md/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/docs/usage-as-end-user/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/ipv6/': '/docs/guides/networking/ipv6/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/tutorials/kubernetes-cluster-on-aws-with-gardener/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/kubernetes-cluster-on-aws-with-gardener/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/docs/usage-as-end-user/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/usage/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/tutorials/kubernetes-cluster-on-azure-with-gardener/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/kubernetes-cluster-on-azure-with-gardener/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/tutorials/kubernetes-cluster-on-gcp-with-gardener/index.md/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/remote-setup/': '/contribute/extensions/infrastructure-extensions/gardener-extension-provider-openstack/remote-setup/',
  '/docs/extensions/network-extensions/gardener-extension-networking-calico/_print/': '/docs/extensions/network-extensions/gardener-extension-networking-calico/',
  '/docs/extensions/network-extensions/gardener-extension-networking-calico/index.md/': '/docs/extensions/network-extensions/gardener-extension-networking-calico/',
  '/docs/extensions/os-extensions/_print/': '/docs/extensions/os-extensions/',
  '/docs/extensions/os-extensions/gardener-extension-os-coreos/index.md/': '/docs/extensions/os-extensions/gardener-extension-os-coreos/',
  '/docs/extensions/others/gardener-extension-auditing/getting-started-locally/': '/contribute/extensions/gardener-extension-auditing/getting-started-locally/',
  '/docs/extensions/others/gardener-extension-registry-cache/_print/': '/docs/extensions/others/gardener-extension-registry-cache/',
  '/docs/extensions/others/gardener-extension-registry-cache/getting-started-locally/': '/contribute/extensions/gardener-extension-registry-cache/getting-started-locally/',
  '/docs/extensions/others/gardener-extension-shoot-cert-service/docs/usage/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/docs/extensions/others/gardener-extension-shoot-cert-service/index.md/': '/docs/extensions/others/gardener-extension-shoot-cert-service/',
  '/docs/extensions/others/gardener-extension-shoot-cert-service/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/docs/extensions/others/gardener-extension-shoot-dns-service/docs/usage/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/docs/extensions/others/gardener-extension-shoot-dns-service/docs/usage/dns_providers/': '/docs/extensions/others/gardener-extension-shoot-dns-service/dns_providers/',
  '/docs/extensions/others/gardener-extension-shoot-lakom-service/index.md/': '/docs/extensions/others/gardener-extension-shoot-lakom-service/',
  '/docs/extensions/others/gardener-extension-shoot-networking-filter/index.md/': '/docs/extensions/others/gardener-extension-shoot-networking-filter/',
  '/docs/extensions/others/gardener-extension-shoot-oidc-service/index.md/': '/docs/extensions/others/gardener-extension-shoot-oidc-service/',
  '/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/getting-started-remotely/': '/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started-remotely/',
  '/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/getting-started/': '/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started/',
  '/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/index.md/': '/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/',
  '/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/input-validation/': '/contribute/extensions/gardener-extension-shoot-rsyslog-relp/input-validation/',
  '/docs/gardener/api-reference/_index/': '/docs/gardener/api-reference/',
  '/docs/gardener/architecture/': '/docs/getting-started/architecture/',
  '/docs/gardener/autoscaling-specifics-for-components/': '/contribute/gardener/autoscaling-specifics-for-components/',
  '/docs/gardener/autoscaling/shoot_pod_autoscaling_best_practices/': '/docs/guides/applications/shoot-pod-autoscaling-best-practices/',
  '/docs/gardener/component-checklist/': '/contribute/gardener/component-checklist/',
  '/docs/gardener/concepts/_print/': '/docs/gardener/concepts/',
  '/docs/gardener/defaulting/': '/contribute/developer-starter-kit/defaulting/',
  '/docs/gardener/dependencies/': '/contribute/developer-starter-kit/dependencies/',
  '/docs/gardener/development/getting_started_locally/': '/contribute/developer-starter-kit/getting_started_locally/',
  '/docs/gardener/development/local_setup/': '/contribute/developer-starter-kit/local_setup/',
  '/docs/gardener/development/testing/': '/contribute/developer-starter-kit/testing/',
  '/docs/gardener/extensions/overview/': '/docs/gardener/extensions/',
  '/docs/gardener/getting_started_locally/': '/docs/gardener/deployment/getting_started_locally/',
  '/docs/gardener/high-availability-of-components/': '/contribute/gardener/high-availability-of-components/',
  '/docs/gardener/high-availability/_print/': '/docs/guides/high-availability/',
  '/docs/gardener/ipv6/': '/contribute/gardener/ipv6/',
  '/docs/gardener/local_setup/': '/contribute/developer-starter-kit/local_setup/',
  '/docs/gardener/monitoring-stack/': '/contribute/gardener/monitoring-stack/',
  '/docs/gardener/monitoring/_print/': '/docs/gardener/monitoring/',
  '/docs/gardener/new-cloud-provider/': '/contribute/gardener/new-cloud-provider/',
  '/docs/gardener/new-kubernetes-version/': '/contribute/gardener/new-kubernetes-version/',
  '/docs/gardener/observability/logging/': '/docs/gardener/logging/',
  '/docs/gardener/priority-classes/': '/contribute/gardener/priority-classes/',
  '/docs/gardener/process/': '/contribute/gardener/process/',
  '/docs/gardener/reversed-vpn-tunnel/': '/contribute/gardener/reversed-vpn-tunnel/',
  '/docs/gardener/security/_print/': '/docs/gardener/security/',
  '/docs/gardener/security/workload_identity/': '/docs/gardener/shoot/shoot-workload-identity/',
  '/docs/gardener/testing/': '/contribute/developer-starter-kit/testing/',
  '/docs/gardener/usage/default_seccomp_profile/': '/docs/gardener/security/default_seccomp_profile/',
  '/docs/gardener/usage/pod-security/': '/docs/gardener/security/pod-security/',
  '/docs/gardener/usage/shoot/shoot_scheduling_profiles/': '/docs/gardener/shoot/shoot_scheduling_profiles/',
  '/docs/gardener/usage/shoot_cleanup/': '/docs/gardener/advanced/shoot_cleanup/',
  '/docs/gardener/usage/shoot_versions/': '/docs/gardener/shoot-operations/shoot_versions/',
  '/docs/gardener/validation-guidelines/': '/contribute/developer-starter-kit/validation-guidelines/',
  '/docs/getting-started/_print/': '/docs/getting-started/',
  '/docs/glossary/_index/': '/docs/glossary/',
  '/docs/glossary/_print/': '/docs/glossary/',
  '/docs/guides/administer_shoots/request_cert/': '/docs/guides/networking/certificate-extension/',
  '/docs/guides/applications/insecure-configuration/_print/': '/docs/guides/applications/insecure-configuration/',
  '/docs/guides/networking/_print/': '/docs/guides/networking/',
  '/docs/other-components/dependency-watchdog/concepts/_print/': '/docs/other-components/dependency-watchdog/concepts/',
  '/docs/other-components/dependency-watchdog/contribution/': '/contribute/other-components/dependency-watchdog/contribution/',
  '/docs/other-components/dependency-watchdog/testing/': '/contribute/other-components/dependency-watchdog/testing/',
  '/docs/other-components/etcd-druid/_print/': '/docs/other-components/etcd-druid/',
  '/docs/other-components/etcd-druid/changing-api/': '/contribute/other-components/etcd-druid/changing-api/',
  '/docs/other-components/etcd-druid/contribution/': '/contribute/other-components/etcd-druid/contribution/',
  '/docs/other-components/etcd-druid/controllers/': '/contribute/other-components/etcd-druid/controllers/',
  '/docs/other-components/etcd-druid/dependency-management/': '/contribute/other-components/etcd-druid/dependency-management/',
  '/docs/other-components/etcd-druid/deployment/getting-started-locally/index.md/': '/docs/other-components/etcd-druid/deployment/getting-started-locally/',
  '/docs/other-components/etcd-druid/getting-started-locally/': '/contribute/other-components/etcd-druid/getting-started-locally/',
  '/docs/other-components/etcd-druid/implementing-new-etcdopstask/': '/contribute/other-components/etcd-druid/implementing-new-etcdopstask/',
  '/docs/other-components/etcd-druid/running-e2e-tests/': '/contribute/other-components/etcd-druid/running-e2e-tests/',
  '/docs/other-components/etcd-druid/testing/': '/contribute/other-components/etcd-druid/testing/',
  '/docs/other-components/etcd-druid/updating-documentation/': '/contribute/other-components/etcd-druid/updating-documentation/',
  '/docs/other-components/machine-controller-manager/cp_support_new/': '/contribute/other-components/machine-controller-manager/cp_support_new/',
  '/docs/other-components/machine-controller-manager/documents/_print/': '/docs/other-components/machine-controller-manager/documents/',
  '/docs/other-components/machine-controller-manager/integration_tests/': '/contribute/other-components/machine-controller-manager/integration_tests/',
  '/docs/other-components/machine-controller-manager/local_setup/': '/contribute/other-components/machine-controller-manager/local_setup/',
  '/docs/references/core/': '/docs/gardener/api-reference/core/',
  '/docs/tutorials/': '/docs/guides/',
  '/docs/tutorials/knative-install/': '/docs/guides/applications/knative-install/',
  '/documentation/050-tutorials/content/howto/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/documentation/contribute/20_documentation/25_markup/notice/': '/contribute/documentation/shortcodes/',
  '/documentation/guides/administer_shoots/dns_names/': '/docs/guides/networking/DNS-extension/',
  '/documentation/guides/administer_shoots/gardener_gcp/': '/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/kubernetes-cluster-on-gcp-with-gardener/',
  '/documentation/guides/administer_shoots/hibernate-cluster/': '/docs/gardener/shoot/shoot_hibernate/',
  '/documentation/guides/administer_shoots/trigger-shoot-operations/': '/docs/gardener/shoot-operations/shoot_operations/',
  '/documentation/guides/applications/https/': '/docs/guides/networking/certificate-extension/',
  '/documentation/guides/client_tools/bash_kubeconfig/': '/docs/guides/client-tools/bash-kubeconfig/',
  '/documentation/guides/install_gardener/secure-setup/': '/docs/security-and-compliance/kubernetes-hardening/',
  '/documentation/references/core/': '/docs/gardener/api-reference/core/',
  '/hardend_shoots_report.html': '/hardened_shoots_report.html',
  '/readmore/antipattern/': '/docs/guides/applications/antipattern/',
  '/readmore/insecure/': '/docs/guides/applications/insecure-configuration/',
  '/tutorials/': '/docs/guides/',
  '/v1.13.2/guides/client_tools/bash_kubeconfig/': '/docs/guides/client-tools/bash-kubeconfig/',
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
    <script>window.location.replace(${serializedTarget}+window.location.search+window.location.hash)</script>
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

const isExternal = (url: string) => /^https?:\/\//i.test(url)

// External targets pass through untouched; internal ones get the site base and a trailing slash.
export function normalizeTargetUrl(rawTarget: string, basePath = '/'): string {
  const trimmed = rawTarget.trim()
  return isExternal(trimmed) ? trimmed : normalizeUrlPath(joinBasePath(basePath, trimmed))
}

// Mirrors Netlify's trailing-splat matching so `make dev` behaves like production.
export function matchPrefixRedirect(urlPath: string, basePath = '/'): string | null {
  const normalizedPath = normalizeUrlPath(urlPath)

  for (const rule of PREFIX_REDIRECTS) {
    const prefix = normalizeUrlPath(rule.from.replace(/\*$/, '')).toLowerCase()
    if (!normalizedPath.toLowerCase().startsWith(prefix)) continue
    return normalizeTargetUrl(rule.to.replace(':splat', normalizedPath.slice(prefix.length)), basePath)
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

        redirects.set(aliasKey, { aliasPath: normalizedAlias, sourcePath, targetPath })
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
      redirects.set(aliasKey, { aliasPath: normalizedAlias, sourcePath: 'STATIC_REDIRECTS', targetPath })
    }
  }

  return { redirects, warnings }
}

// `301!` forces the redirect even though a static <alias>/index.html fallback exists in dist/.
export function buildNetlifyRedirects(redirects: AliasEntry[], basePath = '/'): string {
  const lines: string[] = ['# Auto-generated by .vitepress/plugins/alias-redirects.ts']

  for (const { aliasPath, targetPath } of redirects) {
    lines.push(`${normalizeUrlPath(joinBasePath(basePath, aliasPath))} ${targetPath} 301!`)
  }

  for (const rule of PREFIX_REDIRECTS) {
    const from = `${normalizeUrlPath(joinBasePath(basePath, rule.from.replace(/\*$/, '')))}*`
    const to = rule.to.includes(':splat')
      ? `${normalizeTargetUrl(rule.to.replace(':splat', ''), basePath)}:splat`
      : normalizeTargetUrl(rule.to, basePath)
    lines.push(`${from} ${to} 301!`)
  }

  lines.push('')
  return lines.join('\n')
}

export async function generateAliasRedirects(siteConfig: SiteConfig): Promise<void> {
  const basePath = typeof siteConfig.site.base === 'string' ? siteConfig.site.base : '/'
  const { redirects, warnings } = await collectAliasEntries(siteConfig.srcDir, basePath)

  const writtenAliases: { aliasPath: string; redirect: AliasEntry }[] = []

  for (const redirect of redirects.values()) {
    const { aliasPath } = redirect
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
  await fs.writeFile(netlifyRedirectsPath, buildNetlifyRedirects(writtenAliases.map((w) => w.redirect), basePath), 'utf8')

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
    const target = rule.to.includes(':splat') ? rule.to : normalizeTargetUrl(rule.to, basePath)
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

          if (!isExternal(targetPath) && normalizeUrlPath(requestUrl.pathname).toLowerCase() === normalizeUrlPath(targetPath).toLowerCase()) {
            next()
            return
          }

          res.statusCode = 302
          res.setHeader('Location', targetPath + requestUrl.search)
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
