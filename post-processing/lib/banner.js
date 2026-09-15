import { buildUpstreamUrl } from './upstream-url.js';

export { buildUpstreamUrl };

const MARKER_MANAGED = '<!-- BANNER:MANAGED -->';
const MARKER_LOCAL = '<!-- BANNER:LOCAL -->';
const MARKER_GENERATED = '<!-- BANNER:GENERATED -->';
const MARKER_PREFIX = '<!-- BANNER:';

const MANAGED_TEMPLATE = `${MARKER_MANAGED}
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   {upstreamUrl}
-->`;

const LOCAL_BANNER = `${MARKER_LOCAL}
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/          │
   │  documentation                                 │
   │                                                │
   │  Go ahead and edit this file directly.         │
   │  Changes here are the source of truth.         │
   └────────────────────────────────────────────────┘
-->`;

const GENERATED_BANNER = `${MARKER_GENERATED}
<!--
   █▀▀ █▀▀ █▄ █
   █ █ █▀▀ █ ▀█
   ▀▀▀ ▀▀▀ ▀  ▀

   ┌────────────────────────────────────────────────┐
   │  GENERATED FILE — navigation stub              │
   │                                                │
   │  Created by post-processing/part-index.js      │
   │  (addMissingIndexFiles). It has no upstream    │
   │  source; the aggregation run recreates it.     │
   │                                                │
   │  Do not edit and do not commit by hand.        │
   └────────────────────────────────────────────────┘
-->`;

// Any file under content/blog/ -> local (blog posts are authored here, not
// aggregated). Otherwise based on frontmatter. github_repo -> managed (upstream
// source of truth). auto_generated -> generated (a navigation stub written by
// part-index.js, no upstream).
// Then: index.md with an empty body is a docforge navigation stub , everything else is local.
export function classify(data, content, file = '') {
  // A hand-set `local: true` in the frontmatter declares the file locally
  // managed and wins over every other rule, including github_repo.
  if (data.local === true) return 'local';
  if (/(^|[/\\])content[/\\]blog[/\\]/.test(file) && !data.github_repo) return 'local';
  if (data.github_repo) return 'managed';
  if (data.auto_generated) return 'generated';
  if (content.trim().length === 0 && file.split(/[/\\]/).pop() === 'index.md') return 'generated';
  return 'local';
}

export function renderBanner(kind, url) {
  if (kind === 'managed') return MANAGED_TEMPLATE.replace('{upstreamUrl}', url);
  if (kind === 'generated') return GENERATED_BANNER;
  return LOCAL_BANNER;
}

export function hasBanner(content) {
  return content.includes(MARKER_PREFIX);
}

export function injectBanner(content, bannerBlock) {
  if (hasBanner(content)) return content;
  return `${bannerBlock}\n\n${content}`;
}

// Splits a leading banner block (marker line + following <!-- --> comment)
// from the remaining content. This lets the content analysis ignore the banner.
export function splitLeadingBanner(content) {
  const match = content.match(
    /^\s*(<!-- BANNER:(?:MANAGED|LOCAL|GENERATED) -->\r?\n<!--[\s\S]*?-->)\s*/,
  );
  if (!match) return { banner: null, rest: content };
  return { banner: match[1], rest: content.slice(match.index + match[0].length) };
}

// Returns the banner kind ('managed' | 'local' | 'generated') of the file's
// leading banner, or null when there is none. Used to detect a stale banner
// that no longer matches the file's current classification.
export function bannerKind(content) {
  const { banner } = splitLeadingBanner(content.trimStart());
  if (banner === null) return null;
  if (banner.startsWith(MARKER_MANAGED)) return 'managed';
  if (banner.startsWith(MARKER_LOCAL)) return 'local';
  if (banner.startsWith(MARKER_GENERATED)) return 'generated';
  return null;
}
