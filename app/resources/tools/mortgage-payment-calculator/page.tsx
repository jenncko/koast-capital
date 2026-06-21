'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function fmt(val: number) {
  if (!isFinite(val) || isNaN(val)) return '—'
  return '$' + Math.round(val).toLocaleString('en-US')
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

      <div style={{ paddingTop: '72px' }}>

        {/* ── Top section: Hero left + Inputs right ── */}
        <div className="border-b border-charcoal/8" style={{ backgroundColor: '#EBE5DC' }}>
          <div className="container-xl pt-14 pb-16 lg:pt-20 lg:pb-20">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-10 lg:mb-14" aria-label="Breadcrumb">
              <Link href="/resources" className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200">
                Resources
              </Link>
              <span className="text-charcoal/20 text-[10px]">/</span>
              <Link href="/resources#tools" className="eyebrow text-charcoal/30 hover:text-sage transition-colors duration-200">
                Tools
              </Link>
              <span className="text-charcoal/20 text-[10px]">/</span>
              <span className="eyebrow text-charcoal/30">Mortgage Calculator</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — editorial hero */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="eyebrow mb-5">Tools</p>
                  <div className="h-px bg-charcoal/10 mb-7" />
                  <h1
                    className="font-serif font-light italic text-charcoal leading-[1.2] mb-8"
                    style={{ fontSize: 'clamp(28px, 3.2vw, 46px)' }}
                  >
                    Estimate payments.<br />
                    Understand affordability.<br />
                    Plan with confidence.
                  </h1>
                  <p
                    className="font-serif font-light text-charcoal/50 max-w-[420px]"
                    style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: '1.85' }}
                  >
                    Mortgage decisions involve more than interest rates. Use this calculator to explore different scenarios and better understand how purchase price, down payment, and financing structure affect your monthly payment.
                  </p>
                </div>
              </div>

              {/* Right — inputs */}
              <div>
                {/* Primary inputs */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <p className="eyebrow text-charcoal/40">Loan Details</p>
                    <div className="flex-1 h-px bg-charcoal/10" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Purchase Price"
                      value={purchasePrice}
                      onChange={setPurchasePrice}
                      prefix="$"
                      placeholder="800,000"
                    />
                    <div>
                      <label className="eyebrow text-charcoal/45 mb-2 block">
                        Down Payment{downPct ? <span className="ml-2 normal-case tracking-normal font-sans text-charcoal/30">({downPct})</span> : null}
                      </label>
                      <div className="flex items-center border border-charcoal/15 bg-white/50 focus-within:border-sage transition-colors duration-200">
                        <span className="pl-4 pr-2 font-serif font-light text-charcoal/40 text-[15px] select-none">$</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value)}
                          placeholder="160,000"
                          min="0"
                          className="flex-1 bg-transparent py-3.5 font-serif font-light text-charcoal text-[15px] placeholder-charcoal/20 focus:outline-none min-w-0 pr-3"
                        />
                      </div>
                    </div>
                    <InputField
                      label="Interest Rate"
                      value={interestRate}
                      onChange={setInterestRate}
                      suffix="%"
                      placeholder="6.500"
                      step="0.001"
                    />
                    <div>
                      <label className="eyebrow text-charcoal/45 mb-2 block">Loan Term</label>
                      <div className="flex gap-2">
                        {[10, 15, 20, 30].map((yr) => (
                          <button
                            key={yr}
                            onClick={() => setLoanTerm(String(yr))}
                            className={`flex-1 py-3.5 border font-sans font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 ${
                              loanTerm === String(yr)
                                ? 'bg-charcoal text-cream border-charcoal'
                                : 'border-charcoal/15 text-charcoal/45 bg-white/50 hover:border-sage hover:text-charcoal'
                            }`}
                          >
                            {yr}yr
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional inputs */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <p className="eyebrow text-charcoal/40">Optional</p>
                    <div className="flex-1 h-px bg-charcoal/10" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <InputField
                      label="Annual Property Tax"
                      value={propertyTax}
                      onChange={setPropertyTax}
                      prefix="$"
                      placeholder="9,000"
                    />
                    <InputField
                      label="Annual Homeowners Insurance"
                      value={insurance}
                      onChange={setInsurance}
                      prefix="$"
                      placeholder="1,800"
                    />
                    <InputField
                      label="Monthly HOA"
                      value={hoa}
                      onChange={setHoa}
                      prefix="$"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom section: Results ── */}
        <div style={{ backgroundColor: '#F6F2EB' }}>
          <div className="container-xl py-14 lg:py-20">

            <div className="flex items-center gap-6 mb-10">
              <p className="eyebrow text-charcoal/40">Estimated Monthly Payment</p>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Total + breakdown in a horizontal row on desktop */}
            <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 items-start mb-10">

              {/* Big number */}
              <div>
                <span
                  className="font-serif font-light text-charcoal"
                  style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {fmt(results.total)}
                </span>
                <span className="eyebrow text-charcoal/30 ml-3">/mo</span>
                <p className="eyebrow text-charcoal/25 mt-3">Total Estimated Payment</p>
              </div>

              {/* Breakdown grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-charcoal/10 divide-y sm:divide-y-0 sm:divide-x divide-charcoal/8"
                style={{ backgroundColor: '#EBE5DC' }}>
                {[
                  { label: 'Principal & Interest', value: fmt(results.pi) },
                  { label: 'Property Tax', value: results.monthlyTax > 0 ? fmt(results.monthlyTax) : '—' },
                  { label: 'Homeowners Insurance', value: results.monthlyInsurance > 0 ? fmt(results.monthlyInsurance) : '—' },
                  { label: 'HOA', value: results.monthlyHoa > 0 ? fmt(results.monthlyHoa) : '—' },
                ].map((row) => (
                  <div key={row.label} className="px-6 py-5 flex flex-col gap-2">
                    <span className="eyebrow text-charcoal/35">{row.label}</span>
                    <span className="font-serif font-light text-charcoal text-[20px] tabular-nums">{row.value}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Loan amount + disclaimer + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-8 border-t border-charcoal/10">
              <div className="flex items-baseline gap-8">
                <div>
                  <p className="eyebrow text-charcoal/35 mb-1.5">Loan Amount</p>
                  <p className="font-serif font-light text-charcoal text-[20px] tabular-nums">{fmt(results.loanAmount)}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
                <p
                  className="font-serif font-light text-charcoal/35 max-w-[420px]"
                  style={{ fontSize: '11px', lineHeight: '1.7' }}
                >
                  This calculator is for informational purposes only. Actual payments may vary based on loan program, property taxes, homeowner&apos;s insurance, HOA dues, mortgage insurance, and final loan terms.
                </p>
                <a
                  href="/#book"
                  className="group flex items-center gap-4 px-7 py-4 border border-charcoal/20 text-charcoal eyebrow hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300 whitespace-nowrap flex-shrink-0"
                >
                  Book a Conversation
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                    className="group-hover:translate-x-0.5 transition-transform duration-300">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}
