import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChatCircleDots, EnvelopeSimple, Plus, WhatsappLogo } from '@phosphor-icons/react'
import { Eyebrow, Item, Reveal, Stagger } from '../components/ui'
import { faqs } from '../data'
import { ease } from '../lib/motion'
import { container, section } from '../lib/styles'

function Row({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <Item className={`rounded-lg border bg-surface transition-colors ${open ? 'border-primary-60 shadow-raised' : 'border-line shadow-card'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-t`}
          aria-expanded={open}
          aria-controls={`${id}-p`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-bold leading-6 text-ink sm:px-6 md:text-[18px] md:leading-7"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${open ? 'bg-primary text-tertiary' : 'bg-tint text-primary'}`}
          >
            <Plus size={16} weight="bold" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-p`}
            role="region"
            aria-labelledby={`${id}-t`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pr-14 text-[16px] leading-6 text-muted sm:px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Item>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className={`${section} bg-surface-variant`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-[29px] font-bold leading-[35px] text-ink md:text-[36px] md:leading-[44px]">Questions? Answered.</h2>
          <p className="mt-4 text-[16px] leading-6 text-muted md:text-[18px] md:leading-7">Everything you need to know before you download.</p>
          <div className="mt-8 rounded-xl bg-primary p-6 text-tertiary">
            <ChatCircleDots size={28} />
            <p className="mt-3 text-[18px] font-bold leading-6">Still have questions?</p>
            <p className="mt-1 text-[14px] leading-5 text-tertiary/80">Our support team is happy to help.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="https://wa.me/8801700000000" className="inline-flex h-10 items-center gap-1.5 rounded-md bg-surface px-4 text-[14px] font-semibold text-primary-80 hover:bg-tertiary/90">
                <WhatsappLogo size={18} /> WhatsApp
              </a>
              <a href="mailto:support@tutorly.app" className="inline-flex h-10 items-center gap-1.5 rounded-md bg-tertiary/15 px-4 text-[14px] font-semibold hover:bg-tertiary/25">
                <EnvelopeSimple size={18} /> Email us
              </a>
            </div>
          </div>
        </Reveal>

        <Stagger className="space-y-3" gap={0.06}>
          {faqs.map((f, i) => (
            <Row key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
