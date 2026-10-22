import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import alpinejs from '@astrojs/alpinejs'
import robotsTxt from 'astro-robots-txt'
import plantuml from 'astro-plantuml'
import mermaid from 'astro-mermaid'
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math'
import remarkEmoji from 'remark-emoji'
import rehypeKatex from 'rehype-katex'
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs'
import { remarkDiagram } from './remark-plugins/remark-diagram.mjs'
import icon from 'astro-icon'
import markdoc from '@astrojs/markdoc'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['astro-leaflet > leaflet'],
    }
  },
  site: 'https://blog.nuovotaka.com/',
  base: '/',
  image: {
    layout: 'constrained'
  },
  integrations: [
    icon(),
    sitemap(),
    alpinejs(),
    robotsTxt(),
    markdoc(),
    mdx(),
    plantuml(),
    mermaid()
  ],
  markdown: {
    processor: unified(),
    remarkPlugins: [remarkReadingTime, remarkMath, remarkDiagram, remarkEmoji],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  },
  scopedStyleStrategy: 'where'
})
