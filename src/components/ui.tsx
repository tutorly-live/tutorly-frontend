import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { AppleLogo, GooglePlayLogo, Star } from '@phosphor-icons/react'
import { useCountUp } from '../lib/hooks'
import { ease, fadeUp, inView, stagger } from '../lib/motion'
import { playStoreUrl } from '../site'

/** Official Tutorly logo (transparent PNG, 720×243 source → crisp on retina). */
export function Logo({ className = 'h-11' }: { className?: string }) {
  return (
    <a href="#top" className="inline-flex flex-shrink-0 items-center" aria-label="Tutorly home">
      <img src="/tutorly-logo.png" alt="Tutorly" width={720} height={243} className={`w-auto ${className}`} />
    </a>
  )
}

export function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 text-[13px] font-bold leading-5 text-primary-80">
      {icon}
      {children}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  action,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
  action?: ReactNode
}) {
  const left = align === 'left'
  return (
    <Stagger className={left ? 'mb-10 max-w-2xl md:mb-14' : 'mx-auto mb-10 max-w-2xl text-center md:mb-14'}>
      {eyebrow && <Item className="mb-3">{eyebrow}</Item>}
      <Item>
        <h2 className="text-[29px] font-bold leading-[35px] text-ink md:text-[36px] md:leading-[44px]">{title}</h2>
      </Item>
      {subtitle && (
        <Item>
          <p className="mt-4 text-[16px] leading-6 text-muted md:text-[18px] md:leading-7">{subtitle}</p>
        </Item>
      )}
      {action && <Item className="mt-6">{action}</Item>}
    </Stagger>
  )
}

/** Fades + lifts its content when scrolled into view. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Parent that staggers its <Item> children into view. */
export function Stagger({ children, className = '', gap = 0.08, delay = 0, as = 'div' }: { children: ReactNode; className?: string; gap?: number; delay?: number; as?: 'div' | 'ul' | 'ol' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={inView}>
      {children}
    </Tag>
  )
}

export function Item({ children, className = '', as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}

export function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { ref, value } = useCountUp(end)
  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} weight="fill" className={i <= Math.round(rating) ? 'text-star' : 'text-line'} />
      ))}
    </span>
  )
}

export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'h-9 w-9 text-[12px]', md: 'h-12 w-12 text-[15px]', lg: 'h-14 w-14 text-[17px]' }[size]
  return (
    <span className={`inline-flex flex-shrink-0 items-center justify-center rounded-full bg-tint font-extrabold text-primary-80 ring-2 ring-surface ${dims}`} aria-hidden="true">
      {initials}
    </span>
  )
}

export function StoreBadges({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const style = tone === 'dark' ? 'bg-ink text-tertiary' : 'bg-surface text-ink'
  const sub = tone === 'dark' ? 'text-tertiary/70' : 'text-muted'
  const soon =
    tone === 'dark'
      ? 'border border-dashed border-line bg-surface text-muted'
      : 'border border-dashed border-tertiary/40 text-tertiary/85'
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <motion.a
        href={playStoreUrl}
        target="_blank"
        rel="noopener"
        aria-label="Get Tutorly on Google Play"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className={`flex h-[52px] items-center gap-2.5 rounded-lg px-4 shadow-card ${style}`}
      >
        <GooglePlayLogo size={26} weight="fill" />
        <span className="text-left">
          <span className={`block text-[10px] font-semibold leading-3 ${sub}`}>Get it on</span>
          <span className="block text-[16px] font-bold leading-5">Google Play</span>
        </span>
      </motion.a>
      <div className={`flex h-[52px] cursor-default items-center gap-2.5 rounded-lg px-4 ${soon}`} aria-label="App Store version coming soon">
        <AppleLogo size={26} weight="fill" />
        <span className="text-left">
          <span className="block text-[10px] font-semibold leading-3">Coming soon on</span>
          <span className="block text-[16px] font-bold leading-5">App Store</span>
        </span>
      </div>
    </div>
  )
}

/** Device chrome for code-built app screens. */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] w-[280px] rounded-[44px] bg-ink p-[10px] shadow-[0_30px_60px_-20px_rgba(0,139,255,0.35),0_12px_24px_-12px_rgba(15,23,42,0.25)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-surface-variant">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}
