import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | The Florida Maid',
    default: 'The Florida Maid - Professional Cleaning Services in Florida From $49/hr',
  },
  description: 'Florida house cleaning & maid service from $49/hr. Orlando, Tampa, Miami, Jacksonville & statewide. Licensed, insured, 5.0★ Google rated. Book online or call (833) 352-6243.',
  metadataBase: new URL('https://www.thefloridamaid.com'),
  manifest: '/manifest.json',
  applicationName: 'The Florida Maid',
  authors: [{ name: 'The Florida Maid', url: 'https://www.thefloridamaid.com' }],
  creator: 'The Florida Maid Cleaning Service LLC',
  publisher: 'The Florida Maid',
  category: 'Home Services',
  classification: 'Cleaning Service',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Florida maid service', 'house cleaning Florida', 'house cleaning Orlando',
    'deep cleaning service Tampa', 'maid service Miami', 'cleaning service Jacksonville',
    'move in cleaning Florida', 'office cleaning Florida', 'same day cleaning Florida',
    'affordable cleaning service Florida', 'weekly maid service Florida',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The Florida Maid',
    title: 'The Florida Maid - Professional Cleaning Services in Florida From $49/hr',
    description: 'Florida house cleaning & maid service from $49/hr. Orlando, Tampa, Miami, Jacksonville & statewide. Licensed, insured, 5.0★ Google rated.',
    url: 'https://www.thefloridamaid.com',
    images: [
      {
        url: 'https://www.thefloridamaid.com/icon-512.png',
        width: 512,
        height: 512,
        alt: 'The Florida Maid - Professional Cleaning Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Florida Maid - Florida Cleaning Service From $49/hr',
    description: 'Professional house cleaning across Florida. 5.0★ Google. Licensed & insured. Book online or call (833) 352-6243.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.thefloridamaid.com',
    languages: {
      'en-US': 'https://www.thefloridamaid.com',
      'es-US': 'https://www.thefloridamaid.com',
    },
  },
  verification: {
    other: {
      'msvalidate.01': [''],
    },
  },
  other: {
    'format-detection': 'telephone=yes',
    'geo.region': 'US-FL',
    'geo.placename': 'Orlando',
    'geo.position': '28.5383;-81.3792',
    'ICBM': '28.5383, -81.3792',
    'rating': 'general',
    'revisit-after': '3 days',
    'distribution': 'global',
    'language': 'English',
    'og:phone_number': '+1-833-352-6243',
    'og:email': 'hi@thefloridamaid.com',
    'business:contact_data:street_address': '100 S Orange Ave, Suite 400',
    'business:contact_data:locality': 'Orlando',
    'business:contact_data:region': 'FL',
    'business:contact_data:postal_code': '32801',
    'business:contact_data:country_name': 'United States',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="alternate" hrefLang="en-US" href="https://www.thefloridamaid.com" />
        <link rel="alternate" hrefLang="es-US" href="https://www.thefloridamaid.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.thefloridamaid.com" />
      </head>
      <body>
        {children}
        <Script id="tawk-to" strategy="afterInteractive">{`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6823effa7c5b09190cd447fe/1ir662r4n';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}</Script>
        <Script id="error-catcher" strategy="beforeInteractive">{`
          window.addEventListener('error', function(e) {
            if (!e.message) return;
            fetch('/api/errors', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: e.message, stack: e.error?.stack, url: location.href, source: 'window.onerror' })
            }).catch(function(){});
          });
          window.addEventListener('unhandledrejection', function(e) {
            var msg = e.reason?.message || String(e.reason);
            fetch('/api/errors', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: msg, stack: e.reason?.stack, url: location.href, source: 'unhandled-promise' })
            }).catch(function(){});
          });
        `}</Script>
      </body>
    </html>
  );
}
