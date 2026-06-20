import type { Block } from '@/lib/articles'

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={i}
                className="font-serif font-light text-charcoal/75"
                style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: '1.85' }}
              >
                {block.text}
              </p>
            )

          case 'heading':
            return (
              <h2
                key={i}
                className="font-serif font-light text-charcoal pt-4"
                style={{ fontSize: 'clamp(20px, 1.8vw, 26px)' }}
              >
                {block.text}
              </h2>
            )

          case 'callout':
            return (
              <div
                key={i}
                className="pl-6 py-5 pr-6 border-l-2 border-sage"
                style={{ backgroundColor: 'rgba(168,176,142,0.1)' }}
              >
                <p
                  className="font-serif font-light text-charcoal/80"
                  style={{ fontSize: 'clamp(14px, 1vw, 16px)', lineHeight: '1.8' }}
                >
                  {block.text}
                </p>
              </div>
            )

          case 'quote':
            return (
              <blockquote key={i} className="py-6 px-0">
                <div
                  className="font-serif leading-none select-none -mb-2 -ml-1"
                  style={{ fontSize: '56px', color: '#A8B08E', opacity: 0.3 }}
                  aria-hidden
                >
                  &ldquo;
                </div>
                <p
                  className="font-serif italic font-light text-charcoal leading-relaxed"
                  style={{ fontSize: 'clamp(17px, 1.5vw, 22px)', lineHeight: '1.65' }}
                >
                  {block.text}
                </p>
                {block.attribution && (
                  <p className="eyebrow text-charcoal/35 mt-4">{block.attribution}</p>
                )}
              </blockquote>
            )

          case 'list':
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-4">
                    <span className="w-5 h-px bg-sage flex-shrink-0 block" />
                    <span
                      className="font-serif font-light text-charcoal/75"
                      style={{ fontSize: 'clamp(14px, 1vw, 16px)', lineHeight: '1.8' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
