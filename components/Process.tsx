'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Start a Conversation',
    body: "Book a no-obligation consultation to share your goals. No paperwork, no pressure — just a real conversation about where you want to go and what's holding you back.",
  },
  {
    number: '02',
    title: 'We Build Your Strategy',
    body: 'Jennifer reviews your full financial picture and identifies the right loan products, programs, and timeline for your specific situation — not a one-size-fits-all solution.',
  },
  {
    number: '03',
    title: 'Close with Confidence',
    body: 'From application to keys, we manage every detail and keep you informed at each milestone. Smooth closings are the standard here, not the exception.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="process" className="py-32 bg-sage/8">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="label text-sage mb-4">How It Works</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-dark leading-tight max-w-sm">
            Simple, personal, and clear.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 relative">
          {/* Connector line — desktop */}
          <div className="absolute top-[30px] left-[14%] right-[14%] h-px bg-sage/20 hidden md:block" aria-hidden />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.18 }}
            >
              <div className="w-[60px] h-[60px] rounded-full border-2 border-sage bg-cream flex items-center justify-center mb-8 relative z-10">
                <span className="font-serif text-base font-semibold text-sage">{step.number}</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-dark mb-4">{step.title}</h3>
              <p className="text-mid leading-relaxed text-sm">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-20 text-center"
        >
          <a
            href="#book"
            className="inline-flex items-center px-10 py-4 bg-sage text-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-sage-light transition-colors duration-300 rounded-sm"
          >
            Start with Step One
          </a>
        </motion.div>
      </div>
    </section>
  )
}
