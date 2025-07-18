/*
MIT License

Copyright (c) 2019-present, Yuxi (Evan) You

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copied and adapted from -> https://github.com/vitejs/vite/blob/9b98dcbf75546240e1609185828e18a77bac8c8d/docs/_data/blog.data.ts
*/

import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {

    return raw
        .filter(page => {
          // Filter out index files and images
          const isIndex = page.url.includes('_index') || page.url === '/blog/' || page.url.includes('/images/');

          // Check if it's not a folder
          const isNotFolder = !page.url.endsWith('/');

          // Check if page has a date in frontmatter or in filename
          let hasDate = !!(page.frontmatter.publishdate || page.frontmatter.date);

          // If no date in frontmatter, try to extract from filename
          if (!hasDate && page.url) {
            // URLs like /blog/2019/06.11-Feature-Flags...
            const datePattern = /\/(\d{4})\/(\d{2})\.(\d{2})-/;
            hasDate = datePattern.test(page.url);
          }

          return !isIndex && isNotFolder;
        })
        .map(({ url, frontmatter, excerpt }) => {
          // Try to get date from frontmatter
          let dateValue = frontmatter.publishdate || frontmatter.date;

          // If no date in frontmatter, try to extract from URL/filename
          if (!dateValue && url) {
            const match = url.match(/\/(\d{4})\/(\d{2})\.(\d{2})-/);
            if (match) {
              const [, year, month, day] = match;
              dateValue = `${year}-${month}-${day}`;
            }
          }

          return {
            title: frontmatter.title || frontmatter.linkTitle || 'Untitled',
            url,
            excerpt,
            date: formatDate(dateValue)
          };
        })
        .sort((a, b) => b.date.time - a.date.time)
  }
})


function formatDate(raw: string | Date): Post['date'] {
  if (!raw) {
    // Fallback for posts without dates
    console.warn('Post missing date, using current date as fallback');
    const now = new Date();
    return {
      time: +now,
      string: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }

  const date = new Date(raw);

  // If the date is invalid, try parsing with a different format
  if (isNaN(date.getTime())) {
    // Try to parse from format like "2019-05-24" or other common formats
    console.warn(`Invalid date format: ${raw}, attempting to parse differently`);

    // Try different parsing strategies
    if (typeof raw === 'string') {
      // Try to extract a date from formats like "2019/06.11-Feature..."
      const match = raw.match(/(\d{4})[-/.](\d{2})[-/.](\d{2})/);
      if (match) {
        const [, year, month, day] = match;
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate.getTime())) {
          return {
            time: +parsedDate,
            string: parsedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          };
        }
      }
    }

    // If all else fails, use current date
    const fallback = new Date();
    return {
      time: +fallback,
      string: fallback.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }

  // Normal case - valid date
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
