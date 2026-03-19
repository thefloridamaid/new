import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply to Clean — Highest Paid Cleaning Jobs in Florida, Same-Day Pay | Trabajo de Limpieza Florida',
  description:
    'Join The Florida Maid — Florida\'s highest-paying cleaning jobs starting at $30/hr with same-day pay. No experience needed. Apply now for full-time or part-time house cleaning work in Florida. Solicite ahora — los trabajos de limpieza mejor pagados en Florida.',
  alternates: { canonical: 'https://www.thefloridamaid.com/apply' },
  openGraph: {
    title: 'Apply to Clean — Highest Paid Cleaning Jobs in Florida, Same-Day Pay',
    description:
      'Florida\'s best cleaning opportunities. $30/hr+, same-day pay, flexible hours. Apply in 2 minutes.',
    url: 'https://www.thefloridamaid.com/apply',
    siteName: 'The Florida Maid',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply to Clean — Highest Paid Cleaning Jobs in Florida',
    description:
      'Florida\'s best cleaning opportunities. $30/hr+, same-day pay, flexible hours. Apply in 2 minutes.',
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Orlando',
  },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
