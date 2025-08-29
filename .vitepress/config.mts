import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import blogSidebar from './theme/blog-sidebar.ts'
import {communitySidebar} from "./theme/community-sidebar.ts";
import path from 'path'

const indexPattern = new RegExp(/\/?_?index\.md$/i);

export default defineConfig({
  base: process.env.VITE_PUBLIC_BASE_PATH || '',
  srcDir: 'hugo/content',
  cleanUrls: true,
  rewrites(id) {
    if (!indexPattern.test(id) && id.endsWith('.md')) {
      return id.slice(0, -3) + '/index.md';
    }

    return id;
  },
  srcExclude: [
    '**/archived/**',
    // Custom template tag is used, check for alternative
    '**/community-bio.md', //Ignore for now
    // Generated api reference which uses <> so indicate consumer input, CAPS could be used instead or escape via code block ``,
    //'**/api-reference/extensions.md',
    //'**/api-reference/operator.md',
    //'**/api-reference/seedmanagement.md',
    //'**/api-reference/core-v1.md',
    //'**/api-reference/core.md',
    //'**/etcd-druid/api-reference.md',
    //'**/machine-controller-manager/documents/apis.md',
    // Missing end tag <> used in normal text not in code block
    '**/other-components/network-problem-detector/**',
    // Custom template tag is used instead of normal markdown alert or github alert
    // https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
    //'**/tutorials/tutorial-custom-domain-with-istio.md',
    //'**/security-and-compliance/report.md',
      '**/html/**'
  ],
  lastUpdated: true,
  ignoreDeadLinks: true, //ToDo enable after migration
  title: "Gardener",
  description: "A Managed Kubernetes Service Done Right",
  head: getHeadConfig() as any,
  themeConfig: getThemeConfig() as any,
  vite: getViteConfig(),
  markdown: {
    languages: ['go'],
    languageAlias: {
      golang: 'go',
      code: 'shell',
      term: 'shell',
      b: 'shell',
    },
  }
}
)
function getNavConfig () {
  return [
    {
      text: 'Demo',
      link: 'https://demo.gardener.cloud/',
    },
    {
      text: 'Adopters',
      link: '/adopter',
      activeMatch: 'adopter',
    },
    {
      component: 'VPNavbarMenuGroupWrapper',
      props: {
        text: 'Documentation',
        link: '/docs/',
        activeMatch: 'docs',
        items: [
          {text: 'User', link: '/docs/index.md',},
          {text: 'Operator', link: '/docs/index.md',},
          {text: 'Developer', link: '/docs/index.md',},
          {text: 'All', link: '/docs/index.md',},
        ],
      },
    },
    {
      text: 'Blogs',
      link: '/blog',
      activeMatch: 'blog',
    },
    {
      text: 'Community',
      link: '/community',
      activeMatch: 'community',
    },
  ]
}
function getSearchConfig() {
  return {
      provider: 'local',
      detailedView: true,
      options: {
        detailedView: true,
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            // Configure how fields are extracted from documents
            extractField: (document, fieldName) => {
              // Extract frontmatter metadata for search
              if (fieldName === 'categories' && document.frontmatter?.categories) {
                return Array.isArray(document.frontmatter.categories)
                    ? document.frontmatter.categories.join(' ')
                    : document.frontmatter.categories;
              }
              if (fieldName === 'tags' && document.frontmatter?.tags) {
                return Array.isArray(document.frontmatter.tags)
                    ? document.frontmatter.tags.join(' ')
                    : document.frontmatter.tags;
              }
              if (fieldName === 'description' && document.frontmatter?.description) {
                return document.frontmatter.description;
              }
              if (fieldName === 'page_synonyms' && document.frontmatter?.page_synonyms) {
                return Array.isArray(document.frontmatter.page_synonyms)
                    ? document.frontmatter.page_synonyms.join(' ')
                    : document.frontmatter.page_synonyms;
              }
              // Extract default fields
              return document[fieldName];
            },
            // Custom tokenizer to handle special characters in technical docs
            tokenize: (text) => text.toLowerCase().split(/[\s\-_/]+/),
            // Process terms to improve search (e.g., stemming)
            processTerm: (term) => term.toLowerCase()
          },
          /**
           * @type {import('minisearch').SearchOptions}
           */
          searchOptions: {
            // Fuzzy search with prefix matching for better results
            fuzzy: 0.2,
            prefix: true,
            // Boosting: Give more weight to title, less to tags/categories
            boost: {
              title: 5,        // Most important
              text: 3,         // Body content
              headings: 4,     // Section headings
              tags: 2,         // Tags metadata
              categories: 2,   // Categories metadata
              description: 4,  // Description field
              page_synonyms: 3 // Synonyms/alternate terms
            },
            // Fields to search in
            fields: ['title', 'text', 'headings', 'tags', 'categories', 'description', 'page_synonyms']
          }
        }
      }
    }
}

function getThemeConfig() {
  return {
    logo: {src: '/gardener-logo.svg', width: 24, height: 24},
    nav: getNavConfig(),
    sidebar: {
      '/blog/': blogSidebar()['/blog/'],
      //@ts-ignore
      '/community/': communitySidebar()['/community/'],
      //@ts-ignore
      '/docs/': { //generateEnhancedDocsSidebar()['/docs/'],
        "base": "/docs/",
        "text": "Docs",
        "items": [
          {
            "text": "Gardener",
            "link": "gardener/index.md",
            "items": [
              {
                "text": "Concepts",
                "link": "gardener/concepts/index.md",
              }
            ]
          }
        ],
      },
    },
    editLink: {
      pattern: ({filePath, frontmatter}) => {
        const fileName = `${frontmatter?.path_base_for_github_subdir?.to ?? filePath.split("/").pop()}`
        const githubLink = `${frontmatter['github_repo']}/tree/master/${frontmatter['github_subdir']}/${fileName}`
        return githubLink
      },
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      {
        icon: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="250" viewBox="0 0 256 250"><path fill="--vp-c-text-1" d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"/></svg>'
        },
        link: 'https://github.com/gardener'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#e01e5a" d="M53.841 161.32c0 14.832-11.987 26.82-26.819 26.82S.203 176.152.203 161.32c0-14.831 11.987-26.818 26.82-26.818H53.84zm13.41 0c0-14.831 11.987-26.818 26.819-26.818s26.819 11.987 26.819 26.819v67.047c0 14.832-11.987 26.82-26.82 26.82c-14.83 0-26.818-11.988-26.818-26.82z"/><path fill="#36c5f0" d="M94.07 53.638c-14.832 0-26.82-11.987-26.82-26.819S79.239 0 94.07 0s26.819 11.987 26.819 26.819v26.82zm0 13.613c14.832 0 26.819 11.987 26.819 26.819s-11.987 26.819-26.82 26.819H26.82C11.987 120.889 0 108.902 0 94.069c0-14.83 11.987-26.818 26.819-26.818z"/><path fill="#2eb67d" d="M201.55 94.07c0-14.832 11.987-26.82 26.818-26.82s26.82 11.988 26.82 26.82s-11.988 26.819-26.82 26.819H201.55zm-13.41 0c0 14.832-11.988 26.819-26.82 26.819c-14.831 0-26.818-11.987-26.818-26.82V26.82C134.502 11.987 146.489 0 161.32 0s26.819 11.987 26.819 26.819z"/><path fill="#ecb22e" d="M161.32 201.55c14.832 0 26.82 11.987 26.82 26.818s-11.988 26.82-26.82 26.82c-14.831 0-26.818-11.988-26.818-26.82V201.55zm0-13.41c-14.831 0-26.818-11.988-26.818-26.82c0-14.831 11.987-26.818 26.819-26.818h67.25c14.832 0 26.82 11.987 26.82 26.819s-11.988 26.819-26.82 26.819z"/></svg>'
        },
        link: 'https://join.slack.com/t/gardener-cloud/shared_invite/zt-33c9daems-3oOorhnqOSnldZPWqGmIBw'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="180" viewBox="0 0 256 180"><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>'
        },
        link: 'https://www.youtube.com/@GardenerProject'
      }
    ],
    search: getSearchConfig(),
  }
}

function getViteConfig() {
  return {
    build:{
      chunkSizeWarningLimit: 5000,
    },
    resolve: {
      alias: [
        {
          find: '@data',
          replacement: path.resolve(__dirname, './data')
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './theme/components')
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/VPFeature.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPTeamMembersItem\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/VPTeamMembersItem.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBarMenuLink\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/VPNavBarMenuLink.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPSidebarGroup\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/VPSidebarGroup.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPMenu\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/VPMenu.vue', import.meta.url)
          )
        },
      ]
    }
  }
}

function getHeadConfig(){
  return [
    /* Start: https://realfavicongenerator.net/ */
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    /* End: https://realfavicongenerator.net */
    ['meta', {name: 'theme-color', content: '#009f76'}],
    ['meta', {property: 'og:type', content: 'website'}],
    ['meta', {property: 'og:site_name', content: 'Gardener'}],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://raw.githubusercontent.com/gardener/documentation/refs/heads/master/website/public/og-gardener.png'
      }
    ],
    ['meta', {property: 'og:url', content: 'https://gardener.cloud/'}],
    [
      'script',
      {defer: '', "data-domain": 'gardener.cloud', src: 'https://plausiable-poc.demo.shoot.dev.k8s-hana.ondemand.com/js/script.file-downloads.outbound-links.js' }
    ],
    [
      'script',
      {},
      `
      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
      `
    ]
  ]
}
