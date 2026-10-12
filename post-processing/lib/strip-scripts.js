// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Gardener contributors
//
// SPDX-License-Identifier: Apache-2.0

/**
 * Strips root-level <script> and <style> blocks from Markdown body text.
 *
 * "Root-level" means the tag appears outside fenced code blocks (``` / ~~~).
 * Markers inside fences are documentation artefacts and are left untouched.
 *
 * Two forms are caught:
 *   Multi-line: opening tag alone on a line, body lines, closing tag.
 *   Inline:     <script …>…</script> anywhere on a non-fenced line (including
 *               sequences like `text</script><script>payload</script>rest`).
 *
 * @param {string} body - Markdown body text (after frontmatter has been removed).
 * @returns {{ stripped: string, removed: Array<{tag: string, lines: number}> }}
 */
export function stripScriptStyleBlocks(body) {
  const lines = body.split('\n');
  const outLines = [];
  const removed = [];

  let inFence = false;
  let fenceMarker = '';
  // When collecting is non-null we are buffering a multi-line block.
  let collecting = null; // { openLine, tag, closingRe, bodyLines }

  // Matches <script …>…</script> or <style …>…</style> anywhere in a string.
  // Used for inline stripping after multi-line and fence checks.
  const INLINE_RE = /<(script|style)(\s[^>]*)?>[\s\S]*?<\/(script|style)>/gi;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ---- Fence tracking (takes priority when not inside a multi-line block) ----
    if (!collecting) {
      const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
      if (fenceMatch) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fenceMatch[1];
        } else if (trimmed.startsWith(fenceMarker)) {
          inFence = false;
          fenceMarker = '';
        }
        outLines.push(line);
        continue;
      }
    }

    if (inFence) {
      outLines.push(line);
      continue;
    }

    // ---- Active collection: buffer lines until closing tag ----
    if (collecting !== null) {
      if (collecting.closingRe.test(trimmed)) {
        removed.push({ tag: collecting.tag, lines: collecting.bodyLines.length + 2 });
        collecting = null;
      } else {
        collecting.bodyLines.push(line);
      }
      continue;
    }

    // ---- Check for multi-line opening <script …> or <style …> ----
    // Matches a tag that fills the whole trimmed line (no trailing content after '>').
    const openMatch = trimmed.match(/^<(script|style)(\s[^>]*)?>$/i);
    if (openMatch) {
      const tag = openMatch[1].toLowerCase();
      collecting = {
        openLine: line,
        tag: `<${tag}>`,
        closingRe: new RegExp(`^<\\/${tag}>$`, 'i'),
        bodyLines: [],
      };
      continue;
    }

    // ---- Strip all inline <script>…</script> / <style>…</style> on this line ----
    // Handles occurrences anywhere: line-start, mid-line, and sequences like
    // `</script><script>payload</script>` where a stray closing tag precedes an
    // inline block.
    INLINE_RE.lastIndex = 0;
    let cleaned = line;
    let match;
    let foundAny = false;
    while ((match = INLINE_RE.exec(line)) !== null) {
      const tag = match[1].toLowerCase();
      removed.push({ tag: `<${tag}>`, lines: 1 });
      foundAny = true;
    }
    if (foundAny) {
      // Replace every inline block with nothing; preserve surrounding text.
      cleaned = line.replace(INLINE_RE, '');
      // Only emit the line if non-empty after stripping.
      if (cleaned.trim().length > 0) {
        outLines.push(cleaned);
      }
      continue;
    }

    outLines.push(line);
  }

  // File ended mid-block: the whole buffer is removed (malformed but dangerous).
  if (collecting !== null) {
    removed.push({ tag: collecting.tag, lines: collecting.bodyLines.length + 1 });
  }

  return { stripped: outLines.join('\n'), removed };
}
