import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export { faqs } from './data.ts'

/** Used at build time by scripts/prerender.mjs to produce static, crawlable HTML. */
export function render(url = '/') {
  return renderToString(
    <StrictMode>
      <App initialPath={url} />
    </StrictMode>,
  )
}
