'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const programs = [
  {
    name: 'Conventional',
    tag: 'Purchase · Refinance',
    body: 'Ideal for borrowers with documented income, strong credit, and long-term homeownership goals. Conventional financing often provides the most competitive rates and flexible options for primary residences, second homes, and investment properties.',
    dark: true,
  },
  {
    name: 'FHA / VA',
    tag: 'Government Programs',
    body: "Designed to make homeownership more accessible, FHA and VA financing offer flexible pathways for qualified buyers. Whether you're purchasing your first home, seeking a lower down payment option, or utilizing earned military benefits, these programs can provide greater affordability and expanded opportunities to achieve your homeownership goals.",
    dark: false,
  },
  {
    name: 'Jumbo',
    tag: 'High-Value Properties',
    body: 'Tailored for luxury homes and higher loan amounts that exceed conventional lending limits. Jumbo financing offers customized solutions for borrowers purchasing premium properties or refinancing substantial mortgage balances.',
    dark: false,
  },
  {
    name: 'Bank Statement / P&L / VOE',
    tag: 'Self-Employed · Alternative Income',
    body: 'Alternative income documentation using 12 or 24 months of bank statements, a CPA-prepared P&L, or verification of employment. Designed for entrepreneurs, freelancers, and independent professionals.',
    dark: true,
  },
  {
    name: 'Debt Service Coverage Ratio (DSCR)',
    tag: 'Real Estate Investors',
    body: "Built for real estate investors, DSCR financing focuses on a property's rental income rather than personal income documentation. A popular solution for expanding a portfolio without relying on tax returns or traditional debt-to-income calculations.",
    dark: true,
  },
  {
    name: 'No Ratio',
    tag: 'Equity-Based Financing',
    body: 'Designed for borrowers with significant equity and overall financial strength, No Ratio financing provides an alternative to traditional income-based qualification. An ideal solution for retirees, investors, and homeowners whose financial picture extends beyond conventional employment income.',
    dark: false,
  },
  {
    name: 'Hard Money / Bridge Loan /',
    line2: 'Fix & Flip',
    tag: 'Short-Term Financing',
    body: 'Not every financing need can wait 30 days. Hard Money and Bridge Loan solutions provide fast access to capital for borrowers with significant equity, unique credit situations, or time-sensitive opportunities that require a flexible approach.',
    dark: false,
  },
  {
    name: 'HELOC / HELOAN',
    tag: 'Home Equity Solutions',
    body: "Access your home's equity through a flexible line of credit or a lump-sum loan. Ideal for renovations, investments, or strategic debt consolidation.",
    dark: true,
  },
  {
    name: 'Reverse Mortgage (HECM)',
    tag: 'Retirement Planning',
    body: "Unlock the equity you've built over a lifetime. A Reverse Mortgage provides homeowners age 62+ with access to tax-free funds while eliminating the obligation of a required monthly mortgage payment.",
    dark: true,
  },
  {
    name: 'Foreign National',
    tag: 'International Buyers',
    body: 'Financing solutions for international investors seeking opportunities in U.S. real estate. Designed for non-U.S. citizens and non-permanent residents, with flexible documentation requirements.',
    dark: false,
  },
]

const INSET = 'max(24px, calc((100vw - 1400px) / 2))'

export default function LoanPrograms() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'next' ? 340 : -340, behavior: 'smooth' })
  }

  return (
    <section id="programs" className="py-16 lg:py-24 overflow-x-hidden" style={{ backgroundColor: '#EBE5DC' }}>

      <div
        className="flex flex-col lg:flex-row lg:items-start"
        style={{ paddingLeft: INSET }}
      >

        {/* Left panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="w-full lg:w-[440px] lg:flex-shrink-0 flex flex-col justify-between pb-10 lg:pb-0 pr-6 lg:pr-12 xl:pr-16"
          style={{ paddingTop: '4px' }}
        >
          <div>
            <p className="eyebrow mb-5">Loan Programs</p>
            <div className="h-px bg-charcoal/10 mb-6" />
            <h2
              className="font-serif font-light text-charcoal leading-tight"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
            >
              A program for every<br />
              <em>kind of borrower.</em>
            </h2>
          </div>

          <div className="hidden lg:block mt-12">
            <p className="eyebrow text-charcoal/25 mb-6">scroll to explore</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('prev')}
                aria-label="Previous program"
                className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
              >
                <svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M10 6H2M6 2L2 6l4 4" />
                </svg>
                Prev
              </button>
              <div className="w-px h-3 bg-charcoal/15" />
              <button
                onClick={() => scroll('next')}
                aria-label="Next program"
                className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
              >
                Next
                <svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll track — horizontal on desktop, stacked on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          ref={scrollRef}
          className="scrollbar-hide flex flex-col gap-5 lg:flex-row lg:gap-5 lg:overflow-x-auto lg:flex-1"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingRight: INSET,
          }}
        >
          {programs.map((prog) => (
            <div
              key={prog.name}
              className="w-full lg:flex-shrink-0 lg:w-[300px] xl:w-[340px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`flex flex-col p-6 h-full border ${
                  prog.dark
                    ? 'bg-stone border-cream/15'
                    : 'bg-cream border-charcoal/10'
                }`}
                style={{ minHeight: '320px' }}
              >
                {/* Tag */}
                <p className={`eyebrow mb-4 ${prog.dark ? 'text-cream/60' : 'text-charcoal/40'}`}>
                  {prog.tag}
                </p>

                {/* Name */}
                <h3
                  className={`font-serif font-light leading-tight mb-4 ${prog.dark ? 'text-cream' : 'text-charcoal'}`}
                  style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}
                >
                  {prog.name}
                  {'line2' in prog && prog.line2 && <><br />{prog.line2}</>}
                </h3>

                {/* Divider */}
                <div className={`w-16 h-px mb-5 ${prog.dark ? 'bg-cream/20' : 'bg-charcoal/12'}`} />

                {/* Body */}
                <p
                  className={`font-serif font-light flex-1 ${prog.dark ? 'text-cream/80' : 'text-mid'}`}
                  style={{ fontSize: '14px', lineHeight: '1.8' }}
                >
                  {prog.body}
                </p>

                {/* Link */}
                <a
                  href="#book"
                  className={`mt-6 inline-flex items-center gap-2 eyebrow transition-colors duration-200 group ${
                    prog.dark
                      ? 'text-cream/45 hover:text-cream'
                      : 'text-charcoal/35 hover:text-charcoal'
                  }`}
                >
                  Learn More
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                    className="group-hover:translate-x-0.5 transition-transform duration-300 ease-out"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </a>
              </motion.div>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  )
}
