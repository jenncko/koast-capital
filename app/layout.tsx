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
  title: 'Koast Capital | Jennifer Ko | Boutique Mortgage Advisor',
  description:
    'Personalized mortgage guidance for homebuyers, self-employed borrowers, and real estate investors across California, Nevada, Arizona, and Washington.',
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
