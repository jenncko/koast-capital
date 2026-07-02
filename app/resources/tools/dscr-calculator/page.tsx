'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
  const n = parseFloat(raw)
  if (isNaN(n) || raw === '') return raw
  return n.toFixed(3)
}

function fmtDollar(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—'
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function fmtRatio(n: number): string {
  if (!isFinite(n) || isNaN(n) || n === 0) return '—'
  return n.toFixed(4)
}

function DSCRBadge({ ratio }: { ratio: number }) {
  if (ratio === 0 || !isFinite(ratio)) return null
  const strong = ratio >= 1.20
  const breakEven = ratio >= 1.0 && ratio < 1.20
  const label = strong ? 'Strong' : breakEven ? 'Break Even' : 'Weak'
  return (
    <span
      className="font-sans font-medium text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border ml-2"
      style={{
        color: strong ? '#6b7a52' : breakEven ? '#8a6a30' : '#8a3030',
        borderColor: strong ? '#a8b08e' : breakEven ? '#c8a060' : '#c08080',
        backgroundColor: strong ? '#f0f3ea' : breakEven ? '#f5edd8' : '#f5e8e8',
      }}
    >
      {label}
    </span>
  )
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  format = 'currency',
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  placeholder?: string
  format?: 'currency' | 'rate' | 'integer' | 'none'
  hint?: string
}) {
  const [focused, setFocused] = useState(false)

  const displayValue = focused
    ? value
    : format === 'currency' ? formatCurrency(value)
    : format === 'rate' ? formatRate(value)
    : value

  const handleBlur = () => {
    setFocused(false)
    if (format === 'currency') onChange(formatCurrency(value))
    if (format === 'rate') onChange(formatRate(value))
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="eyebrow text-charcoal/40">{label}</label>
        {hint && <span className="font-sans text-[10px] text-charcoal/25 tracking-wide">{hint}</span>}
      </div>
      <div className="flex items-center border-b border-charcoal/15 focus-within:border-charcoal/35 transition-colors duration-200">
        {prefix && <span className="pr-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={(e) => onChange(e.target.value.replace(/,/g, ''))}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder ?? '0'}
          className="flex-1 bg-transparent py-2.5 font-serif font-light text-charcoal text-[15px] placeholder-charcoal/20 focus:outline-none min-w-0"
        />
        {suffix && <span className="pl-1.5 font-sans font-light text-charcoal/35 text-[13px] select-none">{suffix}</span>}
      </div>
    </div>
  )
}

function ResultRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between py-3 border-b border-charcoal/8 last:border-0 ${bold ? '' : ''}`}>
      <span className={`eyebrow ${bold ? 'text-charcoal/60' : 'text-charcoal/35'}`}>{label}</span>
      <span className={`font-serif font-light tabular-nums ${bold ? 'text-charcoal text-[16px]' : 'text-charcoal/80 text-[14px]'}`}>
        {value}
      </span>
    </div>
  )
}

export default function DSCRCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('500000')
  const [interestRate, setInterestRate] = useState('7.500')
  const [amortTerm, setAmortTerm] = useState('30')
  const [monthlyIncome, setMonthlyIncome] = useState('3500')
  const [monthlyInsurance, setMonthlyInsurance] = useState('150')
  const [monthlyTaxes, setMonthlyTaxes] = useState('400')
  const [monthlyHoa, setMonthlyHoa] = useState('0')

  const results = useMemo(() => {
    const principal = parseNum(loanAmount)
    const annualRate = parseNum(interestRate)
    const r = annualRate / 100 / 12
    const n = parseNum(amortTerm) * 12
    const income = parseNum(monthlyIncome)
    const ins = parseNum(monthlyInsurance)
    const tax = parseNum(monthlyTaxes)
    const hoa = parseNum(monthlyHoa)
    const expenses = ins + tax + hoa

    let pi = 0
    if (principal > 0 && r > 0 && n > 0) {
      pi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    } else if (principal > 0 && r === 0 && n > 0) {
      pi = principal / n
    }

    const io = principal > 0 && r > 0 ? principal * r : 0

    const totalPI = pi + expenses
    const totalIO = io + expenses

    const dscrPI = totalPI > 0 ? income / totalPI : 0
    const dscrIO = totalIO > 0 ? income / totalIO : 0

    return { pi, io, ins, tax, hoa, expenses, income, totalPI, totalIO, dscrPI, dscrIO }
  }, [loanAmount, interestRate, amortTerm, monthlyIncome, monthlyInsurance, monthlyTaxes, monthlyHoa])

  return (
    <>
      <Nav />

      <div style={{ backgroundColor: '#F6F2EB', paddingTop: 0 }}>

        {/* ── Hero ── */}
        <div className="relative border-b border-charcoal/8 overflow-hidden" style={{ backgroundColor: '#2a2520' }}>
          <Image src="/images/dscr-calculator.png" alt="DSCR Calculator" fill priority className="object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          <div className="relative z-10 container-xl pb-10 lg:pb-14" style={{ paddingTop: 'calc(72px + 2rem)' }}>
            <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
              <Link href="/resources" className="eyebrow text-cream/40 hover:text-cream transition-colors duration-200">Resources</Link>
              <span className="text-cream/20 text-[9px]">/</span>
              <Link href="/resources#tools" className="eyebrow text-cream/40 hover:text-cream transition-colors duration-200">Tools</Link>
            </nav>
            <div className="flex items-end gap-10 justify-between">
              <div>
                <p className="eyebrow text-cream/50 mb-3">DSCR Calculator</p>
                <div className="h-px bg-cream/20 mb-5" />
                <h1
                  className="font-serif font-light italic text-cream leading-[1.2]"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}
                >
                  Qualify on rental income.<br />
                  Not your tax returns.
                </h1>
              </div>
              <p className="hidden lg:block font-serif font-light text-cream/45 max-w-sm" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                Estimate whether your property&apos;s rental income covers the debt service — and by how much.
              </p>
            </div>
          </div>
        </div>

        {/* ── Calculator — 3 columns ── */}
        <div className="container-xl py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-8 lg:gap-10 items-start">

            {/* ── Col 1: Inputs ── */}
            <div className="space-y-8">

              {/* Loan Details */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <p className="eyebrow text-charcoal/40">Loan Details</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                </div>
                <div className="space-y-6">
                  <Field
                    label="Loan Amount"
                    value={loanAmount}
                    onChange={setLoanAmount}
                    prefix="$"
                    placeholder="500,000"
                    hint="$125K – $2M"
                  />
                  <Field
                    label="Interest Rate"
                    value={interestRate}
                    onChange={setInterestRate}
                    suffix="%"
                    placeholder="7.500"
                    format="rate"
                  />
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="eyebrow text-charcoal/40">Term</label>
                    </div>
                    <div className="flex items-center gap-3 border-b border-charcoal/15 py-2.5">
                      <span aria-hidden className="font-serif text-[15px] w-0 overflow-hidden select-none opacity-0">&nbsp;</span>
                      {[15, 20, 25, 30].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => setAmortTerm(String(yr))}
                          className={`font-sans font-medium text-[10px] tracking-[0.18em] uppercase transition-all duration-200 ${
                            amortTerm === String(yr) ? 'text-charcoal' : 'text-charcoal/30 hover:text-charcoal/60'
                          }`}
                        >
                          {yr}yr
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Income & Expenses */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <p className="eyebrow text-charcoal/40">Income & Expenses</p>
                  <div className="flex-1 h-px bg-charcoal/10" />
                </div>
                <div className="space-y-6">
                  <Field
                    label="Rental Income"
                    value={monthlyIncome}
                    onChange={setMonthlyIncome}
                    prefix="$"
                    placeholder="3,500"
                    hint="/MONTH"
                  />
                  <Field
                    label="Homeowners Insurance"
                    value={monthlyInsurance}
                    onChange={setMonthlyInsurance}
                    prefix="$"
                    placeholder="150"
                    hint="/MONTH"
                  />
                  <Field
                    label="Property Taxes"
                    value={monthlyTaxes}
                    onChange={setMonthlyTaxes}
                    prefix="$"
                    placeholder="400"
                    hint="/MONTH"
                  />
                  <Field
                    label="HOA Dues"
                    value={monthlyHoa}
                    onChange={setMonthlyHoa}
                    prefix="$"
                    placeholder="0"
                    hint="/MONTH"
                  />
                </div>
              </div>

            </div>

            {/* ── Col 2: Fully Amortizing ── */}
            <div className="lg:sticky lg:top-[96px] border border-charcoal/10 p-6 lg:p-7" style={{ backgroundColor: '#EBE5DC' }}>
              <div className="flex items-center mb-5">
                <p className="eyebrow text-charcoal/35">Fully Amortizing</p>
                <span className="eyebrow text-charcoal/20 ml-2">P&amp;I</span>
                <DSCRBadge ratio={results.dscrPI} />
              </div>

              <div className="mb-4 pb-4 border-b border-charcoal/10">
                <p className="eyebrow text-charcoal/25 mb-2">DSCR Ratio</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-serif font-light text-charcoal tabular-nums"
                    style={{ fontSize: 'clamp(30px, 2.8vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {fmtRatio(results.dscrPI)}
                  </span>
                  {results.dscrPI > 0 && (
                    <span className="font-serif font-light text-charcoal/35 text-[12px]">
                      {results.dscrPI >= 1.20 ? '≥ 1.20' : results.dscrPI >= 1.0 ? '1.00 – 1.19' : '< 1.00'}
                    </span>
                  )}
                </div>
              </div>

              <ResultRow label="P&I Payment" value={fmtDollar(results.pi)} />
              <ResultRow label="Insurance" value={fmtDollar(results.ins)} />
              <ResultRow label="Taxes" value={fmtDollar(results.tax)} />
              <ResultRow label="HOA Dues" value={fmtDollar(results.hoa)} />
              <ResultRow label="Total Qualifying Pmt" value={fmtDollar(results.totalPI)} bold />
              <div className="mt-3 pt-3 border-t border-charcoal/10">
                <ResultRow label="Monthly Rental Income" value={fmtDollar(results.income)} />
              </div>
            </div>

            {/* ── Col 3: Interest Only ── */}
            <div className="lg:sticky lg:top-[96px] border border-charcoal/10 p-6 lg:p-7" style={{ backgroundColor: '#EBE5DC' }}>
              <div className="flex items-center mb-5">
                <p className="eyebrow text-charcoal/35">Interest Only</p>
                <span className="eyebrow text-charcoal/20 ml-2">IO</span>
                <DSCRBadge ratio={results.dscrIO} />
              </div>

              <div className="mb-4 pb-4 border-b border-charcoal/10">
                <p className="eyebrow text-charcoal/25 mb-2">DSCR Ratio</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-serif font-light text-charcoal tabular-nums"
                    style={{ fontSize: 'clamp(30px, 2.8vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {fmtRatio(results.dscrIO)}
                  </span>
                  {results.dscrIO > 0 && (
                    <span className="font-serif font-light text-charcoal/35 text-[12px]">
                      {results.dscrIO >= 1.20 ? '≥ 1.20' : results.dscrIO >= 1.0 ? '1.00 – 1.19' : '< 1.00'}
                    </span>
                  )}
                </div>
              </div>

              <ResultRow label="IO Payment" value={fmtDollar(results.io)} />
              <ResultRow label="Insurance" value={fmtDollar(results.ins)} />
              <ResultRow label="Taxes" value={fmtDollar(results.tax)} />
              <ResultRow label="HOA Dues" value={fmtDollar(results.hoa)} />
              <ResultRow label="Total Qualifying Pmt" value={fmtDollar(results.totalIO)} bold />
              <div className="mt-3 pt-3 border-t border-charcoal/10">
                <ResultRow label="Monthly Rental Income" value={fmtDollar(results.income)} />
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
                  Ready to structure your investment loan?
                </h2>
                <p
                  className="font-serif font-light text-charcoal/50"
                  style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: '1.85' }}
                >
                  DSCR programs vary significantly across lenders. A consultation can help you identify the right structure, rate, and program for your property and goals.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="/#book"
                  className="eyebrow px-10 py-4 border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-400"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
