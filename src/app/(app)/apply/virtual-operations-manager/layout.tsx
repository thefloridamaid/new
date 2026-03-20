import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply — Operations Manager (Virtual) | The Florida Maid Cleaning Service Cleaning Service',
  description:
    'Apply for the Operations Manager (Virtual) position at The Florida Maid Cleaning Service Cleaning Service. Remote role — scheduling, customer service, team management, payment coordination. $500/week base + 5% gross revenue.',
  alternates: { canonical: 'https://www.thefloridamaid.com/apply/virtual-operations-manager' },
  openGraph: {
    title: 'Apply — Operations Manager (Virtual) | The Florida Maid Cleaning Service Cleaning Service',
    description:
      'Apply for the Operations Manager (Virtual) role. $500–$750/week to start. Work from home. Part-time to start, 7 days/week.',
    url: 'https://www.thefloridamaid.com/apply/virtual-operations-manager',
    siteName: 'The Florida Maid Cleaning Service Cleaning Service',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Apply — Operations Manager (Virtual) | The Florida Maid Cleaning Service Cleaning Service',
    description:
      'Apply for the Operations Manager (Virtual) role. $500–$750/week to start. Work from home. Part-time to start, 7 days/week.',
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Orlando',
  },
}

export default function ApplyOpsManagerLayout({ children }: { children: React.ReactNode }) {
  return children
}
