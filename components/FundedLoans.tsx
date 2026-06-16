'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const loans = [
  {
    image: '/funded-1.jpg',
    fallback: 'linear-gradient(175deg, #d4dcba 0%, #A8B08E 60%, #7a8a6a 100%)',
    location: 'Irvine, CA',
    tag: 'No Ratio · Cash-Out Refinance',
    amount: '$500,000',
    description:
      "For this self-employed business owner, traditional income documentation wasn't necessary. By leveraging a free-and-clear investment property, we structured a No Ratio cash-out refinance based solely on equity, delivering a straightforward solution with minimal documentation and efficient execution.",
  },
  {
    image: '/funded-2.jpg',
    fallback: 'linear-gradient(175deg, #e8e0d8 0%, #c4a49e 60%, #a0807a 100%)',
    location: 'Scottsdale, AZ',
    tag: 'DSCR · Cash-Out Refinance',
    amount: '$680,000',
    description:
      "For this experienced investor and builder, we refinanced an existing hard money loan into a lower-rate DSCR program. Qualification was based on the property's rental income rather than personal tax returns, providing improved cash flow through an interest-only adjustable-rate mortgage structure.",
  },
  {
    image: '/funded-3.jpg',
    fallback: 'linear-gradient(175deg, #ede8dc 0%, #c8d0aa 60%, #A8B08E 100%)',
    location: 'San Jose, CA',
    tag: 'Jumbo · Purchase',
    amount: '$1,364,000',
    description:
      'A young technology professional couple purchased their first home in Silicon Valley. With strong W-2 income, excellent credit, and a competitive market to navigate, we guided them through the pre-approval process, financing strategy, and successful closing of their jumbo loan.',
  },
  {
    image: '/funded-4.jpg',
    fallback: 'linear-gradient(175deg, #d8ddd0 0%, #9aaa80 60%, #6b7a52 100%)',
    location: 'Seattle, WA',
    tag: 'Jumbo · Purchase',
    amount: '$2,100,000',
    description:
      'High-net-worth buyer with a complex asset structure. Navigated documentation strategically for a clean, on-time close.',
  },
  {
    image: '/funded-5.jpg',
    fallback: 'linear-gradient(175deg, #dce4e8 0%, #9ab0bc 60%, #6a8a96 100%)',
    location: 'Newport Beach, CA',
    tag: 'Bank Statement · Cash-Out Refinance',
    amount: '$1,850,000',
    description:
      'Business owner leveraging home equity to fund a new venture. Approved on 24-month bank statements with no tax return required.',
  },
  {
    image: '/funded-6.jpg',
    fallback: 'linear-gradient(175deg, #e4dcd4 0%, #b89880 60%, #8a6a58 100%)',
    location: 'Henderson, NV',
    tag: 'DSCR · Purchase',
    amount: '$640,000',
    description:
      'Out-of-state investor expanding a short-term rental portfolio. Qualified on projected rental income with no W-2 required.',
  },
  {
    image: '/funded-7.jpg',
    fallback: 'linear-gradient(175deg, #e8ece0 0%, #b8c8a0 60%, #8a9a70 100%)',
    location: 'San Diego, CA',
    tag: 'Jumbo · Purchase',
    amount: '$3,200,000',
    description:
      'Coastal luxury purchase requiring a non-warrantable condo waiver. Secured financing where traditional channels declined.',
  },
  {
    image: '/funded-8.jpg',
    fallback: 'linear-gradient(175deg, #e0dce8 0%, #a89ec0 60%, #786890 100%)',
    location: 'Phoenix, AZ',
    tag: 'Conventional · Purchase',
    amount: '$490,000',
    description:
      'Relocating family on a tight timeline. Clear-to-close in 18 days with a seamless remote signing process.',
  },
  {
    image: '/funded-9.jpg',
    fallback: 'linear-gradient(175deg, #dce8e4 0%, #90b0a8 60%, #607870 100%)',
    location: 'Bellevue, WA',
    tag: 'No Ratio · Purchase',
    amount: '$1,720,000',
    description:
      'Recently retired executive with substantial assets and no traditional income. Qualified on liquid assets — no employment verification needed.',
  },
  {
    image: '/funded-10.jpg',
    fallback: 'linear-gradient(175deg, #e8e4d8 0%, #c0b090 60%, #907858 100%)',
    location: 'Reno, NV',
    tag: 'Hard Money · Fix & Flip',
    amount: '$580,000',
    description:
      "Distressed property acquisition requiring fast close. Funded in 9 days — well ahead of the seller's deadline.",
  },
  {
    image: '/funded-11.jpg',
    fallback: 'linear-gradient(175deg, #dce0e8 0%, #98a8c0 60%, #687890 100%)',
    location: 'Pasadena, CA',
    tag: 'FHA · Purchase',
    amount: '$720,000',
    description:
      'First-generation homebuyer navigating a high-cost market. Structured the loan to maximize down payment assistance and minimize out-of-pocket costs.',
  },
  {
    image: '/funded-12.jpg',
    fallback: 'linear-gradient(175deg, #e0e8dc 0%, #a0b898 60%, #708868 100%)',
    location: 'Scottsdale, AZ',
    tag: 'DSCR · Cash-Out Refinance',
    amount: '$1,100,000',
    description:
      'Investor refinancing a stabilized multi-family property to fund the next acquisition. Closed without disrupting existing tenants or lease terms.',
  },
]

const INSET = 'max(24px, calc((100vw - 1400px) / 2))'

export default function FundedLoans() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'next' ? 380 : -380, behavior: 'smooth' })
  }

  return (
    <section id="funded" className="py-16 lg:py-24 overflow-x-hidden" style={{ backgroundColor: '#F1EBE3' }}>

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
            <p className="eyebrow mb-5">Funded Loans</p>
            <div className="h-px bg-charcoal/10 mb-6" />
            <p
              className="font-serif font-light italic text-mid"
              style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: '1.5' }}
            >
              Real financing scenarios.<br />
              Thoughtful strategies.<br />
              Meaningful outcomes.
            </p>
          </div>

          <div className="mt-6 lg:mt-12">
            <p className="eyebrow text-charcoal/25 mb-6">scroll to explore</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('prev')}
                aria-label="Previous"
                className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="group-hover:-translate-x-0.5 transition-transform duration-200">
                  <path d="M10 6H2M6 2L2 6l4 4" />
                </svg>
                Prev
              </button>
              <div className="w-px h-3 bg-charcoal/15" />
              <button
                onClick={() => scroll('next')}
                aria-label="Next"
                className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
              >
                Next
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll track — horizontal on desktop, vertical stack on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          ref={scrollRef}
          className="scrollbar-hide flex flex-row gap-6 overflow-x-auto lg:flex-1"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingRight: INSET,
          }}
        >
          {loans.map((loan, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] lg:w-[300px] xl:w-[360px] flex flex-col pb-2"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image */}
              <div
                className="relative w-full mb-6 flex-shrink-0"
                style={{ height: '300px', background: loan.fallback }}
              >
                <Image
                  src={loan.image}
                  alt={`Funded loan — ${loan.location}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1">
                <p className="eyebrow text-sage mb-1.5">{loan.location}</p>
                <p className="eyebrow text-charcoal/35 mb-4">{loan.tag}</p>
                <p
                  className="font-serif font-light text-charcoal leading-none"
                  style={{ fontSize: 'clamp(26px, 3vw, 34px)' }}
                >
                  <span className="font-sans font-light">$</span>
                  {loan.amount.replace('$', '')}
                </p>
                <p className="eyebrow text-charcoal/25 mt-1.5 mb-4">Loan Amount</p>
                <div className="h-px bg-charcoal/8 mb-4" />
                <p className="font-sans font-light text-mid text-sm leading-relaxed flex-1">
                  {loan.description}
                </p>
                <a
                  href="#book"
                  className="mt-6 eyebrow text-charcoal/35 hover:text-sage transition-colors duration-200 flex items-center gap-2 group"
                >
                  View Scenario
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  )
}
