import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import {
  BellRinging,
  CheckCircle,
  Clock,
  Handshake,
  LockSimple,
  LockSimpleOpen,
  MagnifyingGlass,
  Phone,
  Star,
  Wallet,
} from '@phosphor-icons/react'
import { CountUp, Eyebrow, Item, SectionHeader, Stagger, Stars } from '../components/ui'
import { ease } from '../lib/motion'
import { container, section } from '../lib/styles'

function Tile({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Item className={className}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
      >
        {children}
      </motion.div>
    </Item>
  )
}

function TileHead({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div>
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-tint text-primary">{icon}</span>
      <h3 className="mt-4 text-[20px] font-bold leading-6 text-ink">{title}</h3>
      <p className="mt-2 text-[16px] leading-6 text-muted">{desc}</p>
    </div>
  )
}

/* ── Live demos inside tiles ─────────────────────────────────────────────── */

const demoChips = ['Mathematics', 'Physics', 'English', 'ICT', 'Chemistry']

function SearchDemo() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % demoChips.length), 1800)
    return () => clearInterval(id)
  }, [reduce])
  return (
    <div className="mt-6 rounded-lg bg-surface-variant p-4">
      <div className="flex h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[14px] text-muted">
        <MagnifyingGlass size={18} />
        <AnimatePresence mode="wait">
          <motion.span key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            {demoChips[active]} tutors in Khulshi
          </motion.span>
        </AnimatePresence>
      </div>
      <LayoutGroup>
        <div className="mt-3 flex flex-wrap gap-2">
          {demoChips.map((c, i) => (
            <span key={c} className={`relative rounded-full px-3 py-1.5 text-[13px] font-semibold ${i === active ? 'text-tertiary' : 'text-body'}`}>
              {i === active && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              {i !== active && <span className="absolute inset-0 rounded-full border border-line bg-surface" />}
              <span className="relative">{c}</span>
            </span>
          ))}
        </div>
      </LayoutGroup>
    </div>
  )
}

const alerts = [
  { icon: BellRinging, t: 'New tuition near you', s: 'Class 9 Math · Nasirabad', tone: 'bg-tint text-primary' },
  { icon: Star, t: "You've been shortlisted", s: 'Guardian of T-1046', tone: 'bg-warning-tint text-warning' },
  { icon: CheckCircle, t: 'Hire confirmed', s: 'Starts Sunday, 5 PM', tone: 'bg-success-tint text-success' },
]

function AlertsDemo() {
  return (
    <Stagger className="mt-6 space-y-2.5" gap={0.18} delay={0.3}>
      {alerts.map((a) => (
        <Item key={a.t}>
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3 shadow-card">
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${a.tone}`}>
              <a.icon size={18} weight="fill" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-bold leading-5 text-ink">{a.t}</p>
              <p className="truncate text-[12px] leading-4 text-muted">{a.s}</p>
            </div>
            <span className="ml-auto text-[11px] text-muted">now</span>
          </div>
        </Item>
      ))}
    </Stagger>
  )
}

function RevealDemo() {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="mt-6 flex w-full items-center gap-3 rounded-lg bg-surface-variant p-3 text-left"
      aria-label="Demo: shortlisting reveals the phone number"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${open ? 'bg-success text-tertiary' : 'bg-surface text-muted ring-1 ring-line'}`}>
        {open ? <LockSimpleOpen size={18} weight="bold" /> : <LockSimple size={18} weight="bold" />}
      </span>
      <div className="flex-1">
        <p className="text-[12px] leading-4 text-muted">{open ? 'Shortlisted — call now' : 'Shortlist to reveal'}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={open ? 'on' : 'off'}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 text-[16px] font-bold leading-6 tabular-nums text-ink"
          >
            <Phone size={16} weight="fill" className="text-primary" />
            {open ? '017•• ••• 678' : '••••• ••••••'}
          </motion.p>
        </AnimatePresence>
      </div>
    </button>
  )
}

const statuses = [
  { l: 'Pending', icon: Clock },
  { l: 'Shortlisted', icon: Star },
  { l: 'Hired', icon: CheckCircle },
]

export function Features() {
  return (
    <section id="features" className={`${section} bg-surface`}>
      <div className={container}>
        <SectionHeader
          eyebrow={<Eyebrow>Features</Eyebrow>}
          title={<>Everything a tuition needs, <span className="text-primary">in your pocket</span></>}
          subtitle="Built to make finding, comparing and hiring tutors transparent, fast and safe."
        />

        <Stagger className="grid auto-rows-auto gap-4 md:grid-cols-6 lg:gap-5" gap={0.1}>
          <Tile className="md:col-span-4">
            <TileHead icon={<MagnifyingGlass size={22} />} title="Smart tutor search" desc="Filter by subject, area, class, rating and rate — the right match in seconds." />
            <SearchDemo />
          </Tile>

          <Tile className="md:col-span-2 md:row-span-2">
            <TileHead icon={<BellRinging size={22} />} title="Instant alerts" desc="Push notifications for every tuition, shortlist and hire — even when the app is closed." />
            <AlertsDemo />
          </Tile>

          <Tile className="md:col-span-2">
            <TileHead icon={<Star size={22} />} title="Verified ratings" desc="Only students who hired a tutor can rate them." />
            <div className="mt-auto flex items-end gap-3 pt-6">
              <span className="text-[44px] font-extrabold leading-none text-ink">4.9</span>
              <div className="pb-1">
                <Stars rating={5} size={16} />
                <p className="mt-1 text-[12px] leading-4 text-muted">500+ real reviews</p>
              </div>
            </div>
          </Tile>

          <Tile className="md:col-span-2">
            <TileHead icon={<Handshake size={22} />} title="Shortlist & call" desc="Phone numbers unlock only when you shortlist." />
            <RevealDemo />
          </Tile>

          {/* Wide blue wallet tile — the stat-panel moment */}
          <Item className="md:col-span-6">
            <div className="grid gap-8 overflow-hidden rounded-xl bg-primary p-6 text-tertiary sm:p-8 md:grid-cols-[1.1fr_1fr] md:items-center lg:p-10">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-tertiary/15">
                  <Wallet size={22} />
                </span>
                <h3 className="mt-4 text-[24px] font-bold leading-[29px]">A transparent wallet for tutors</h3>
                <p className="mt-2 max-w-md text-[16px] leading-6 text-tertiary/80">
                  Top up through SSLCommerz at 1 BDT = 1 credit. 10 credits per application, and every transaction is logged.
                </p>
              </div>
              <div className="rounded-lg bg-tertiary/10 p-5">
                <p className="text-[14px] text-tertiary/75">Credit balance</p>
                <p className="mt-1 text-[40px] font-extrabold leading-[48px]">
                  <CountUp end={2450} /> <span className="text-[18px] font-semibold text-tertiary/70">credits</span>
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {statuses.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease }}
                      className="rounded-md bg-tertiary/10 px-3 py-2.5"
                    >
                      <s.icon size={16} weight="fill" />
                      <p className="mt-1 text-[22px] font-bold leading-7">{[12, 4, 2][i]}</p>
                      <p className="text-[12px] leading-4 text-tertiary/75">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Item>
        </Stagger>
      </div>
    </section>
  )
}
