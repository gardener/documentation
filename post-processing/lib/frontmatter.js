import { readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';

// Serializes frontmatter + body and reproduces docforge's yaml.Marshal output
// byte-for-byte: gray-matter/js-yaml default (preserve order, quotes only where
// YAML strictly requires them, long values as folded block scalar). No options
// override, otherwise it would introduce new diff noise.
export function stringify(content, data) {
  return matter.stringify(content, data);
}

export function read(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`frontmatter.read: cannot read ${filePath}: ${err.message}`);
  }
  try {
    const parsed = matter(raw, { cache: false });
    return { data: parsed.data, content: parsed.content };
  } catch (err) {
    throw new Error(`frontmatter.read: invalid YAML in ${filePath}: ${err.message}`);
  }
}

// A-guard: serializes and compares against the current content. Writes only on
// difference. true = written, false = identical (no mtime churn).
export function write(filePath, content, data) {
  const next = stringify(content, data);
  let current = null;
  try {
    current = readFileSync(filePath, 'utf-8');
  } catch {
    current = null;
  }
  if (current === next) return false;
  try {
    writeFileSync(filePath, next, 'utf-8');
  } catch (err) {
    throw new Error(`frontmatter.write: cannot write ${filePath}: ${err.message}`);
  }
  return true;
}
