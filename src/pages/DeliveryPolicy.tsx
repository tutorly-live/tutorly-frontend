import { useState, useEffect } from 'react'
import {
  Package,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  ArrowLeft,
  Printer,
  Info,
  DeviceMobile,
  WhatsappLogo,
  CreditCard,
  Sparkle,
} from '@phosphor-icons/react'
import { container } from '../lib/styles'
import site, { playStoreUrl } from '../site'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'nature', title: '1. Nature of Service' },
  { id: 'activation', title: '2. Profile Activation' },
  { id: 'credits', title: '3. Credit Delivery' },
  { id: 'timeline', title: '4. Service Timeline' },
  { id: 'delays', title: '5. Delays & Issues' },
  { id: 'contact', title: '6. Contact' },
]

export function DeliveryPolicy() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    document.title = `Delivery Policy – ${site.name}`
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Header */}
      <header className="border-b border-line bg-surface-variant/60 py-10 sm:py-14">
        <div className={container}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted transition-colors hover:text-primary-80"
            >
              <ArrowLeft size={18} weight="bold" />
              Back to Home
            </a>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:border-ink/20 hover:text-ink print:hidden"
              >
                <Printer size={16} />
                Print
              </button>
              <span className="rounded-full bg-tint px-3 py-1 text-[12px] font-bold text-primary-80">
                Official Document
              </span>
            </div>
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1 text-[13px] font-bold text-primary-80">
              <Package size={18} weight="fill" />
              <span>Service Delivery</span>
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[38px] text-ink sm:text-[42px] sm:leading-[48px]">
              Delivery Policy
            </h1>
            <p className="mt-3 text-[16px] leading-6 text-muted">
              Effective Date: <strong>October 5, 2026</strong> &bull; Last Updated: <strong>October 2026</strong>
            </p>
            <p className="mt-2 text-[15px] leading-6 text-body">
              This Delivery Policy applies to all services and digital products provided by{' '}
              <strong>Tutorly</strong> (also known as <strong>Tutor Lagbe</strong>), Trade License No:{' '}
              <code className="rounded bg-line/60 px-1.5 py-0.5 text-[13px] font-mono">{site.tradeLicense}</code>.
              As a digital platform, our &ldquo;delivery&rdquo; refers to the activation of digital services and availability of features upon payment.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={`${container} py-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr]`}>
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] rounded-xl border border-line bg-surface p-4 shadow-card">
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-muted">Contents</h2>
            <nav className="space-y-1" aria-label="Delivery Policy Sections">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`block rounded-lg px-3 py-2 text-[14px] leading-5 transition-colors ${
                      isActive
                        ? 'bg-tint font-bold text-primary-80'
                        : 'text-muted hover:bg-surface-variant hover:text-ink'
                    }`}
                  >
                    {sec.title}
                  </a>
                )
              })}
            </nav>
            <div className="mt-6 border-t border-line pt-4 text-[13px] text-muted">
              Issues?{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary-80 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        <article className="prose max-w-none space-y-12">
          {/* Overview */}
          <section id="overview" className="scroll-mt-28">
            <div className="rounded-xl border-2 border-primary/20 bg-tint/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-primary-80">
                <Info size={28} weight="fill" />
                <h2 className="text-[20px] font-bold text-ink sm:text-[22px]">
                  Overview &mdash; Digital Delivery at a Glance
                </h2>
              </div>
              <p className="mt-3 text-[15px] leading-6 text-body">
                Tutorly is a 100% digital platform. There is no physical product shipped. All services are delivered electronically within the Tutorly Android application or via the web platform.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['Profile activation is delivered instantly upon successful payment confirmation.', 'text-success'],
                  ['Credit wallet top-ups are credited in real-time via SSLCommerz or PayStation.', 'text-success'],
                  ['In exceptional cases (payment gateway delays), delivery may take up to 24 hours.', 'text-primary-80'],
                  ['All service access is via the Tutorly Android app or tutorly.live website.', 'text-primary-80'],
                ].map(([text, color]) => (
                  <div key={text as string} className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                    <CheckCircle size={20} weight="fill" className={`mt-0.5 flex-shrink-0 ${color}`} />
                    <span className="text-[14px] leading-5 text-body">{text as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section id="nature" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <DeviceMobile size={26} className="text-primary" />
              1. Nature of Service (Digital Only)
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>
                Tutorly (Tutor Lagbe) provides exclusively <strong>digital services</strong>. These include:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[14px]">
                <li><strong>Tutor Profile Hosting:</strong> A publicly visible digital profile page for verified tutors on the Tutorly platform.</li>
                <li><strong>Tuition Board Access:</strong> Ability to browse, filter, and apply to student tuition postings.</li>
                <li><strong>Digital Credit Wallet:</strong> An in-app balance of credits used to apply for tuitions and confirm hires.</li>
                <li><strong>Push Notifications:</strong> Real-time alerts for new tuition matches, shortlists, and hire confirmations.</li>
                <li><strong>Matchmaking Infrastructure:</strong> Access to Tutorly&rsquo;s matching algorithms, search, and communication tools.</li>
              </ul>
              <p>
                <strong>No physical goods are sold or delivered</strong> through this platform. No courier, shipping, or physical handoff of any product takes place at any stage of the service.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="activation" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Sparkle size={26} className="text-primary" />
              2. Tutor Profile Activation
            </h2>
            <div className="mt-4 rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle size={20} weight="fill" />
                <span className="text-[15px] font-bold">Delivered Instantly</span>
              </div>
              <p className="mt-3 text-[14px] leading-6 text-body">
                Upon successful payment of the one-time activation fee of <strong>৳500 BDT</strong> and completion of profile setup:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
                <li>Your tutor profile is <strong>published immediately</strong> and becomes visible to students and guardians searching for tutors.</li>
                <li>You gain <strong>instant access</strong> to the tuition board to browse and apply for available tuitions.</li>
                <li>Your wallet is activated and ready to receive top-up credits.</li>
                <li>Push notifications for new tuition matches in your selected areas are enabled.</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-[13px] text-muted">
                <Clock size={16} />
                <span>Delivery time: <strong>Immediate</strong> upon payment gateway confirmation.</span>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="credits" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <CreditCard size={26} className="text-primary" />
              3. Credit Wallet Top-up Delivery
            </h2>
            <div className="mt-4 rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle size={20} weight="fill" />
                <span className="text-[15px] font-bold">Real-time Delivery</span>
              </div>
              <p className="mt-3 text-[14px] leading-6 text-body">
                Credit top-ups are delivered to your in-app wallet as follows:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
                <li>Credits are credited to your wallet <strong>in real-time</strong> once the payment gateway (SSLCommerz / PayStation) confirms the transaction.</li>
                <li><strong>1 BDT = 1 Credit</strong>. The exact credit amount corresponding to your payment is added.</li>
                <li>A transaction confirmation notification is sent to your registered phone number.</li>
                <li>Credits are immediately available for use — no waiting period applies.</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-[13px] text-muted">
                <Clock size={16} />
                <span>Delivery time: <strong>Instant</strong> (up to 24 hours in rare gateway delays).</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="timeline" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Clock size={26} className="text-primary" />
              4. Service Delivery Timeline Summary
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-surface-variant text-[13px] font-bold uppercase tracking-wider text-ink">
                  <tr>
                    <th className="px-4 py-3 sm:px-6">Service</th>
                    <th className="px-4 py-3 sm:px-6">Delivery Time</th>
                    <th className="px-4 py-3 sm:px-6">Delivery Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {[
                    ['Tutor Profile Activation', 'Immediate', 'In-app & web profile'],
                    ['Credit Wallet Top-up', 'Immediate (up to 24h)', 'In-app wallet balance'],
                    ['Push Notification Setup', 'Immediate', 'Android FCM notifications'],
                    ['Account Registration', 'Immediate (OTP)', 'SMS / Mobile number'],
                    ['Tutor Verification Badge', '1–3 business days', 'Profile badge after admin review'],
                  ].map(([service, time, method]) => (
                    <tr key={service}>
                      <td className="px-4 py-3.5 font-semibold text-ink sm:px-6">{service}</td>
                      <td className="px-4 py-3.5 text-body sm:px-6">{time}</td>
                      <td className="px-4 py-3.5 text-muted sm:px-6">{method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section id="delays" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Clock size={26} className="text-primary" />
              5. Delays &amp; Delivery Issues
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-6 text-body">
              <p>
                While we strive for instant service delivery, rare delays may occur due to:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[14px]">
                <li><strong>Payment Gateway Processing Delays:</strong> In rare cases, SSLCommerz or PayStation may take up to 24 hours to confirm a transaction to our servers.</li>
                <li><strong>Network Connectivity Issues:</strong> Poor internet connectivity on your device may delay real-time notification of credit delivery.</li>
                <li><strong>Scheduled Maintenance:</strong> Planned maintenance windows are announced in advance and are typically under 2 hours.</li>
              </ul>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">What to do if you don&rsquo;t receive your service</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-6 text-body">
                  <li>Wait up to <strong>24 hours</strong> from the time of successful payment.</li>
                  <li>Check your bank statement or mobile banking app to confirm the charge was applied.</li>
                  <li>Log out and back into the Tutorly app and check your wallet/profile status.</li>
                  <li>If the issue persists, contact our support team with your <strong>transaction ID and payment date</strong>.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 6: Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <EnvelopeSimple size={26} className="text-primary" />
              6. Contact Us
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              For any delivery-related issues or queries, reach us through:
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <a
                href={`mailto:${site.email}`}
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <EnvelopeSimple size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Email</h3>
                <p className="mt-1 text-[13px] text-muted">For delivery issues</p>
                <span className="mt-2 text-[14px] font-semibold text-primary-80">{site.email}</span>
              </a>
              <a
                href={`https://wa.me/${site.phoneRaw}`}
                target="_blank"
                rel="noopener"
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F8EF] text-[#12805C]">
                  <WhatsappLogo size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">WhatsApp</h3>
                <p className="mt-1 text-[13px] text-muted">Quick support</p>
                <span className="mt-2 text-[14px] font-semibold text-[#12805C]">{site.phone}</span>
              </a>
              <div className="flex flex-col rounded-xl border border-line bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <Clock size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Response Time</h3>
                <p className="mt-1 text-[13px] text-muted">Support hours</p>
                <span className="mt-2 text-[14px] font-medium text-body">Within 24 hours</span>
              </div>
            </div>
          </section>

          {/* Bottom */}
          <div className="border-t border-line pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[14px] font-semibold text-tertiary transition-colors hover:bg-primary-70"
              >
                <ArrowLeft size={16} weight="bold" />
                Return to Homepage
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary-80 hover:underline"
              >
                Download Tutorly on Google Play &rarr;
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
