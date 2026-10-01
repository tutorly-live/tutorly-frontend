import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MapPin } from '@phosphor-icons/react'
import { areas, subjects } from '../data'

function Row({ items, reverse = false, duration }: { items: ReactNode[]; reverse?: boolean; duration: number }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.ul
        className="flex flex-shrink-0 gap-3 pr-3"
        animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((node, i) => (
          <li key={i} aria-hidden={i >= items.length}>
            {node}
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export function Marquee() {
  const subjectChips = subjects.map((s) => (
    <span key={s.name} className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 text-[14px] font-semibold text-ink shadow-card">
      <s.icon size={18} className="text-primary" />
      {s.name}
    </span>
  ))
  const areaChips = areas.map((a) => (
    <span key={a} className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-tint px-4 text-[14px] font-semibold text-primary-80">
      <MapPin size={16} weight="fill" />
      {a}
    </span>
  ))

  return (
    <section aria-label="Subjects and areas on Tutorly" className="relative bg-surface pb-6 pt-2">
      <p className="mb-5 text-center text-[14px] font-semibold text-muted">
        25 subjects · tutors across every neighbourhood of Chittagong
      </p>
      <div className="space-y-3">
        <Row items={subjectChips} duration={40} />
        <Row items={areaChips} duration={46} reverse />
      </div>
    </section>
  )
}
