'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const programs = [
  {
    name: 'Conventional',
    tag: 'Purchase · Refinance',
    body: 'Conforming loans with competitive rates and flexible terms. A straightforward path for borrowers with strong credit and documented income.',
    dark: true,
  },
  {
    name: 'FHA / VA',
    tag: 'Government Programs',
    body: 'Low down payment options and veteran benefits, executed with the same care and precision as every Koast Capital loan.',
    dark: false,
  },
  {
    name: 'Jumbo',
    tag: 'High-Value Properties',
    body: 'Financing above conforming limits for luxury and high-value properties. Competitive rates, discreet handling, and an advisor who understands this market.',
    dark: false,
  },
  {
    name: 'Bank Statement / P&L / VOE',
    tag: 'Self-Employed · Alternative Income',
    body: 'Alternative income documentation using 12 or 24 months of bank statements, a CPA-prepared P&L, or verification of employment. Designed for entrepreneurs, freelancers, and independent professionals.',
    dark: true,
  },
  {
    name: 'DSCR Investor',
    tag: 'Real Estate Investors',
    body: "Qualify based on the property's rental income — not your personal income. Ideal for scaling a portfolio without affecting your DTI.",
    dark: true,
  },
  {
    name: 'No Ratio',
    tag: 'Asset-Based Qualifying',
    body: "No income, no employment verification. Qualify on assets alone — designed for high-net-worth borrowers whose financial picture doesn't fit a traditional mold.",
    dark: false,
  },
  {
    name: 'Hard Money / Bridge Loans /',
    line2: 'Fix & Flip',
    tag: 'Short-Term Financing',
    body: 'Fast, asset-based lending for fix-and-flip projects, distressed properties, or time-sensitive acquisitions where speed matters more than rate.',
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
    body: 'A government-insured program allowing homeowners 62+ to convert home equity into tax-free funds — with no required monthly mortgage payment.',
    dark: true,
  },
  {
    name: 'Foreign National',
    tag: 'International Buyers',
    body: 'Financing for non-US citizens and non-permanent residents purchasing or investing in US real estate. No SSN required.',
    dark: false,
  },
]

export default function LoanPrograms() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const INSET = 'max(24px, calc((100vw - 1400px) / 2))'

  return (
    <section id="programs" className="py-24 overflow-hidden" style={{ backgroundColor: '#EBE5DC' }}>

      {/* ── Aman-style: left panel + card grid ── */}
      <div
        ref={ref}
        className="flex items-start gap-0"
        style={{ paddingLeft: INSET }}
      >

        {/* Left panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex-shrink-0 pr-12 lg:pr-16"
          style={{ width: '440px', paddingTop: '4px' }}
        >
          <p className="eyebrow mb-5">Loan Programs</p>
          <div className="h-px bg-charcoal/10 mb-6" />
          <h2
            className="font-serif font-light text-charcoal leading-tight"
            style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
          >
            A program for every<br />
            <em>kind of borrower.</em>
          </h2>
        </motion.div>

        {/* Programs grid */}
        <div className="flex-1 grid md:grid-cols-2 gap-px bg-charcoal/8" style={{ paddingRight: INSET }}>
          {programs.map((prog, i) => (
            <motion.div
              key={prog.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.09 }}
              whileHover={{ y: -3, boxShadow: prog.dark
                ? '0 8px 32px rgba(56,51,46,0.28)'
                : '0 8px 32px rgba(56,51,46,0.08)'
              }}
              style={{ backgroundColor: prog.dark ? '#756C5F' : undefined }}
              className={`relative p-6 xl:p-8 group transition-shadow duration-300 cursor-default ${
                prog.dark ? '' : 'bg-cream'
              }`}
            >
              <p className={`eyebrow mb-4 ${prog.dark ? 'text-cream/70' : 'text-charcoal/40'}`}>
                {prog.tag}
              </p>

              <h3
                className={`font-serif font-light leading-tight mb-4 ${
                  prog.dark ? 'text-cream' : 'text-charcoal'
                }`}
                style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
              >
                {prog.name}
                {'line2' in prog && prog.line2 && <><br />{prog.line2}</>}
              </h3>

              <div className={`w-24 h-px mb-5 ${prog.dark ? 'bg-cream/25' : 'bg-charcoal/15'}`} />

              <p
                className={`font-serif font-light ${
                  prog.dark ? 'text-cream/85' : 'text-mid'
                }`}
                style={{ fontSize: '15px', lineHeight: '1.8' }}
              >
                {prog.body}
              </p>

              <a
                href="#book"
                className={`mt-8 inline-flex items-center gap-2 eyebrow transition-colors duration-200 ${
                  prog.dark
                    ? 'text-cream/50 hover:text-cream'
                    : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                Learn More
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-out"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
