import { useEffect, useRef, useState } from 'react'
import {
  AppleLogo,
  ArrowRight,
  Atom,
  BookOpenText,
  Buildings,
  Certificate,
  ChalkboardTeacher,
  ChatCircleDots,
  CheckCircle,
  Clock,
  CreditCard,
  CurrencyDollar,
  Exam,
  Flask,
  FunctionIcon,
  Globe,
  GooglePlayLogo,
  GlobeHemisphereWest,
  GraduationCap,
  Handshake,
  Heart,
  Lightning,
  List,
  MagnifyingGlass,
  MapTrifold,
  MathOperations,
  Notebook,
  Notification,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
  Sparkle,
  Star,
  Student,
  Translate,
  UserCircle,
  Users,
  Wallet,
  X,
} from '@phosphor-icons/react'
import './App.css'

/* ─── Hooks ─────────────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const dur = 1600, t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1)
        setVal(Math.floor((1 - Math.pow(1 - p, 4)) * end))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── Components ────────────────────────────────────────────────────────────── */
function StoreBadges({ className = '', centered = false }: { className?: string; centered?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${centered ? 'justify-center' : ''} ${className}`}>
      <a href="#" className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:bg-black active:scale-[0.98]">
        <GooglePlayLogo size={26} weight="fill" className="text-white" />
        <div className="text-left">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Get it on</p>
          <p className="text-[16px] font-bold leading-none tracking-tight">Google Play</p>
        </div>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:bg-black active:scale-[0.98]">
        <AppleLogo size={26} weight="fill" className="text-white" />
        <div className="text-left">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Download on the</p>
          <p className="text-[16px] font-bold leading-none tracking-tight">App Store</p>
        </div>
      </a>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   1. NAVBAR
   ═══════════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#for-tutors', label: 'For Tutors' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 transition-all duration-300 group-hover:bg-brand-700 group-hover:shadow-lg group-hover:shadow-brand-600/25">
            <GraduationCap size={22} weight="fill" className="text-white" />
          </div>
          <span className="text-[20px] font-bold tracking-[-0.02em] text-brand-600">
            Tutorly
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-slate-500 transition-colors hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <a href="#pricing"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-slate-600 transition-all hover:border-slate-300 hover:shadow-sm">
            Log in
          </a>
          <a href="#download"
            className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25 active:scale-[0.97]">
            <GooglePlayLogo size={16} weight="fill" />
            Download App
          </a>
        </div>

        <button onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Menu">
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      <div className={`overflow-hidden transition-all duration-300 md:hidden ${open ? 'max-h-96 border-b border-slate-100' : 'max-h-0'}`}>
        <div className="space-y-1 bg-white px-6 pb-6 pt-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
              {l.label}
            </a>
          ))}
          <div className="space-y-2 pt-4">
            <a href="#pricing" className="block rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700">Log in</a>
            <a href="#download" className="block rounded-xl bg-brand-600 py-2.5 text-center text-sm font-semibold text-white flex items-center justify-center gap-1.5"><GooglePlayLogo size={16} weight="fill" /> Download App</a>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. HERO — Centered with floating icons + product mockup below
   ═══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero-fade relative overflow-hidden pb-8 pt-32 md:pt-40 lg:pt-44">
      {/* ── Floating decorative icons ── */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {/* Top-left area */}
        <div className="animate-float absolute left-[8%] top-[22%]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 shadow-lg shadow-red-500/10">
            <Notification size={24} weight="fill" className="text-red-400" />
          </div>
        </div>
        {/* Left-middle */}
        <div className="animate-float-slow absolute left-[5%] top-[55%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 shadow-lg shadow-brand-500/10">
            <BookOpenText size={22} weight="fill" className="text-brand-400" />
          </div>
        </div>
        {/* Top-right */}
        <div className="animate-bobble absolute right-[9%] top-[18%]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 shadow-lg shadow-blue-500/10">
            <Lightning size={22} weight="fill" className="text-blue-500" />
          </div>
        </div>
        {/* Right-middle */}
        <div className="animate-float absolute right-[6%] top-[50%]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 shadow-lg shadow-emerald-500/10">
            <Star size={24} weight="fill" className="text-emerald-500" />
          </div>
        </div>
        {/* Left-bottom */}
        <div className="animate-bobble absolute bottom-[15%] left-[12%]">
          <div className="h-3 w-3 rounded-full bg-brand-400" />
        </div>
        {/* Right-bottom */}
        <div className="animate-float-slow absolute bottom-[20%] right-[14%]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 shadow-lg shadow-amber-500/10">
            <Wallet size={18} weight="fill" className="text-amber-500" />
          </div>
        </div>
        {/* Extra dots */}
        <div className="animate-float absolute left-[22%] top-[70%]">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="animate-bobble absolute right-[20%] top-[30%]">
          <div className="h-2 w-2 rounded-full bg-red-300" />
        </div>
      </div>

      {/* ── Centered content ── */}
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Badge */}
        <div className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
          </span>
          Now live in Chittagong, Bangladesh
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 mx-auto max-w-3xl text-[38px] font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[58px]">
          Find the Perfect Tutor for
          <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"> Your Child</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-slate-500">
          A simple, secure matchmaking app for students &amp; guardians.
          Post a tuition, browse verified tutor profiles, and hire the
          right match — all in one place.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 mt-10">
          <StoreBadges centered />
          <div className="mt-6">
            <a href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-500 hover:text-brand-600 transition-colors">
              See How It Works <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>

        {/* Social proof badges */}
        <div className="animate-fade-up delay-400 mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
              <GraduationCap size={18} weight="fill" className="text-brand-600" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} weight="fill" className="text-amber-400" />)}
                <span className="ml-1 text-[14px] font-bold text-slate-900">4.9</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">500+ Reviews</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Users size={18} weight="fill" className="text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-slate-900">1,200+</p>
              <p className="text-[11px] font-medium text-slate-400">Tuitions Posted</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2.5 hidden sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <ShieldCheck size={18} weight="fill" className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-slate-900">Secure</p>
              <p className="text-[11px] font-medium text-slate-400">SSLCommerz Payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product mockup — centered transparent mobile phone screen ── */}
      <div className="animate-fade-up delay-500 relative mx-auto mt-12 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="group relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] transition-all duration-500 hover:-translate-y-2">
          {/* Subtle ambient glow behind phone */}
          <div className="absolute -inset-4 rounded-full bg-brand-500/15 blur-2xl transition-all duration-500 group-hover:bg-brand-500/25" />
          <img
            src="/tutorly-mobile-mockup.png"
            alt="Tutorly Mobile App — Find Tutors Near You"
            className="relative w-full drop-shadow-[0_25px_40px_rgba(37,99,235,0.22)] drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] transition-transform duration-700 group-hover:scale-[1.02]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. TRUST BAR + SUBJECTS MARQUEE
   ═══════════════════════════════════════════════════════════════════════════════ */
function TrustBar() {
  const ref = useReveal()
  const stats = [
    { icon: Users, value: 500, suffix: '+', label: 'Verified Tutors' },
    { icon: BookOpenText, value: 1200, suffix: '+', label: 'Tuitions Posted' },
    { icon: MapTrifold, value: 8, suffix: '', label: 'Divisions Covered' },
    { icon: GraduationCap, value: 25, suffix: '', label: 'Subjects Available' },
  ]
  const subjects = [
    { name: 'Mathematics', icon: MathOperations },
    { name: 'Physics', icon: Atom },
    { name: 'Chemistry', icon: Flask },
    { name: 'English', icon: Translate },
    { name: 'Bangla', icon: BookOpenText },
    { name: 'Biology', icon: Sparkle },
    { name: 'ICT', icon: Globe },
    { name: 'Higher Math', icon: FunctionIcon },
    { name: 'Accounting', icon: Certificate },
    { name: 'Economics', icon: Buildings },
    { name: 'IELTS', icon: GlobeHemisphereWest },
    { name: 'General Science', icon: Exam },
  ]

  return (
    <>
      <section className="border-y border-slate-100 bg-white py-16">
        <div ref={ref} className="reveal mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <s.icon size={24} weight="duotone" />
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[13px] font-medium text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-slate-100 bg-slate-50/50 py-5">
        <div className="flex gap-4 marquee-track" style={{ width: 'max-content' }}>
          {[...subjects, ...subjects].map((s, i) => (
            <div key={i} className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-[13px] font-medium text-slate-600">
              <s.icon size={16} weight="duotone" className="text-brand-500" />
              {s.name}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. FEATURES — Centered header + clean cards
   ═══════════════════════════════════════════════════════════════════════════════ */
const featureData = [
  { icon: MagnifyingGlass, title: 'Smart Tutor Search', desc: 'Filter by subject, area, grade level, rating, and hourly rate — find your perfect match in seconds.', accent: 'brand' },
  { icon: Notebook, title: 'Live Tuition Board', desc: 'Browse all open tuitions near you, posted by real guardians. Updated in real-time as new listings appear.', accent: 'emerald' },
  { icon: PaperPlaneTilt, title: 'Apply with Confidence', desc: 'Tutors apply with their full CV and a personal message. Guardians see everything upfront — no guesswork.', accent: 'brand' },
  { icon: Wallet, title: 'Credit Wallet', desc: 'Top-up via SSLCommerz anytime. Every transaction logged. 1 BDT = 1 credit. Full transparency.', accent: 'emerald' },
  { icon: Star, title: 'Verified Ratings', desc: 'Real 1–5 star reviews from actual students after each tuition. Build trust through genuine feedback.', accent: 'brand' },
  { icon: Notification, title: 'Instant Alerts', desc: 'Push notifications for new tuitions, applications, shortlists, and hires — even when the app is closed.', accent: 'emerald' },
]

function Features() {
  const ref = useReveal()
  return (
    <section id="features" className="bg-white py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <Lightning size={13} weight="fill" /> Features
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Everything you need for <span className="text-brand-600">better learning</span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-500">
            Every feature designed to make tutor-student matching transparent, secure, and genuinely effective.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureData.map((f, i) => {
            const isBrand = f.accent === 'brand'
            return (
              <div key={i}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  isBrand ? 'bg-brand-50 text-brand-600 group-hover:bg-brand-100' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }`}>
                  <f.icon size={24} weight="duotone" />
                </div>
                <h3 className="mb-2 text-[17px] font-bold text-slate-900">{f.title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-500">{f.desc}</p>
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-50 opacity-0 blur-3xl transition-opacity group-hover:opacity-60" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. HOW IT WORKS — Tabbed
   ═══════════════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const [tab, setTab] = useState<'guardian' | 'tutor'>('guardian')
  const ref = useReveal()
  type Step = { icon: typeof GraduationCap; title: string; desc: string }

  const guardianSteps: Step[] = [
    { icon: Notebook, title: 'Post a Tuition', desc: 'Fill in subject, grade, area, salary, schedule, and gender preference — takes under a minute.' },
    { icon: Users, title: 'Review Applications', desc: 'Qualified tutors apply with their full profile and a personal message — all in one clean view.' },
    { icon: Star, title: 'Shortlist & Compare', desc: 'Shortlist multiple tutors — their phone numbers are revealed. Call and chat to decide.' },
    { icon: Handshake, title: 'Confirm the Hire', desc: 'Three-step in-app confirmation protects both sides. Tuition closes automatically.' },
    { icon: Heart, title: 'Rate Your Tutor', desc: 'After tuition ends, leave a 1-5 star review to help future guardians.' },
  ]

  const tutorSteps: Step[] = [
    { icon: CreditCard, title: 'Pay ৳500 Activation', desc: 'One-time fee via SSLCommerz. No recurring charges. Unlocks applications instantly.' },
    { icon: UserCircle, title: 'Build Your Profile', desc: 'Add bio, subjects, areas, hourly rate, education (SSC to PhD), and a photo.' },
    { icon: MagnifyingGlass, title: 'Browse Tuition Board', desc: 'See all open tuitions in your area. Filter by subject and neighbourhood.' },
    { icon: PaperPlaneTilt, title: 'Apply with a Message', desc: 'Write a short intro to the guardian. Costs 10 credits per application.' },
    { icon: Phone, title: 'Get Hired', desc: "When shortlisted, the guardian's phone number is revealed. Agree on terms and confirm in-app." },
  ]

  const steps = tab === 'guardian' ? guardianSteps : tutorSteps
  const isGuardian = tab === 'guardian'

  return (
    <section id="how-it-works" className="bg-slate-50/50 py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <Clock size={13} weight="fill" /> Simple Process
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            How Tutorly works
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-500">
            Whether you are finding a tutor or offering your skills — every step is effortless.
          </p>
        </div>

        <div className="mb-14 flex justify-center">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1">
            {(['guardian', 'tutor'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  tab === t ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}>
                {t === 'guardian' ? <><Student size={16} weight="fill" /> Students & Guardians</> : <><ChalkboardTeacher size={16} weight="fill" /> Tutors</>}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-xl">
          {steps.map((step, i) => (
            <div key={`${tab}-${i}`} className="relative flex gap-5 pb-10 last:pb-0">
              {i < steps.length - 1 && (
                <div className="absolute bottom-0 left-[22px] top-[48px] w-px"
                  style={{ background: `repeating-linear-gradient(to bottom, ${isGuardian ? '#A7F3D0' : '#BFDBFE'} 0, ${isGuardian ? '#A7F3D0' : '#BFDBFE'} 5px, transparent 5px, transparent 11px)` }} />
              )}
              <div className={`relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 text-sm font-bold ${
                isGuardian ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-brand-200 bg-brand-50 text-brand-700'
              }`}>
                <step.icon size={20} weight="duotone" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-[16px] font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#pricing"
            className={`inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-[15px] font-semibold text-white transition-all active:scale-[0.97] ${
              isGuardian ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25' : 'bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25'
            }`}>
            {isGuardian ? 'Post Your First Tuition' : 'Start as a Tutor'}
            <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. FOR TUTORS
   ═══════════════════════════════════════════════════════════════════════════════ */
function ForTutors() {
  const ref = useReveal()
  const benefits = [
    { icon: UserCircle, text: 'Publish a detailed profile — bio, subjects, areas, hourly rate' },
    { icon: Notebook, text: 'Browse a live tuition board filtered to your neighbourhood' },
    { icon: PaperPlaneTilt, text: 'Apply with a personal message to stand out from the crowd' },
    { icon: Phone, text: "Get shortlisted — guardian's phone revealed. Secured by Firebase Auth" },
    { icon: Wallet, text: 'Transparent credit wallet with full transaction history' },
    { icon: Notification, text: 'Push notifications for every new tuition and status update' },
  ]

  return (
    <section id="for-tutors" className="bg-white py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
              <ChalkboardTeacher size={13} weight="fill" /> For Tutors
            </div>
            <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
              Grow your tutoring<br />career with confidence
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-500">
              Pay a one-time ৳500 activation fee, build your profile, and start applying to tuitions that match your expertise.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <b.icon size={16} weight="duotone" />
                  </div>
                  <span className="pt-1 text-[14.5px] leading-relaxed text-slate-600">{b.text}</span>
                </li>
              ))}
            </ul>
            <a href="#pricing"
              className="glow-brand mt-10 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30 active:scale-[0.97]">
              Start as a Tutor — ৳500 once
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>

          <div className="space-y-5">
            {/* Wallet card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 p-7 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/5" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[12px] font-medium text-white/60">
                    <Wallet size={14} weight="fill" /> Credit Balance · 1 BDT = 1 credit
                  </span>
                  <span className="rounded-lg bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">Wallet</span>
                </div>
                <p className="mt-2 text-[42px] font-extrabold leading-none tracking-tight">
                  2,450<span className="ml-1 text-xl font-semibold text-white/50">cr</span>
                </p>
                <div className="mt-5 flex gap-2.5">
                  <button className="flex-1 rounded-xl bg-white/15 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm hover:bg-white/25">Top Up via SSLCommerz</button>
                  <button className="flex-1 rounded-xl bg-white/10 py-2.5 text-[13px] font-semibold text-white/80 backdrop-blur-sm hover:bg-white/20">History</button>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {[{ l: 'Applied', v: '12' }, { l: 'Shortlisted', v: '4' }, { l: 'Hired', v: '2' }].map((s) => (
                    <div key={s.l} className="text-center"><p className="text-[11px] text-white/40">{s.l}</p><p className="mt-0.5 text-xl font-bold">{s.v}</p></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status flow */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Application Status Flow</p>
              <div className="space-y-2.5">
                {[
                  { label: 'PENDING', desc: 'Awaiting guardian review', icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
                  { label: 'SHORTLISTED', desc: 'Phone revealed · call & discuss', icon: Star, bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-200' },
                  { label: 'HIRED', desc: '1000 cr deducted atomically', icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
                  { label: 'REJECTED', desc: 'Auto-notified via FCM push', icon: X, bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                      <s.icon size={15} weight="fill" className={s.text} />
                    </div>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${s.bg} ${s.text} ${s.border}`}>{s.label}</span>
                    <span className="text-[12px] text-slate-400">{s.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 p-3">
                <ShieldCheck size={16} weight="fill" className="mt-0.5 flex-shrink-0 text-brand-600" />
                <p className="text-[11px] leading-relaxed text-brand-700/70">
                  <strong className="text-brand-700">Anti-fraud:</strong> 3-step in-app confirmation. All hires must be confirmed in-app. Report anything suspicious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const ref = useReveal()
  const data = [
    { name: 'Tahmina Begum', role: 'Guardian', area: 'Nasirabad', initials: 'TB', color: '#059669', stars: 5, quote: 'Found an amazing Math tutor for my son within 24 hours. The in-app confirmation gave me real peace of mind — no shady phone deals.' },
    { name: 'Md. Rafiqul Islam', role: 'Tutor', area: 'Agrabad', initials: 'RI', color: '#2563EB', stars: 5, quote: "I've been hired for 3 tuitions this month already. The push notifications for new postings are incredibly helpful." },
    { name: 'Nusrat Jahan', role: 'Guardian', area: 'GEC Circle', initials: 'NJ', color: '#7C3AED', stars: 5, quote: 'The shortlisting feature is brilliant — I compared 3 tutors, called each one, then confirmed the best. So much better than Facebook groups!' },
  ]

  return (
    <section id="testimonials" className="bg-slate-50/50 py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <ChatCircleDots size={13} weight="fill" /> Real Stories
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Trusted across Chittagong
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-500">
            Real feedback from guardians and tutors.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {data.map((t, i) => (
            <div key={i} className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5">
              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} weight="fill" className="text-amber-400" />
                ))}
              </div>
              <p className="mb-7 flex-1 text-[14.5px] leading-relaxed text-slate-600 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">{t.name}</p>
                  <p className="text-[12px] text-slate-400">{t.role} · {t.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. PRICING
   ═══════════════════════════════════════════════════════════════════════════════ */
function Pricing() {
  const ref = useReveal()
  return (
    <section id="pricing" className="bg-white py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <CurrencyDollar size={13} weight="fill" /> Pricing
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Transparent. No surprises.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-500">
            Guardians use Tutorly completely free. Tutors pay once and earn for life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Guardian */}
          <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-8 transition-all hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-600/5">
            <div className="mb-6 inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
              <Student size={13} weight="fill" /> For Students & Guardians
            </div>
            <div className="mb-6">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900">Free</span>
              <span className="ml-2 text-sm text-slate-400">forever</span>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {['Post unlimited tuitions (T0001, T0002…)', 'Browse all published tutors across 8 divisions', 'View full profiles — bio, education, subjects, ratings', 'Shortlist multiple tutors — phone numbers revealed', '3-step in-app hire confirmation (anti-fraud)', 'Push notifications via FCM — even when closed'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-slate-600">
                  <CheckCircle size={17} weight="fill" className="flex-shrink-0 text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
            <a href="https://tutorly.app" className="block rounded-2xl bg-emerald-600 py-3.5 text-center text-[15px] font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]">
              Sign Up Free
            </a>
          </div>

          {/* Tutor */}
          <div className="glow-brand-lg relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 p-8 text-white">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
            <div className="relative flex flex-1 flex-col">
              <div className="mb-6 inline-flex items-center gap-1.5 self-start rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white">
                <ChalkboardTeacher size={13} weight="fill" /> For Tutors
              </div>
              <div className="mb-1">
                <span className="text-5xl font-extrabold tracking-tight">৳500</span>
                <span className="ml-2 text-sm text-white/50">one-time</span>
              </div>
              <p className="mb-6 text-[12px] text-white/50">Then top-up credits. 1 BDT = 1 credit.</p>
              <ul className="mb-8 flex-1 space-y-3">
                {['Publish profile — SSC to PhD, 25 subjects, 500+ areas', 'Apply to tuitions (10 credits each, personal message)', "Shortlisted → guardian's phone number revealed", 'Hire confirmed atomically — 1000 cr deducted', 'SSLCommerz wallet with full transaction ledger', 'FCM push alerts — new tuitions, shortlists, hires'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/80">
                    <CheckCircle size={17} weight="fill" className="flex-shrink-0 text-white/90" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://tutorly.app" className="block rounded-2xl bg-white py-3.5 text-center text-[15px] font-bold text-brand-600 transition-all hover:bg-brand-50 hover:shadow-lg active:scale-[0.98]">
                Activate — ৳500
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-lg items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <ShieldCheck size={18} weight="fill" className="mt-0.5 flex-shrink-0 text-brand-600" />
          <p className="text-[12px] leading-relaxed text-slate-500">
            All payments via SSLCommerz with server-side validation. Firebase Auth protects every account. Report suspicious activity to{' '}
            <a href="mailto:support@tutorly.app" className="font-medium text-brand-600 hover:underline">support@tutorly.app</a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. CTA BANNER
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTABanner() {
  const ref = useReveal()
  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 px-8 py-16 text-center text-white md:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-white/5" />
          <div className="relative">
            <GraduationCap size={48} weight="duotone" className="mx-auto mb-5 text-white/80" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to find the perfect match?</h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-white/70">
              Join families and tutors across Bangladesh already using Tutorly. Start today — it takes less than a minute.
            </p>
            <div className="mt-10">
              <StoreBadges centered />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   10. FOOTER
   ═══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
                <GraduationCap size={20} weight="fill" className="text-white" />
              </div>
              <span className="text-[19px] font-bold tracking-[-0.02em] text-brand-600">Tutorly</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-400 mb-6">
              Bangladesh&rsquo;s trusted tutor-student matchmaking platform. Powered by Firebase, secured by SSLCommerz.
            </p>
            <StoreBadges />
          </div>

          {[
            { title: 'Product', links: [{ l: 'Features', h: '#features' }, { l: 'How It Works', h: '#how-it-works' }, { l: 'Pricing', h: '#pricing' }, { l: 'Testimonials', h: '#testimonials' }] },
            { title: 'For Tutors', links: [{ l: 'Become a Tutor', h: '#for-tutors' }, { l: 'Activate Account', h: '#pricing' }, { l: 'Credit Wallet', h: '#for-tutors' }, { l: 'Tutor FAQ', h: '#how-it-works' }] },
            { title: 'Contact', links: [{ l: '📞 01700000000', h: 'tel:01700000000' }, { l: '💬 WhatsApp', h: 'https://wa.me/8801700000000' }, { l: '✉️ support@tutorly.app', h: 'mailto:support@tutorly.app' }] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.l}><a href={l.h} className="text-[14px] text-slate-400 transition-colors hover:text-slate-700">{l.l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-[12px] text-slate-300 sm:flex-row">
          <p>© 2026 Tutorly. All rights reserved. Built for Bangladesh 🇧🇩</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-500">Privacy</a>
            <a href="#" className="hover:text-slate-500">Terms</a>
            <a href="#" className="hover:text-slate-500">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <ForTutors />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
