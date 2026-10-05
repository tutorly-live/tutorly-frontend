import { motion } from 'motion/react'
import { CheckCircle, EnvelopeSimple, FacebookLogo, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { Logo, Reveal, StoreBadges } from '../components/ui'
import { container } from '../lib/styles'

export function DownloadCTA() {
  return (
    <section id="download" className="bg-surface py-14 md:py-24">
      <Reveal className={container}>
        <div className="relative grid overflow-hidden rounded-xl bg-primary text-tertiary md:grid-cols-[1.3fr_1fr]">
          {/* soft rings */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-tertiary/15" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-[300px] w-[300px] rounded-full border border-tertiary/15" aria-hidden="true" />

          <div className="relative px-6 py-10 sm:px-10 md:px-14 md:py-16">
            <h2 className="text-[29px] font-bold leading-[35px] md:text-[40px] md:leading-[48px]">Your next great tutor is one tap away</h2>
            <p className="mt-4 max-w-lg text-[16px] leading-6 text-tertiary/80 md:text-[18px] md:leading-7">
              Download Tutorly free and post your first tuition in under a minute.
            </p>
            <StoreBadges tone="light" className="mt-8" />
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[14px] leading-5 text-tertiary/85">
              {['Free for families', 'Verified profiles', 'Hires confirmed in-app'].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={16} weight="fill" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden items-end justify-center md:flex">
            <motion.img
              src="/tutorly-mobile-mockup.webp"
              alt=""
              width={284}
              height={566}
              loading="lazy"
              initial={{ y: 160, rotate: 6 }}
              whileInView={{ y: 40, rotate: -4 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
              className="w-[260px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const columns = [
  {
    title: 'Product',
    links: [
      { l: 'Features', h: '#features' },
      { l: 'How It Works', h: '#how-it-works' },
      { l: 'The App', h: '#showcase' },
      { l: 'Pricing', h: '#pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { l: 'FAQ', h: '#faq' },
      { l: 'Reviews', h: '#testimonials' },
      { l: 'Download', h: '#download' },
      { l: 'Contact us', h: 'mailto:support@tutorly.app' },
    ],
  },
]

export function Footer({ isPrivacy = false }: { isPrivacy?: boolean }) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className={`${container} pb-8 pt-14`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="h-14" />
            <p className="mt-4 max-w-xs text-[14px] leading-5 text-muted">
              Bangladesh&rsquo;s trusted tutor–student matchmaking platform. Made in Chittagong.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: FacebookLogo, label: 'Facebook', h: '#' },
                { icon: WhatsappLogo, label: 'WhatsApp', h: 'https://wa.me/8801700000000' },
              ].map((s) => (
                <a key={s.label} href={s.h} aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary hover:text-primary-80">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[14px] font-bold leading-5 text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const href = isPrivacy && l.h.startsWith('#') ? `/${l.h}` : l.h
                  return (
                    <li key={l.l}>
                      <a href={href} className="text-[14px] leading-5 text-muted transition-colors hover:text-primary-80">{l.l}</a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-[14px] font-bold leading-5 text-ink">Contact</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-5">
              <li><a href="tel:01700000000" className="inline-flex items-center gap-2 text-muted hover:text-primary-80"><Phone size={16} /> 01700-000000</a></li>
              <li><a href="https://wa.me/8801700000000" className="inline-flex items-center gap-2 text-muted hover:text-primary-80"><WhatsappLogo size={16} /> WhatsApp support</a></li>
              <li><a href="mailto:support@tutorly.app" className="inline-flex items-center gap-2 text-muted hover:text-primary-80"><EnvelopeSimple size={16} /> support@tutorly.app</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[13px] leading-4 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tutorly. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-primary-80 font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-primary-80">Terms</a>
            <a href="#" className="hover:text-primary-80">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
