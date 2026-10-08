import { useEffect } from 'react'
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  ArrowLeft,
  WhatsappLogo,
  ShieldCheck,
  Users,
  GraduationCap,
  Handshake,
  Certificate,
  Heart,
  FacebookLogo,
} from '@phosphor-icons/react'
import { container } from '../lib/styles'
import site, { playStoreUrl } from '../site'

export function AboutUs() {
  useEffect(() => {
    document.title = `About Us – ${site.name}`
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line bg-primary py-16 sm:py-24">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-tertiary/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-[340px] w-[340px] rounded-full border border-tertiary/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full border border-tertiary/10" aria-hidden="true" />

        <div className={container}>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-tertiary/70 transition-colors hover:text-tertiary"
          >
            <ArrowLeft size={18} weight="bold" />
            Back to Home
          </a>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-3.5 py-1 text-[13px] font-bold text-tertiary/90">
              <Heart size={16} weight="fill" />
              <span>Our Story</span>
            </div>
            <h1 className="mt-4 text-[36px] font-extrabold leading-[44px] text-tertiary sm:text-[52px] sm:leading-[60px]">
              About{' '}
              <span className="text-tertiary/80">Tutor Lagbe</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-7 text-tertiary/80">
              Bangladesh&rsquo;s trusted home tutor matchmaking platform — connecting families with qualified, verified tutors across the country.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`${container} py-14 md:py-20`}>

        {/* Company Story */}
        <section className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1 text-[13px] font-bold text-primary-80">
            <GraduationCap size={16} weight="fill" />
            <span>Who We Are</span>
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-[36px] text-ink sm:text-[34px] sm:leading-[42px]">
            Bridging the gap between families and tutors in Bangladesh
          </h2>
          <div className="mt-5 space-y-4 text-[16px] leading-7 text-body">
            <p>
              <strong className="text-ink">Tutor Lagbe</strong> (meaning &ldquo;I need a tutor&rdquo; in Bengali) was born from a simple but powerful observation: finding a trustworthy, qualified home tutor in Bangladesh was unnecessarily hard. Guardians relied on word-of-mouth, and tutors had no efficient way to reach families who needed them.
            </p>
            <p>
              We built <strong className="text-ink">Tutorly</strong> to solve exactly that — a technology-first platform that makes the tutor discovery process transparent, safe, and efficient. Guardians can post tuition requirements in minutes, browse verified tutor profiles, and confirm hires directly through the app. Tutors get access to a live board of real tuition opportunities matched to their skills and location.
            </p>
            <p>
              What sets us apart is our commitment to <strong className="text-ink">trust and safety</strong>. Every tutor goes through a credential verification process. Guardian contact details are never publicly exposed — they&rsquo;re only shared with shortlisted tutors. Our in-app hire confirmation system ensures both parties are protected throughout the process.
            </p>
            <p>
              From Dhaka to Chittagong and beyond, Tutorly is becoming the go-to platform for home tuition in Bangladesh — one verified match at a time.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1 text-[13px] font-bold text-primary-80">
            <Heart size={16} weight="fill" />
            <span>Our Values</span>
          </div>
          <h2 className="mt-4 text-[26px] font-bold text-ink sm:text-[30px]">
            What drives everything we do
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Trust & Safety',
                desc: 'Every tutor is verified. Guardian contacts are protected. Hires are confirmed in-app — not over uncertain phone calls.',
              },
              {
                icon: GraduationCap,
                title: 'Education First',
                desc: 'We believe quality education should be accessible to every family in Bangladesh, regardless of where they live.',
              },
              {
                icon: Users,
                title: 'Community',
                desc: 'We serve both sides of the equation equally — guardians get great tutors, and tutors get a steady stream of genuine opportunities.',
              },
              {
                icon: Certificate,
                title: 'Verified Quality',
                desc: 'We only allow tutors with verifiable academic credentials. Fake profiles are immediately removed.',
              },
              {
                icon: Handshake,
                title: 'Fairness',
                desc: 'Families use Tutorly for free. Tutors pay a small activation fee and use credits — ensuring our incentives align with successful matches.',
              },
              {
                icon: Heart,
                title: 'Transparency',
                desc: 'Clear pricing, open policies, and honest communication. No hidden fees, no surprises.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-raised">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-primary-80">
                  <item.icon size={26} weight="fill" />
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Info Card */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-1 text-[13px] font-bold text-primary-80">
            <Certificate size={16} weight="fill" />
            <span>Company Information</span>
          </div>
          <h2 className="mt-4 text-[26px] font-bold text-ink sm:text-[30px]">
            Business details &amp; registration
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="p-6 sm:p-8">
                <p className="text-[13px] font-bold uppercase tracking-wider text-muted">Registered Name</p>
                <p className="mt-1 text-[22px] font-extrabold text-ink">Tutor Lagbe</p>
                <p className="mt-0.5 text-[14px] text-muted">Platform: Tutorly</p>

                <div className="mt-6 space-y-3 text-[14px] leading-6">
                  <div className="flex items-start gap-3">
                    <Certificate size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-ink">Trade License</p>
                      <p className="font-mono text-body">{site.tradeLicense}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-ink">Business Address</p>
                      <p className="text-body">{site.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[13px] font-bold uppercase tracking-wider text-muted">Contact Us</p>
                <div className="mt-4 space-y-4">
                  <a
                    href={`tel:${site.phoneRaw}`}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-variant p-3.5 transition-colors hover:border-primary hover:bg-tint/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-tint text-primary-80">
                      <Phone size={20} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">Phone</p>
                      <p className="text-[15px] font-bold text-ink">{site.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${site.phoneRaw}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-variant p-3.5 transition-colors hover:border-[#25D366] hover:bg-[#E6F8EF]/50"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E6F8EF] text-[#12805C]">
                      <WhatsappLogo size={20} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">WhatsApp</p>
                      <p className="text-[15px] font-bold text-[#12805C]">{site.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-variant p-3.5 transition-colors hover:border-primary hover:bg-tint/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-tint text-primary-80">
                      <EnvelopeSimple size={20} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">Email</p>
                      <p className="text-[15px] font-bold text-primary-80">{site.email}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Map hint bar */}
            <div className="flex items-center gap-3 border-t border-line bg-surface-variant/60 px-6 py-4">
              <MapPin size={18} className="flex-shrink-0 text-primary" />
              <p className="text-[14px] text-body">
                <strong>Office Location:</strong> {site.address}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-primary p-8 text-tertiary sm:p-12">
          <div className="max-w-2xl">
            <h2 className="text-[26px] font-bold leading-[34px] sm:text-[32px] sm:leading-[40px]">
              Ready to find the perfect tutor?
            </h2>
            <p className="mt-3 text-[16px] leading-6 text-tertiary/80">
              Join thousands of families and tutors across Bangladesh who trust Tutorly to make the right match.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-lg bg-tertiary px-6 py-3 text-[15px] font-bold text-primary-80 transition-colors hover:bg-tertiary/90"
              >
                Download the App
              </a>
              <a
                href={`https://wa.me/${site.phoneRaw}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-tertiary/30 px-6 py-3 text-[15px] font-semibold text-tertiary transition-colors hover:border-tertiary/60"
              >
                <WhatsappLogo size={18} weight="bold" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Bottom nav */}
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line pt-8">
          <a href="/terms" className="text-[14px] font-medium text-muted hover:text-primary-80">Terms &amp; Conditions</a>
          <a href="/privacy-policy" className="text-[14px] font-medium text-muted hover:text-primary-80">Privacy Policy</a>
          <a href="/refund" className="text-[14px] font-medium text-muted hover:text-primary-80">Refund Policy</a>
          <a href="/delivery" className="text-[14px] font-medium text-muted hover:text-primary-80">Delivery Policy</a>
          <a href={`https://wa.me/${site.phoneRaw}`} target="_blank" rel="noopener" className="ml-auto inline-flex items-center gap-1.5 text-[14px] font-medium text-[#12805C] hover:underline">
            <FacebookLogo size={16} />
            Follow us
          </a>
        </div>
      </div>
    </div>
  )
}
