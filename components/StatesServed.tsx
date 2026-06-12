'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const states = [
  {
    abbr: 'CA',
    name: 'California',
    markets: 'Los Angeles · Bay Area · San Diego · Sacramento',
  },
  {
    abbr: 'NV',
    name: 'Nevada',
    markets: 'Las Vegas · Henderson · Reno · Sparks',
  },
  {
    abbr: 'AZ',
    name: 'Arizona',
    markets: 'Phoenix · Scottsdale · Tucson · Chandler',
  },
  {
    abbr: 'WA',
    name: 'Washington',
    markets: 'Seattle · Bellevue · Tacoma · Spokane',
  },
]

export default function StatesServed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="states" className="py-32 bg-charcoal overflow-hidden">
      <div className="container-xl">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-6"
        >
          <p className="eyebrow text-cream/30">States Licensed</p>
          <div className="flex-1 h-px bg-cream/8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-light text-cream leading-tight mb-20"
          style={{ fontSize: 'clamp(38px, 4.5vw, 60px)' }}
        >
          Licensed across<br />
          <em>the Western United States.</em>
        </motion.h2>

        {/* States list */}
        <div className="space-y-0">
          {states.map((state, i) => (
            <motion.div
              key={state.abbr}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className="group flex items-center justify-between py-8 border-b border-cream/8 hover:border-sage/40 transition-colors duration-300 cursor-default"
            >
              <div className="flex items-baseline gap-8">
                <span
                  className="font-serif font-light text-cream/20 group-hover:text-sage transition-colors duration-300"
                  style={{ fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1 }}
                >
                  {state.abbr}
                </span>
                <span className="font-serif text-xl font-light text-cream/70 group-hover:text-cream transition-colors duration-300">
                  {state.name}
                </span>
              </div>
              <p className="eyebrow text-cream/25 hidden md:block text-right max-w-xs leading-relaxed group-hover:text-cream/40 transition-colors duration-300">
                {state.markets}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 font-sans font-light text-cream/30 text-sm text-center"
        >
          Additional states may be available — reach out to confirm your area.
        </motion.p>

      </div>
    </section>
  )
}
