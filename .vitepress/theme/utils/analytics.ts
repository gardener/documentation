// Plausible analytics wiring for the Gardener docs.
// Kept out of index.ts so the theme entry stays readable.
// Cookieless: no per-user session chaining, no persistent identifiers. Note that
// search-query events send the raw query string (see trackSearch below).
import type { Router } from 'vitepress'
import type { track as trackFn } from '@plausible-analytics/tracker'

type Track = typeof trackFn

// VitePress local search renders these classes; they are the only handle we have
// since the local search provider exposes no query hook.
const SEARCH_BOX = '.VPLocalSearchBox'
const SEARCH_INPUT = `${SEARCH_BOX} input`
const SEARCH_RESULT = `${SEARCH_BOX} .result`

/** Fire a Plausible custom event on code-block copy, tagged with the language. */
function trackCopyClicks(track: Track): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement)?.closest?.('button.copy')
    if (!btn) return
    // VitePress wraps copy buttons in div.language-<lang>
    const lang = btn.closest('[class*="language-"]')?.className.match(/language-(\w+)/)?.[1] ?? 'unknown'
    track('Copy Snippet', { props: { language: lang }, interactive: false })
  })
}

/**
 * Track what people search and which result they click.
 * Local search has no query hook, so we observe the search box DOM directly.
 * Fragile by nature (depends on VitePress internal classes) — guarded so a
 * markup change degrades to "no search events" instead of a crash.
 */
function trackSearch(track: Track): void {
  let lastQuery = ''
  let debounce: ReturnType<typeof setTimeout> | undefined

  const reportQuery = (query: string, count: number) => {
    if (!query || query === lastQuery) return
    lastQuery = query
    track('Search', { props: { query, results: String(count) }, interactive: false })
  }

  document.addEventListener('input', (e) => {
    const input = (e.target as HTMLElement)?.closest?.(SEARCH_INPUT) as HTMLInputElement | null
    if (!input) return
    clearTimeout(debounce)
    const query = input.value.trim()
    // Give MiniSearch a beat to render results, then count them.
    debounce = setTimeout(() => {
      const box = document.querySelector(SEARCH_BOX)
      const noResults = !!box?.querySelector('.no-results')
      reportQuery(query, noResults ? 0 : (box?.querySelectorAll('.result').length ?? 0))
    }, 600)
  })

  // Which result did they pick for the current query? This is the "search → click" link.
  document.addEventListener('click', (e) => {
    const result = (e.target as HTMLElement)?.closest?.(SEARCH_RESULT) as HTMLAnchorElement | null
    if (!result || !lastQuery) return
    const target = result.getAttribute('href') ?? 'unknown'
    track('Search Click', { props: { query: lastQuery, target }, interactive: false })
  })
}

/** Report client-side 404s so broken links surface in the dashboard. */
function trackNotFound(router: Router, track: Track): void {
  const prev = router.onAfterRouteChanged
  router.onAfterRouteChanged = (to) => {
    if (router.route.data.isNotFound) {
      track('404', { props: { path: to }, interactive: false })
    }
    return prev?.(to)
  }
}

export function initAnalytics(router: Router): void {
  const dev = import.meta.env.DEV
  import('@plausible-analytics/tracker').then(({ init, track }) => {
    init({
      domain: 'gardener.cloud',
      // The /pa/event proxy only exists on Netlify; hit plausible.io directly in dev
      endpoint: dev ? 'https://plausible.io/api/event' : '/pa/event',
      autoCapturePageviews: true,
      captureOnLocalhost: dev,
      outboundLinks: true,
      fileDownloads: true,
    })
    trackNotFound(router, track)
    trackCopyClicks(track)
    trackSearch(track)
  })
}
