'use client'

import Image from 'next/image'
import ReadyToApply from '@/components/ReadyToApply'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const goalOptions = [
  { value: 'purchase',   label: 'Purchase a Home' },
  { value: 'refinance',  label: 'Refinance' },
  { value: 'equity',     label: 'Access Home Equity' },
  { value: 'investment', label: 'Fix & Flip' },
  { value: 'bridge',     label: 'Bridge Financing' },
  { value: 'unsure',     label: 'Not Sure Yet' },
]

export default function BookConsultation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'f0464cbf-21a9-4d93-bee1-dc2497bec7c4',
          subject: 'New Consultation Request — Koast Capital',
          name: form.name,
          email: form.email,
          phone: form.phone,
          goal: goalOptions.find(o => o.value === form.goal)?.label ?? form.goal,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email info@koastcapital.com.')
      }
    } catch {
      setError('Something went wrong. Please try again or email info@koastcapital.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="book" style={{ backgroundColor: '#E6DFD5' }}>

      {/* ── Full-screen title ── */}
      <div className="relative min-h-screen overflow-x-hidden">

        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #c8d8d4 0%, #8faaa6 50%, #5c7e7a 100%)' }}
        >
          <Image src="/coast.png" alt="" fill className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-charcoal/45" />

        <div className="relative z-10 min-h-screen flex flex-col justify-end items-end mx-auto px-8 lg:px-16 pt-32 pb-20 w-full" style={{ maxWidth: '1200px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-6 w-full max-w-xl"
        >
          <p className="eyebrow text-cream">Book a Conversation</p>
          <div className="flex-1 h-px bg-cream/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-cream leading-[1.05] max-w-xl text-right"
          style={{ fontSize: 'clamp(42px, 6vw, 96px)' }}
        >
          Let&apos;s find your<br />
          <em>path forward.</em>
        </motion.h2>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center gap-4 justify-end"
        >
          <div className="h-px w-12 bg-cream/50" />
          <p className="eyebrow text-cream/70">Share a few details below</p>
        </motion.div>
        </div>
      </div>

      <ReadyToApply />

      {/* ── Content ── */}
      <div className="mx-auto px-8 lg:px-16 pb-32" style={{ maxWidth: '1200px' }}>
        <div className="h-px bg-charcoal/10 mb-16" />

        {/* ── Two-column content ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">


          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px w-14 bg-dusty-pink mb-8" />

            <p
              className="font-serif font-light italic text-mid mb-14"
              style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: '1.7' }}
            >
              Whether you&apos;re purchasing a home, refinancing, accessing equity, or exploring
              investment opportunities, every situation is unique. Share a few details about you
              and Jennifer will personally follow up within one business day.
            </p>

            <div className="space-y-5">
              <div>
                <p className="eyebrow text-charcoal/30 mb-2">Email Jennifer</p>
                <a
                  href="mailto:info@koastcapital.com"
                  className="font-serif font-light text-mid text-[18px] hover:text-sage transition-colors duration-200"
                >
                  info@koastcapital.com
                </a>
              </div>
              <div>
                <p className="eyebrow text-charcoal/30 mb-2">Call / Text Jennifer</p>
                <a
                  href="tel:+13239918807"
                  className="block font-serif font-light text-mid text-[18px] hover:text-sage transition-colors duration-200"
                >
                  (323) 991-8807
                </a>
                <a
                  href="tel:+17029888807"
                  className="block font-serif font-light text-mid text-[18px] hover:text-sage transition-colors duration-200"
                >
                  (702) 988-8807
                </a>
              </div>
              <div>
                <p className="eyebrow text-charcoal/30 mb-2">Licensed In</p>
                <p className="font-serif font-light text-mid text-[18px]">
                  CA &nbsp;·&nbsp; NV &nbsp;·&nbsp; AZ &nbsp;·&nbsp; WA
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pr-8 xl:pr-16"
          >
            {submitted ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 rounded-full border border-sage/40 flex items-center justify-center mx-auto mb-7">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A8B08E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 8 6 12 14 4" />
                  </svg>
                </div>
                <p className="font-serif text-2xl font-light text-charcoal mb-3">Thank you.</p>
                <p className="font-serif font-light text-mid text-base sm:text-[15px] leading-relaxed">
                  Jennifer will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="eyebrow text-charcoal/35 block mb-3">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-transparent border-b border-charcoal/15 text-charcoal placeholder-charcoal/20 py-3 text-base sm:text-[15px] font-serif font-light focus:outline-none focus:border-sage transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-charcoal/35 block mb-3">
                      Phone <span className="normal-case tracking-normal font-light">optional</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(310) 555-0000"
                      className="w-full bg-transparent border-b border-charcoal/15 text-charcoal placeholder-charcoal/20 py-3 text-base sm:text-[15px] font-serif font-light focus:outline-none focus:border-sage transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow text-charcoal/35 block mb-3">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-charcoal/15 text-charcoal placeholder-charcoal/20 py-3 text-base sm:text-[15px] font-serif font-light focus:outline-none focus:border-sage transition-colors duration-300"
                  />
                </div>

                <div ref={dropdownRef} className="relative">
                  <label className="eyebrow text-charcoal/35 block mb-3">What are you looking to do?</label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full flex items-center justify-between border-b py-3 text-base sm:text-[15px] font-serif font-light text-left transition-colors duration-300 ${
                      dropdownOpen ? 'border-sage' : 'border-charcoal/15'
                    } ${form.goal ? 'text-charcoal' : 'text-charcoal/30'}`}
                  >
                    {form.goal ? goalOptions.find(o => o.value === form.goal)?.label : 'Select one'}
                    <svg
                      width="11" height="11" viewBox="0 0 12 12" fill="none"
                      stroke="#7A746E" strokeWidth="1.2" strokeLinecap="round"
                      className={`flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 w-full mt-1 py-1 border border-charcoal/10"
                        style={{ backgroundColor: '#E6DFD5' }}
                      >
                        {goalOptions.map((opt) => (
                          <li key={opt.value}>
                            <button
                              type="button"
                              onClick={() => {
                                setForm({ ...form, goal: opt.value })
                                setDropdownOpen(false)
                              }}
                              className={`w-full text-left px-5 py-3 font-serif font-light text-base sm:text-[15px] transition-colors duration-150 ${
                                form.goal === opt.value
                                  ? 'text-charcoal'
                                  : 'text-mid hover:text-charcoal hover:bg-charcoal/5'
                              }`}
                            >
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="eyebrow text-charcoal/35 block mb-3">Tell me about your goals</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me a little about your situation, timeline, or what you're hoping to accomplish..."
                    className="w-full bg-transparent border-b border-charcoal/15 text-charcoal placeholder-charcoal/20 py-3 text-base sm:text-[15px] font-serif font-light focus:outline-none focus:border-sage transition-colors duration-300 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: '#756C5F' }}
                    className="w-full py-4 text-cream eyebrow hover:bg-sage hover:text-charcoal transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending…' : 'Start the Conversation'}
                  </button>
                  {error && (
                    <p className="eyebrow text-dusty-pink text-center mt-3">{error}</p>
                  )}
                  <p className="eyebrow text-charcoal/20 text-center mt-5">
                    Your information is kept strictly confidential.
                  </p>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>

    </section>
  )
}
