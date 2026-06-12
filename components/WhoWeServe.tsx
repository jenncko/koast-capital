'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const segments = [
  {
    label: 'Homebuyers',
    headline: 'Your home,\nyour way.',
    body: "Whether it's your first purchase or your forever home, we guide you with clarity — not industry jargon. We take the time to understand your goals before recommending a single product.",
    accentClass: 'bg-sage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Self-Employed',
    headline: 'Your income\nis real.',
    body: "Your path to homeownership should be too. We specialize in bank statement loans and alternative documentation programs designed for business owners, freelancers, and independent professionals.",
    accentClass: 'bg-dusty-pink',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8h2M7 12h10M13 8h4" />
      </svg>
    ),
  },
  {
    label: 'Investors',
    headline: 'Scale with\nprecision.',
    body: "From DSCR loans to portfolio strategies, we speak your language. Whether you're acquiring a first rental or refinancing a performing asset, we help you move with confidence.",
    accentClass: 'bg-cream-dark border border-cream-dark',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
]

export default function WhoWeServe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="who-we-serve" className="py-32 bg-cream">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="label text-sage mb-4">Who We Serve</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-dark leading-tight max-w-xl">
            Built for the way you live and invest.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group"
            >
              <div className="border border-cream-dark hover:border-sage/50 transition-all duration-300 p-8 h-full flex flex-col rounded-sm bg-white/40 hover:bg-white/70">
                <div className={`w-9 h-9 rounded-sm ${seg.accentClass} flex items-center justify-center mb-6 text-dark`}>
                  {seg.icon}
                </div>

                <p className="label text-mid mb-3">{seg.label}</p>

                <h3 className="font-serif text-2xl lg:text-3xl font-medium text-dark leading-tight mb-5 whitespace-pre-line">
                  {seg.headline}
                </h3>

                <p className="text-mid text-sm leading-relaxed flex-1">{seg.body}</p>

                <a
                  href="#book"
                  className="mt-8 inline-flex items-center gap-2 label text-dark group-hover:text-sage transition-colors duration-200"
                >
                  Start a conversation
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform duration-200">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
