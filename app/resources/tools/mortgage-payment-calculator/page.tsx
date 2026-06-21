'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function fmtNum(val: number): string {
  if (!isFinite(val) || isNaN(val)) return '—'
  return Math.round(val).toLocaleString('en-US')
}

function Dollars({ val, className, style }: { val: number; className?: string; style?: React.CSSProperties }) {
  const num = fmtNum(val)
  if (num === '—') return <span className={className} style={style}>—</span>
  return (
    <span className={className} style={style}>
      <span className="font-sans font-light">$</span>{num}
    </span>
  )
}

function parseNum(s: string): number {
  const n = parseFloat(s.replace(/,/g, ''))
  return isNaN(n) || n < 0 ? 0 : n
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  step,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  placeholder?: string
  step?: string
}) {
  return (
    <div>
      <label className="eyebrow text-charcoal/45 mb-2 block">{label}</label>
      <div className="flex items-center border border-charcoal/15 bg-white/60 focus-within:border-sage transition-colors duration-200">
        {prefix && (
          <span className="pl-4 pr-2 font-serif font-light text-charcoal/40 text-[15px] select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '0'}
          min="0"
          step={step ?? '1'}
          className="flex-1 bg-transparent py-3.5 font-serif font-light text-charcoal text-[15px] placeholder-charcoal/20 focus:outline-none min-w-0 pr-3 pl-3"
          style={{ paddingLeft: prefix ? '0' : undefined }}
        />
        {suffix && (
          <span className="pr-4 pl-1 font-serif font-light text-charcoal/40 text-[15px] select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function ResultRow({
  label,
  value,
  large,
  divider,
}: {
  label: string
  value: string
  large?: boolean
  divider?: boolean
}) {
  return (
    <>
      {divider && <div className="h-px bg-charcoal/10 my-1" />}
      <div className={`flex items-baseline justify-between py-3 ${large ? 'pt-4' : ''}`}>
        <span
          className={large ? 'eyebrow text-charcoal/60' : 'eyebrow text-charcoal/40'}
        >
          {label}
        </span>
        <span
          className={`font-serif font-light text-charcoal tabular-nums ${large ? 'text-[22px]' : 'text-[16px]'}`}
        >
          {value}
        </span>
      </div>
    </>
  )
}

export default function MortgageCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState('800000')
  const [downPayment, setDownPayment] = useState('160000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTax, setPropertyTax] = useState('9000')
  const [insurance, setInsurance] = useState('1800')
  const [hoa, setHoa] = useState('0')

  const results = useMemo(() => {
    const P = parseNum(purchasePrice) - parseNum(downPayment)
    const loanAmount = Math.max(0, P)
    const annualRate = parseNum(interestRate)
    const r = annualRate / 100 / 12
    const n = parseNum(loanTerm) * 12

    let pi = 0
    if (loanAmount > 0 && r > 0 && n > 0) {
      pi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    } else if (loanAmount > 0 && r === 0 && n > 0) {
      pi = loanAmount / n
    }

    const monthlyTax = parseNum(propertyTax) / 12
    const monthlyInsurance = parseNum(insurance) / 12
    const monthlyHoa = parseNum(hoa)
    const total = pi + monthlyTax + monthlyInsurance + monthlyHoa

    return { loanAmount, pi, monthlyTax, monthlyInsurance, monthlyHoa, total }
  }, [purchasePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa])

  const downPct = useMemo(() => {
    const pp = parseNum(purchasePrice)
    const dp = parseNum(downPayment)
    if (pp <= 0) return ''
    return ((dp / pp) * 100).toFixed(1) + '%'
  }, [purchasePrice, downPayment])

  return (
    <>
      <Nav />

      {/* ── Full-page 3-column layout ── */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ backgroundColor: '#EBE5DC', minHeight: 'calc(100vh - 72px)', paddingTop: '72px' }}
      >

        {/* ── Col 1: Hero ── */}
        <div
          className="flex flex-col justify-between px-8 py-10 lg:py-14 border-b lg:border-b-0 lg:border-r border-charcoal/8 lg:w-[300px] xl:w-[340px] lg:flex-shrink-0"
          style={{ backgroundColor: '#EBE5DC' }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-8" aria-label="Breadcrumb">
            <Link href="/resources" className="eyebrow text-charcoal/25 hover:text-sage transition-colors duration-200">
              Resources
            </Link>
            <span className="text-charcoal/20 text-[9px]">/</span>
            <Link href="/resources#tools" className="eyebrow text-charcoal/25 hover:text-sage transition-colors duration-200">
              Tools
            </Link>
          </nav>

          {/* Editorial copy */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="eyebrow mb-4">Tools</p>
            <div className="h-px bg-charcoal/10 mb-6" />
            <h1
              className="font-serif font-light italic text-charcoal leading-[1.2] mb-6"
              style={{ fontSize: 'clamp(22px, 2vw, 32px)' }}
            >
              Estimate payments.<br />
              Understand affordability.<br />
              Plan with confidence.
            </h1>
            <p
              className="font-serif font-light text-charcoal/45"
              style={{ fontSize: '13px', lineHeight: '1.85' }}
            >
              Explore different scenarios and understand how purchase price, down payment, and financing structure affect your monthly payment.
            </p>
          </div>

          {/* CTA pinned bottom */}
          <div className="mt-8 hidden lg:block">
            <a
              href="/#book"
              className="group flex items-center gap-3 eyebrow text-charcoal/40 hover:text-sage transition-colors duration-300"
            >
              Book a Conversation
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                className="group-hover:translate-x-0.5 transition-transform duration-300">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Col 2: Inputs ── */}
        <div
          className="flex flex-col px-8 py-10 lg:py-14 border-b lg:border-b-0 lg:border-r border-charcoal/8 flex-1"
          style={{ backgroundColor: '#F6F2EB' }}
        >
          {/* Loan Details */}
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-5">
              <p className="eyebrow text-charcoal/35">Loan Details</p>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Purchase Price" value={purchasePrice} onChange={setPurchasePrice} prefix="$" placeholder="800,000" />
              <div>
                <label className="eyebrow text-charcoal/45 mb-2 block">
                  Down Payment{downPct ? <span className="ml-1.5 normal-case tracking-normal font-sans text-charcoal/25 text-[10px]">({downPct})</span> : null}
                </label>
                <div className="flex items-center border border-charcoal/15 bg-white/60 focus-within:border-sage transition-colors duration-200">
                  <span className="pl-3.5 pr-2 font-serif font-light text-charcoal/40 text-[14px] select-none">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="160,000"
                    min="0"
                    className="flex-1 bg-transparent py-3 font-serif font-light text-charcoal text-[14px] placeholder-charcoal/20 focus:outline-none min-w-0 pr-3"
                  />
                </div>
              </div>
              <InputField label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" placeholder="6.500" step="0.001" />
              <div>
                <label className="eyebrow text-charcoal/45 mb-2 block">Loan Term</label>
                <div className="flex gap-1.5">
                  {[10, 15, 20, 30].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setLoanTerm(String(yr))}
                      className={`flex-1 py-3 border font-sans font-medium text-[10px] tracking-[0.18em] uppercase transition-all duration-200 ${
                        loanTerm === String(yr)
                          ? 'bg-charcoal text-cream border-charcoal'
                          : 'border-charcoal/15 text-charcoal/40 bg-white/60 hover:border-sage hover:text-charcoal'
                      }`}
                    >
                      {yr}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Optional */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="eyebrow text-charcoal/35">Optional</p>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <InputField label="Annual Property Tax" value={propertyTax} onChange={setPropertyTax} prefix="$" placeholder="9,000" />
              <InputField label="Annual Homeowners Insurance" value={insurance} onChange={setInsurance} prefix="$" placeholder="1,800" />
              <InputField label="Monthly HOA" value={hoa} onChange={setHoa} prefix="$" placeholder="0" />
            </div>
          </div>
        </div>

        {/* ── Col 3: Results ── */}
        <div
          className="flex flex-col px-8 py-10 lg:py-14 flex-1"
          style={{ backgroundColor: '#EBE5DC' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <p className="eyebrow text-charcoal/35">Estimated Payment</p>
            <div className="flex-1 h-px bg-charcoal/10" />
          </div>

          {/* Total */}
          <div className="mb-8">
            <Dollars
              val={results.total}
              className="font-serif font-light text-charcoal tabular-nums"
              style={{ fontSize: 'clamp(40px, 4vw, 60px)', letterSpacing: '-0.02em', lineHeight: 1 } as React.CSSProperties}
            />
            <span className="eyebrow text-charcoal/30 ml-2 align-top" style={{ lineHeight: 2 }}>/mo</span>
            <p className="eyebrow text-charcoal/25 mt-2">Total Monthly Payment</p>
          </div>

          {/* Breakdown rows */}
          <div className="flex-1 border-t border-charcoal/10 divide-y divide-charcoal/8">
            {([
              { label: 'Principal & Interest', val: results.pi, show: true },
              { label: 'Property Tax', val: results.monthlyTax, show: results.monthlyTax > 0 },
              { label: 'Homeowners Insurance', val: results.monthlyInsurance, show: results.monthlyInsurance > 0 },
              { label: 'HOA', val: results.monthlyHoa, show: results.monthlyHoa > 0 },
            ] as { label: string; val: number; show: boolean }[]).map((row) => (
              <div key={row.label} className="flex items-baseline justify-between py-3">
                <span className="eyebrow text-charcoal/35">{row.label}</span>
                {row.show
                  ? <Dollars val={row.val} className="font-serif font-light text-charcoal text-[16px] tabular-nums" />
                  : <span className="font-serif font-light text-charcoal/30 text-[16px]">—</span>
                }
              </div>
            ))}
          </div>

          {/* Loan amount */}
          <div className="pt-5 mt-2 border-t border-charcoal/10">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-charcoal/35">Loan Amount</span>
              <Dollars val={results.loanAmount} className="font-serif font-light text-charcoal text-[16px] tabular-nums" />
            </div>
          </div>

          {/* Disclaimer */}
          <p
            className="mt-5 font-serif font-light text-charcoal/30"
            style={{ fontSize: '10px', lineHeight: '1.7' }}
          >
            For informational purposes only. Actual payments may vary based on loan program, taxes, insurance, HOA, mortgage insurance, and final loan terms.
          </p>
        </div>

      </div>

      <Footer />
    </>
  )
}
