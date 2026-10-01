import { motion } from 'motion/react'
import { CheckCircle, ShieldCheck } from '@phosphor-icons/react'
import { Eyebrow, Item, Reveal, SectionHeader, Stagger } from '../components/ui'
import { btn, container, section } from '../lib/styles'
import { playStoreUrl } from '../site'

const plans = [
  {
    who: 'For guardians & students',
    price: 'Free',
    unit: 'forever',
    note: 'Everything you need to find and hire a tutor.',
    perks: ['Post unlimited tuitions', 'Browse every tutor profile', 'Shortlist to reveal phone numbers', '3-step in-app hire confirmation', 'Push alerts for every application'],
    cta: 'Get the App — Free',
    featured: false,
  },
  {
    who: 'For tutors',
    price: '৳500',
    unit: 'one-time',
    note: 'Then top up credits as you go · 1 BDT = 1 credit.',
    perks: ['Public profile — SSC to PhD, 25 subjects', 'Apply for 10 credits each', "Guardian's phone revealed when shortlisted", '1,000 credits only when hired', 'SSLCommerz wallet with full history'],
    cta: 'Activate for ৳500',
    featured: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className={`${section} bg-surface`}>
      <div className={`${container} max-w-[1000px]`}>
        <SectionHeader
          eyebrow={<Eyebrow>Pricing</Eyebrow>}
          title="Simple, honest pricing"
          subtitle="Free for families. Tutors pay once to activate and only spend credits when they apply or get hired."
        />

        <Stagger className="grid gap-5 md:grid-cols-2" gap={0.12}>
          {plans.map((p) => (
            <Item key={p.who}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative flex h-full flex-col rounded-xl p-6 sm:p-8 ${
                  p.featured ? 'bg-primary text-tertiary shadow-raised' : 'border border-line bg-surface shadow-card'
                }`}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-tertiary px-3 py-1 text-[12px] font-bold leading-4 text-primary-80">Most popular</span>
                )}
                <p className={`text-[16px] font-semibold leading-6 ${p.featured ? 'text-tertiary/80' : 'text-muted'}`}>{p.who}</p>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="text-[48px] font-extrabold leading-[52px]">{p.price}</span>
                  <span className={`text-[16px] ${p.featured ? 'text-tertiary/75' : 'text-muted'}`}>{p.unit}</span>
                </p>
                <p className={`mt-2 text-[14px] leading-5 ${p.featured ? 'text-tertiary/75' : 'text-muted'}`}>{p.note}</p>
                <ul className={`mb-8 mt-6 flex-1 space-y-3 border-t pt-6 ${p.featured ? 'border-tertiary/20' : 'border-line'}`}>
                  {p.perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-2.5 text-[16px] leading-6 ${p.featured ? 'text-tertiary/90' : 'text-body'}`}>
                      <CheckCircle size={20} weight="fill" className={`mt-0.5 flex-shrink-0 ${p.featured ? 'text-tertiary' : 'text-primary'}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href={playStoreUrl} target="_blank" rel="noopener" className={`${p.featured ? btn.inverse : btn.secondaryLg} w-full`}>{p.cta}</a>
              </motion.div>
            </Item>
          ))}
        </Stagger>

        <Reveal>
          <p className="mx-auto mt-8 flex w-fit max-w-xl items-start gap-2 text-[14px] leading-5 text-muted">
            <ShieldCheck size={18} className="mt-px flex-shrink-0 text-primary" />
            <span>
              Payments are processed by SSLCommerz with server-side validation. Spotted something suspicious?{' '}
              <a href="mailto:support@tutorly.app" className="font-semibold text-primary-80 hover:underline">support@tutorly.app</a>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
