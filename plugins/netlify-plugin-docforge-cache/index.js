import { readdir } from 'fs/promises';
import { join } from 'path';

const CACHE_DIR = '.docforge-cache';
const CACHE_TTL = 86400;

async function collectDigests(baseDir) {
  const digests = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch (err) {
      if (err.code === 'ENOENT') return;
      throw err;
    }
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
        digests.push(fullPath);
      }
    }
  }

  await walk(baseDir);
  return digests;
}

export const onPreBuild = async function ({ utils }) {
  if (process.env.CONTEXT === 'production') {
    console.log('Production build — skipping docforge cache restore (always fresh).');
    await utils.cache.remove(CACHE_DIR);
    return;
  }

  const restored = await utils.cache.restore(CACHE_DIR);
  if (restored) {
    console.log('Docforge cache restored from previous build.');
  } else {
    console.log('No docforge cache found — will be populated after this build.');
  }
};

export const onPostBuild = async function ({ utils }) {
  if (process.env.CONTEXT === 'production') {
    console.log('Production build — not saving docforge cache.');
    return;
  }

  const digests = await collectDigests('.docforge');

  const saved = await utils.cache.save(CACHE_DIR, {
    ttl: CACHE_TTL,
    digests,
  });

  if (saved) {
    console.log(`Docforge cache saved (TTL: 24h, tracking ${digests.length} digest files).`);
  } else {
    console.log('Docforge cache directory not found — nothing to save.');
  }
};
