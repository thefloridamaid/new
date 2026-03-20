import Link from 'next/link'

const southFloridaLinks = [
  { name: 'Miami', href: '/miami-maid-service' },
  { name: 'Fort Lauderdale', href: '/fort-lauderdale-maid-service' },
  { name: 'Palm Beach', href: '/palm-beach-maid-service' },
  { name: 'Boca Raton', href: '/boca-raton-maid-service' },
  { name: 'Coral Gables', href: '/coral-gables-maid-service' },
  { name: 'Hollywood', href: '/hollywood-florida-maid-service' },
  { name: 'Delray Beach', href: '/delray-beach-maid-service' },
  { name: 'Naples', href: '/naples-maid-service' },
]

const centralNorthFloridaLinks = [
  { name: 'Tampa', href: '/tampa-maid-service' },
  { name: 'Orlando', href: '/orlando-maid-service' },
  { name: 'Jacksonville', href: '/jacksonville-maid-service' },
  { name: 'St. Petersburg', href: '/st-petersburg-maid-service' },
  { name: 'Space Coast', href: '/space-coast-maid-service' },
  { name: 'Clearwater', href: '/clearwater-maid-service' },
  { name: 'Sarasota', href: '/sarasota-maid-service' },
  { name: 'Gainesville', href: '/gainesville-maid-service' },
]

const serviceFooterLinks = [
  { name: 'Deep Cleaning', href: '/services/deep-cleaning-service-in-florida' },
  { name: 'Regular Cleaning', href: '/services/house-cleaning-service-in-florida' },
  { name: 'Weekly Service', href: '/services/weekly-maid-service-in-florida' },
  { name: 'Move-In/Move-Out', href: '/services/move-in-move-out-cleaning-service-in-florida' },
  { name: 'Post-Construction', href: '/services/post-construction-cleanup-service-in-florida' },
  { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning-in-florida' },
  { name: 'Same-Day Cleaning', href: '/services/same-day-cleaning-service-in-florida' },
]

export default function MarketingFooter() {
  return (
    <footer className="bg-[#CC6222] text-white">
      {/* Main footer brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-white text-3xl md:text-4xl tracking-wide text-center mb-2">The Florida Maid Cleaning Service Cleaning Service</h2>
        <div className="w-16 h-[2px] bg-[#34D399] mx-auto mb-12" />
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div>
            <h3 className="text-xs font-semibold text-white tracking-[0.2em] uppercase mb-5">South Florida</h3>
            <ul className="space-y-2.5">
              {southFloridaLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white tracking-[0.2em] uppercase mb-5">Central & North FL</h3>
            <ul className="space-y-2.5">
              {centralNorthFloridaLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white tracking-[0.2em] uppercase mb-5">Services</h3>
            <ul className="space-y-2.5">
              {serviceFooterLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white tracking-[0.2em] uppercase mb-5">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about-the-florida-maid-service-company" className="text-sm text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact-the-florida-maid-service-today" className="text-sm text-white/80 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/updated-florida-maid-service-industry-pricing" className="text-sm text-white/80 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/florida-customer-reviews-for-the-florida-maid" className="text-sm text-white/80 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/available-florida-maid-jobs" className="text-sm text-white/80 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white tracking-[0.2em] uppercase mb-5">Resources</h3>
            <ul className="space-y-2.5">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Make a Payment</a></li>
              <li><Link href="/get-paid-for-cleaning-referrals-every-time-they-are-serviced" target="_blank" className="text-sm text-white/80 hover:text-white transition-colors">Referral Program</Link></li>
              <li><Link href="/book/new" target="_blank" className="text-sm text-white/80 hover:text-white transition-colors">Book a Cleaning</Link></li>
              <li><Link href="/florida-cleaning-service-frequently-asked-questions-in-2026" className="text-sm text-white/80 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/florida-maid-service-blog" className="text-sm text-white/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/florida-maid-and-cleaning-tips-and-advice-by-the-florida-maid" className="text-sm text-white/80 hover:text-white transition-colors">Cleaning Tips</Link></li>
              <li><Link href="/service/florida-emergency-cleaning-service" className="text-sm text-white/80 hover:text-white transition-colors">Emergency Cleaning</Link></li>
              <li><Link href="/apply" target="_blank" className="text-sm text-white/80 hover:text-white transition-colors">Apply to Clean</Link></li>
              <li><Link href="/feedback" target="_blank" className="text-sm text-white/80 hover:text-white transition-colors">Leave Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/80">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refunds</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
            <Link href="/do-not-share-policy" className="hover:text-white transition-colors">Do Not Share</Link>
          </div>
          <p className="text-xs text-white/80">&copy; {new Date().getFullYear()} The Florida Maid Cleaning Service &middot; <a href="tel:9547103636" className="text-[#34D399] hover:text-white">(954) 710-3636</a> &middot; Florida Web Design by{' '}<a href="https://www.consortiumnyc.com/" target="_blank" rel="noopener noreferrer" className="text-[#34D399] font-semibold hover:text-white underline underline-offset-2">Consortium NYC</a></p>
        </div>
      </div>
    </footer>
  )
}
