'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Funded Loans', href: '#funded' },
  { label: 'Programs', href: '#programs' },
  { label: 'Contact', href: '#book' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-cream/96 backdrop-blur-md border-b border-charcoal/6' : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between h-[72px]">
        {/* Wordmark — cream over image, charcoal once scrolled */}
        <a
          href="#"
          className={`font-serif text-[22px] font-light tracking-[0.12em] uppercase transition-colors duration-500 ${
            scrolled ? 'text-charcoal' : 'text-cream'
          }`}
        >
          Koast Capital
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 ml-auto -mr-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`eyebrow transition-colors duration-300 hover:text-sage ${
                scrolled ? 'text-mid' : 'text-cream/70'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            style={scrolled ? { backgroundColor: '#756C5F' } : undefined}
            className={`eyebrow px-7 py-2.5 transition-all duration-400 ${
              scrolled
                ? 'text-cream hover:bg-sage hover:text-charcoal'
                : 'border border-cream/60 text-cream hover:bg-cream hover:text-charcoal'
            }`}
          >
            Book a Conversation
          </a>
        </nav>

        {/* Mobile toggle — cream over image, charcoal once scrolled */}
        <button
          className="md:hidden relative w-6 h-4 flex flex-col justify-between"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px transition-all duration-300 origin-center ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : 'w-full'}`} />
          <span className={`block h-px transition-all duration-200 ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
          <span className={`block h-px transition-all duration-300 origin-center ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : 'w-5'}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-cream border-t border-charcoal/8 overflow-hidden"
          >
            <div className="container-xl py-8 flex flex-col gap-7">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="eyebrow text-charcoal"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book"
                style={{ backgroundColor: '#756C5F' }}
                className="eyebrow px-7 py-3.5 text-cream text-center"
                onClick={() => setMenuOpen(false)}
              >
                Book a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
