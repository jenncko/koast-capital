'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Philosophy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section id="philosophy" className="py-32 bg-cream-dark">
      <div className="container-xl">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label text-sage mb-6">Our Philosophy</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-medium text-dark leading-tight mb-8">
              A different kind<br />of lender.
            </h2>
            <div className="space-y-5 text-mid leading-relaxed text-[15px]">
              <p>
                Koast Capital was built on the belief that financing a home should feel as
                personal as the home itself. Jennifer Ko brings years of expertise and a
                genuinely consultative approach — no pressure, no scripts, no generic checklists.
              </p>
              <p>
                Whether you're navigating your first purchase or expanding an investment
                portfolio, we take the time to understand your full picture before
                recommending a single product.
              </p>
              <p className="font-serif text-xl italic text-dark pt-2">
                "Every client is a conversation,<br />not a transaction."
              </p>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="w-11 h-11 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-base font-semibold text-sage">JK</span>
              </div>
              <div>
                <p className="text-dark font-medium text-sm">Jennifer Ko</p>
                <p className="text-xs text-mid mt-0.5">Founder &amp; Mortgage Advisor, Koast Capital</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Decorative panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            aria-hidden
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-sage/8 relative">
              {/* Gradient base */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage/10 via-cream to-dusty-pink/8" />

              {/* Texture grid */}
              <div className="absolute inset-8 grid grid-cols-4 grid-rows-5 gap-1.5 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i % 4 === 0
                        ? 'bg-sage'
                        : i % 4 === 1
                        ? 'bg-dusty-pink'
                        : i % 4 === 2
                        ? 'bg-cream-dark'
                        : 'bg-sage-light'
                    }`}
                  />
                ))}
              </div>

              {/* Center monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif text-7xl text-sage/30 font-medium leading-none">K</span>
                  <div className="w-12 h-px bg-sage/25 mx-auto mt-5" />
                </div>
              </div>

              {/* Corner bracket accents */}
              <div className="absolute top-5 left-5 w-7 h-7 border-t-2 border-l-2 border-sage/35" />
              <div className="absolute bottom-5 right-5 w-7 h-7 border-b-2 border-r-2 border-sage/35" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-cream shadow-lg px-6 py-4 rounded-sm border border-cream-dark">
              <p className="font-serif text-lg text-dark font-medium tracking-wide">CA · NV · AZ · WA</p>
              <p className="label text-light mt-1">Licensed States</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
