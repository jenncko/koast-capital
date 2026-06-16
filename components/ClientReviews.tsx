'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const reviews = [
  {
    quote:
      'Jennifer was extremely professional and would recommend to everyone seeking a qualified mortgage broker!',
    reviewer: 'Henry H',
    location: 'Irvine, CA',
    loanType: 'P&L Cash-Out Refinance',
    source: 'Google',
  },
  {
    quote:
      'I had the pleasure of working with Jennifer, and I highly recommend her to anyone looking to purchase property in the Las Vegas area. She provided clear, detailed instructions and guidance throughout the entire process, ensuring I understood how and when the mortgage would be handled. Her professionalism and expertise made the entire experience seamless. If you\'re considering purchasing property in Vegas, she\'s definitely the loan officer to trust!',
    reviewer: 'Wilson F',
    location: 'Los Angeles, CA',
    loanType: 'Conventional Purchase',
    source: 'Google',
  },
  {
    quote:
      'Very knowledgeable, knows the market well, and understands which loan products best fit your individual situation.',
    reviewer: 'Sheila K',
    location: 'Scottsdale, AZ',
    loanType: 'DSCR Cash-Out Refinance',
    source: 'Experience.com',
  },
  {
    quote:
      'Jennifer is an excellent, positive, open-minded, and determined professional who was able to help us navigate through a series of fairly complex loan options, forms, and qualification processes. She helped us achieve the result we were looking for: a beautiful new home in an exciting neighborhood. She was always available to answer questions, explain each step, and help us through the home-buying process.',
    reviewer: 'Talbot S',
    location: 'Henderson, NV',
    loanType: 'P&L Purchase',
    source: 'Experience.com',
  },
  {
    quote:
      'Jennifer was amazing! She was extremely helpful, knowledgeable, and responsive throughout the process. No question was too small, and her communication was always thorough and detailed. I would gladly recommend Jennifer to my family and friends and look forward to working with her again.',
    reviewer: 'Thuong V',
    location: 'San Jose, CA',
    loanType: 'Jumbo Purchase',
    source: 'Experience.com',
  },
  {
    quote:
      'I recently obtained a HELOC through Jennifer and was very impressed by her professionalism and attention to detail. She kept me informed every step of the way and went above and beyond to ensure a smooth process. I truly appreciate her hard work and would confidently recommend her to anyone seeking mortgage financing.',
    reviewer: 'Troy S',
    location: 'Scottsdale, AZ',
    loanType: 'HELOC',
    source: 'Experience.com',
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
    <section id="reviews" className="py-10 lg:py-16 overflow-x-hidden" style={{ backgroundColor: '#38332E' }}>

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
          className="w-full lg:w-[440px] lg:flex-shrink-0 flex flex-col justify-between pb-6 lg:pb-0 pr-6 lg:pr-12 xl:pr-16"
          style={{ paddingTop: '4px' }}
        >
          <div>
            <p className="eyebrow text-cream/40 mb-3">Client Reviews</p>
            <div className="h-px bg-cream/10 mb-4" />
            <h2
              className="font-serif font-light text-cream leading-tight mb-4"
              style={{ fontSize: 'clamp(24px, 2.5vw, 34px)' }}
            >
              What Clients Say<br />
              <em>About Jennifer.</em>
            </h2>
            <p
              className="font-serif font-light text-cream/50 leading-relaxed"
              style={{ fontSize: '14px', lineHeight: '1.7' }}
            >
              Real feedback from homeowners, investors, and borrowers Jennifer has had the privilege of guiding through their financing journey.
            </p>
          </div>

          <div className="mt-6 lg:mt-8">
            <p className="eyebrow text-cream/20 mb-4">scroll to explore</p>
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
          className="scrollbar-hide flex flex-row gap-5 overflow-x-auto lg:flex-1"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingRight: INSET,
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] lg:w-[360px] xl:w-[400px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div
                className="flex flex-col p-5 border border-cream/10"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', minHeight: '240px' }}
              >
                {/* Decorative opening quote mark */}
                <div
                  className="font-serif leading-none select-none -mb-2 -ml-1"
                  style={{ fontSize: '62px', color: '#A8B08E', opacity: 0.2 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote — main focus, clamped for editorial uniformity */}
                <p
                  className="font-serif font-light text-cream/80 flex-1 line-clamp-4"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: '1.65' }}
                >
                  {review.quote}
                </p>

                {/* Card footer */}
                <div className="mt-5">
                  <div className="h-px bg-cream/10 mb-3" />

                  <p className="font-serif font-light text-cream" style={{ fontSize: '14px' }}>
                    {review.reviewer}
                  </p>

                  {(review.location || review.loanType) && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
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

                  <div className="flex items-center gap-1.5 mt-2.5">
                    <svg
                      width="9" height="9" viewBox="0 0 10 10" fill="none"
                      stroke="#A8B08E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="flex-shrink-0"
                    >
                      <polyline points="1.5 5 4 7.5 8.5 2" />
                    </svg>
                    <span
                      className="whitespace-nowrap font-sans font-medium uppercase text-sage/55"
                      style={{ fontSize: '9px', letterSpacing: '0.18em' }}
                    >
                      Verified Client Review{review.source ? ` · ${review.source}` : ''}
                    </span>
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
