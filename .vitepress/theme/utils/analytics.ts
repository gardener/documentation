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

/**
 * Collect coarse, non-PII browser environment signals so we can distinguish
 * headless scraper farms from real desktop visitors in Plausible.
 * Expensive checks (WebGL context, automation globals) run once at init;
 * dynamic state (focus, history length) is read per event.
 */
function createBotSignalsGetter(): () => Record<string, string> {
  const flags: string[] = []
  const nav = navigator as Navigator & {
    userAgentData?: { brands?: Array<{ brand: string }> }
    deviceMemory?: number
    pdfViewerEnabled?: boolean
    connection?: { effectiveType?: string; rtt?: number; downlink?: number }
  }
  const scr = window.screen

  if (/HeadlessChrome/i.test(nav.userAgent)) flags.push('ua-headless')
  if (nav.userAgentData?.brands?.some((b) => /Headless/i.test(b.brand))) flags.push('uad-headless')
  if (window.outerWidth === 0 || window.outerHeight === 0) flags.push('zero-outer')
  else if (window.outerHeight === window.innerHeight && window.outerWidth === window.innerWidth) flags.push('no-chrome')
  if (scr && scr.width > 0 && scr.availWidth === scr.width && scr.availHeight === scr.height) flags.push('no-taskbar')
  if (!nav.languages || nav.languages.length === 0) flags.push('no-langs')
  if (nav.plugins?.length === 0 && /Chrome/i.test(nav.userAgent)) flags.push('no-plugins')
  if (nav.pdfViewerEnabled === false && /Chrome/i.test(nav.userAgent)) flags.push('no-pdf')
  if (nav.connection?.rtt === 0) flags.push('zero-rtt')
  if (nav.webdriver === true) flags.push('webdriver')
  if ('webdriver' in nav && Object.prototype.hasOwnProperty.call(nav, 'webdriver')) flags.push('patched-webdriver')
  if (Object.keys(window).some((k) => /^cdc_|^__puppeteer|^__playwright|^__selenium/.test(k))) flags.push('automation-global')

  let webgl = 'unavailable'
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (gl) {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info')
      const rawRenderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : String(gl.getParameter(gl.RENDERER))
      if (/swiftshader/i.test(rawRenderer)) webgl = 'swiftshader'
      else if (/llvmpipe|softpipe/i.test(rawRenderer)) webgl = 'llvmpipe'
      else if (/offscreen|software|virtualbox|vmware|virgl/i.test(rawRenderer)) webgl = 'software'
      else webgl = 'hardware'
    }
  } catch {
    webgl = 'error'
  }

  let tz = 'unknown'
  try {
    const rawTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (/^(UTC|Etc\/(UTC|GMT|Universal))$/i.test(rawTz)) tz = 'utc'
    else if (rawTz.includes('/')) tz = rawTz.split('/')[0]
    else if (rawTz) tz = 'other'
  } catch {
    // ignore
  }

  const w = window.innerWidth
  const h = window.innerHeight
  const dpr = window.devicePixelRatio || 1
  const isDefaultHeadlessSize = (w === 800 && h === 600) || (w === 1280 && h === 720) || (w === 1920 && h === 1080)
  const viewport =
    w === 0 || h === 0
      ? 'zero'
      : isDefaultHeadlessSize && dpr === 1
        ? 'headless-default'
        : dpr > 1
          ? 'hidpi'
          : 'standard'

  const langCount = nav.languages?.length ?? 0
  const lang = langCount === 0 ? 'none' : langCount === 1 ? 'single' : 'multi'

  const cores = nav.hardwareConcurrency ?? 0
  const mem = nav.deviceMemory ?? 0
  const hw = cores === 0 ? 'unknown' : cores <= 2 || (mem > 0 && mem <= 2) ? 'low' : cores <= 4 ? 'mid' : 'high'

  const rtt = nav.connection?.rtt
  const net = typeof rtt !== 'number' ? 'unknown' : rtt === 0 ? 'zero-rtt' : 'normal'

  const staticSignals = {
    webgl,
    headless: flags.length > 0 ? flags.join(',') : 'none',
    tz,
    viewport,
    lang,
    hw,
    net,
  }

  return () => ({
    ...staticSignals,
    focus: `${document.hasFocus() ? 'focused' : 'unfocused'}-${window.history.length <= 1 ? 'entry' : 'nav'}`,
  })
}

export function initAnalytics(router: Router): Promise<void> {
  // Return the promise so enhanceApp can await it before VitePress runs the
  // initial navigation; otherwise the 404 hook can be installed too late to
  // catch a direct hit on a non-existent route.
  return import('@plausible-analytics/tracker').then(({ init, track }) => {
    init({
      domain: 'gardener.cloud',
      // Netlify proxy; localhost is ignored by the tracker (captureOnLocalhost defaults to false)
      endpoint: '/pa/event',
      autoCapturePageviews: true,
      outboundLinks: true,
      fileDownloads: true,
      customProperties: createBotSignalsGetter(),
    })
    trackNotFound(router, track)
    trackCopyClicks(track)
    trackSearch(track)
  })
}
