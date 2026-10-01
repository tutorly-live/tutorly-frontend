import { readFileSync } from 'node:fs'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// Brand + canonical URL live in site.json so HTML, app and prerender stay in sync.
const site = JSON.parse(readFileSync(new URL('./site.json', import.meta.url), 'utf8')) as Record<string, string>

/** Replaces %SITE_URL%, %SITE_TITLE%, … placeholders in index.html. */
function siteMeta(): Plugin {
  const vars: Record<string, string> = {
    SITE_URL: site.url.replace(/\/$/, ''),
    SITE_NAME: site.name,
    SITE_TITLE: site.title,
    SITE_DESCRIPTION: site.description,
    SITE_LOCALE: site.locale,
    PLAY_STORE_ID: site.playStoreId,
  }
  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.replace(/%(\w+)%/g, (m, key: string) => vars[key] ?? m),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    siteMeta(),
  ],
  server: {
    port: 4002,
  },
  preview: {
    port: 4002,
  },
})
