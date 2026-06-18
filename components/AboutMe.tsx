'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutMe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="about" className="overflow-hidden pt-16 lg:pt-24" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="grid lg:grid-cols-[1fr_2fr] max-w-[1400px] mx-auto items-start">

        {/* ── Portrait ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col"
        >
          {/* Photo */}
          <div className="relative w-full h-[400px] lg:h-[480px]">
            <Image
              src="/jennifer2.png"
              alt="Jennifer Ko — Koast Capital"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Caption below photo */}
          <div className="px-6 lg:px-8 pt-5 pb-8 lg:pb-10">
            <p
              className="font-serif font-light text-charcoal"
              style={{ fontSize: '20px', letterSpacing: '0.01em' }}
            >
              Jennifer Ko
            </p>
            <p className="eyebrow text-mid mt-1.5">
              Founder, Koast Capital
            </p>
          </div>
        </motion.div>

        {/* ── Content — 2/3 width, same height as image ─────────── */}
        <div
          ref={ref}
          className="flex flex-col justify-between pt-8 lg:pt-0 pb-10 px-8 lg:px-14 xl:px-20"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-8"
            >
              About Jennifer Ko,<br className="lg:hidden" /> Founder of Koast Capital
            </motion.p>

            {/* Pullquote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic font-light text-charcoal leading-[1.3] mb-8"
              style={{ fontSize: 'clamp(22px, 2.2vw, 32px)' }}
            >
              &ldquo;A mortgage isn&apos;t the goal. It&apos;s a tool to help you build what&apos;s next.&rdquo;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="h-px w-14 bg-dusty-pink origin-left mb-8"
            />

            {/* Body copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 font-serif font-light text-mid"
              style={{ fontSize: '15px', lineHeight: '1.8' }}
            >
              <p>
                Jennifer Ko believes that financing decisions should be made with clarity, not pressure.
              </p>
              <p>
                With a B.A. in Economics from the University of California, San Diego and an MBA from the University of Southern California, she brings both
                analytical expertise and real-world lending experience to every client relationship.
              </p>
              <p>
                Before founding Koast Capital, Jennifer spent more than 15 years in mortgage operations,
                processing, auditing, and management — developing a deep understanding of how loans
                are evaluated, structured, and approved.
              </p>
              <p>
                Whether you&apos;re purchasing a home, refinancing, accessing equity, or growing an
                investment portfolio, Jennifer&apos;s approach is transparent, strategic, and tailored
                to your goals.
              </p>
              <p className="font-serif italic text-charcoal" style={{ fontSize: '16px' }}>
                Because the right loan isn&apos;t just about getting approved — it&apos;s about
                creating opportunities for what&apos;s next.
              </p>
            </motion.div>
          </div>

          {/* CTA — pinned to bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10"
          >
            <a
              href="#book"
              className="eyebrow text-charcoal hover:text-sage transition-colors duration-300 flex items-center gap-3 group"
            >
              Book a Conversation
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M2 8h12M8 2l6 6-6 6" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
