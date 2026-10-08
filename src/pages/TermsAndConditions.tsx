import { useState, useEffect } from 'react'
import {
  FileText,
  UserCheck,
  CreditCard,
  ShieldCheck,
  WarningCircle,
  Gavel,
  EnvelopeSimple,
  ArrowLeft,
  Printer,
  Info,
  ProhibitInset,
  Copyright,
} from '@phosphor-icons/react'
import { container } from '../lib/styles'
import site, { playStoreUrl } from '../site'

const sections = [
  { id: 'summary', title: 'Summary (Plain English)' },
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services Provided' },
  { id: 'accounts', title: '3. User Accounts & Eligibility' },
  { id: 'responsibilities', title: '4. User Responsibilities' },
  { id: 'payments', title: '5. Payment Terms & Credits' },
  { id: 'prohibited', title: '6. Prohibited Conduct' },
  { id: 'intellectual', title: '7. Intellectual Property' },
  { id: 'liability', title: '8. Limitation of Liability' },
  { id: 'governing', title: '9. Governing Law' },
  { id: 'contact', title: '10. Contact Information' },
]

export function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('summary')

  useEffect(() => {
    document.title = `Terms & Conditions – ${site.name}`
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
              <Gavel size={18} weight="fill" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[38px] text-ink sm:text-[42px] sm:leading-[48px]">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-[16px] leading-6 text-muted">
              Effective Date: <strong>October 5, 2026</strong> &bull; Last Updated: <strong>October 2026</strong>
            </p>
            <p className="mt-2 text-[15px] leading-6 text-body">
              Please read these Terms &amp; Conditions carefully before using{' '}
              <strong>Tutorly</strong> (also known as <strong>Tutor Lagbe</strong>), operated by{' '}
              <strong>Tutor Lagbe</strong>, Trade License No:{' '}
              <code className="rounded bg-line/60 px-1.5 py-0.5 text-[13px] font-mono">{site.tradeLicense}</code>.
              By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`${container} py-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr]`}>
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] rounded-xl border border-line bg-surface p-4 shadow-card">
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-muted">
              Table of Contents
            </h2>
            <nav className="space-y-1" aria-label="Terms Sections">
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
              Questions? Email{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary-80 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="prose max-w-none space-y-12">
          {/* Summary */}
          <section id="summary" className="scroll-mt-28">
            <div className="rounded-xl border-2 border-primary/20 bg-tint/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-primary-80">
                <Info size={28} weight="fill" />
                <h2 className="text-[20px] font-bold text-ink sm:text-[22px]">
                  Summary &mdash; Terms in Plain English
                </h2>
              </div>
              <p className="mt-3 text-[15px] leading-6 text-body">
                By using Tutorly (Tutor Lagbe), you agree to these key points:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['Tutors pay a one-time ৳500 activation fee to get a public profile and apply to tuitions.', 'text-success'],
                  ['Guardians use the platform completely free of charge to find and hire tutors.', 'text-success'],
                  ['All users must provide accurate information — fake profiles are strictly prohibited.', 'text-primary-80'],
                  ['Off-platform fee evasion or misuse of contact details will result in account suspension.', 'text-primary-80'],
                ].map(([text, color]) => (
                  <div key={text as string} className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                    <ShieldCheck size={20} weight="fill" className={`mt-0.5 flex-shrink-0 ${color}`} />
                    <span className="text-[14px] leading-5 text-body">{text as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 1: Acceptance */}
          <section id="acceptance" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <FileText size={26} className="text-primary" />
              1. Acceptance of Terms
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>
                By registering an account, downloading the Tutorly Android application, or accessing the website at{' '}
                <a href={site.url} className="text-primary-80 underline">{site.url.replace(/^https?:\/\//, '')}</a>,
                you acknowledge that you have read, understood, and agree to be legally bound by these Terms &amp; Conditions and our{' '}
                <a href="/privacy-policy" className="font-semibold text-primary-80 hover:underline">Privacy Policy</a>.
              </p>
              <p>
                If you do not agree with any part of these terms, you must discontinue use of our platform immediately.
                We reserve the right to update these Terms at any time. Continued use following any amendment constitutes acceptance of the revised Terms.
              </p>
            </div>
          </section>

          {/* Section 2: Services */}
          <section id="services" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <UserCheck size={26} className="text-primary" />
              2. Services Provided
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              Tutorly (Tutor Lagbe) is a digital matchmaking platform that connects students and guardians with qualified home tutors across Bangladesh. Our services include:
            </p>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: 'Tuition Board',
                  desc: 'Guardians and students can post tuition requirements specifying subject, area, grade, budget, and schedule. These listings are visible to verified tutors who can apply.',
                },
                {
                  title: 'Tutor Profiles',
                  desc: 'Tutors create public profiles showcasing their academic qualifications, teaching experience, subject expertise, areas served, and pricing. Profiles are accessible to guardians searching for tutors.',
                },
                {
                  title: 'Application & Shortlisting System',
                  desc: 'Tutors can apply to tuition postings using application credits. Guardians can shortlist tutors, unlocking a secure phone number exchange for direct communication.',
                },
                {
                  title: 'In-App Wallet & Payments',
                  desc: 'Tutors maintain a digital credit wallet on the platform, used for applying to tuitions and confirming hires. Payments are processed via SSLCommerz or PayStation.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-line bg-surface p-5">
                  <h3 className="text-[17px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-body">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-line bg-surface-variant p-4 text-[14px] leading-5 text-muted">
              <strong>Important:</strong> Tutorly acts as an intermediary matchmaking platform only. We do not employ tutors, guarantee tuition outcomes, or manage the actual delivery of teaching services. The tuition relationship is solely between the guardian/student and the tutor.
            </div>
          </section>

          {/* Section 3: Accounts */}
          <section id="accounts" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <UserCheck size={26} className="text-primary" />
              3. User Accounts &amp; Eligibility
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>To use Tutorly, you must:</p>
              <ul className="list-disc space-y-2 pl-5 text-[14px]">
                <li>Be at least <strong>18 years of age</strong>, or have verifiable parental/guardian consent if under 18.</li>
                <li>Provide a <strong>valid Bangladeshi mobile phone number</strong> for OTP verification.</li>
                <li>Provide <strong>accurate, truthful, and up-to-date</strong> information in your profile and tuition postings.</li>
                <li>Maintain the security of your account credentials and not share them with any third party.</li>
                <li>Use one account per person — multiple accounts for the same individual are not permitted.</li>
              </ul>
              <p>
                We reserve the right to verify the accuracy of any information provided and to suspend or permanently
                terminate accounts found to contain false, misleading, or fraudulent details.
              </p>
            </div>
          </section>

          {/* Section 4: Responsibilities */}
          <section id="responsibilities" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <ShieldCheck size={26} className="text-primary" />
              4. User Responsibilities
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Tutors</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
                  <li>Upload genuine academic credentials and certificates for verification.</li>
                  <li>Respond professionally to guardian shortlists and demo class invitations.</li>
                  <li>Maintain sufficient wallet credits before applying to tuition posts.</li>
                  <li>Conduct demo classes as agreed without demanding advance payment outside the platform.</li>
                  <li>Not share guardian contact information obtained through the platform with any third party.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[16px] font-bold text-ink">Guardians &amp; Students</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
                  <li>Post accurate tuition requirements including honest budget and schedule expectations.</li>
                  <li>Treat tutors with professional respect during the selection process.</li>
                  <li>Use the in-app hire confirmation system to formally confirm a tutor engagement.</li>
                  <li>Not solicit tutors for off-platform services to evade platform fees.</li>
                  <li>Pay agreed tuition fees directly to the tutor as contracted between parties.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Payments */}
          <section id="payments" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <CreditCard size={26} className="text-primary" />
              5. Payment Terms &amp; Credits
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">A. Tutor Activation Fee</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  Tutors must pay a one-time activation fee of <strong>৳500 BDT</strong> to publish their profile and begin applying for tuition posts.
                  This fee is <strong>non-refundable</strong> once the profile is activated and made public.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">B. Credit System</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  The platform operates on a credit system where <strong>1 BDT = 1 Credit</strong>. Credits are consumed as follows:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                  <li><strong>Application:</strong> 10 credits are deducted per tuition application submitted.</li>
                  <li><strong>Hire Confirmation:</strong> 1,000 credits are deducted when a tutor is formally hired through the app.</li>
                  <li><strong>Guardian Shortlist:</strong> The guardian&rsquo;s phone number is revealed to the tutor when shortlisted.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">C. Payment Processing</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  All payments are processed securely through <strong>SSLCommerz</strong> or <strong>PayStation</strong>, PCI-DSS compliant payment gateways licensed in Bangladesh.
                  Tutorly does not store credit/debit card numbers or mobile banking PINs. All prices are displayed in <strong>BDT (Bangladeshi Taka ৳)</strong>.
                </p>
              </div>
              <div className="mt-3 rounded-md bg-tint/60 p-3 text-[13px] leading-5 text-body">
                <strong className="text-primary-80">Refund Policy:</strong> For detailed information on refunds, please review our{' '}
                <a href="/refund" className="font-semibold text-primary-80 underline hover:text-primary">Return &amp; Refund Policy</a>.
              </div>
            </div>
          </section>

          {/* Section 6: Prohibited Conduct */}
          <section id="prohibited" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <ProhibitInset size={26} className="text-primary" />
              6. Prohibited Conduct
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              The following activities are strictly prohibited and will result in immediate account suspension and potential legal action:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
              <li>Creating fake or misleading tutor profiles with false credentials or fabricated qualifications.</li>
              <li>Impersonating another person, institution, or organization on the platform.</li>
              <li>Soliciting tutors or guardians to conduct transactions outside the Tutorly platform to evade fees.</li>
              <li>Harassing, threatening, or abusing other users via any communication channel.</li>
              <li>Sharing, selling, or misusing contact information obtained through the platform.</li>
              <li>Attempting to reverse-engineer, scrape, or probe the platform&rsquo;s systems or APIs without authorization.</li>
              <li>Posting inappropriate, offensive, or irrelevant content on tuition listings or profiles.</li>
              <li>Using automated scripts or bots to interact with the platform in any way.</li>
              <li>Any activity that violates applicable laws of the People&rsquo;s Republic of Bangladesh.</li>
            </ul>
          </section>

          {/* Section 7: Intellectual Property */}
          <section id="intellectual" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Copyright size={26} className="text-primary" />
              7. Intellectual Property
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>
                All content, features, and functionality of the Tutorly platform — including but not limited to the Tutorly and Tutor Lagbe brand names, logo, design, text, graphics, software, and code — are the exclusive intellectual property of Tutor Lagbe and are protected under applicable Bangladeshi and international copyright and trademark laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to use the platform solely for its intended purpose of tutor-student matchmaking. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the platform without our explicit written consent.
              </p>
              <p>
                By submitting content to the platform (e.g., profile information, reviews, or tuition posts), you grant Tutorly a non-exclusive, royalty-free, worldwide license to use, display, and distribute such content in connection with the operation of the service.
              </p>
            </div>
          </section>

          {/* Section 8: Liability */}
          <section id="liability" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <WarningCircle size={26} className="text-primary" />
              8. Limitation of Liability
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5 text-[14px] leading-6 text-body">
                <p>
                  Tutorly provides the platform on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the maximum extent permitted by law, Tutor Lagbe shall not be liable for:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Any direct, indirect, incidental, special, or consequential damages arising from platform use.</li>
                  <li>The conduct, qualifications, or reliability of any tutor or guardian on the platform.</li>
                  <li>The outcome of any tuition arrangement made through the platform.</li>
                  <li>Temporary unavailability of the service due to maintenance, technical issues, or circumstances beyond our control.</li>
                  <li>Loss of data or credentials due to unauthorized access to user accounts.</li>
                </ul>
              </div>
              <div className="rounded-md bg-surface-variant p-4 text-[13px] leading-5 text-muted">
                <strong>Our aggregate liability</strong>, if any, shall not exceed the total amount of fees paid by you to Tutorly in the 3 months immediately preceding the claim.
              </div>
            </div>
          </section>

          {/* Section 9: Governing Law */}
          <section id="governing" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Gavel size={26} className="text-primary" />
              9. Governing Law &amp; Dispute Resolution
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>
                These Terms &amp; Conditions are governed by and construed in accordance with the laws of the <strong>People&rsquo;s Republic of Bangladesh</strong>. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of <strong>Dhaka, Bangladesh</strong>.
              </p>
              <p>
                We encourage users to first contact our support team to resolve any disputes amicably before pursuing formal legal action. Most issues can be resolved quickly through our customer support channels.
              </p>
            </div>
          </section>

          {/* Section 10: Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <EnvelopeSimple size={26} className="text-primary" />
              10. Contact Information
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              For any questions, concerns, or feedback about these Terms &amp; Conditions, please contact us:
            </p>
            <div className="mt-5 rounded-xl border border-line bg-surface p-6">
              <p className="text-[15px] font-bold text-ink">Tutor Lagbe (Tutorly)</p>
              <div className="mt-3 space-y-2 text-[14px] leading-6 text-body">
                <p><strong>Trade License No:</strong> {site.tradeLicense}</p>
                <p><strong>Address:</strong> {site.address}</p>
                <p>
                  <strong>Phone / WhatsApp:</strong>{' '}
                  <a href={`tel:${site.phoneRaw}`} className="text-primary-80 hover:underline">{site.phone}</a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${site.email}`} className="text-primary-80 hover:underline">{site.email}</a>
                </p>
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
