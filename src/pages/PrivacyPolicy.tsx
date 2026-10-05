import { useState, useEffect } from 'react'
import {
  ShieldCheck,
  LockSimple,
  UserCheck,
  FileText,
  CreditCard,
  Trash,
  EnvelopeSimple,
  MapPin,
  DeviceMobile,
  CheckCircle,
  EyeSlash,
  ArrowLeft,
  Printer,
  Info,
  WarningCircle,
  WhatsappLogo,
  ShareNetwork,
} from '@phosphor-icons/react'
import { container } from '../lib/styles'
import site, { playStoreUrl } from '../site'

const sections = [
  { id: 'summary', title: 'Summary (Plain English)' },
  { id: 'data-collected', title: '1. Information We Collect' },
  { id: 'permissions', title: '2. Device Permissions' },
  { id: 'how-we-use', title: '3. How We Use Your Data' },
  { id: 'sharing', title: '4. Information Sharing & Disclosure' },
  { id: 'security', title: '5. Data Security & Storage' },
  { id: 'data-safety', title: '6. Google Play Data Safety' },
  { id: 'deletion', title: '7. Account & Data Deletion' },
  { id: 'children', title: "8. Children's Privacy" },
  { id: 'contact', title: '9. Contact Information' },
]

export function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('summary')

  useEffect(() => {
    // Set document title for SEO when rendered on client
    document.title = `Privacy Policy – ${site.name}`
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
      {/* Top Banner / Header */}
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
                Print Policy
              </button>
              <span className="rounded-full bg-tint px-3 py-1 text-[12px] font-bold text-primary-80">
                Official Document
              </span>
            </div>
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1 text-[13px] font-bold text-primary-80">
              <ShieldCheck size={18} weight="fill" />
              <span>Transparency & Data Protection</span>
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[38px] text-ink sm:text-[42px] sm:leading-[48px]">
              Privacy Policy for Tutorly
            </h1>
            <p className="mt-3 text-[16px] leading-6 text-muted">
              Effective Date: <strong>October 5, 2026</strong> &bull; Last Updated: <strong>October 2026</strong>
            </p>
            <p className="mt-2 text-[15px] leading-6 text-body">
              This Privacy Policy explains how <strong>Tutorly</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;),
              operating the Android application (<code className="rounded bg-line/60 px-1.5 py-0.5 text-[13px] font-mono">{site.playStoreId}</code>)
              and web platform at <a href={site.url} className="text-primary-80 underline">{site.url.replace(/^https?:\/\//, '')}</a>,
              collects, uses, safeguards, and respects your personal information.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className={`${container} py-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr]`}>
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] rounded-xl border border-line bg-surface p-4 shadow-card">
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-muted">
              Table of Contents
            </h2>
            <nav className="space-y-1" aria-label="Privacy Policy Sections">
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
              Need assistance? Email{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary-80 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <article className="prose max-w-none space-y-12">
          {/* Quick Summary Card */}
          <section id="summary" className="scroll-mt-28">
            <div className="rounded-xl border-2 border-primary/20 bg-tint/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-primary-80">
                <Info size={28} weight="fill" />
                <h2 className="text-[20px] font-bold text-ink sm:text-[22px]">
                  Summary &mdash; Privacy in Plain English
                </h2>
              </div>
              <p className="mt-3 text-[15px] leading-6 text-body">
                We believe in simple, transparent matchmaking without intrusive data mining. Here is our pledge:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-success" />
                  <span className="text-[14px] leading-5 text-body">
                    <strong>No Data Selling:</strong> We never sell, rent, or trade your personal data to advertisers or brokers.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                  <EyeSlash size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-primary-80" />
                  <span className="text-[14px] leading-5 text-body">
                    <strong>Protected Guardian Contacts:</strong> Student and guardian phone numbers are never shown publicly on the tuition board.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                  <LockSimple size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-primary-80" />
                  <span className="text-[14px] leading-5 text-body">
                    <strong>Secure Certificates:</strong> Tutor documents (IDs, degrees) are stored in encrypted cloud buckets and accessible only for verification.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg bg-surface p-3.5 shadow-sm">
                  <CreditCard size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-primary-80" />
                  <span className="text-[14px] leading-5 text-body">
                    <strong>Safe Payments:</strong> Payments are processed via licensed gateways (SSLCommerz/PayStation); we never store your card details or bKash PINs.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Information We Collect */}
          <section id="data-collected" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <UserCheck size={26} className="text-primary" />
              1. Information We Collect
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              Depending on whether you register as a <strong>Student / Guardian</strong> or as a <strong>Tutor</strong>, we collect different types of information required to facilitate home and private tuition services in Bangladesh:
            </p>

            <div className="mt-6 space-y-6">
              {/* Account Data */}
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">A. Account &amp; Contact Details (All Users)</h3>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                  <li><strong>Full Name:</strong> To identify you to other matched users on the platform.</li>
                  <li><strong>Mobile Phone Number:</strong> Used as your primary account identifier, for OTP verification, and for direct voice contact between guardians and shortlisted tutors.</li>
                  <li><strong>Email Address (Optional or Google Sign-In):</strong> For account recovery, transactional updates, and receipts.</li>
                  <li><strong>Password / Security Credentials:</strong> Cryptographically salted and hashed; we never store plain-text passwords.</li>
                  <li><strong>Profile Photo (Optional):</strong> Uploaded by the user to build trust and authenticity on tutor profiles.</li>
                </ul>
              </div>

              {/* Student/Guardian Data */}
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">B. Tuition Post Data (Students &amp; Guardians)</h3>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                  <li><strong>Academic Requirements:</strong> Subject(s) requested, student class/grade (e.g. Class 9, HSC, O Levels), curriculum medium (Bangla Medium, English Version, English Medium).</li>
                  <li><strong>Tuition Logistics:</strong> Expected monthly salary or hourly rate, preferred days per week and schedule, gender preference for the tutor.</li>
                  <li><strong>Tuition Location:</strong> Selected neighborhood/area and sub-area in Chittagong (e.g., Panchlaish, Nasirabad, Halishahar, Agrabad) and specific address notes. <em>(Exact street address is only shared with the confirmed hired tutor).</em></li>
                  <li><strong>Ratings &amp; Reviews:</strong> Star ratings and written reviews provided for tutors following demo classes or confirmed hiring.</li>
                </ul>
              </div>

              {/* Tutor Data */}
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">C. Profile &amp; Verification Data (Tutors)</h3>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                  <li><strong>Qualifications &amp; Education:</strong> Educational history, institutions attended (e.g. CUET, Chittagong University, colleges), degrees obtained, passing years, and teaching background.</li>
                  <li><strong>Tutoring Preferences:</strong> Subjects taught, preferred student grades, areas covered in Chittagong, teaching style, and hourly/monthly rates.</li>
                  <li><strong>Verification Credentials:</strong> Scanned copies or photographs of Student ID card, SSC/HSC certificate, National Identity Card (NID), or university degree certificates. These documents are collected strictly to verify your academic claims and protect students.</li>
                  <li><strong>Assessment Results:</strong> Scores on optional subject competence or MCQ screening tests conducted on the platform.</li>
                </ul>
              </div>

              {/* Financial Data */}
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="text-[17px] font-bold text-ink">D. Financial &amp; Wallet Ledger Information</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">
                  Tutors utilize an in-app wallet balance and credit system (such as activation fees of ৳500 and tuition application credits). We track transaction IDs, timestamps, credit balances, and payment gateway references.
                </p>
                <div className="mt-3 rounded-md bg-tint/60 p-3 text-[13px] leading-5 text-body">
                  <strong className="text-primary-80">Security Notice:</strong> All online payments are handled externally through PCI-DSS certified payment service providers (SSLCommerz / PayStation / mobile financial services). Tutorly <strong>never collects, stores, or sees</strong> credit card numbers, debit card CVVs, or your bKash / Nagad / Rocket PINs.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Permissions */}
          <section id="permissions" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <DeviceMobile size={26} className="text-primary" />
              2. Android Device Permissions &amp; Why We Request Them
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              The Tutorly Android app requests only the minimum set of permissions necessary to deliver essential services:
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-surface-variant text-[13px] font-bold uppercase tracking-wider text-ink">
                  <tr>
                    <th className="px-4 py-3 sm:px-6">Permission</th>
                    <th className="px-4 py-3 sm:px-6">Purpose</th>
                    <th className="px-4 py-3 sm:px-6">Mandatory?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-semibold text-ink sm:px-6">
                      POST_NOTIFICATIONS
                    </td>
                    <td className="px-4 py-3.5 text-body sm:px-6">
                      Sends real-time push notifications when a new matching tuition is posted, when a guardian shortlists your profile, or when a hire is confirmed.
                    </td>
                    <td className="px-4 py-3.5 text-muted sm:px-6">Optional (Can be toggled in OS settings)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-semibold text-ink sm:px-6">
                      READ_MEDIA_IMAGES / Storage
                    </td>
                    <td className="px-4 py-3.5 text-body sm:px-6">
                      Allows tutors and guardians to select and upload a profile photo, and allows tutors to upload verification documents (e.g. Student ID, certificates).
                    </td>
                    <td className="px-4 py-3.5 text-muted sm:px-6">Required only when uploading images</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-semibold text-ink sm:px-6">
                      CAMERA (Optional)
                    </td>
                    <td className="px-4 py-3.5 text-body sm:px-6">
                      Allows capturing a fresh photo of your student ID or profile picture directly with your camera rather than selecting from the gallery.
                    </td>
                    <td className="px-4 py-3.5 text-muted sm:px-6">Optional</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-semibold text-ink sm:px-6">
                      INTERNET &amp; Network State
                    </td>
                    <td className="px-4 py-3.5 text-body sm:px-6">
                      Required for the app to sync listings, profiles, messages, and notifications with cloud servers securely.
                    </td>
                    <td className="px-4 py-3.5 text-muted sm:px-6">Required</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-semibold text-ink sm:px-6">
                      RECEIVE_BOOT_COMPLETED
                    </td>
                    <td className="px-4 py-3.5 text-body sm:px-6">
                      Ensures notification channels are properly registered after your phone restarts so you don&rsquo;t miss time-sensitive tuition alerts.
                    </td>
                    <td className="px-4 py-3.5 text-muted sm:px-6">Standard Android requirement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-line bg-surface-variant p-4 text-[14px] leading-5 text-muted">
              <MapPin size={20} className="mt-0.5 flex-shrink-0 text-primary" />
              <span>
                <strong>Note regarding Location:</strong> Tutorly <strong>does not</strong> use background GPS tracking or continuous hardware location monitoring. Locations are chosen manually from neighborhood dropdowns (e.g. Chittagong sub-areas) to protect your location privacy.
              </span>
            </div>
          </section>

          {/* Section 3: How We Use Your Data */}
          <section id="how-we-use" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <FileText size={26} className="text-primary" />
              3. How We Use Your Information
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              We process personal information under lawful grounds (contractual performance, user consent, and legitimate interest) for the following purposes:
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">1. Matchmaking &amp; Discovery</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Connecting students with suitable, verified home tutors based on area, subject, grade, budget, and scheduling preferences.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">2. Trust &amp; Safety Verification</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Reviewing tutor academic credentials, institutional affiliations, and certificates to protect families and safeguard against fraudulent profiles.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">3. Facilitating Communication</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Enabling phone contact exchange between guardians and tutors once an application has been shortlisted or confirmed for demo classes.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">4. Wallet &amp; Transaction Management</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Maintaining transparent records of tutor activation, application credit deductions, demo holds, and top-up payments.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">5. Real-Time Push Notifications</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Delivering instant alerts when new tuitions in your area are posted, applications are reviewed, or trial classes are scheduled.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <h3 className="font-bold text-ink">6. Customer Support &amp; Fraud Prevention</h3>
                <p className="mt-1.5 text-[14px] leading-5 text-body">
                  Assisting users via WhatsApp/email and preventing off-platform scams, fee evasion, harassment, or misuse of user contact numbers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Information Sharing & Disclosure */}
          <section id="sharing" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <ShareNetwork size={26} className="text-primary" />
              4. Information Sharing &amp; Disclosure
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              We strictly control how personal data is shared to maintain privacy and trust:
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="font-bold text-ink">A. Visibility on the Platform</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-[14px] leading-6 text-body">
                  <li>
                    <strong>Public Tutor Profile:</strong> If published, a tutor&rsquo;s name, photo, bio, subjects, education history, ratings, and reviews are visible to students and guardians seeking tutors.
                  </li>
                  <li>
                    <strong>Tuition Board Listings:</strong> Tuition postings display class, subject, general neighborhood (e.g. Nasirabad), salary, and requirements. <strong>Student and guardian phone numbers and exact home addresses are NEVER publicly visible.</strong>
                  </li>
                  <li>
                    <strong>Contact Exchange (Shortlist &amp; Demo):</strong> When a student or guardian explicitly shortlists a tutor or invites them to a trial class, the guardian&rsquo;s phone number is securely unlocked for that specific tutor so they can connect and discuss terms.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="font-bold text-ink">B. Third-Party Infrastructure &amp; Processors</h3>
                <p className="mt-1.5 text-[14px] leading-6 text-body">
                  We use trusted enterprise service providers who adhere to strict data processing and security standards:
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                  <li><strong>Google Cloud &amp; Firebase (Google LLC):</strong> Cloud Firestore database, Firebase Authentication, and Firebase Cloud Messaging (FCM).</li>
                  <li><strong>Cloudflare R2 / AWS S3:</strong> Encrypted object storage for tutor credentials, certificates, and media assets.</li>
                  <li><strong>SSLCommerz &amp; PayStation:</strong> Regulated payment gateway infrastructure in Bangladesh for processing payments.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-surface p-5">
                <h3 className="font-bold text-ink">C. Legal Compliance &amp; Protection</h3>
                <p className="mt-1.5 text-[14px] leading-6 text-body">
                  We may disclose information if required to do so by applicable laws of the People&rsquo;s Republic of Bangladesh, in response to a valid court order, or to protect the vital safety, property, and rights of our users and the public.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security & Storage */}
          <section id="security" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <LockSimple size={26} className="text-primary" />
              5. Data Security, Storage &amp; Retention
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-6 text-body">
              <p>
                We implement robust administrative, technical, and physical safeguards designed to protect personal data from unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[14px]">
                <li><strong>Encryption in Transit:</strong> All communications between the mobile application, backend API, and third-party services use industry-standard HTTPS / TLS 1.3 encryption.</li>
                <li><strong>Granular Database Rules:</strong> Access to Firestore is secured by strict server-side security rules ensuring users can only read and write data they are authorized to access.</li>
                <li><strong>Private Presigned URLs:</strong> Sensitive tutor verification documents (NID, university certificates) are stored in private cloud storage and can only be accessed by authorized verification staff via short-lived, cryptographically signed URLs.</li>
                <li><strong>Data Retention:</strong> We retain account data as long as your account is active. If you delete your account, your profile, listings, and verification documents are purged within 30 days, except for transaction ledgers retained solely to comply with legal, tax, and accounting obligations in Bangladesh.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Google Play Data Safety Summary */}
          <section id="data-safety" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <ShieldCheck size={26} className="text-primary" />
              6. Google Play Data Safety Declarations
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              For full compliance with Google Play Store User Data policies, the following table summarizes how Tutorly handles data categories:
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-surface-variant text-[13px] font-bold uppercase tracking-wider text-ink">
                  <tr>
                    <th className="px-4 py-3 sm:px-6">Data Category</th>
                    <th className="px-4 py-3 sm:px-6">Collected?</th>
                    <th className="px-4 py-3 sm:px-6">Shared?</th>
                    <th className="px-4 py-3 sm:px-6">Encrypted in Transit?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink sm:px-6">Personal Info (Name, Phone, Email)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Yes (Account setup &amp; matchmaking)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Only with shortlisted tutor/guardian</td>
                    <td className="px-4 py-3 text-success font-medium sm:px-6">Yes (HTTPS/TLS)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink sm:px-6">Financial Info (Transaction history)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Yes (Credits &amp; activation)</td>
                    <td className="px-4 py-3 text-body sm:px-6">With payment processors only</td>
                    <td className="px-4 py-3 text-success font-medium sm:px-6">Yes (HTTPS/TLS)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink sm:px-6">Photos &amp; Documents (IDs, Certs)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Yes (Profile &amp; credential vetting)</td>
                    <td className="px-4 py-3 text-body sm:px-6">No (Private verification only)</td>
                    <td className="px-4 py-3 text-success font-medium sm:px-6">Yes (HTTPS/TLS)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink sm:px-6">Approximate Area (Neighborhood)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Yes (Tuition matching)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Public on tuition board</td>
                    <td className="px-4 py-3 text-success font-medium sm:px-6">Yes (HTTPS/TLS)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink sm:px-6">Device &amp; Other IDs (FCM tokens)</td>
                    <td className="px-4 py-3 text-body sm:px-6">Yes (Push alerts)</td>
                    <td className="px-4 py-3 text-body sm:px-6">With Google Firebase only</td>
                    <td className="px-4 py-3 text-success font-medium sm:px-6">Yes (HTTPS/TLS)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Account & Data Deletion */}
          <section id="deletion" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <Trash size={26} className="text-primary" />
              7. Account &amp; Data Deletion
            </h2>
            <div className="mt-4 rounded-xl border border-line bg-surface p-6 sm:p-8">
              <p className="text-[15px] leading-6 text-body">
                You have the absolute right to request the deletion of your Tutorly account and all associated personal data at any time.
              </p>

              <h3 className="mt-5 text-[16px] font-bold text-ink">How to delete your account:</h3>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-[14px] leading-6 text-body">
                <li>
                  <strong>Directly in the Android App:</strong> Open Tutorly &rarr; Go to <em>Profile / Settings</em> &rarr; Select <em>Account Settings</em> &rarr; Tap <em>&ldquo;Delete Account&rdquo;</em> and confirm.
                </li>
                <li>
                  <strong>Via Email Request:</strong> Send an email from your registered email address or mentioning your registered phone number to{' '}
                  <a href={`mailto:${site.email}?subject=Account%20Deletion%20Request`} className="font-semibold text-primary-80 underline">
                    {site.email}
                  </a>{' '}
                  with the subject line: <code>&ldquo;Account Deletion Request&rdquo;</code>.
                </li>
              </ol>

              <h3 className="mt-5 text-[16px] font-bold text-ink">What happens when you request deletion:</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-body">
                <li>Your profile, name, phone number, and email are removed from public searches and matchmaking.</li>
                <li>All active tuition postings, applications, and saved preferences are cancelled.</li>
                <li>All uploaded verification documents and certificates are deleted from our secure cloud storage.</li>
                <li>Account deletion takes effect immediately in the app and cloud purges complete within 30 days.</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Children's Privacy */}
          <section id="children" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <WarningCircle size={26} className="text-primary" />
              8. Children&rsquo;s Privacy
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-6 text-body">
              <p>
                Tutorly is designed as a tool for <strong>adult guardians (parents/family members)</strong> looking to hire teachers, and adult tutors (typically university students and certified educators) seeking tuition opportunities.
              </p>
              <p>
                We do not knowingly collect personal contact information directly from children under the age of 13. Any tuition listing for minor students must be posted and administered by a parent or legal guardian. If we become aware that an account was created by a child under 13 without verifiable parental consent, we will promptly delete that account.
              </p>
            </div>
          </section>

          {/* Section 9: Contact Information */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="flex items-center gap-2 text-[24px] font-bold text-ink">
              <EnvelopeSimple size={26} className="text-primary" />
              9. Contact Information &amp; Data Inquiries
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-body">
              If you have any questions, feedback, or concerns regarding this Privacy Policy or your personal information, please feel free to reach out to our team:
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <a
                href={`mailto:${site.email}`}
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <EnvelopeSimple size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Email Support</h3>
                <p className="mt-1 text-[13px] text-muted">Direct questions or requests</p>
                <span className="mt-2 text-[14px] font-semibold text-primary-80">{site.email}</span>
              </a>

              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener"
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F8EF] text-[#12805C]">
                  <WhatsappLogo size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">WhatsApp Helpline</h3>
                <p className="mt-1 text-[13px] text-muted">Quick help &amp; support</p>
                <span className="mt-2 text-[14px] font-semibold text-[#12805C]">+880 1700-000000</span>
              </a>

              <div className="flex flex-col rounded-xl border border-line bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary-80">
                  <MapPin size={22} weight="bold" />
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink">Headquarters</h3>
                <p className="mt-1 text-[13px] text-muted">Location</p>
                <span className="mt-2 text-[14px] font-medium text-body">Chittagong, Bangladesh</span>
              </div>
            </div>
          </section>

          {/* Bottom Back Button */}
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
                Download Tutorly App on Google Play &rarr;
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
