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
   │  (addMissingIndexFiles). It has no upstream     │
   │  source; the aggregation run recreates it.      │
   │                                                │
   │  Do not edit and do not commit by hand.         │
   └────────────────────────────────────────────────┘
-->`;

// Based solely on frontmatter. github_repo -> managed (upstream source of truth).
// auto_generated -> generated (a navigation stub written by part-index.js, no
// upstream). Then: editLink:false with an empty body is a docforge navigation
// stub (skip), everything else is local.
export function classify(data, content) {
  if (data.github_repo) return 'managed';
  if (data.auto_generated) return 'generated';
  if (data.editLink === false && content.trim().length === 0) return 'skip';
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
