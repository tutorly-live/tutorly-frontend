import { useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Features } from './sections/Features'
import { HowItWorks } from './sections/HowItWorks'
import { Showcase } from './sections/Showcase'
import { Pricing } from './sections/Pricing'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { DownloadCTA, Footer } from './sections/Footer'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

interface AppProps {
  initialPath?: string
}

export default function App({ initialPath = '/' }: AppProps) {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/'
    }
    return initialPath.replace(/\/$/, '') || '/'
  })

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname.replace(/\/$/, '') || '/')
    }
    window.addEventListener('popstate', onLocationChange)

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      // Seamless client-side navigation for internal pages
      const normalized = href.replace(/\/$/, '') || '/'
      if (normalized === '/privacy' || normalized === '/privacy-policy' || normalized === '/') {
        e.preventDefault()
        if (window.location.pathname.replace(/\/$/, '') !== normalized.replace(/\/$/, '')) {
          window.history.pushState({}, '', href)
          setPath(normalized)
          window.scrollTo(0, 0)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const isPrivacy = path === '/privacy' || path === '/privacy-policy'

  return (
    // Respect the OS "reduce motion" setting for every animation on the page.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-tertiary"
        >
          Skip to content
        </a>
        <Navbar isPrivacy={isPrivacy} />
        <main id="main" className="pt-[78px]">
          {isPrivacy ? (
            <PrivacyPolicy />
          ) : (
            <>
              <Hero />
              <Marquee />
              <Features />
              <HowItWorks />
              <Showcase />
              <Pricing />
              <Testimonials />
              <FAQ />
              <DownloadCTA />
            </>
          )}
        </main>
        <Footer isPrivacy={isPrivacy} />
      </div>
    </MotionConfig>
  )
}
