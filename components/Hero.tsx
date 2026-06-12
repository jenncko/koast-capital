'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">

      {/* ── Background image ─────────────────────────────────────────
          Add your photo at /public/hero.jpg
          The sage gradient below is the fallback while no image exists. ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #c4ccaa 0%, #A8B08E 35%, #5a6b44 70%, #3d4d2e 100%)',
        }}
      >
        <Image
          src="/hero.jpg"
          alt="Koast Capital — boutique mortgage advisory"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ── Overlays ───────────────────────────────────────────────── */}
      {/* Left vignette — darkens behind text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      {/* Bottom gradient — anchors text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* ── Content — bottom anchored ──────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center max-lg:justify-start">
        <div className="container-xl pt-20 max-lg:pt-28 pb-10">

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="eyebrow text-cream/55 mb-7"
          >
            Personal Mortgage Advisory
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-serif font-light text-cream leading-[0.87] mb-9"
            style={{ fontSize: 'clamp(54px, 8.5vw, 122px)' }}
          >
            Lending<br />
            <em>with intention.</em>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#book"
              className="eyebrow px-9 py-4 bg-cream text-charcoal hover:bg-sage hover:text-charcoal transition-all duration-500"
            >
              Book a Conversation
            </a>
            <a
              href="#about"
              className="eyebrow text-cream/65 hover:text-cream transition-colors duration-300 flex items-center gap-2.5"
            >
              Meet Jennifer
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                <path d="M7 2v10M3 9l4 4 4-4" />
              </svg>
            </a>
          </motion.div>

          {/* State badges */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 flex items-center gap-5"
          >
            <div className="h-px w-8 bg-cream/20" />
            {['CA', 'NV', 'AZ', 'WA'].map((s) => (
              <span key={s} className="eyebrow text-cream/35">{s}</span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────
          Thin animated line — right side, Aman-style ── */}
      <div
        className="absolute right-10 bottom-10 hidden lg:flex flex-col items-center gap-2 z-10"
        aria-hidden
      >
        <motion.div
          animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-cream/50 origin-top"
        />
        <span className="eyebrow text-cream/25" style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}>
          scroll
        </span>
      </div>

    </section>
  )
}
