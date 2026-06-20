'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FAQ } from '@/lib/articles'

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-charcoal/10">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between py-5 text-left group"
            aria-expanded={open === i}
          >
            <span
              className="font-serif font-light text-charcoal pr-8 group-hover:text-stone transition-colors duration-200"
              style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: '1.6' }}
            >
              {faq.question}
            </span>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              stroke="#A8B08E" strokeWidth="1.2" strokeLinecap="round"
              className={`flex-shrink-0 mt-1 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p
                  className="font-serif font-light text-charcoal/65 pb-6 pr-8"
                  style={{ fontSize: 'clamp(14px, 1vw, 16px)', lineHeight: '1.8' }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
