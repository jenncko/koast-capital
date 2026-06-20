'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import articles from '@/lib/articles'

const FILTERS = [
  'All', 'Conventional', 'FHA', 'VA', 'Jumbo',
  'Bank Statement', 'P&L', 'DSCR', 'No Ratio',
  'Hard Money', 'HELOC', 'Reverse', 'Foreign National',
]

function ArticleCard({ article, index, size = 'normal' }: {
  article: typeof articles[0]
  index: number
  size?: 'normal' | 'featured'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/resources/${article.slug}`} className="group block">
        {/* Image */}
        <div className="overflow-hidden mb-4 relative" style={{ aspectRatio: '16/9' }}>
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div
              className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ background: article.gradient }}
            />
          )}
        </div>

        {/* Category */}
        <p className="eyebrow text-sage mb-2">{article.categories[0]}</p>

        {/* Title */}
        <h3
          className={`font-serif font-light text-charcoal leading-tight mb-3 group-hover:text-stone transition-colors duration-300 ${size === 'featured' ? '' : ''}`}
          style={{ fontSize: size === 'featured' ? 'clamp(17px, 1.4vw, 21px)' : 'clamp(16px, 1.3vw, 19px)' }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-serif font-light text-charcoal/55 mb-4 line-clamp-2"
          style={{ fontSize: '14px', lineHeight: '1.75' }}
        >
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="eyebrow text-charcoal/30">{article.readTime}</span>
          <span className="eyebrow text-sage group-hover:translate-x-0.5 transition-transform duration-300 inline-flex items-center gap-1.5">
            Read Article
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const featured = useMemo(() => articles.filter((a) => a.featured), [])
  const rest = useMemo(() => articles.filter((a) => !a.featured), [])

  const isFiltering = search.trim() !== '' || activeFilter !== 'All'

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categories.some((c) => c.toLowerCase().includes(q))
      const matchesFilter =
        activeFilter === 'All' || a.categories.includes(activeFilter)
      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: 'clamp(520px, 52vw, 720px)' }}
      >
        {/* Background image */}
        <div className="absolute inset-0" style={{ backgroundColor: '#2a2520' }}>
          <Image
            src="/images/resources-hero-desert-modern.png"
            alt="Koast Capital Resources — desert contemporary architecture"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 z-10" style={{ paddingTop: 'clamp(180px, 34vw, 380px)' }}>
          <div className="container-xl">
            <div className="max-w-[700px] text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow text-cream/50 mb-6"
              >
                Koast Capital
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif font-light text-cream leading-tight mb-6"
                style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
              >
                Resources
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif font-light text-cream/60"
                style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: '1.8' }}
              >
                Mortgage insights, lending strategies, and educational guides<br />
                designed to help you make informed decisions.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Filter ── */}
      <div className="sticky top-[72px] z-30 border-b border-charcoal/8" style={{ backgroundColor: '#F6F2EB' }}>
        <div className="container-xl py-5">
          {/* Search */}
          <div className="relative mb-5">
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/30"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3 3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-transparent border-b border-charcoal/15 pl-7 pr-4 py-2.5 font-serif font-light text-charcoal placeholder-charcoal/25 focus:outline-none focus:border-sage transition-colors duration-300 text-[15px]"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap px-4 py-1.5 border transition-all duration-200 eyebrow ${
                  activeFilter === f
                    ? 'bg-charcoal text-cream border-charcoal'
                    : 'border-charcoal/15 text-charcoal/50 hover:border-sage hover:text-charcoal'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main style={{ backgroundColor: '#F6F2EB' }}>

        {isFiltering ? (
          /* ── Filtered results ── */
          <section className="py-16 lg:py-20">
            <div className="container-xl">
              <p className="eyebrow text-charcoal/30 mb-10">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
              </p>
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                  {filtered.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="font-serif font-light text-charcoal/40 text-lg">
                    No articles match your search.
                  </p>
                  <button
                    onClick={() => { setSearch(''); setActiveFilter('All') }}
                    className="mt-6 eyebrow text-sage hover:text-sage-dark transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            {/* ── Featured Articles ── */}
            <section className="pt-16 pb-12 lg:pt-20 lg:pb-16">
              <div className="container-xl">
                <div className="flex items-center gap-6 mb-10">
                  <p className="eyebrow">Featured</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                  {featured.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} size="featured" />
                  ))}
                </div>
              </div>
            </section>

            {/* ── All Articles ── */}
            <section className="py-12 lg:py-16 border-t border-charcoal/8">
              <div className="container-xl">
                <div className="flex items-center gap-6 mb-10">
                  <p className="eyebrow">All Articles</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                  {rest.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </main>

      <Footer />
    </>
  )
}
