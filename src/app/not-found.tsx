import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#CC6222] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <p className="text-[#34D399] text-sm font-semibold tracking-[0.25em] uppercase mb-4">Page Not Found</p>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/60 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/" className="bg-[#34D399] text-white px-8 py-3.5 rounded-md font-bold text-sm tracking-widest uppercase hover:bg-[#8DE8CC] transition-colors">
            Go Home
          </Link>
          <a href="tel:9547103636" className="text-white font-semibold hover:text-[#34D399] transition-colors">
            Call (954) 710-3636
          </a>
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-sm mb-4">Looking for one of these?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/service-areas-served-by-the-florida-maid" className="text-sm text-[#34D399]/70 hover:text-[#34D399] transition-colors">Service Areas</Link>
            <span className="text-white/20">|</span>
            <Link href="/updated-florida-maid-service-industry-pricing" className="text-sm text-[#34D399]/70 hover:text-[#34D399] transition-colors">Pricing</Link>
            <span className="text-white/20">|</span>
            <Link href="/florida-maid-service-services-offered-by-the-florida-maid" className="text-sm text-[#34D399]/70 hover:text-[#34D399] transition-colors">Services</Link>
            <span className="text-white/20">|</span>
            <Link href="/book/new" className="text-sm text-[#34D399]/70 hover:text-[#34D399] transition-colors">Book Online</Link>
            <span className="text-white/20">|</span>
            <Link href="/available-florida-maid-jobs" className="text-sm text-[#34D399]/70 hover:text-[#34D399] transition-colors">Careers</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
