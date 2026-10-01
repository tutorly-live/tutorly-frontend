// Shared class recipes so every button and container follows the same spec.

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50'

export const btn = {
  /** Main CTA — filled blue, 40px tall. */
  primary: `${btnBase} h-10 rounded-md bg-primary px-4 text-[14px] leading-5 text-tertiary hover:bg-primary-70 active:bg-primary-80`,
  secondaryLg: `${btnBase} h-12 rounded-md border border-line bg-surface px-6 text-[16px] leading-6 text-ink hover:border-ink/30 hover:bg-surface-variant`,
  /** White on blue panels. */
  inverse: `${btnBase} h-12 rounded-md bg-surface px-6 text-[16px] leading-6 text-primary-80 hover:bg-tertiary/90`,
}

export const container = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8'

export const section = 'py-14 md:py-24'
