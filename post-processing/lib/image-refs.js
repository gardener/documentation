// Lowercases the filename of local image references in Markdown without
// touching directory segments or external http(s) URLs. Idempotent:
// already lowercase stays unchanged.
//
// Why only the filename: docforge sometimes emits images in camelCase, the
// physical assets are stored lowercase via rename. The reference must match
// the lowercase filename, but directory segments may keep their
// upper-/lowercase.
//
// Two syntaxes are covered: Markdown ![alt](/path/File.png) and inline HTML
// <img src="/path/File.png">, since upstream docs mix both.
const IMAGE_REF = /(!\[[^\]]*\]\()(\/[^):]*?)([^/):]+\.(?:png|jpg|jpeg|svg|webp))(\))/gi;
const HTML_IMG_REF = /(<img\b[^>]*?\bsrc=["'])(\/[^"']*?)([^/"']+\.(?:png|jpg|jpeg|svg|webp))(["'])/gi;

export function lowercaseImageRefs(content) {
  const lowerFile = (_m, open, dir, file, close) => open + dir + file.toLowerCase() + close;
  return content
    .replace(IMAGE_REF, lowerFile)
    .replace(HTML_IMG_REF, lowerFile);
}
