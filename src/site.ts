import site from '../site.json'

/** Single source of truth for URLs and brand copy (also read by vite.config.ts and scripts/prerender.mjs). */
export const playStoreUrl = `https://play.google.com/store/apps/details?id=${site.playStoreId}`

export default site
