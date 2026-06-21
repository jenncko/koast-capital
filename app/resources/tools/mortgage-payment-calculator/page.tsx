'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

function formatCurrency(raw: string): string {
  const n = parseFloat(raw.replace(/,/g, ''))
  if (isNaN(n) || raw === '') return raw
  return Math.round(n).toLocaleString('en-US')
}

function formatRate(raw: string): string {
  const n = parseFloat(raw.replace(/,/g, ''))
  if (isNaN(n) || raw === '') return raw
  return n.toFixed(3)
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  hint,
  format = 'currency',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  placeholder?: string
  hint?: string
  format?: 'currency' | 'rate' | 'none'
}) {
  const [focused, setFocused] = useState(false)

  const displayValue = focused
    ? value
    : format === 'currency'
      ? formatCurrency(value)
      : format === 'rate'
        ? formatRate(value)
        : value

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // strip commas while typing
    onChange(e.target.value.replace(/,/g, ''))
  }, [onChange])

  const handleBlur = useCallback(() => {
    setFocused(false)
    if (format === 'currency') onChange(formatCurrency(value))
    if (format === 'rate') onChange(formatRate(value))
  }, [format, value, onChange])

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="eyebrow text-charcoal/40">{label}</label>
        {hint && <span className="font-sans text-[10px] text-charcoal/25 tracking-wide">{hint}</span>}
      </div>
      <div className="flex items-center border-b border-charcoal/15 focus-within:border-charcoal/35 transition-colors duration-200 bg-transparent">
        {prefix && (
          <span className="pr-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder ?? '0'}
          className="flex-1 bg-transparent py-2.5 font-serif font-light text-charcoal text-[15px] placeholder-charcoal/20 focus:outline-none min-w-0"
        />
        {suffix && (
          <span className="pl-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">{suffix}</span>
        )}
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  children,
  muted,
}: {
  label: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between py-3.5 border-b border-charcoal/8 last:border-0">
      <span className={`eyebrow ${muted ? 'text-charcoal/30' : 'text-charcoal/40'}`}>{label}</span>
      <span className={`font-serif font-light tabular-nums ${muted ? 'text-charcoal/40 text-[14px]' : 'text-charcoal text-[15px]'}`}>
        {children}
      </span>
    </div>
  )
}

function DownPaymentInput({ value, onChange, mode }: { value: string; onChange: (v: string) => void; mode: '$' | '%' }) {
  const [focused, setFocused] = useState(false)

  const displayValue = focused
    ? value
    : mode === '$'
      ? formatCurrency(value)
      : value === '' ? '' : parseFloat(value).toFixed(1)

  return (
    <div className="flex items-center border-b border-charcoal/15 focus-within:border-charcoal/35 transition-colors duration-200">
      {mode === '$' && (
        <span className="pr-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">$</span>
      )}
      <input
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={(e) => onChange(e.target.value.replace(/,/g, ''))}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          if (mode === '$') onChange(formatCurrency(value))
          if (mode === '%') {
            const n = parseFloat(value)
            if (!isNaN(n)) onChange(n.toFixed(1))
          }
        }}
        placeholder={mode === '$' ? '160,000' : '20.0'}
        className="flex-1 bg-transparent py-2.5 font-serif font-light text-charcoal text-[15px] placeholder-charcoal/20 focus:outline-none min-w-0"
      />
      {mode === '%' && (
        <span className="pl-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">%</span>
      )}
    </div>
  )
}

export default function MortgageCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState('800000')
  const [downPayment, setDownPayment] = useState('160000')
  const [downMode, setDownMode] = useState<'$' | '%'>('$')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [propertyTax, setPropertyTax] = useState('9000')
  const [insurance, setInsurance] = useState('1800')
  const [hoa, setHoa] = useState('0')
  const [pmi, setPmi] = useState('0')
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Resolve down payment dollar amount regardless of input mode
  const downDollars = useMemo(() => {
    const pp = parseNum(purchasePrice)
    if (downMode === '%') {
      return (parseNum(downPayment) / 100) * pp
    }
    return parseNum(downPayment)
  }, [purchasePrice, downPayment, downMode])

  const downPct = useMemo(() => {
    const pp = parseNum(purchasePrice)
    if (pp <= 0) return 0
    return (downDollars / pp) * 100
  }, [purchasePrice, downDollars])

  const results = useMemo(() => {
    const loanAmount = Math.max(0, parseNum(purchasePrice) - downDollars)
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
    const monthlyPmi = parseNum(pmi)
    const total = pi + monthlyTax + monthlyInsurance + monthlyHoa + monthlyPmi

    return { loanAmount, pi, monthlyTax, monthlyInsurance, monthlyHoa, monthlyPmi, total }
  }, [purchasePrice, downDollars, interestRate, loanTerm, propertyTax, insurance, hoa, pmi])

  return (
    <>
      <Nav />

      <div style={{ backgroundColor: '#F6F2EB' }}>

        {/* ── Hero ── */}
        <div className="relative border-b border-charcoal/8 overflow-hidden" style={{ backgroundColor: '#2a2520' }}>
          <Image
            src="/images/mortgage-calculator.png"
            alt="Mortgage Payment Calculator"
            fill
            priority
            className="object-cover object-center opacity-80"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          <div className="relative z-10 container-xl pb-14 lg:pb-20" style={{ paddingTop: 'calc(72px + 3.5rem)' }}>
            <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
              <Link href="/resources" className="eyebrow text-cream/40 hover:text-cream transition-colors duration-200">Resources</Link>
              <span className="text-cream/20 text-[9px]">/</span>
              <Link href="/resources#tools" className="eyebrow text-cream/40 hover:text-cream transition-colors duration-200">Tools</Link>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
              <div>
                <p className="eyebrow text-cream/50 mb-4">Mortgage Payment Planner</p>
                <div className="h-px bg-cream/20 mb-6" />
                <h1
                  className="font-serif font-light italic text-cream leading-[1.2]"
                  style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
                >
                  Estimate payments.<br />
                  Borrow intentionally.<br />
                  Plan with confidence.
                </h1>
              </div>
              <div>
                <p
                  className="font-serif font-light text-cream/60"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 15px)', lineHeight: '1.9' }}
                >
                  Small changes in financing structure can have a meaningful impact on monthly payment, cash reserves, and long-term flexibility. Use this tool to explore different scenarios and better understand how purchase price, down payment, and interest rate may affect your mortgage payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Calculator ── */}
        <div className="container-xl py-14 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

            {/* ── Left: Inputs ── */}
            <div>

              {/* Section: Loan Scenario */}
              <div className="mb-10">
                <div className="flex items-center gap-5 mb-8">
                  <p className="eyebrow text-charcoal/40">Loan Scenario</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">

                  <Field
                    label="Purchase Price"
                    value={purchasePrice}
                    onChange={setPurchasePrice}
                    prefix="$"
                    placeholder="800,000"
                  />

                  {/* Down Payment with $ / % toggle */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="eyebrow text-charcoal/40">Down Payment</label>
                      <div className="flex items-center gap-0">
                        {(['$', '%'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => {
                              if (mode === downMode) return
                              // convert value when switching modes
                              const pp = parseNum(purchasePrice)
                              if (mode === '%' && pp > 0) {
                                setDownPayment(((parseNum(downPayment) / pp) * 100).toFixed(1))
                              } else {
                                setDownPayment(Math.round((parseNum(downPayment) / 100) * pp).toString())
                              }
                              setDownMode(mode)
                            }}
                            className={`px-2 py-0 font-sans text-[10px] tracking-[0.15em] transition-all duration-150 ${
                              downMode === mode
                                ? 'text-charcoal'
                                : 'text-charcoal/25 hover:text-charcoal/50'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                    <DownPaymentInput
                      value={downPayment}
                      onChange={setDownPayment}
                      mode={downMode}
                    />
                    {downPct > 0 && (
                      <p className="mt-1 font-sans text-[10px] text-charcoal/25 tracking-wide">
                        {downMode === '$'
                          ? `${downPct.toFixed(2)}% of purchase price`
                          : `$${Math.round(downDollars).toLocaleString('en-US')} of purchase price`}
                      </p>
                    )}
                  </div>

                  <Field
                    label="Interest Rate"
                    value={interestRate}
                    onChange={setInterestRate}
                    suffix="%"
                    placeholder="6.500"
                    format="rate"
                  />

                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="eyebrow text-charcoal/40">Loan Term</label>
                    </div>
                    <div className="flex items-center gap-3 border-b border-charcoal/15 py-2.5">
                      {/* Zero-width strut — forces row to match text-[15px] font-serif input height */}
                      <span aria-hidden className="font-serif text-[15px] w-0 overflow-hidden select-none opacity-0">&nbsp;</span>
                      {[10, 15, 20, 30].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => setLoanTerm(String(yr))}
                          className={`font-sans font-medium text-[10px] tracking-[0.18em] uppercase transition-all duration-200 ${
                            loanTerm === String(yr)
                              ? 'text-charcoal'
                              : 'text-charcoal/30 hover:text-charcoal/60'
                          }`}
                        >
                          {yr}yr
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Section: Advanced Assumptions (collapsible) */}
              <div>
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="flex items-center gap-5 w-full group mb-0"
                >
                  <p className="eyebrow text-charcoal/35 group-hover:text-charcoal/55 transition-colors duration-200">Advanced Assumptions</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className={`text-charcoal/30 transition-transform duration-300 flex-shrink-0 ${advancedOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 4l3 3 3-3" />
                  </svg>
                </button>

                {advancedOpen && (
                  <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-7">
                    <Field
                      label="Property Tax"
                      value={propertyTax}
                      onChange={setPropertyTax}
                      prefix="$"
                      placeholder="9,000"
                      suffix="/YEAR"
                    />
                    <Field
                      label="Homeowners Insurance"
                      value={insurance}
                      onChange={setInsurance}
                      prefix="$"
                      placeholder="1,800"
                      suffix="/YEAR"
                    />
                    <Field
                      label="Mortgage Insurance (PMI/MIP)"
                      value={pmi}
                      onChange={setPmi}
                      prefix="$"
                      placeholder="0"
                      suffix="/MONTH"
                    />
                    <Field
                      label="HOA Dues"
                      value={hoa}
                      onChange={setHoa}
                      prefix="$"
                      placeholder="0"
                      suffix="/MONTH"
                    />
                  </div>
                )}
              </div>

            </div>

            {/* ── Right: Scenario Summary ── */}
            <div className="lg:sticky lg:top-[96px]">
              <div className="border border-charcoal/10 p-8 lg:p-10" style={{ backgroundColor: '#EBE5DC' }}>

                <p className="eyebrow text-charcoal/35 mb-8">Scenario Summary</p>

                {/* Total */}
                <div className="mb-8 pb-8 border-b border-charcoal/10">
                  <p className="eyebrow text-charcoal/25 mb-3">Estimated Monthly Payment</p>
                  <Dollars
                    val={results.total}
                    className="font-serif font-light text-charcoal tabular-nums"
                    style={{ fontSize: 'clamp(38px, 4vw, 54px)', letterSpacing: '-0.02em', lineHeight: 1 } as React.CSSProperties}
                  />
                </div>

                {/* Breakdown */}
                <div className="mb-6">
                  <SummaryRow label="Principal & Interest">
                    <Dollars val={results.pi} className="font-serif font-light text-charcoal text-[15px] tabular-nums" />
                  </SummaryRow>
                  <SummaryRow label="Property Tax" muted={results.monthlyTax === 0}>
                    {results.monthlyTax > 0
                      ? <Dollars val={results.monthlyTax} className="font-serif font-light text-charcoal text-[15px] tabular-nums" />
                      : <span className="font-serif font-light text-charcoal/25 text-[14px]">—</span>}
                  </SummaryRow>
                  <SummaryRow label="Homeowners Insurance" muted={results.monthlyInsurance === 0}>
                    {results.monthlyInsurance > 0
                      ? <Dollars val={results.monthlyInsurance} className="font-serif font-light text-charcoal text-[15px] tabular-nums" />
                      : <span className="font-serif font-light text-charcoal/25 text-[14px]">—</span>}
                  </SummaryRow>
                  <SummaryRow label="Mortgage Insurance" muted={results.monthlyPmi === 0}>
                    {results.monthlyPmi > 0
                      ? <Dollars val={results.monthlyPmi} className="font-serif font-light text-charcoal text-[15px] tabular-nums" />
                      : <span className="font-serif font-light text-charcoal/25 text-[14px]">—</span>}
                  </SummaryRow>
                  <SummaryRow label="HOA" muted={results.monthlyHoa === 0}>
                    {results.monthlyHoa > 0
                      ? <Dollars val={results.monthlyHoa} className="font-serif font-light text-charcoal text-[15px] tabular-nums" />
                      : <span className="font-serif font-light text-charcoal/25 text-[14px]">—</span>}
                  </SummaryRow>
                </div>

                {/* Loan details */}
                <div className="pt-6 border-t border-charcoal/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-charcoal/30">Loan Amount</span>
                    <Dollars val={results.loanAmount} className="font-serif font-light text-charcoal text-[14px] tabular-nums" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-charcoal/30">Down Payment</span>
                    <span className="font-serif font-light text-charcoal text-[14px] tabular-nums">
                      {downPct > 0 ? `${downPct.toFixed(2)}%` : '—'}
                    </span>
                  </div>
                </div>

                {/* Advisory note */}
                <p
                  className="mt-7 pt-7 border-t border-charcoal/8 font-serif font-light text-charcoal/30"
                  style={{ fontSize: '11px', lineHeight: '1.75' }}
                >
                  This estimate is intended to help you compare scenarios. Your actual payment may vary based on loan program, property taxes, insurance, HOA dues, mortgage insurance, lender fees, and final loan terms.
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* ── CTA ── */}
        <div className="border-t border-charcoal/8" style={{ backgroundColor: '#EBE5DC' }}>
          <div className="container-xl py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <div>
                <p className="eyebrow text-charcoal/35 mb-4">Next Step</p>
                <div className="h-px bg-charcoal/10 mb-6 w-10" />
                <h2
                  className="font-serif font-light italic text-charcoal leading-tight mb-5"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 32px)' }}
                >
                  Questions about your scenario?
                </h2>
                <p
                  className="font-serif font-light text-charcoal/50"
                  style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: '1.85' }}
                >
                  Every borrower&apos;s situation is different. A consultation can help you understand which financing structure best aligns with your goals.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="/#book"
                  className="group inline-flex items-center justify-between gap-6 px-8 py-4 border border-charcoal/20 text-charcoal eyebrow hover:bg-sage hover:border-sage hover:text-cream transition-all duration-300 w-full lg:w-auto lg:min-w-[280px]"
                >
                  Schedule a Consultation
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                    className="group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0">
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
