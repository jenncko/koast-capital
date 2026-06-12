'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '$50M+', label: 'Volume Funded' },
  { value: '200+', label: 'Clients Served' },
  { value: '10+', label: 'Years of Experience' },
  { value: '4', label: 'States Licensed' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="bg-charcoal py-20">
      <div ref={ref} className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`py-10 text-center border-cream/6 ${
                i < stats.length - 1 ? 'lg:border-r' : ''
              } ${i % 2 === 0 && i !== 0 ? 'border-l lg:border-l-0' : ''}`}
            >
              <p
                className="font-serif font-light text-cream leading-none mb-3"
                style={{ fontSize: 'clamp(42px, 5vw, 68px)' }}
              >
                {stat.value.startsWith('$')
                  ? <><span className="font-sans font-light">$</span>{stat.value.slice(1)}</>
                  : stat.value}
              </p>
              <p className="eyebrow text-cream/30">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
