import type { Icon } from '@phosphor-icons/react'
import {
  Atom,
  BookOpenText,
  Calculator,
  ChartLineUp,
  Code,
  Dna,
  Exam,
  Flask,
  FunctionIcon,
  GlobeHemisphereWest,
  MathOperations,
  Translate,
} from '@phosphor-icons/react'

export const subjects: { name: string; icon: Icon }[] = [
  { name: 'Mathematics', icon: MathOperations },
  { name: 'Physics', icon: Atom },
  { name: 'Chemistry', icon: Flask },
  { name: 'Biology', icon: Dna },
  { name: 'English', icon: Translate },
  { name: 'Bangla', icon: BookOpenText },
  { name: 'Higher Math', icon: FunctionIcon },
  { name: 'ICT', icon: Code },
  { name: 'Accounting', icon: Calculator },
  { name: 'Economics', icon: ChartLineUp },
  { name: 'IELTS', icon: GlobeHemisphereWest },
  { name: 'General Science', icon: Exam },
]

export const areas = [
  'Agrabad', 'Nasirabad', 'GEC Circle', 'Khulshi', 'Panchlaish', 'Halishahar',
  'Chawkbazar', 'Bahaddarhat', 'Muradpur', 'Lalkhan Bazar', 'Jamal Khan', 'Patenga',
]

export const testimonials = [
  { name: 'Tahmina Begum', role: 'Guardian', area: 'Nasirabad', initials: 'TB', quote: 'Found an amazing Math tutor for my son within 24 hours. The in-app confirmation gave me real peace of mind — no shady phone deals.' },
  { name: 'Md. Rafiqul Islam', role: 'Tutor', area: 'Agrabad', initials: 'RI', quote: "I've been hired for 3 tuitions this month already. The push notifications for new postings are incredibly helpful." },
  { name: 'Nusrat Jahan', role: 'Guardian', area: 'GEC Circle', initials: 'NJ', quote: 'The shortlisting feature is brilliant — I compared 3 tutors, called each one, then confirmed the best. So much better than Facebook groups!' },
]

export const faqs = [
  {
    q: 'Is Tutorly free for students and guardians?',
    a: 'Yes. Posting tuitions, browsing tutor profiles, shortlisting and hiring are all free for guardians and students — forever.',
  },
  {
    q: "When can I see a tutor's phone number?",
    a: 'As soon as you shortlist a tutor, their phone number is revealed to you (and yours to them) so you can call and discuss before confirming the hire.',
  },
  {
    q: 'How do credits work for tutors?',
    a: 'After a one-time ৳500 activation, tutors top up credits through SSLCommerz at 1 BDT = 1 credit. Each application costs 10 credits, and 1,000 credits are deducted only when a hire is confirmed. Every transaction appears in your wallet history.',
  },
  {
    q: 'What is the 3-step in-app confirmation?',
    a: 'Both the guardian and the tutor confirm the hire inside the app before it is final. This protects both sides from off-platform deals and closes the tuition automatically once confirmed.',
  },
  {
    q: 'Which areas does Tutorly cover?',
    a: 'We launched in Chittagong and tutors can list areas across all 8 divisions of Bangladesh.',
  },
  {
    q: 'Which phones does the app support?',
    a: 'Tutorly is live on Android today — download it free from Google Play. The iPhone app is coming soon to the App Store.',
  },
]
