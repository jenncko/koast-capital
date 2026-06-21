'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type Child = { label: string; href: string }
type NavLink = { label: string; href: string; children?: Child[] }

const links: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Funded Loans', href: '/#funded' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Loan Programs', href: '/#programs' },
      { label: 'Articles', href: '/resources' },
      { label: 'Tools', href: '/resources#tools' },
    ],
  },
  { label: 'Contact', href: '/#book' },
  { label: 'Apply', href: '/#apply' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-cream/96 backdrop-blur-md border-b border-charcoal/6' : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between h-[72px]">
        {/* Wordmark */}
        <Link
          href="/"
          className={`font-serif text-[22px] font-light tracking-[0.12em] uppercase transition-colors duration-500 ${
            scrolled ? 'text-charcoal' : 'text-cream'
          }`}
        >
          Koast Capital
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 ml-auto -mr-10">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={link.href}
                  className={`eyebrow transition-colors duration-300 hover:text-sage flex items-center gap-1.5 ${
                    scrolled ? 'text-mid' : 'text-cream/70'
                  }`}
                >
                  {link.label}
                  <svg
                    width="9" height="9" viewBox="0 0 10 10" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 4l3 3 3-3" />
                  </svg>
                </a>

                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 py-2 min-w-[180px] border border-charcoal/10 shadow-sm"
                      style={{ backgroundColor: '#F6F2EB' }}
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-2.5 eyebrow text-mid hover:text-charcoal hover:bg-charcoal/5 transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`eyebrow transition-colors duration-300 hover:text-sage ${
                  scrolled ? 'text-mid' : 'text-cream/70'
                }`}
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="/#book"
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

        {/* Mobile toggle */}
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
            <div className="container-xl py-8 flex flex-col gap-5">
              {links.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className="eyebrow text-charcoal flex items-center justify-between w-full"
                    >
                      {link.label}
                      <svg
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={`transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180' : ''}`}
                      >
                        <path d="M2 4l3 3 3-3" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pl-4 flex flex-col gap-3">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="eyebrow text-mid"
                                onClick={() => { setMenuOpen(false); setMobileExpanded(null) }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="eyebrow text-charcoal"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="/#book"
                style={{ backgroundColor: '#756C5F' }}
                className="eyebrow px-7 py-3.5 text-cream text-center mt-2"
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
