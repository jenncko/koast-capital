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

      <div style={{ backgroundColor: '#F6F2EB', minHeight: '100vh', paddingTop: '72px' }}>

        {/* ── Page header ── */}
        <div className="border-b border-charcoal/8" style={{ backgroundColor: '#EBE5DC' }}>
          <div className="container-xl py-12 lg:py-16">
            <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
              <Link href="/resources" className="eyebrow text-charcoal/35 hover:text-sage transition-colors duration-200">
                Resources
              </Link>
              <span className="text-charcoal/20 text-[10px]">/</span>
              <Link href="/resources#tools" className="eyebrow text-charcoal/35 hover:text-sage transition-colors duration-200">
                Tools
              </Link>
              <span className="text-charcoal/20 text-[10px]">/</span>
              <span className="eyebrow text-charcoal/35">Mortgage Calculator</span>
            </nav>
            <p className="eyebrow text-charcoal/35 mb-4">Tools</p>
            <h1
              className="font-serif font-light text-charcoal leading-tight mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Mortgage Payment Calculator
            </h1>
            <p
              className="font-serif font-light text-charcoal/55 max-w-[560px]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: '1.8' }}
            >
              Estimate your monthly mortgage payment based on purchase price, down payment, interest rate, and loan term.
            </p>
          </div>
        </div>

        {/* ── Calculator ── */}
        <div className="container-xl py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-8 lg:gap-12 items-start">

            {/* ── Inputs ── */}
            <div>
              {/* Primary inputs */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <p className="eyebrow text-charcoal/50">Loan Details</p>
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
                    <div className="flex items-center border border-charcoal/15 bg-white/60 focus-within:border-sage transition-colors duration-200">
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
                              : 'border-charcoal/15 text-charcoal/45 bg-white/60 hover:border-sage hover:text-charcoal'
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
                  <p className="eyebrow text-charcoal/50">Optional</p>
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

            {/* ── Results ── */}
            <div className="lg:sticky lg:top-[96px]">
              <div
                className="border border-charcoal/12 p-7 lg:p-8"
                style={{ backgroundColor: '#EBE5DC', boxShadow: '0 2px 24px rgba(56,51,46,0.06)' }}
              >
                <p className="eyebrow text-charcoal/40 mb-6">Estimated Monthly Payment</p>

                {/* Total — hero number */}
                <div className="pb-6 mb-2 border-b border-charcoal/10">
                  <span
                    className="font-serif font-light text-charcoal"
                    style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.01em' }}
                  >
                    {fmt(results.total)}
                  </span>
                  <span className="eyebrow text-charcoal/30 ml-3">/mo</span>
                </div>

                {/* Breakdown */}
                <div className="divide-y divide-charcoal/6">
                  <ResultRow label="Principal &amp; Interest" value={fmt(results.pi)} />
                  <ResultRow label="Property Tax" value={results.monthlyTax > 0 ? fmt(results.monthlyTax) : '—'} />
                  <ResultRow label="Homeowners Insurance" value={results.monthlyInsurance > 0 ? fmt(results.monthlyInsurance) : '—'} />
                  <ResultRow label="HOA" value={results.monthlyHoa > 0 ? fmt(results.monthlyHoa) : '—'} />
                </div>

                {/* Loan amount */}
                <div className="mt-6 pt-5 border-t border-charcoal/10">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-charcoal/40">Loan Amount</span>
                    <span className="font-serif font-light text-charcoal text-[16px]">{fmt(results.loanAmount)}</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <p
                  className="mt-6 font-serif font-light text-charcoal/35 leading-relaxed"
                  style={{ fontSize: '11px', lineHeight: '1.7' }}
                >
                  This calculator is for informational purposes only. Actual payments may vary based on loan program, property taxes, homeowner&apos;s insurance, HOA dues, mortgage insurance, and final loan terms.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-5">
                <a
                  href="/#book"
                  className="group flex items-center justify-between gap-4 px-7 py-4 border border-charcoal/20 text-charcoal eyebrow hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300 w-full"
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
