import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react'
import { Avatar, Eyebrow, Reveal, Stars } from '../components/ui'
import { testimonials } from '../data'
import { ease } from '../lib/motion'
import { container, section } from '../lib/styles'

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const go = (d: number) => setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d])

  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setState(([i]) => [(i + 1) % testimonials.length, 1]), 6500)
    return () => clearInterval(id)
  }, [paused, reduce])

  const t = testimonials[index]

  return (
    <section id="testimonials" className={`${section} bg-surface`}>
      <Reveal className={`${container} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="mt-3 text-[29px] font-bold leading-[35px] text-ink md:text-[36px] md:leading-[44px]">
            Loved by families and tutors
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-[56px] font-extrabold leading-none text-primary">4.9</span>
            <div>
              <Stars rating={5} size={18} />
              <p className="mt-1 text-[14px] leading-5 text-muted">Average from 500+ reviews</p>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary">
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-tertiary transition-colors hover:bg-primary-70">
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* stacked-card depth */}
          <div className="absolute inset-x-6 -bottom-3 top-3 rounded-xl bg-tint" aria-hidden="true" />
          <div className="absolute inset-x-12 -bottom-6 top-6 rounded-xl bg-surface-variant" aria-hidden="true" />

          <figure className="relative min-h-[300px] overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-raised sm:p-10" aria-live="polite">
            <Quotes size={44} weight="fill" className="text-tint" aria-hidden="true" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease }}
              >
                <blockquote className="mt-3 text-[20px] font-semibold leading-8 text-ink sm:text-[24px] sm:leading-9">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <Avatar initials={t.initials} />
                  <div>
                    <p className="text-[16px] font-bold leading-6 text-ink">{t.name}</p>
                    <p className="text-[14px] leading-5 text-muted">{t.role} · {t.area}</p>
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-1.5">
              {testimonials.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === index}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-line"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      initial={{ width: reduce || paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || paused ? 0 : 6.5, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </figure>
        </div>
      </Reveal>
    </section>
  )
}
