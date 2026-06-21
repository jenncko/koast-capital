const nav = [
  { label: 'About', href: '#about' },
  { label: 'Funded Loans', href: '#funded' },
  { label: 'Loan Programs', href: '#programs' },
  { label: 'Schedule a Consultation', href: '#book' },
]

export default function Footer() {
  return (
    <footer className="pt-6 pb-5" style={{ backgroundColor: '#756C5F' }}>
      <div className="container-xl">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">

          {/* Brand — full-width row on mobile, one column on desktop */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="font-serif text-base font-light tracking-[0.12em] text-cream uppercase block mb-3">
              Koast Capital
            </a>
            <p className="font-serif font-light text-cream/60 text-xs leading-relaxed md:max-w-[240px]">
              Personal mortgage advisory for homeowners, self-employed borrowers, and real estate investors across the Western United States in CA, NV, AZ and WA.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-cream/40 mb-3">Navigate</p>
            <div className="space-y-1.5">
              {nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-serif font-light text-cream/60 text-xs hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-cream/40 mb-3">Contact</p>
            <div className="space-y-1.5">
              <a
                href="mailto:info@koastcapital.com"
                className="block font-serif font-light text-cream/60 text-xs hover:text-cream transition-colors duration-200"
              >
                info@koastcapital.com
              </a>
              <p className="font-serif font-light text-cream/60 text-xs">NMLS 2478721</p>
              <p className="font-serif font-light text-cream/60 text-xs">CA DRE 02411638</p>
              <p className="font-serif font-light text-cream/60 text-xs">NV RED S.0204930</p>
            </div>
          </div>

        </div>

        <div className="h-px bg-cream/10 mb-4" />

        {/* NMLS disclosure */}
        <p className="font-sans font-light text-[11px] text-cream/30 leading-relaxed mb-3">
          Jennifer Ko | NMLS 2478721 | CA DRE 02411638 | Koast Capital. Licensed in the States of California, Nevada, Arizona, and Washington. This is not a commitment to lend.<br />
          All loans are subject to credit and property approval. Programs, rates, terms, and conditions are subject to change without notice. Equal Housing Opportunity Lender.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-sans font-light text-cream/25 text-[11px]">
            &copy; {new Date().getFullYear()} Koast Capital. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="font-sans font-light text-cream/25 text-[11px] hover:text-cream/50 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="font-sans font-light text-cream/25 text-[11px] hover:text-cream/50 transition-colors duration-200">
              Terms of Use
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
