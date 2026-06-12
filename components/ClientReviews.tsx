'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

// TODO: Replace these placeholder reviews with actual Birdeye / Experience.com client reviews.
// Each object maps to one card in the horizontal scroll track.
// Fields: quote (required), reviewer (required), location (optional), loanType (optional), source (optional).
const reviews = [
  {
    quote:
      'Jennifer made what felt like an overwhelming process completely manageable. She took the time to explain every step, and we closed on time with exactly the loan we needed.',
    reviewer: 'S. & M. Patel',
    location: 'Los Angeles, CA',
    loanType: 'Conventional · Purchase',
    source: 'Google',
  },
  {
    quote:
      'As a self-employed borrower, I assumed financing would be difficult. Jennifer structured everything around my bank statements and got me approved in under three weeks.',
    reviewer: 'T. Nguyen',
    location: 'San Diego, CA',
    loanType: 'Bank Statement · Refinance',
    source: 'Birdeye',
  },
  {
    quote:
      "Jennifer guided us through the purchase of our first investment property with patience and real expertise. She found a DSCR solution that fit our situation perfectly.",
    reviewer: 'R. & C. Kim',
    location: 'Las Vegas, NV',
    loanType: 'DSCR · Purchase',
    source: 'Birdeye',
  },
  {
    quote:
      'The level of service Jennifer provides is unmatched. She was available, transparent, and genuinely invested in finding the right financing — not just the fastest close.',
    reviewer: 'D. Harrison',
    location: 'Scottsdale, AZ',
    loanType: 'Jumbo · Purchase',
    source: 'Experience.com',
  },
  {
    quote:
      'Jennifer was recommended by a colleague, and I understand why. She handled a complex situation with care and brought our loan to the finish line when another lender had given up.',
    reviewer: 'A. Morales',
    location: 'Seattle, WA',
    loanType: 'Bank Statement · Purchase',
    source: 'Google',
  },
  {
    quote:
      'Professional, knowledgeable, and genuinely caring. Jennifer treated our situation like a priority from day one. We could not have asked for a better experience.',
    reviewer: 'L. & J. Thompson',
    location: 'Newport Beach, CA',
    loanType: 'Conventional · Refinance',
    source: 'Birdeye',
  },
]

const INSET = 'max(24px, calc((100vw - 1400px) / 2))'

export default function ClientReviews() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'next' ? 420 : -420, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="py-16 lg:py-24 overflow-x-hidden" style={{ backgroundColor: '#38332E' }}>

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
            <p className="eyebrow text-cream/40 mb-5">Client Reviews</p>
            <div className="h-px bg-cream/10 mb-6" />
            <h2
              className="font-serif font-light text-cream leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
            >
              What Clients Say<br />
              <em>About Jennifer.</em>
            </h2>
            <p
              className="font-serif font-light text-cream/50 leading-relaxed"
              style={{ fontSize: '15px', lineHeight: '1.8' }}
            >
              Real feedback from homeowners, investors, and borrowers Jennifer has had the privilege of guiding through their financing journey.
            </p>
          </div>

          <div className="hidden lg:block mt-12">
            <p className="eyebrow text-cream/20 mb-6">scroll to explore</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('prev')}
                aria-label="Previous review"
                className="eyebrow text-cream/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
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
              <div className="w-px h-3 bg-cream/15" />
              <button
                onClick={() => scroll('next')}
                aria-label="Next review"
                className="eyebrow text-cream/30 hover:text-sage transition-colors duration-200 flex items-center gap-1.5 group"
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
          className="scrollbar-hide flex flex-col gap-6 lg:flex-row lg:gap-6 lg:overflow-x-auto lg:flex-1"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingRight: INSET,
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="w-full lg:flex-shrink-0 lg:w-[360px] xl:w-[400px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div
                className="flex flex-col p-8 border border-cream/10"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', minHeight: '320px' }}
              >
                {/* Decorative opening quote mark */}
                <div
                  className="font-serif leading-none select-none -mb-4 -ml-1"
                  style={{ fontSize: '96px', color: '#A8B08E', opacity: 0.2 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote — main focus */}
                <p
                  className="font-serif font-light text-cream/80 flex-1"
                  style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.85' }}
                >
                  {review.quote}
                </p>

                {/* Card footer */}
                <div className="mt-8">
                  <div className="h-px bg-cream/10 mb-5" />

                  <p className="font-serif font-light text-cream" style={{ fontSize: '15px' }}>
                    {review.reviewer}
                  </p>

                  {(review.location || review.loanType) && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5">
                      {review.location && (
                        <span className="eyebrow text-cream/35">{review.location}</span>
                      )}
                      {review.location && review.loanType && (
                        <span className="text-cream/20 text-[10px]">·</span>
                      )}
                      {review.loanType && (
                        <span className="eyebrow text-cream/35">{review.loanType}</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <svg
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      stroke="#A8B08E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="1.5 5 4 7.5 8.5 2" />
                    </svg>
                    <span className="eyebrow text-sage/55">Verified Client Review</span>
                    {review.source && (
                      <span className="eyebrow text-cream/20">· {review.source}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  )
}
