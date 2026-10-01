import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { DownloadSimple, List, X } from '@phosphor-icons/react'
import { Logo } from '../components/ui'
import { useActiveSection } from '../lib/hooks'
import { ease } from '../lib/motion'
import { btn } from '../lib/styles'

const links = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'showcase', label: 'The App' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
]
const ids = links.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()

  // Floating pill: lifts on scroll, tucks away when scrolling down, returns on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 12)
    setHidden(y > prev && y > 400 && !open)
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease }}
    >
      <div
        className={`mx-auto max-w-[1200px] rounded-xl border bg-surface transition-[box-shadow,border-color] duration-300 ${
          scrolled || open ? 'border-line shadow-raised' : 'border-transparent'
        }`}
      >
        <nav className="flex h-[66px] items-center justify-between gap-6 pl-4 pr-3 sm:pl-5" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[14px] leading-5 transition-colors ${
                      isActive ? 'font-semibold text-primary-80' : 'text-ink hover:text-primary-80'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-tint" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <a href="#download" className={btn.primary}>
              <DownloadSimple size={18} weight="bold" />
              Download App
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-variant lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? 'x' : 'list'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {open ? <X size={22} /> : <List size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-line px-3 pb-4 pt-3">
                <ul className="space-y-1">
                  {links.map((l, i) => (
                    <motion.li key={l.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                      <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-[16px] leading-6 text-ink hover:bg-surface-variant">
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <a href="#download" onClick={() => setOpen(false)} className={`${btn.primary} mt-3 w-full`}>
                  <DownloadSimple size={18} weight="bold" />
                  Download App
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
