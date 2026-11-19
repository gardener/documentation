// Blog posts default to prev/next footer links (chronological series);
// docs pages and blog index pages (landing, year, month) default to none.
// Kept separate from config.mts so node --test can import it without the
// vitepress/mermaid import chain.
export function prevNextDefaults(relativePath: string): boolean {
  return relativePath.startsWith('blog/') && !relativePath.endsWith('index.md')
}
