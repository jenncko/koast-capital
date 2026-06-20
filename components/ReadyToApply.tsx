'use client'

import { motion } from 'framer-motion'

const homeIcon = (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#A8B08E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13L14 3l11 10" />
    <path d="M6 10.5V24a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10.5" />
  </svg>
)

const dollarIcon = (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#A8B08E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="14" y1="3" x2="14" y2="25" />
    <path d="M19 7H11.5a4.5 4.5 0 000 9h5a4.5 4.5 0 010 9H9" />
  </svg>
)

const cardClass = "flex flex-col p-7 lg:p-8 border border-charcoal/10 bg-white/60"
const cardStyle = { boxShadow: '0 2px 16px rgba(56,51,46,0.05)' }

export default function ReadyToApply() {
  return (
    <section id="apply" className="py-12 lg:py-16" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h2
            className="font-serif font-light italic text-charcoal leading-tight mb-3"
            style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
          >
            Ready to Apply?
          </h2>
          <p
            className="font-serif font-light text-mid mx-auto"
            style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: '1.75', maxWidth: '420px' }}
          >
            Choose the option that fits your goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">

          {/* Card 1 — Purchase & Refinance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cardClass}
            style={cardStyle}
          >
            <div className="mb-5">{homeIcon}</div>

            <h3
              className="font-serif font-light text-charcoal leading-tight mb-3"
              style={{ fontSize: 'clamp(19px, 1.6vw, 24px)' }}
            >
              Purchase &amp; Refinance
            </h3>

            <div className="w-10 h-px bg-sage/40 mb-3" />

            <p
              className="font-serif font-light text-mid flex-1 mb-7"
              style={{ fontSize: '14px', lineHeight: '1.8' }}
            >
              Primary Homes &bull; Second Homes &bull; Investment Properties
              <br />
              <a
                href="#programs"
                className="text-sage/70 hover:text-sage transition-colors duration-200"
              >
                See all programs available.
              </a>
            </p>

            <a
              href="https://luminlending-apply-jennifer-ko.my1003app.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-between px-5 py-3 border border-sage/50 text-charcoal hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300"
            >
              <span
                className="font-sans font-medium uppercase tracking-[0.22em] whitespace-nowrap"
                style={{ fontSize: '10px' }}
              >
                Start Mortgage Application
              </span>
              <svg
                width="13" height="13" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                className="flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </a>
          </motion.div>

          {/* Card 2 — Home Equity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cardClass}
            style={cardStyle}
          >
            <div className="mb-5">{dollarIcon}</div>

            <h3
              className="font-serif font-light text-charcoal leading-tight mb-3"
              style={{ fontSize: 'clamp(19px, 1.6vw, 24px)' }}
            >
              Home Equity
            </h3>

            <div className="w-10 h-px bg-sage/40 mb-3" />

            <p
              className="font-serif font-light text-mid flex-1 mb-7"
              style={{ fontSize: '14px', lineHeight: '1.8' }}
            >
              Access your home equity with a HELOC. Most applications take approximately 5 minutes to complete.
            </p>

            <a
              href="https://heloc.luminlending.com/account/heloc/register?referrer=af6dcf7d-0404-4773-babc-86037f37a537"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-between px-5 py-3 border border-sage/50 text-charcoal hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300"
            >
              <span
                className="font-sans font-medium uppercase tracking-[0.22em] whitespace-nowrap"
                style={{ fontSize: '10px' }}
              >
                Start Home Equity Application
              </span>
              <svg
                width="13" height="13" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                className="flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </a>
          </motion.div>

        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="eyebrow text-charcoal/25 text-center mt-8"
        >
          Secure. Easy. Your information is kept confidential.
        </motion.p>

      </div>
    </section>
  )
}
