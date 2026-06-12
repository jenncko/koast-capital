'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Working with Jennifer felt nothing like the typical mortgage experience. She was patient, thorough, and found us a rate we didn't think was possible.",
    name: 'M.T.',
    role: 'First-Time Homebuyer',
    location: 'Los Angeles, CA',
  },
  {
    quote:
      "I've been self-employed for eight years and every other lender turned me away. Jennifer understood my situation from the very first call.",
    name: 'D.R.',
    role: 'Business Owner',
    location: 'Phoenix, AZ',
  },
  {
    quote:
      'Quick, knowledgeable, and genuinely invested in our success. Our DSCR loan closed on time and the process was completely stress-free.',
    name: 'A.K.',
    role: 'Real Estate Investor',
    location: 'Las Vegas, NV',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-32 bg-cream">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="label text-sage mb-4">Client Experiences</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-dark leading-tight max-w-md">
            What clients say.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14 }}
              className="bg-cream-dark p-8 rounded-sm flex flex-col"
            >
              <div className="font-serif text-5xl text-sage/25 leading-none mb-4 select-none">&ldquo;</div>
              <p className="text-dark leading-relaxed text-sm flex-1">{t.quote}</p>
              <div className="border-t border-cream mt-8 pt-6">
                <p className="font-medium text-dark text-sm">{t.name}</p>
                <p className="text-xs text-mid mt-0.5">{t.role}</p>
                <p className="text-xs text-light mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
