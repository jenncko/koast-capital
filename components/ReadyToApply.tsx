'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#A8B08E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13L14 3l11 10" />
        <path d="M6 10.5V24a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10.5" />
      </svg>
    ),
    title: 'Purchase & Refinance',
    description: 'For primary homes, second homes, and investment properties.',
    buttonLabel: 'Start Mortgage Application',
    href: 'https://luminlending-apply-jennifer-ko.my1003app.com/register',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#A8B08E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13L14 3l11 10" />
        <path d="M6 10.5V24a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10.5" />
        <circle cx="19.5" cy="19.5" r="4.5" fill="#F6F2EB" stroke="#A8B08E" strokeWidth="1.2" />
        <path d="M18 19.5h3M19.5 18v3" />
      </svg>
    ),
    title: 'HELOC in 5 Minutes',
    description: 'Access your home equity with a HELOC or HELOAN.',
    buttonLabel: 'Start HELOC Application',
    href: 'https://heloc.luminlending.com/account/heloc/register?referrer=af6dcf7d-0404-4773-babc-86037f37a537',
  },
]

export default function ReadyToApply() {
  return (
    <section id="apply" className="py-20 lg:py-28" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="container-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="eyebrow mb-5">Online Application</p>
          <h2
            className="font-serif font-light text-charcoal leading-tight mb-4"
            style={{ fontSize: 'clamp(30px, 3.5vw, 48px)' }}
          >
            Ready to Apply?
          </h2>
          <p
            className="font-serif font-light text-mid mx-auto"
            style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: '1.75', maxWidth: '480px' }}
          >
            Choose the option that fits your goals. You can start your application online anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-7 max-w-3xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col p-8 lg:p-10 border border-charcoal/10 bg-white/60"
              style={{ boxShadow: '0 2px 16px rgba(56,51,46,0.05)' }}
            >
              {/* Icon */}
              <div className="mb-6">{card.icon}</div>

              {/* Title */}
              <h3
                className="font-serif font-light text-charcoal leading-tight mb-3"
                style={{ fontSize: 'clamp(20px, 1.8vw, 26px)' }}
              >
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-10 h-px bg-sage/40 mb-4" />

              {/* Description */}
              <p
                className="font-serif font-light text-mid flex-1 mb-8"
                style={{ fontSize: '14px', lineHeight: '1.8' }}
              >
                {card.description}
              </p>

              {/* Button */}
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between px-6 py-3.5 border border-sage/50 text-charcoal hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300"
              >
                <span className="eyebrow">{card.buttonLabel}</span>
                <svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-300"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="eyebrow text-charcoal/25 text-center mt-10"
        >
          Secure. Easy. Your information is kept confidential.
        </motion.p>

      </div>
    </section>
  )
}
