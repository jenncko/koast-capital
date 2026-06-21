import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import articles, { getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import ArticleBody from '@/components/ArticleBody'
import FAQAccordion from '@/components/FAQAccordion'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} | Koast Capital`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: ['Jennifer Ko'],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(article.relatedSlugs).slice(0, 4)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: 'Jennifer Ko' },
    publisher: { '@type': 'Organization', name: 'Koast Capital' },
    datePublished: article.date,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://koastcapital.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://koastcapital.com/resources' },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Nav />

      {/* ── Hero image ── */}
      <div
        className="w-full pt-[72px] relative overflow-hidden"
        style={{ height: 'clamp(260px, 38vw, 480px)', background: article.gradient }}
      >
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
          />
        )}
      </div>

      {/* ── Article header ── */}
      <div style={{ backgroundColor: '#F6F2EB' }}>
        <div className="container-xl pt-12 pb-8 max-w-[860px]">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link href="/resources" className="eyebrow text-charcoal/35 hover:text-sage transition-colors duration-200">
              Resources
            </Link>
            <span className="text-charcoal/20 text-[10px]">/</span>
            <span className="eyebrow text-charcoal/35">{article.categories[0]}</span>
          </nav>

          {/* Category pill */}
          <p className="eyebrow text-sage mb-5">{article.categories.join(' · ')}</p>

          {/* Title */}
          <h1
            className="font-serif font-light text-charcoal leading-tight mb-8"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            {article.title}
          </h1>

          {/* Author bar */}
          <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-charcoal/10">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #c4ccaa, #A8B08E)' }}
              />
              <div>
                <p className="font-serif font-light text-charcoal text-sm">Jennifer Ko</p>
                <p className="eyebrow text-charcoal/35" style={{ fontSize: '9px' }}>Founder, Koast Capital</p>
              </div>
            </div>
            <div className="w-px h-5 bg-charcoal/15 hidden sm:block" />
            <span className="eyebrow text-charcoal/35">{article.date}</span>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ backgroundColor: '#F6F2EB' }}>
        <div className="container-xl max-w-[860px] py-10">
          <ArticleBody blocks={article.body} />
        </div>
      </div>

      {/* ── Next Steps CTA ── */}
      <section className="py-20 lg:py-24 border-t border-charcoal/8" style={{ backgroundColor: '#EBE5DC' }}>
        <div className="container-xl max-w-[860px]">
          <p className="eyebrow text-charcoal/45 mb-5">Next Steps</p>
          <h2
            className="font-serif font-light italic text-charcoal leading-tight mb-5"
            style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}
          >
            Ready to Explore Your Options?
          </h2>
          <p
            className="font-serif font-light text-charcoal/55 mb-12"
            style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: '1.8' }}
          >
            Whether you&apos;re comparing loan programs, accessing home equity, or planning your next purchase, we&apos;ll help you evaluate the right financing path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { label: 'Book a Conversation', href: '/#book', external: false },
              { label: 'Apply for a Mortgage', href: 'https://luminlending-apply-jennifer-ko.my1003app.com/register', external: true },
              { label: 'Apply for a HELOC', href: 'https://heloc.luminlending.com/account/heloc/register?referrer=af6dcf7d-0404-4773-babc-86037f37a537', external: true },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center justify-between gap-4 px-7 py-4 border border-charcoal/20 text-charcoal eyebrow hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300"
              >
                {label}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                  className="group-hover:translate-x-0.5 transition-transform duration-300">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-charcoal/8" style={{ backgroundColor: '#F6F2EB' }}>
          <div className="container-xl">
            <div className="flex items-center gap-6 mb-10">
              <p className="eyebrow">Related Articles</p>
              <div className="flex-1 h-px bg-charcoal/10" />
              <Link href="/resources" className="eyebrow text-charcoal/35 hover:text-sage transition-colors duration-200">
                View All
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {related.map((a, i) => (
                <div key={a.slug}>
                  <Link href={`/resources/${a.slug}`} className="group block">
                    <div className="overflow-hidden mb-4 relative" style={{ aspectRatio: '16/9' }}>
                      {a.image ? (
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div
                          className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                          style={{ background: a.gradient }}
                        />
                      )}
                    </div>
                    <p className="eyebrow text-sage mb-2">{a.categories[0]}</p>
                    <h3
                      className="font-serif font-light text-charcoal leading-tight mb-2 group-hover:text-stone transition-colors duration-300"
                      style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
                    >
                      {a.title}
                    </h3>
                    <span className="eyebrow text-sage inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform duration-300">
                      Read Article
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related FAQs ── */}
      {article.faqs.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-charcoal/8" style={{ backgroundColor: '#EBE5DC' }}>
          <div className="container-xl max-w-[860px]">
            <div className="flex items-center gap-6 mb-10">
              <p className="eyebrow">Related FAQs</p>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>
            <FAQAccordion faqs={article.faqs} />
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
