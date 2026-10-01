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

export default function App() {
  return (
    // Respect the OS "reduce motion" setting for every animation on the page.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-tertiary">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="pt-[78px]">
          <Hero />
          <Marquee />
          <Features />
          <HowItWorks />
          <Showcase />
          <Pricing />
          <Testimonials />
          <FAQ />
          <DownloadCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
