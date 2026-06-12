import type { Metadata } from 'next'
import { Spectral, Jost } from 'next/font/google'
import './globals.css'

const spectral = Spectral({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jennifer Ko | Koast Capital | Personal Mortgage Advisory',
  description:
    'Jennifer Ko is the founder of Koast Capital and a personal mortgage advisor serving California, Nevada, Arizona, and Washington. Specializing in home purchases, refinancing, jumbo, DSCR, bank statement, bridge financing, HELOCs, and investor loans.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  keywords: [
    'mortgage advisor',
    'boutique mortgage',
    'self-employed home loan',
    'DSCR loan',
    'jumbo mortgage',
    'bank statement loan',
    'California mortgage',
    'Nevada mortgage',
    'Arizona mortgage',
    'Washington mortgage',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
