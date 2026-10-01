// Plausible analytics wiring for the Gardener docs.
// Kept out of index.ts so the theme entry stays readable.
// Cookieless: no per-user session chaining, no persistent identifiers, no PII.
// Search events report result counts and the clicked target path, never the
// raw query string (a query can contain an email or other personal data).
import type { Router } from 'vitepress'
import type { track as trackFn } from '@plausible-analytics/tracker'

type Track = typeof trackFn

// VitePress local search renders these classes; they are the only handle we have
// since the local search provider exposes no query hook.
const SEARCH_BOX = '.VPLocalSearchBox'
const SEARCH_INPUT = `${SEARCH_BOX} input`
const SEARCH_RESULT = `${SEARCH_BOX} .result`
// VitePress marks the keyboard-highlighted result with .selected; Enter navigates
// to it via router.go() without emitting an anchor click.
const SEARCH_SELECTED = `${SEARCH_BOX} .result.selected`

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
 * Track how many results a search yields and which result the visitor picks.
 * Local search has no query hook, so we observe the search box DOM directly.
 * The raw query is deliberately never sent — it can contain PII. We only report
 * result counts and the clicked target path.
 * Fragile by nature (depends on VitePress internal classes) — guarded so a
 * markup change degrades to "no search events" instead of a crash.
 */
function trackSearch(track: Track): void {
  let lastCount = -1
  let debounce: ReturnType<typeof setTimeout> | undefined
  // Enter-selection and the subsequent anchor click both resolve to the same
  // href; suppress the duplicate within a short window.
  let lastTarget = ''
  let lastTargetAt = 0

  const reportSelection = (target: string) => {
    const now = Date.now()
    if (target === lastTarget && now - lastTargetAt < 500) return
    lastTarget = target
    lastTargetAt = now
    track('Search Click', { props: { target }, interactive: false })
  }

  document.addEventListener('input', (e) => {
    const input = (e.target as HTMLElement)?.closest?.(SEARCH_INPUT) as HTMLInputElement | null
    if (!input) return
    clearTimeout(debounce)
    const hasQuery = input.value.trim().length > 0
    // Give MiniSearch a beat to render results, then count them.
    debounce = setTimeout(() => {
      if (!hasQuery) return
      const box = document.querySelector(SEARCH_BOX)
      const noResults = !!box?.querySelector('.no-results')
      const count = noResults ? 0 : (box?.querySelectorAll('.result').length ?? 0)
      if (count === lastCount) return
      lastCount = count
      track('Search', { props: { results: String(count) }, interactive: false })
    }, 600)
  })

  // Mouse: which result did they click?
  document.addEventListener('click', (e) => {
    const result = (e.target as HTMLElement)?.closest?.(SEARCH_RESULT) as HTMLAnchorElement | null
    if (!result) return
    reportSelection(result.getAttribute('href') ?? 'unknown')
  })

  // Keyboard: Enter navigates to the .selected result without a click event.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return
    const selected = document.querySelector(SEARCH_SELECTED) as HTMLAnchorElement | null
    if (!selected) return
    reportSelection(selected.getAttribute('href') ?? 'unknown')
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

export function initAnalytics(router: Router): Promise<void> {
  const dev = import.meta.env.DEV
  // Return the promise so enhanceApp can await it before VitePress runs the
  // initial navigation; otherwise the 404 hook can be installed too late to
  // catch a direct hit on a non-existent route.
  return import('@plausible-analytics/tracker').then(({ init, track }) => {
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
