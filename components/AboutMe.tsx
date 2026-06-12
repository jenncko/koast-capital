'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutMe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="about" className="overflow-hidden pt-16 lg:pt-24" style={{ backgroundColor: '#F6F2EB' }}>
      <div className="grid lg:grid-cols-[1fr_2fr] max-w-[1400px] mx-auto items-stretch">

        {/* ── Portrait — 1/3 width, stretches to match text height ──
            Add your photo at /public/jennifer.jpg               ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative min-h-[420px]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(170deg, #e8edda 0%, #c8d0aa 40%, #A8B08E 75%, #7a8a6a 100%)',
            }}
          />
          <Image
            src="/jennifer.jpg"
            alt="Jennifer Ko — Koast Capital"
            fill
            className="object-cover object-top"
          />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-8 pb-8 pt-20">
            <p className="font-serif text-lg font-light text-cream tracking-wide">
              Jennifer Ko
            </p>
            <p className="eyebrow text-cream/45 mt-1">
              Founder &nbsp;·&nbsp; Koast Capital
            </p>
          </div>
        </motion.div>

        {/* ── Content — 2/3 width, same height as image ─────────── */}
        <div
          ref={ref}
          className="flex flex-col justify-between pt-0 pb-10 px-8 lg:px-14 xl:px-20"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-8"
            >
              About Jennifer
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
                With a B.A. in Economics from UC San Diego and an MBA from USC, she brings both
                analytical expertise and real-world lending experience to every client relationship.
              </p>
              <p>
                Before founding Koast Capital, Jennifer spent over a decade in mortgage operations,
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
