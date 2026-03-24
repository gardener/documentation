import fs from 'node:fs/promises'
import path from 'node:path'
import yaml from 'js-yaml'

const BLOG_ROOT = path.resolve('website/blog')
const DRY_RUN = process.argv.includes('--dry-run')

const CONTENT_TYPE_TAGS = [
  'feature-announcement',
  'release-notes',
  'technical-deep-dive',
  'case-study',
  'community-event',
  'tutorial',
  'milestone'
]

const TAXONOMY_ORDER = [
  ...CONTENT_TYPE_TAGS,
  'cost-optimization',
  'security',
  'networking',
  'high-availability',
  'observability',
  'storage',
  'autoscaling',
  'node-management',
  'dashboard',
  'gardenctl',
  'etcd',
  'helm',
  'cluster-api',
  'extensions',
  'provider-aws',
  'provider-azure',
  'provider-gcp',
  'provider-openstack',
  'provider-metal-stack',
  'apeiro'
]

const TAG_ALIASES = {
  aws: 'provider-aws',
  azure: 'provider-azure',
  gcp: 'provider-gcp',
  openstack: 'provider-openstack',
  'metal-stack': 'provider-metal-stack',
  neonephos: 'apeiro'
}

const DOMAIN_RULES = [
  {
    tag: 'cost-optimization',
    keywords: ['cost', 'save money', 'lower bills', 'optimization', 'registry cache', 'hibernate', 'finops', 'efficiency']
  },
  {
    tag: 'security',
    keywords: ['security', 'secure', 'credential', 'authentication', 'authorization', 'tls', 'certificate', 'ca support', 'oci registries', 'cookie']
  },
  {
    tag: 'networking',
    keywords: ['network', 'cidr', 'dns', 'calico', 'cilium', 'kube-proxy', 'coredns', 'ipv4', 'ipv6', 'l7', 'load balancing', 'overlay']
  },
  {
    tag: 'high-availability',
    keywords: ['high availability', 'zone outage', 'outage toleration', 'failover', 'multi-zone']
  },
  {
    tag: 'observability',
    keywords: ['observability', 'monitoring', 'prometheus', 'promcon', 'opentelemetry', 'otel', 'logging', 'metrics', 'alertmanager', 'promql']
  },
  {
    tag: 'storage',
    keywords: ['storage', 'etcd', 'volume', 'pvc', 'persistent volume', 'backup', 'efs', 'filestore', 'bucket']
  },
  {
    tag: 'autoscaling',
    keywords: ['autoscaling', 'scale down', 'scale-up', 'hpa', 'vpa', 'overprovision']
  },
  {
    tag: 'node-management',
    keywords: ['node', 'worker', 'machine controller', 'machine-controller', 'rolling update', 'in-place update', 'gardenadm', 'gardenlet']
  }
]

const COMPONENT_RULES = [
  { tag: 'dashboard', keywords: ['dashboard'] },
  { tag: 'gardenctl', keywords: ['gardenctl'] },
  { tag: 'etcd', keywords: ['etcd'] },
  { tag: 'helm', keywords: ['helm', 'oci registries'] },
  { tag: 'cluster-api', keywords: ['cluster api', 'capi', 'capga', 'kcp'] },
  { tag: 'extensions', keywords: ['extension', 'gardener-extension', 'provider extension'] }
]

const CLOUD_RULES = [
  { tag: 'provider-aws', keywords: ['aws', 'amazon web services', 'amazon efs', 's3'] },
  { tag: 'provider-azure', keywords: ['azure'] },
  { tag: 'provider-gcp', keywords: ['gcp', 'google cloud'] },
  { tag: 'provider-openstack', keywords: ['openstack'] },
  { tag: 'provider-metal-stack', keywords: ['metal-stack', 'equinix metal', 'equinix'] }
]

const PROJECT_RULES = [
  { tag: 'apeiro', keywords: ['apeiro', 'neonephos'] }
]

async function main() {
  const files = await collectMarkdownFiles(BLOG_ROOT)
  const blogFiles = files.filter(file => {
    const name = path.basename(file)
    return name !== 'index.md' && name !== '_index.md'
  })

  let modified = 0
  const outputRows = []

  for (const file of blogFiles) {
    const source = await fs.readFile(file, 'utf8')
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
    if (!match) {
      continue
    }

    const newline = source.includes('\r\n') ? '\r\n' : '\n'
    const frontmatterText = match[1]
    const body = source.slice(match[0].length)

    const frontmatter = yaml.load(frontmatterText, { schema: yaml.JSON_SCHEMA }) || {}
    const inferredTags = inferTags(frontmatter, body, file)
    const existingTags = normalizeTags(frontmatter.tags)
    let mergedTags = mergeTags(inferredTags, existingTags)

    if (!mergedTags.some(tag => CONTENT_TYPE_TAGS.includes(tag.toLowerCase()))) {
      mergedTags = mergeTags(['technical-deep-dive'], mergedTags)
    }

    const updatedFrontmatter = replaceTagsBlock(frontmatterText, mergedTags, newline)
    if (updatedFrontmatter === frontmatterText) {
      continue
    }

    modified += 1
    outputRows.push({ file: path.relative(process.cwd(), file), tags: mergedTags })

    if (!DRY_RUN) {
      const normalizedBody = body.replace(/^\r?\n/, '')
      const updated = `---${newline}${updatedFrontmatter}${newline}---${newline}${normalizedBody}`
      await fs.writeFile(file, updated, 'utf8')
    }
  }

  console.log(`Blog posts scanned: ${blogFiles.length}`)
  console.log(`Files ${DRY_RUN ? 'to update' : 'updated'}: ${modified}`)
  for (const row of outputRows) {
    console.log(`${row.file}: ${row.tags.join(', ')}`)
  }
}

function inferTags(frontmatter, body, filePath) {
  const title = `${frontmatter.title || ''} ${frontmatter.linkTitle || ''}`.toLowerCase()
  const slug = filePath.replaceAll('\\', '/').toLowerCase()
  const bodyPreview = body.slice(0, 1400).toLowerCase()
  const focusText = `${title}\n${String(frontmatter.newsSubtitle || '')}\n${slug}\n${bodyPreview}`
  const tags = []

  if (includesAny(title, ['community meeting', 'kubecon', 'promcon', 'hackathon', 'conference']) || includesAny(slug, ['community-meeting', 'kubecon', 'promcon', 'hackathon'])) {
    tags.push('community-event')
  }

  if (/\bv\d+\.\d+(\.\d+)?\b/.test(title) || includesAny(title, [' release ', 'released'])) {
    tags.push('release-notes')
    tags.push('feature-announcement')
  }

  if (includesAny(title, ['announcing', 'announcement', 'introducing', 'new in', 'enhanced', 'enhancing', 'unleashing', 'integrates', 'now supports', 'supports'])) {
    tags.push('feature-announcement')
  }

  if (includesAny(title, ['case study', 'case-study']) || (includesAny(title, ['migrating']) && includesAny(focusText, ['production']))) {
    tags.push('case-study')
  }

  if (includesAny(title, ['tutorial', 'how to', 'getting started']) || includesAny(slug, ['getting-started'])) {
    tags.push('tutorial')
  }

  if (includesAny(title, ['anniversary', 'years of', 'happy anniversary'])) {
    tags.push('milestone')
  }

  if (includesAny(title, ['deep dive'])) {
    tags.push('technical-deep-dive')
  }

  applyRules(tags, focusText, DOMAIN_RULES)
  applyRules(tags, focusText, COMPONENT_RULES)
  applyRules(tags, focusText, CLOUD_RULES)
  applyRules(tags, focusText, PROJECT_RULES)

  return uniqueCaseInsensitive(tags)
}

function applyRules(target, text, rules) {
  for (const rule of rules) {
    if (includesAny(text, rule.keywords)) {
      target.push(rule.tag)
    }
  }
}

function includesAny(text, keywords) {
  return keywords.some(keyword => containsKeyword(text, keyword))
}

function containsKeyword(text, keyword) {
  const value = keyword.trim().toLowerCase()
  if (!value) {
    return false
  }

  if (value.includes(' ') || value.includes('-')) {
    return text.includes(value)
  }

  const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(value)}([^a-z0-9]|$)`, 'i')
  return pattern.test(text)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normalizeTags(raw) {
  if (Array.isArray(raw)) {
    return raw
      .filter(value => typeof value === 'string')
      .map(value => canonicalizeTag(value))
      .filter(Boolean)
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map(value => canonicalizeTag(value))
      .filter(Boolean)
  }

  return []
}

function canonicalizeTag(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) {
    return ''
  }

  const key = trimmed.toLowerCase()
  return TAG_ALIASES[key] || trimmed
}

function mergeTags(inferredTags, existingTags) {
  const merged = uniqueCaseInsensitive([...inferredTags, ...existingTags])
  const byLower = new Map(merged.map(tag => [tag.toLowerCase(), tag]))

  const ordered = []
  for (const tag of TAXONOMY_ORDER) {
    if (byLower.has(tag)) {
      ordered.push(tag)
      byLower.delete(tag)
    }
  }

  for (const tag of merged) {
    const key = tag.toLowerCase()
    if (byLower.has(key)) {
      ordered.push(tag)
      byLower.delete(key)
    }
  }

  return ordered
}

function uniqueCaseInsensitive(values) {
  const result = []
  const seen = new Set()

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const normalized = value.trim()
    if (!normalized) {
      continue
    }

    const key = normalized.toLowerCase()
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    result.push(normalized)
  }

  return result
}

function replaceTagsBlock(frontmatterText, tags, newline) {
  const lines = frontmatterText.split(/\r?\n/)
  const tagLines = ['tags:', ...tags.map(tag => `  - ${tag}`)]

  let start = -1
  for (let index = 0; index < lines.length; index += 1) {
    if (/^tags\s*:\s*/i.test(lines[index])) {
      start = index
      break
    }
  }

  if (start >= 0) {
    let end = start + 1
    while (end < lines.length) {
      const line = lines[end]
      if (/^[A-Za-z0-9_-]+\s*:\s*/.test(line)) {
        break
      }
      end += 1
    }

    lines.splice(start, end - start, ...tagLines)
  } else {
    let insertAt = lines.length
    while (insertAt > 0 && lines[insertAt - 1].trim() === '') {
      insertAt -= 1
    }
    lines.splice(insertAt, 0, ...tagLines)
  }

  return lines.join(newline)
}

async function collectMarkdownFiles(root) {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
