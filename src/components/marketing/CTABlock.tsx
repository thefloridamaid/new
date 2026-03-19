export default function CTABlock({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="bg-[#34D399] py-20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl text-[#CC6222] tracking-wide">
            {title || 'Ready for a Spotless Home?'}
          </h2>
          <p className="text-[#CC6222]/70 text-lg mt-2">
            {subtitle || 'Text or call us today — trusted by thousands of Florida residents.'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <a href="tel:9547103636" className="border-2 border-[#CC6222] text-[#CC6222] px-8 py-3.5 rounded-md font-bold text-sm tracking-widest uppercase hover:bg-[#CC6222] hover:text-white transition-colors">
            Call (954) 710-3636
          </a>
          <a href="sms:9547103636" className="text-[#CC6222] font-semibold text-lg hover:underline underline-offset-4">
            or Text Us
          </a>
        </div>
      </div>
    </section>
  )
}
