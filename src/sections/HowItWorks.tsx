import { useEffect, useRef, useState, type ComponentType } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Handshake, Notebook, UsersThree, type Icon } from '@phosphor-icons/react'
import { Eyebrow, PhoneFrame, SectionHeader } from '../components/ui'
import { ApplicationsScreen, ConfirmScreen, PostScreen } from '../components/screens'
import { ease } from '../lib/motion'
import { container } from '../lib/styles'

type Step = { icon: Icon; kicker: string; title: string; desc: string; points: string[]; Screen: ComponentType }

const steps: Step[] = [
  {
    icon: Notebook,
    kicker: 'Step 1',
    title: 'Post a tuition in under a minute',
    desc: 'Pick the subject, class, area, salary and days. Your tuition goes live instantly to tutors nearby.',
    points: ['Free, unlimited posts', 'Choose tutor preferences'],
    Screen: PostScreen,
  },
  {
    icon: UsersThree,
    kicker: 'Step 2',
    title: 'Compare tutors who apply',
    desc: 'Qualified tutors apply with their full profile and a personal message. Shortlist the best to reveal their numbers.',
    points: ['Education, ratings & experience', 'Phone revealed on shortlist'],
    Screen: ApplicationsScreen,
  },
  {
    icon: Handshake,
    kicker: 'Step 3',
    title: 'Confirm the hire, safely',
    desc: 'After a quick call, both sides confirm inside the app. The tuition closes automatically — no off-platform surprises.',
    points: ['3-step in-app confirmation', 'Rate your tutor afterwards'],
    Screen: ConfirmScreen,
  },
]

function StepBlock({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isIn = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (isIn) onActive(index)
  }, [isIn, index, onActive])

  return (
    <div ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0">
      {/* Mobile: inline phone */}
      <div className="mb-8 flex justify-center lg:hidden">
        <PhoneFrame className="w-[240px]">
          <step.Screen />
        </PhoneFrame>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: '-30% 0px -30% 0px' }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-tertiary">
            <step.icon size={22} />
          </span>
          <span className="text-[14px] font-bold uppercase tracking-wide text-primary-80">{step.kicker}</span>
        </div>
        <h3 className="mt-5 text-[29px] font-bold leading-[35px] text-ink md:text-[36px] md:leading-[44px]">{step.title}</h3>
        <p className="mt-4 max-w-md text-[18px] leading-7 text-muted">{step.desc}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.points.map((p) => (
            <li key={p} className="rounded-full bg-tint px-3.5 py-1.5 text-[14px] font-semibold text-primary-80">{p}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const ActiveScreen = steps[active].Screen

  return (
    <section id="how-it-works" className="bg-surface-variant py-14 md:py-24">
      <div className={container}>
        <SectionHeader
          eyebrow={<Eyebrow>How it works</Eyebrow>}
          title="From download to first lesson"
          subtitle="Three simple steps. Most guardians find their tutor within a day."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Sticky phone (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-290px)] flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-10 rounded-full bg-tint" aria-hidden="true" />
                <PhoneFrame className="relative w-[290px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="h-full"
                      initial={{ opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -24, scale: 0.98 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <ActiveScreen />
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>

                {/* Progress dots */}
                <div className="absolute -right-12 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                  {steps.map((s, i) => (
                    <span key={s.kicker} className="relative h-8 w-1.5 overflow-hidden rounded-full bg-line">
                      {i === active && <motion.span layoutId="step-dot" className="absolute inset-0 rounded-full bg-primary" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            {steps.map((s, i) => (
              <StepBlock key={s.kicker} step={s} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
