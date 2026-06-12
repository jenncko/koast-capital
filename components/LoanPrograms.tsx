'use client'

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
    body: 'Designed to make homeownership more accessible, FHA and VA financing offer flexible pathways for qualified buyers. Whether you\'re purchasing your first home, seeking a lower down payment option, or utilizing earned military benefits, these programs can provide greater affordability and expanded opportunities to achieve your homeownership goals.',
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
    name: 'DSCR Investor',
    tag: 'Real Estate Investors',
    body: "Built for real estate investors, DSCR financing focuses on a property's rental income rather than personal income documentation. A popular solution for expanding a portfolio without relying on tax returns or traditional debt-to-income calculations.",
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
  const INSET = 'max(24px, calc((100vw - 1400px) / 2))'

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
          className="w-full lg:w-[440px] lg:flex-shrink-0 pb-8 lg:pb-0 pr-6 lg:pr-12 xl:pr-16"
          style={{ paddingTop: '4px' }}
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
        <div
          className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ backgroundColor: 'rgba(56,51,46,0.08)', paddingRight: INSET }}
        >
          {programs.map((prog, i) => {
            const mobileDark = i % 2 === 0
            return (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3, boxShadow: prog.dark
                  ? '0 8px 32px rgba(56,51,46,0.28)'
                  : '0 8px 32px rgba(56,51,46,0.08)'
                }}
                className={`relative p-6 xl:p-8 group transition-shadow duration-300 cursor-default
                  ${mobileDark ? 'max-lg:bg-stone' : 'max-lg:bg-sand'}
                  ${prog.dark ? 'lg:bg-stone' : 'lg:bg-sand'}`}
              >
                <p className={`eyebrow mb-4
                  ${mobileDark ? 'max-lg:text-cream/70' : 'max-lg:text-charcoal/40'}
                  ${prog.dark ? 'lg:text-cream/70' : 'lg:text-charcoal/40'}`}>
                  {prog.tag}
                </p>

                <h3
                  className={`font-serif font-light leading-tight mb-4
                    ${mobileDark ? 'max-lg:text-cream' : 'max-lg:text-charcoal'}
                    ${prog.dark ? 'lg:text-cream' : 'lg:text-charcoal'}`}
                  style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
                >
                  {prog.name}
                  {'line2' in prog && prog.line2 && <><br />{prog.line2}</>}
                </h3>

                <div className={`w-24 h-px mb-5
                  ${mobileDark ? 'max-lg:bg-cream/25' : 'max-lg:bg-charcoal/15'}
                  ${prog.dark ? 'lg:bg-cream/25' : 'lg:bg-charcoal/15'}`} />

                <p
                  className={`font-serif font-light
                    ${mobileDark ? 'max-lg:text-cream/85' : 'max-lg:text-mid'}
                    ${prog.dark ? 'lg:text-cream/85' : 'lg:text-mid'}`}
                  style={{ fontSize: '15px', lineHeight: '1.8' }}
                >
                  {prog.body}
                </p>

                <a
                  href="#book"
                  className={`mt-8 inline-flex items-center gap-2 eyebrow transition-colors duration-200
                    ${mobileDark ? 'max-lg:text-cream/50 max-lg:hover:text-cream' : 'max-lg:text-charcoal/40 max-lg:hover:text-charcoal'}
                    ${prog.dark ? 'lg:text-cream/50 lg:hover:text-cream' : 'lg:text-charcoal/40 lg:hover:text-charcoal'}`}
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
            )
          })}
        </div>

      </div>
    </section>
  )
}
