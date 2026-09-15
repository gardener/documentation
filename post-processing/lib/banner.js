import { buildUpstreamUrl } from './upstream-url.js';

export { buildUpstreamUrl };

const MARKER_MANAGED = '<!-- BANNER:MANAGED -->';
const MARKER_LOCAL = '<!-- BANNER:LOCAL -->';
const MARKER_PREFIX = '<!-- BANNER:';

// MANAGED covers every file the aggregation run owns and recreates. It has three
// shapes depending on where the file comes from:
//   - upstream: aggregated from a source repo -> print the PR URL
//   - stub:     a navigation stub written by post-processing/part-index.js
//               because the directory would otherwise have no index.md
//   - docforge: an empty index.md emitted by docforge for a manifest `dir`
//               whose `_index.md` node has no `source`
const MANAGED_UPSTREAM_TEMPLATE = `${MARKER_MANAGED}
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

const MANAGED_STUB_TEMPLATE = `${MARKER_MANAGED}
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — navigation stub                │
   │                                                │
   │  Editing here is pointless: The aggregation    │
   │  run recreates this file.                      │
   │                                                │
   │  It has no upstream source. post-processing    │
   │  creates it because the directory would        │
   │  otherwise have no index.md:                   │
   │  post-processing/part-index.js                 │
   └────────────────────────────────────────────────┘
-->`;

const MANAGED_DOCFORGE_TEMPLATE = `${MARKER_MANAGED}
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — empty aggregator index         │
   │                                                │
   │  Editing here is pointless: The aggregation    │
   │  run overwrites this file.                     │
   │                                                │
   │  It is an empty index.md emitted by docforge   │
   │  for a manifest directory without a source.    │
   │  Change it in the manifests instead:           │
   │  .docforge/                                    │
   └────────────────────────────────────────────────┘
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

// A file the aggregation run owns. github_repo -> aggregated from upstream
// (source of truth). Otherwise it is an index page with no upstream source:
// either a post-processing navigation stub (auto_generated) or an empty
// docforge aggregator index (a manifest `dir` whose `_index.md` has no source).
// All three are recreated by the aggregation run, so they carry one MANAGED
// banner; renderBanner picks the wording.
export function classify(data, content, file = '') {
  // A hand-set `local: true` in the frontmatter declares the file locally
  // managed and wins over every other rule, including github_repo.
  if (data.local === true) return 'local';
  if (/(^|[/\\])content[/\\]blog[/\\]/.test(file) && !data.github_repo) return 'local';
  if (data.github_repo) return 'managed';
  if (data.auto_generated) return 'managed';
  // Strip a leading banner before checking for an empty body: an already
  // injected banner (current MANAGED/LOCAL, or a legacy GENERATED one from
  // before the type was dropped) would otherwise count as content and hide the
  // fact that this is an empty aggregator index.
  const body = stripLegacyGeneratedBanner(splitLeadingBanner(content.trimStart()).rest.trimStart());
  if (body.trim().length === 0 && file.split(/[/\\]/).pop() === 'index.md') return 'managed';
  return 'local';
}

// Legacy cleanup: the GENERATED banner type was removed and those files are
// MANAGED now. splitLeadingBanner no longer recognizes a GENERATED block, so it
// is stripped separately (marker line + its <!-- --> comment) wherever a leading
// banner must be ignored. A no-op once the aggregation run has recreated the file.
export function stripLegacyGeneratedBanner(content) {
  return content.replace(/^\s*<!-- BANNER:GENERATED -->\r?\n<!--[\s\S]*?-->\s*/, '');
}

// Renders the banner for a classification. For managed files, opts selects the
// wording: { url } prints the upstream PR link; { autoGenerated: true } uses the
// post-processing stub wording; otherwise the empty-docforge-index wording.
export function renderBanner(kind, opts = {}) {
  if (kind === 'managed') {
    if (opts.url) return MANAGED_UPSTREAM_TEMPLATE.replace('{upstreamUrl}', opts.url);
    if (opts.autoGenerated) return MANAGED_STUB_TEMPLATE;
    return MANAGED_DOCFORGE_TEMPLATE;
  }
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
    /^\s*(<!-- BANNER:(?:MANAGED|LOCAL) -->\r?\n<!--[\s\S]*?-->)\s*/,
  );
  if (!match) return { banner: null, rest: content };
  return { banner: match[1], rest: content.slice(match.index + match[0].length) };
}

// Returns the banner kind ('managed' | 'local') of the file's leading banner,
// or null when there is none. Used to detect a stale banner that no longer
// matches the file's current classification.
export function bannerKind(content) {
  const { banner } = splitLeadingBanner(content.trimStart());
  if (banner === null) return null;
  if (banner.startsWith(MARKER_MANAGED)) return 'managed';
  if (banner.startsWith(MARKER_LOCAL)) return 'local';
  return null;
}
