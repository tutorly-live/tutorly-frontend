import { useState, useEffect } from 'react'
import {
  ArrowCounterClockwise,
  CreditCard,
  WarningCircle,
  CheckCircle,
  EnvelopeSimple,
  ArrowLeft,
  Printer,
  Info,
  Clock,
  WhatsappLogo,
  HandCoins,
  XCircle,
  ShieldWarning,
  Prohibit,
} from '@phosphor-icons/react'
import { container } from '../lib/styles'
import site, { playStoreUrl } from '../site'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'eligible', title: '1. When Refunds Apply' },
  { id: 'activation', title: '2. Activation Fee' },
  { id: 'credits', title: '3. Credit Top-ups' },
  { id: 'fraud', title: '4. Guardian Fraud / False Posts' },
  { id: 'cancelled', title: '5. Cancelled Tuition & Credits' },
  { id: 'non-refundable', title: '6. Non-Refundable Items' },
  { id: 'how-to-request', title: '7. How to Request a Refund' },
  { id: 'contact', title: '8. Contact' },
]

export function ReturnRefundPolicy() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    document.title = `Return & Refund Policy – ${site.name}`
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
              <ArrowCounterClockwise size={18} weight="fill" />
              <span>Refund &amp; Returns</span>
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[38px] text-ink sm:text-[42px] sm:leading-[48px]">
              Return &amp; Refund Policy
            </h1>
            <p className="mt-3 text-[16px] leading-6 text-muted">
              Effective Date: <strong>October 5, 2026</strong> &bull; Last Updated: <strong>October 2026</strong>
            </p>
            <p className="mt-2 text-[15px] leading-6 text-body">
              This policy applies to all payments made on the <strong>{site.name}</strong> platform,
              Trade License No:{' '}
              <code className="rounded bg-line/60 px-1.5 py-0.5 text-[13px] font-mono">{site.tradeLicense}</code>.
              As a <strong>digital service platform</strong>, we aim to be fair and transparent.
              We take fraudulent tuition postings, false guardian accounts, and technical errors very seriously
              and will issue refunds in all such cases.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={`${container} py-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr]`}>
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] rounded-xl border border-line bg-surface p-4 shadow-card">
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-muted">
              Contents
            </h2>
            <nav className="space-y-1" aria-label="Refund Policy Sections">
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
              Refund queries?{' '}
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
                  Overview &mdash; Quick Summary
                </h2>
              </div>
              <p className="mt-3 text-[15px] leading-6 text-body">
                We believe tutors should only pay when they receive genuine value. Here is our commitment:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: CheckCircle, color: 'text-success', text: 'Credits charged for a cancelled or fraudulent tuition post are fully refunded.' },
                  { icon: CheckCircle, color: 'text-success', text: 'Double charges or payment gateway errors are always refunded immediately.' },
                  { icon: CheckCircle, color: 'text-success', text: 'If a guardian\'s post is found to be fake or intentionally misleading, all credits spent on it are returned.' },
                  { icon: XCircle, color: 'text-danger', text: 'The one-time ৳500 activation fee is non-refundable once your profile is published.' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                    <item.icon size={20} weight="fill" className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                    <span className="text-[14px] leading-5 text-body">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 1: When refunds apply */}
          <section id="eligible" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <CheckCircle size={26} className="text-primary" />
              1. When Refunds Apply
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              Refunds are issued in the following situations:
            </p>
            <div className="mt-5 space-y-3">
              {[
                { title: 'Guardian fraud or fake tuition post', desc: 'A guardian posted a tuition that was deliberately fake, misleading, or intended to collect tutor contacts without genuine intent to hire. Credits spent applying to that post are refunded.' },
                { title: 'Tuition cancelled after credits charged', desc: 'A guardian posted a tuition, the tutor applied (credits deducted), but the guardian cancelled the tuition post before the process completed without a valid reason.' },
                { title: 'Technical double charge', desc: 'A payment gateway error results in your account being charged twice for the same transaction.' },
                { title: 'Credits deducted but hire confirmation failed', desc: 'The 1,000-credit hire confirmation was deducted but the hire was not registered in the system due to a platform error.' },
                { title: 'Platform account suspension without cause', desc: 'We suspend your account without any violation on your part — your remaining unused credit balance is fully refunded.' },
                { title: 'Activation fee — technical failure', desc: 'You paid the ৳500 activation fee but your profile was never published due to a system error on our end.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-5 text-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Activation fee */}
          <section id="activation" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <CreditCard size={26} className="text-primary" />
              2. Tutor Activation Fee (৳500)
            </h2>
            <div className="mt-4 rounded-lg border border-line bg-surface p-5">
              <div className="flex items-start gap-3">
                <XCircle size={22} weight="fill" className="mt-0.5 flex-shrink-0 text-danger" />
                <div>
                  <h3 className="text-[16px] font-bold text-ink">Generally Non-Refundable</h3>
                  <p className="mt-2 text-[14px] leading-6 text-body">
                    The one-time tutor activation fee of <strong>৳500 BDT</strong> is <strong>non-refundable</strong> once your
                    profile is published and you have been granted access to the tuition board.
                    This fee covers the cost of manual credential review, profile hosting, and platform access.
                  </p>
                  <p className="mt-3 text-[14px] leading-6 text-body">
                    We strongly recommend reviewing the platform and contacting us with any questions <strong>before</strong> paying.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-md bg-tint/60 p-3 text-[13px] leading-5 text-body">
              <strong className="text-primary-80">Exception:</strong> If your payment succeeded but your profile was <em>never activated</em> due to a technical failure on our side, you will receive a <strong>full refund within 7 business days</strong>.
            </div>
          </section>

          {/* Section 3: Credits */}
          <section id="credits" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <HandCoins size={26} className="text-primary" />
              3. Credit Top-up Refunds
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <div className="flex items-center gap-2 text-success mb-3">
                  <CheckCircle size={18} weight="fill" />
                  <h3 className="text-[16px] font-bold text-ink">Refundable within 7 days if unused</h3>
                </div>
                <p className="text-[14px] leading-6 text-body">
                  If you topped up your credit wallet and have <strong>not used any of those credits</strong> (no applications submitted), you may request a full refund within <strong>7 days</strong> of the transaction by contacting support with your transaction ID.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Partially Used Credits</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  If some credits have been spent on genuine applications, only the <strong>remaining unused balance</strong> may be eligible for refund, subject to individual review. Credits used on confirmed applications are generally not refunded — unless those applications were on fraudulent posts (see Section 4).
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Guardian Fraud */}
          <section id="fraud" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <ShieldWarning size={26} className="text-primary" />
              4. Guardian Fraud / False Tuition Posts
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              We take fraudulent guardian behaviour very seriously. The following situations qualify tutors for a <strong>full credit refund</strong> for all credits spent on that tuition:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Fake guardian account', desc: 'The guardian account is found to be fake — created with false identity or for malicious intent (e.g., harvesting tutor phone numbers without genuine tuition need).' },
                { title: 'Intentionally misleading post', desc: 'The tuition post contained false information — incorrect salary range, non-existent location, or fabricated subject requirements — that misled tutors into applying.' },
                { title: 'Guardian collected contacts then disappeared', desc: 'The guardian shortlisted multiple tutors (collecting their phone numbers), then deactivated or abandoned the post without taking any legitimate action.' },
                { title: 'Repeated no-shows for demo class', desc: 'The guardian invited a tutor for a demo class but did not show up or respond, and the pattern is reported across multiple tutors for the same post.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-success" />
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-5 text-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-warning-tint p-4 text-[13px] leading-5">
              <strong className="text-warning">How to report:</strong> If you believe a tuition post is fraudulent, report it immediately via WhatsApp or email with the post ID, guardian details, and a description of the issue. We will investigate and — if confirmed — refund all credits spent and ban the guardian account.
            </div>
          </section>

          {/* Section 5: Cancelled Tuition */}
          <section id="cancelled" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Prohibit size={26} className="text-primary" />
              5. Cancelled Tuition &amp; Credit Charges
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Guardian cancels post after applications received</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  If a guardian posts a genuine tuition, tutors apply (spending 10 credits each), and the guardian then cancels the post <strong>without selecting or contacting any tutor</strong>, this qualifies for a credit refund for all affected tutors. Please report within <strong>72 hours</strong> of the cancellation.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Hire confirmation credits — tutor not actually hired</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  If the system deducted 1,000 hire-confirmation credits from your wallet but the guardian later denies confirming the hire, or the hire record does not appear correctly in your account, we will investigate and refund the credits if the error is confirmed.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Demo class hold not released</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  Credits placed on hold for a demo class should be automatically released within <strong>48 hours</strong> if no hire is confirmed. If the hold is not released after 48 hours, contact us and we will release them manually within 24 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Non-Refundable */}
          <section id="non-refundable" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <WarningCircle size={26} className="text-primary" />
              6. Non-Refundable Items
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              The following are explicitly <strong>non-refundable</strong> under normal circumstances:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
              <li><strong>Activation fee (৳500)</strong> after your profile has been successfully published and you have accessed the tuition board.</li>
              <li><strong>Application credits (10 credits)</strong> spent on genuine tuition posts where the guardian was responsive and the post was legitimate — even if you were not selected.</li>
              <li><strong>Hire confirmation credits (1,000)</strong> after both parties have agreed and the hire is correctly confirmed in the system.</li>
              <li>Credits used on posts where the tutor was shortlisted and had genuine phone-number access to the guardian, regardless of outcome.</li>
              <li>Refund requests made after <strong>30 days</strong> of the transaction in question.</li>
              <li>Credits consumed due to a violation of our Terms &amp; Conditions leading to account suspension.</li>
            </ul>
          </section>

          {/* Section 7: How to request */}
          <section id="how-to-request" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <EnvelopeSimple size={26} className="text-primary" />
              7. How to Request a Refund
            </h2>
            <div className="mt-4 rounded-xl border border-line bg-surface p-6 sm:p-8">
              <ol className="list-decimal space-y-4 pl-5 text-[14px] leading-6 text-body">
                <li>
                  <strong>Gather evidence:</strong> Note your registered phone number, the tuition post ID (visible on the post), the date of the transaction, and any screenshots of the fraudulent post or cancellation notice.
                </li>
                <li>
                  <strong>Contact us via WhatsApp or email</strong> (fastest response on WhatsApp) with the subject/message starting with:{' '}
                  <code className="rounded bg-line/60 px-1.5 py-0.5 font-mono">"Refund Request – [Your Phone Number]"</code>
                </li>
                <li>
                  <strong>Describe the issue clearly:</strong> Tell us whether it&rsquo;s a fraud report, cancelled tuition, technical error, or another reason. Attach all relevant screenshots.
                </li>
                <li>
                  <strong>Await investigation:</strong> Fraud and cancellation claims are reviewed within <strong>3–5 business days</strong>. Technical errors are usually resolved within 24 hours.
                </li>
                <li>
                  <strong>Refund credited:</strong> Approved credit refunds are added back to your in-app wallet immediately. Payment refunds (e.g., activation fee) are processed to the original payment method within <strong>7–14 business days</strong>.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 8: Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <EnvelopeSimple size={26} className="text-primary" />
              8. Contact Us
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              Reach our support team for refund queries — WhatsApp is the fastest channel:
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <a
                href={`https://wa.me/${site.phoneRaw}?text=Refund%20Request%20-%20`}
                target="_blank"
                rel="noopener"
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F8EF] text-[#12805C]">
                  <WhatsappLogo size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">WhatsApp (Fastest)</h3>
                <p className="mt-1 text-[13px] text-muted">Fraud reports &amp; urgent refunds</p>
                <span className="mt-2 text-[14px] font-semibold text-[#12805C]">{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}?subject=Refund%20Request`}
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <EnvelopeSimple size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Email</h3>
                <p className="mt-1 text-[13px] text-muted">Detailed refund requests</p>
                <span className="mt-2 text-[14px] font-semibold text-primary-80">{site.email}</span>
              </a>
              <div className="flex flex-col rounded-xl border border-line bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <Clock size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Response Time</h3>
                <p className="mt-1 text-[13px] text-muted">Fraud / urgent cases</p>
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
                Download {site.name} on Google Play &rarr;
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
