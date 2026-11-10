// Old URL -> current URL. Keys: paths that Plausible recorded as 404 (keep the observed casing).
// Trimmed to a smoke-test set to unblock the redirect mechanism; the full observed-404
// list (see git history of this file) lands in a follow-up PR.
export const STATIC_REDIRECTS: Record<string, string> = {
  '/about/': '/',
  '/hardend_shoots_report.html': '/hardened_shoots_report.html',
}

export type PrefixRedirect = {
  from: string
  to: string
}

// Whole-section redirects. `*` matches the remainder; `:splat` re-appends it (Netlify syntax).
export const PREFIX_REDIRECTS: PrefixRedirect[] = [
  { from: '/docs/proposals/*', to: 'https://github.com/gardener/enhancements/tree/main/geps' },
  { from: '/documentation/*', to: '/docs/:splat' },
]
