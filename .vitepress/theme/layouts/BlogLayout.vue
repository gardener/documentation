<template>
  <Layout>
    <template #doc-footer-before>
      <div class="blog-meta" v-if="frontmatter.authors || frontmatter.publishdate">
        <div class="blog-authors" v-if="frontmatter.authors && frontmatter.authors.length > 0">
          <span class="authors-list">
            <span class="meta-label">By:</span>
            <template v-for="(author, index) in frontmatter.authors" :key="index">
              <span class="author">
                <img 
                  v-if="author.avatar" 
                  :src="author.avatar" 
                  :alt="author.name"
                  class="author-avatar"
                />
                <span class="author-name">{{ author.name }}</span>
              </span>
              <span v-if="index < frontmatter.authors.length - 1" class="author-separator">, </span>
            </template>
          </span>
        </div>
        <div class="blog-date" v-if="frontmatter.publishdate">
          <span class="meta-label">Published:</span>
          <time :datetime="frontmatter.publishdate" class="publish-date">
            {{ formatDate(frontmatter.publishdate) }}
          </time>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-meta {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.blog-authors,
.blog-date {
  margin-bottom: 0.5rem;
}

.blog-date:last-child {
  margin-bottom: 0;
}

.meta-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.authors-list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
}

.author {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.author-separator {
  color: var(--vp-c-text-2);
}

.publish-date {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

@media (max-width: 768px) {
  .blog-meta {
    margin: 1rem 0;
    padding: 0.75rem;
  }
  
  .authors-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .author-separator {
    display: none;
  }
}
</style>
