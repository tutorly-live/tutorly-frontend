import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { CaretLeft, Check, CheckCircle, Phone, SealCheck, Star } from '@phosphor-icons/react'
import { ease } from '../lib/motion'

/* Static, code-built app screens shown inside <PhoneFrame>. Kept tiny & on-brand. */

function AppBar({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="bg-primary px-4 pb-4 pt-10 text-tertiary">
      <div className="flex items-center gap-2">
        <CaretLeft size={16} weight="bold" />
        <div>
          <p className="text-[15px] font-bold leading-5">{title}</p>
          {sub && <p className="text-[11px] leading-4 text-tertiary/75">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const row = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <motion.div variants={row}>
      <p className="mb-1 text-[10px] font-bold uppercase leading-3 text-muted">{label}</p>
      <div className="flex h-9 items-center rounded-md border border-line bg-surface px-3 text-[12px] font-semibold text-ink">{value}</div>
    </motion.div>
  )
}

export function PostScreen() {
  return (
    <div className="h-full">
      <AppBar title="Post a tuition" sub="Takes under a minute" />
      <motion.div className="space-y-3 p-4" variants={list} initial="hidden" animate="show">
        <Field label="Subject" value="Mathematics, Physics" />
        <Field label="Class" value="Class 9 · English Version" />
        <Field label="Area" value="Nasirabad" />
        <Field label="Salary" value="৳7,000 / month" />
        <motion.div variants={row}>
          <p className="mb-1 text-[10px] font-bold uppercase leading-3 text-muted">Days</p>
          <div className="flex gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                  [1, 2, 4, 6].includes(i) ? 'bg-primary text-tertiary' : 'bg-surface text-muted ring-1 ring-line'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div variants={row} className="pt-1">
          <div className="flex h-10 items-center justify-center rounded-md bg-primary text-[13px] font-bold text-tertiary">Post Tuition</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const applicants = [
  { i: 'FH', n: 'Farhan Hossain', s: 'CUET · Physics', r: 4.8, shortlisted: true },
  { i: 'AR', n: 'Anika Rahman', s: 'CU · Mathematics', r: 4.9, shortlisted: false },
  { i: 'IA', n: 'Imran Ahmed', s: 'CUET · CSE', r: 4.7, shortlisted: false },
  { i: 'NA', n: 'Nadia Akter', s: 'CMC · Science', r: 4.9, shortlisted: false },
]

export function ApplicationsScreen() {
  return (
    <div className="h-full">
      <AppBar title="Applications" sub="T-1048 · Mathematics & Physics" />
      <motion.ul className="space-y-2 p-3" variants={list} initial="hidden" animate="show">
        {applicants.map((a) => (
          <motion.li key={a.n} variants={row} className="rounded-lg bg-surface p-2.5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tint text-[11px] font-extrabold text-primary-80">{a.i}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[12px] font-bold leading-4 text-ink">
                  {a.n} <SealCheck size={12} weight="fill" className="text-primary" />
                </p>
                <p className="text-[10px] leading-3 text-muted">{a.s}</p>
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-ink">
                <Star size={10} weight="fill" className="text-star" />
                {a.r}
              </span>
            </div>
            {a.shortlisted ? (
              <div className="mt-2 flex items-center justify-between rounded-md bg-success-tint px-2 py-1.5">
                <span className="text-[10px] font-bold text-success">Shortlisted</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-ink">
                  <Phone size={11} weight="fill" /> 017•• ••• 678
                </span>
              </div>
            ) : (
              <div className="mt-2 flex gap-1.5">
                <span className="flex h-6 flex-1 items-center justify-center rounded-md bg-tint text-[10px] font-bold text-primary-80">View</span>
                <span className="flex h-6 flex-1 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-tertiary">Shortlist</span>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export function ConfirmScreen() {
  const steps = ['Guardian confirmed', 'Tutor confirmed', 'Tuition closed']
  return (
    <div className="flex h-full flex-col items-center px-5 pt-14 text-center">
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-tertiary"
      >
        <Check size={32} weight="bold" />
      </motion.span>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 text-[18px] font-bold leading-6 text-ink">
        Hire confirmed!
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-1 text-[11px] leading-4 text-muted">
        Farhan starts Sunday, 5:00 PM
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-5 w-full rounded-lg bg-surface p-3 text-left shadow-card">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tint text-[12px] font-extrabold text-primary-80">FH</span>
          <div>
            <p className="text-[12px] font-bold leading-4 text-ink">Farhan Hossain</p>
            <p className="text-[10px] leading-3 text-muted">Math & Physics · 4 days/week</p>
          </div>
        </div>
      </motion.div>

      <motion.ul className="mt-3 w-full space-y-1.5" variants={list} initial="hidden" animate="show">
        {steps.map((s) => (
          <motion.li key={s} variants={row} className="flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-[11px] font-semibold text-ink shadow-card">
            <CheckCircle size={14} weight="fill" className="text-success" />
            {s}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
