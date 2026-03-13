export interface BlogAuthor {
  name: string
  avatar?: string
  login?: string
  email?: string
}

const TAG_ALIASES: Record<string, string> = {
  aws: 'provider-aws',
  azure: 'provider-azure',
  gcp: 'provider-gcp',
  openstack: 'provider-openstack',
  'metal-stack': 'provider-metal-stack',
  neonephos: 'apeiro'
}

export function canonicalizeTag(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  const key = trimmed.toLowerCase()
  return TAG_ALIASES[key] || trimmed
}

export function normalizeTags(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return uniqueNonEmpty(raw)
  }

  if (typeof raw === 'string') {
    return uniqueNonEmpty(raw.split(','))
  }

  return []
}

export function normalizeAuthors(raw: unknown): BlogAuthor[] {
  const values = Array.isArray(raw)
    ? raw
    : raw == null
      ? []
      : [raw]

  const unique: BlogAuthor[] = []
  const seen = new Set<string>()

  for (const value of values) {
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

function normalizeAuthor(value: unknown): BlogAuthor | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return undefined
    }

    const login = getGitHubLogin(trimmed)
    const name = trimmed.startsWith('@')
      ? trimmed.slice(1)
      : login ?? trimmed

    return {
      name,
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
    image?: unknown
    login?: unknown
    github?: unknown
    url?: unknown
    email?: unknown
  }

  const explicitName = asNonEmptyString(rawAuthor.name)
  const email = asNonEmptyString(rawAuthor.email)
  const login = getGitHubLogin(rawAuthor.login)
    ?? getGitHubLogin(rawAuthor.github)
    ?? getGitHubLogin(rawAuthor.url)
  const name = explicitName || login

  if (!name) {
    return undefined
  }

  const avatar =
    asNonEmptyString(rawAuthor.avatar)
    || asNonEmptyString(rawAuthor.image)
    || toGitHubAvatar(login)

  return {
    name,
    login: login || undefined,
    avatar: avatar || undefined,
    email: email || undefined
  }
}

function uniqueNonEmpty(values: unknown[]): string[] {
  const unique: string[] = []

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const normalized = canonicalizeTag(value)
    if (!normalized || unique.some(tag => tag.toLowerCase() === normalized.toLowerCase())) {
      continue
    }

    unique.push(normalized)
  }

  return unique
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

