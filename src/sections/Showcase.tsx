import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BookOpenText, ChalkboardTeacher, MapTrifold, Star } from '@phosphor-icons/react'
import { CountUp, Eyebrow, Item, SectionHeader, Stagger } from '../components/ui'
import { container } from '../lib/styles'

const stats = [
  { icon: ChalkboardTeacher, end: 500, suffix: '+', label: 'Verified tutors' },
  { icon: BookOpenText, end: 1200, suffix: '+', label: 'Tuitions posted' },
  { icon: MapTrifold, end: 8, suffix: '', label: 'Divisions covered' },
  { icon: Star, end: 25, suffix: '', label: 'Subjects available' },
]

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])

  return (
    <section id="showcase" className="overflow-hidden bg-surface py-14 md:py-24">
      <div className={container}>
        <SectionHeader
          eyebrow={<Eyebrow>Inside the app</Eyebrow>}
          title="Designed for every screen"
          subtitle="A clean, fast experience on phones and tablets — built for guardians and tutors across Bangladesh."
        />

        <div ref={ref} className="[perspective:1400px]">
          <motion.div
            style={{ rotateX, scale, opacity, transformOrigin: 'center bottom' }}
            className="mx-auto max-w-[1040px] overflow-hidden rounded-xl border border-line bg-surface shadow-raised"
          >
            <img
              src="/tutorly-app-mockup.webp"
              alt="Tutorly on a tablet showing tutors near you, filterable by subject"
              width={1376}
              height={768}
              loading="lazy"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>

        <Stagger className="mx-auto mt-14 grid max-w-[1040px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4" gap={0.1}>
          {stats.map((s) => (
            <Item key={s.label} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tint text-primary">
                <s.icon size={24} />
              </span>
              <p className="mt-4 text-[36px] font-extrabold leading-[40px] text-ink">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-[14px] leading-5 text-muted">{s.label}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
