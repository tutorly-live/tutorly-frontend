import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { BellRinging, CheckCircle, DeviceMobile, MapPin, Star, Wallet } from '@phosphor-icons/react'
import { Avatar, Stars, StoreBadges } from '../components/ui'
import { ease } from '../lib/motion'
import { container } from '../lib/styles'

const headline = ['The', 'right', 'home', 'tutor,', 'right', 'from', 'your', 'phone']

function FloatCard({ children, className, y, delay }: { children: ReactNode; className: string; y: MotionValue<number>; delay: number }) {
  return (
    <motion.div style={{ y }} className={`absolute z-10 hidden md:block ${className}`} aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay }}
        className="rounded-lg border border-line bg-surface p-3 shadow-raised"
      >
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const slow = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fast = useTransform(scrollYProgress, [0, 1], [0, -220])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-surface pt-12 md:pt-20">
      {/* Background: soft dotted grid + pale rings (no gradients) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#D3E8FB_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-1/2 top-[420px] h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-primary/10 md:top-[380px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[520px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-tint/70 md:top-[480px]" aria-hidden="true" />

      <div className={`${container} relative text-center`}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 text-[13px] font-semibold leading-5 text-body shadow-card"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-tertiary">New</span>
          <DeviceMobile size={15} className="text-primary" />
          Live on Android · iOS coming soon
        </motion.span>

        <h1 className="mx-auto mt-6 max-w-3xl text-[40px] font-extrabold leading-[46px] text-ink sm:text-[56px] sm:leading-[62px] lg:text-[64px] lg:leading-[70px]">
          {headline.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${i >= 4 ? 'text-primary' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
              >
                {w}
              </motion.span>
              {i < headline.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="mx-auto mt-6 max-w-xl text-[18px] leading-7 text-muted"
        >
          Tutorly is the tuition app that connects guardians with verified home tutors across Chittagong. Post a tuition free, compare profiles, and confirm the hire safely — all in one app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.65 }}
          className="mt-9 flex flex-col items-center gap-5"
        >
          <StoreBadges className="justify-center" />
          <div className="flex items-center gap-3 text-left">
            <div className="flex -space-x-1.5">
              {['AR', 'FH', 'SI', 'NA'].map((i) => (
                <Avatar key={i} initials={i} size="sm" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Stars rating={5} size={13} />
                <span className="text-[14px] font-bold text-ink">4.9</span>
              </div>
              <p className="text-[13px] leading-4 text-muted">Loved by 500+ tutors &amp; families</p>
            </div>
          </div>
        </motion.div>

        {/* Stage: phone + orbiting cards */}
        <div className="relative mx-auto mt-14 h-[420px] max-w-[880px] sm:h-[520px]">
          <motion.div style={{ y: phoneY }} className="absolute left-1/2 top-0 w-[260px] -translate-x-1/2 sm:w-[300px]">
            <motion.img
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              src="/tutorly-mobile-mockup.webp"
              alt="Tutorly app home screen listing nearby tutors with ratings and hourly rates"
              width={284}
              height={566}
              fetchPriority="high"
              className="w-full drop-shadow-[0_30px_40px_rgba(0,139,255,0.25)]"
            />
          </motion.div>

          <FloatCard y={slow} delay={0.9} className="left-0 top-[60px] w-[230px] text-left lg:left-6">
            <div className="flex items-start gap-2.5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-tint text-primary">
                <BellRinging size={20} />
              </span>
              <div>
                <p className="text-[13px] font-bold leading-4 text-ink">New application</p>
                <p className="mt-0.5 text-[12px] leading-4 text-muted">A Physics tutor applied to your tuition</p>
              </div>
            </div>
          </FloatCard>

          <FloatCard y={fast} delay={1.05} className="left-10 top-[250px] text-left lg:left-24">
            <div className="flex items-center gap-2">
              <MapPin size={18} weight="fill" className="text-primary" />
              <span className="text-[13px] font-bold text-ink">32 tutors near Nasirabad</span>
            </div>
          </FloatCard>

          <FloatCard y={fast} delay={1.2} className="right-0 top-[40px] w-[200px] text-left lg:right-8">
            <div className="flex items-center gap-2.5">
              <Avatar initials="AR" size="sm" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold leading-4 text-ink">Anika Rahman</p>
                <p className="mt-0.5 flex items-center gap-1 text-[12px] font-semibold leading-4 text-success">
                  <CheckCircle size={14} weight="fill" /> Hire confirmed
                </p>
              </div>
            </div>
          </FloatCard>

          <FloatCard y={slow} delay={1.35} className="right-6 top-[230px] w-[190px] text-left lg:right-20">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-tertiary">
                <Wallet size={18} />
              </span>
              <div>
                <p className="text-[12px] leading-4 text-muted">Wallet</p>
                <p className="text-[15px] font-bold leading-5 text-ink">2,450 credits</p>
              </div>
            </div>
          </FloatCard>

          <FloatCard y={slow} delay={1.5} className="left-[22%] top-[390px] text-left">
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
              <Star size={16} weight="fill" className="text-star" /> 4.9 average rating
            </div>
          </FloatCard>
        </div>
      </div>

      {/* Fade the stage into the next band */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff)]" aria-hidden="true" />
    </section>
  )
}
