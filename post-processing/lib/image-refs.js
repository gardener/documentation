// Lowercases the filename of local image references in Markdown without
// touching directory segments or external http(s) URLs. Idempotent:
// already lowercase stays unchanged.
//
// Why only the filename: docforge sometimes emits images in camelCase, the
// physical assets are stored lowercase via rename. The reference must match
// the lowercase filename, but directory segments may keep their
// upper-/lowercase.
const IMAGE_REF = /(!\[[^\]]*\]\()(\/[^):]*?)([^/):]+\.(?:png|jpg|jpeg|svg|webp))(\))/gi;

export function lowercaseImageRefs(content) {
  return content.replace(IMAGE_REF, (_m, open, dir, file, close) => {
    return open + dir + file.toLowerCase() + close;
  });
}
