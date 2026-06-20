export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] }

export type FAQ = { question: string; answer: string }

export type Article = {
  slug: string
  title: string
  excerpt: string
  categories: string[]
  gradient: string
  image?: string
  readTime: string
  date: string
  featured: boolean
  faqs: FAQ[]
  relatedSlugs: string[]
  body: Block[]
}

const articles: Article[] = [
  {
    slug: 'heloc-vs-cash-out-refinance',
    title: 'HELOC vs. Cash-Out Refinance: Which Is Right for You?',
    excerpt: 'Both options let you access your home equity — but they work very differently. Here\'s how to choose the right one for your situation.',
    categories: ['HELOC'],
    gradient: 'linear-gradient(135deg, #c4ccaa 0%, #8C9870 100%)',
    image: '/images/resources-1.png',
    readTime: '5 min read',
    date: 'June 10, 2025',
    featured: true,
    relatedSlugs: ['dscr-loans-explained', 'bank-statement-loans', 'jumbo-loan-requirements'],
    faqs: [
      {
        question: 'Can I have both a HELOC and a cash-out refinance?',
        answer: 'Not simultaneously on the same property. However, you could use a cash-out refinance to pay off an existing HELOC, or vice versa, depending on your goals and equity position.',
      },
      {
        question: 'Is HELOC interest tax deductible?',
        answer: 'HELOC interest may be deductible if the funds are used to buy, build, or substantially improve the home securing the loan. Consult a tax professional for guidance specific to your situation.',
      },
      {
        question: 'What credit score do I need for a HELOC?',
        answer: 'Most lenders prefer a credit score of 680 or higher for a HELOC. Requirements vary by lender and loan-to-value ratio.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'If you\'ve built meaningful equity in your home, you have options. Two of the most common ways to access that equity are a Home Equity Line of Credit (HELOC) and a cash-out refinance. Both can be powerful financial tools — but they serve different needs and carry different structures.' },
      { type: 'heading', text: 'What Is a HELOC?' },
      { type: 'paragraph', text: 'A HELOC is a revolving line of credit secured by your home. Similar to a credit card, you draw from it as needed during a set draw period — typically 5 to 10 years — and pay interest only on what you use. After the draw period ends, you repay the principal over a repayment period.' },
      { type: 'callout', text: 'HELOCs typically carry variable interest rates tied to the prime rate, which means your monthly payment can change over time.' },
      { type: 'heading', text: 'What Is a Cash-Out Refinance?' },
      { type: 'paragraph', text: 'A cash-out refinance replaces your existing mortgage with a new, larger loan. You receive the difference between the new loan amount and your current mortgage balance in cash at closing. Because you\'re starting a new mortgage, you\'ll have a new rate and new terms — which can be advantageous if rates have moved in your favor since your original loan.' },
      { type: 'heading', text: 'Key Differences at a Glance' },
      { type: 'list', items: [
        'A HELOC keeps your existing mortgage intact; a cash-out refinance replaces it.',
        'HELOCs offer flexibility — draw and repay as needed during the draw period.',
        'Cash-out refinances provide a lump sum with fixed repayment from day one.',
        'Closing costs for a cash-out refinance are typically higher.',
        'HELOCs carry variable rates; cash-out refinances can be fixed.',
      ]},
      { type: 'quote', text: 'The right choice depends on how you plan to use the funds and how long you intend to stay in your home. There\'s no universal answer — only the one that aligns with your goals.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
      { type: 'heading', text: 'Which Is Right for You?' },
      { type: 'paragraph', text: 'If you need funds over time — for ongoing renovations, a business expense, or a flexible reserve — a HELOC\'s draw-and-repay structure is difficult to beat. If you\'re consolidating high-interest debt or need a large lump sum at a predictable rate, a cash-out refinance may provide better long-term savings. Consider your timeline, risk tolerance, and how long you plan to stay in the home before deciding.' },
    ],
  },
  {
    slug: 'dscr-loans-explained',
    title: 'DSCR Loans Explained: Qualifying on Rental Income',
    excerpt: 'Debt Service Coverage Ratio loans let investors qualify based on property income — no personal tax returns required.',
    categories: ['DSCR'],
    gradient: 'linear-gradient(135deg, #b8b0a8 0%, #756C5F 100%)',
    image: '/images/resources-2.png',
    readTime: '6 min read',
    date: 'May 28, 2025',
    featured: true,
    relatedSlugs: ['heloc-vs-cash-out-refinance', 'bank-statement-loans', 'jumbo-loan-requirements'],
    faqs: [
      {
        question: 'What DSCR ratio do lenders typically require?',
        answer: 'Most lenders look for a DSCR of 1.0 or higher, though some allow ratios slightly below 1.0 with compensating factors. A ratio of 1.25 or above is generally considered strong.',
      },
      {
        question: 'Can I use a DSCR loan for a short-term rental property?',
        answer: 'Yes. Many lenders accept short-term rental income for DSCR qualification. Some use a market rent analysis; others use documented short-term rental history. Guidelines vary by lender.',
      },
      {
        question: 'Do I need good credit for a DSCR loan?',
        answer: 'Yes. While DSCR loans don\'t require tax returns, lenders still review credit scores. A score of 680 or higher is typically required, with better pricing available for scores of 720 and above.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'For real estate investors, traditional mortgage qualification can be a meaningful barrier. Tax returns that reflect deductions and business losses rarely tell the full story of an investor\'s financial strength. DSCR loans were designed with exactly that in mind.' },
      { type: 'heading', text: 'How DSCR Is Calculated' },
      { type: 'paragraph', text: 'DSCR stands for Debt Service Coverage Ratio. It measures whether a property\'s income is sufficient to cover its debt obligations. The formula is straightforward: divide the property\'s gross rental income by its total monthly debt service — principal, interest, taxes, insurance, and HOA dues if applicable.' },
      { type: 'callout', text: 'DSCR = Gross Rental Income ÷ Total Monthly Debt Service. A ratio of 1.0 means the property breaks even. Above 1.0 means it generates positive cash flow relative to its obligations.' },
      { type: 'heading', text: 'Who Benefits Most from DSCR Financing?' },
      { type: 'list', items: [
        'Investors with multiple properties and complex tax returns',
        'Self-employed borrowers whose income is difficult to document through traditional channels',
        'Portfolio builders looking to scale without DTI constraints',
        'Foreign nationals investing in U.S. real estate',
        'Borrowers who want to keep business and personal finances clearly separated',
      ]},
      { type: 'heading', text: 'What Lenders Evaluate' },
      { type: 'paragraph', text: 'While personal income documentation is not required, lenders do review credit score, property type, loan-to-value ratio, and a market rent analysis — typically provided by a licensed appraiser. Most programs require the property to be non-owner-occupied. Eligible property types generally include single-family residences, 2–4 unit properties, condos, and in some cases 5+ unit multifamily.' },
      { type: 'quote', text: 'DSCR financing has become one of the most powerful tools for real estate investors. It allows the property to speak for itself — without the noise of a complex tax return.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'bank-statement-loans',
    title: 'Bank Statement Loans for Self-Employed Borrowers',
    excerpt: 'If your tax returns don\'t reflect your actual cash flow, a bank statement loan may be the solution you\'ve been looking for.',
    categories: ['Bank Statement', 'P&L'],
    gradient: 'linear-gradient(135deg, #c8d4cc 0%, #6a8a86 100%)',
    image: '/images/resources-3.png',
    readTime: '5 min read',
    date: 'May 14, 2025',
    featured: true,
    relatedSlugs: ['dscr-loans-explained', 'heloc-vs-cash-out-refinance', 'jumbo-loan-requirements'],
    faqs: [
      {
        question: 'How many months of bank statements are required?',
        answer: 'Most lenders require either 12 or 24 months of bank statements. Using 24 months often provides a more complete income picture and may improve your qualifying amount.',
      },
      {
        question: 'Can I use business bank statements instead of personal?',
        answer: 'Yes. Many lenders accept business bank statements. In that case, an expense ratio is typically applied to estimate net income from the deposits shown — commonly 50%, though it varies by lender and industry.',
      },
      {
        question: 'What is the difference between a bank statement loan and a P&L loan?',
        answer: 'A bank statement loan uses your actual deposit history to determine income. A P&L loan uses a profit and loss statement prepared by a licensed CPA. Both are alternatives to traditional tax-return-based qualification.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'Self-employment offers independence — but it can complicate mortgage qualification. When you deduct legitimate business expenses, your taxable income often appears much lower than your actual cash flow. Bank statement loans were created to bridge that gap.' },
      { type: 'heading', text: 'How Bank Statement Loans Work' },
      { type: 'paragraph', text: 'Instead of W-2s or tax returns, the lender analyzes 12 or 24 months of your bank statements to establish an average monthly income. Deposits are reviewed, large non-recurring transfers are typically excluded, and a consistent income picture is constructed from what actually moved through your account.' },
      { type: 'callout', text: 'Business owners using business accounts should note that lenders typically apply an expense ratio — often 50% — to account for overhead before calculating qualifying income. Using personal statements avoids this adjustment.' },
      { type: 'heading', text: 'Who Qualifies?' },
      { type: 'list', items: [
        'Freelancers and independent contractors',
        'Business owners and entrepreneurs',
        'Consultants and self-employed professionals',
        'Gig economy workers with variable income',
        'Real estate professionals and commission-based earners',
      ]},
      { type: 'heading', text: 'P&L and VOE as Alternatives' },
      { type: 'paragraph', text: 'If bank statements don\'t clearly present your income, a CPA-prepared Profit & Loss statement may be used instead. Some programs also accept a Verification of Employment letter for W-2 employees receiving significant supplemental income. These options give self-employed borrowers meaningful flexibility without requiring a conventional paper trail.' },
      { type: 'quote', text: 'Many of my clients have excellent cash flow and financial discipline — their tax returns simply don\'t reflect it. That\'s exactly why these programs exist.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'buying-before-selling',
    title: 'How to Buy a Home Before Selling Your Current One',
    excerpt: 'You don\'t have to sell before you can buy. Bridge financing and strategic planning can make the transition seamless in any market.',
    categories: ['Hard Money', 'Conventional'],
    gradient: 'linear-gradient(135deg, #d4c8be 0%, #C4A49E 100%)',
    image: '/images/resources-4.png',
    readTime: '7 min read',
    date: 'April 30, 2025',
    featured: true,
    relatedSlugs: ['heloc-vs-cash-out-refinance', 'jumbo-loan-requirements', 'fha-vs-conventional'],
    faqs: [
      {
        question: 'What is a bridge loan?',
        answer: 'A bridge loan is short-term financing that allows you to access equity from your current home to fund the purchase of a new one, before your existing home sells.',
      },
      {
        question: 'How long does a bridge loan last?',
        answer: 'Most bridge loans have terms of 6 to 12 months. They\'re designed to be repaid when your current home sells.',
      },
      {
        question: 'Is bridge financing expensive?',
        answer: 'Bridge loans carry higher interest rates than conventional financing. However, that cost must be weighed against the advantage of making a competitive, non-contingent offer in a market where timing matters.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'In a competitive market, the ability to make a clean, non-contingent offer can be the difference between securing the right home and losing it to another buyer. But most homeowners don\'t have the liquidity to fund a new purchase before their current property sells. Bridge financing exists precisely for this situation.' },
      { type: 'heading', text: 'What Is a Bridge Loan?' },
      { type: 'paragraph', text: 'A bridge loan is short-term financing that uses the equity in your current home as collateral to fund the purchase of your next home. It bridges the gap between your sale and your purchase, giving you the capital to act without waiting.' },
      { type: 'heading', text: 'Strategies for Buying Before Selling' },
      { type: 'list', items: [
        'Use a bridge loan to tap existing equity and fund your down payment',
        'Request a delayed closing on your new purchase to allow time for your sale',
        'Leverage a HELOC on your current home if available credit exists',
        'Negotiate a rent-back agreement to stay in your current home post-sale',
        'Work with your lender to qualify for both mortgages simultaneously if income supports it',
      ]},
      { type: 'callout', text: 'A non-contingent offer is significantly more competitive in most markets. Bridge financing can be the difference between being a serious contender and losing a property you\'ve already identified as the right one.' },
      { type: 'heading', text: 'What to Consider Before Proceeding' },
      { type: 'paragraph', text: 'Bridge loans carry higher rates and fees than conventional financing. Before proceeding, consider your carrying costs, how quickly homes are selling in your current market, and whether your lender can qualify you for both mortgages simultaneously without the bridge. In strong markets, homes often sell quickly — which reduces the time you\'d carry two properties.' },
      { type: 'quote', text: 'The fear of being stuck with two mortgages often stops buyers from acting on the right opportunity. With the right plan, that window is usually shorter than people expect.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'reverse-mortgage-myths',
    title: 'Reverse Mortgage Myths — and the Reality Behind Them',
    excerpt: 'Misconceptions about reverse mortgages are widespread. Here\'s an honest look at how they actually work and who they\'re designed for.',
    categories: ['Reverse'],
    gradient: 'linear-gradient(135deg, #c4c0ba 0%, #8a8478 100%)',
    readTime: '6 min read',
    date: 'April 15, 2025',
    featured: false,
    relatedSlugs: ['heloc-vs-cash-out-refinance', 'buying-before-selling', 'fha-vs-conventional'],
    faqs: [
      {
        question: 'Does the bank own my home with a reverse mortgage?',
        answer: 'No. You retain ownership of your home throughout the life of the loan. The lender holds a lien, as with any mortgage, but you remain on title.',
      },
      {
        question: 'What happens to the loan when I pass away?',
        answer: 'Your heirs can repay the loan balance — typically by selling the home or refinancing — and keep any remaining equity. They are not personally liable for amounts that exceed the home\'s value.',
      },
      {
        question: 'Can I still leave my home to my children?',
        answer: 'Yes. If your heirs choose to repay the loan balance, they can retain the home. The reverse mortgage does not prevent inheritance — it simply means the balance must be settled first.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'Reverse mortgages — formally known as Home Equity Conversion Mortgages (HECMs) — have been misunderstood for decades. For the right borrower, they can be a transformative retirement planning tool. Understanding the reality is the first step toward making an informed decision.' },
      { type: 'heading', text: 'Myth 1: The Bank Takes Your Home' },
      { type: 'paragraph', text: 'This is the most pervasive misconception. With a reverse mortgage, you retain full ownership of your home. The lender places a lien on the property, as with any mortgage, but you remain on title. The loan becomes due when you sell, move out permanently, or pass away — not before.' },
      { type: 'heading', text: 'Myth 2: You Can Owe More Than Your Home Is Worth' },
      { type: 'paragraph', text: 'HECMs are non-recourse loans. If the loan balance ever exceeds your home\'s value, neither you nor your heirs are responsible for the difference. The FHA insurance fund covers that shortfall — a meaningful consumer protection built into the program.' },
      { type: 'callout', text: 'HECMs are insured by the FHA and require independent counseling before closing. These protections were built specifically to ensure borrowers understand what they\'re signing.' },
      { type: 'heading', text: 'Who Are Reverse Mortgages Right For?' },
      { type: 'list', items: [
        'Homeowners age 62 and older with substantial equity',
        'Those who plan to remain in their home long-term',
        'Retirees looking to supplement fixed income without selling assets',
        'Borrowers seeking to eliminate a required monthly mortgage payment',
        'Those who want to fund healthcare or improvements without depleting savings',
      ]},
      { type: 'quote', text: 'A reverse mortgage isn\'t a last resort — it\'s a planning tool. Used strategically, it can meaningfully extend the longevity of a retirement portfolio.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'fha-vs-conventional',
    title: 'FHA vs. Conventional: Which Loan Is Right for You?',
    excerpt: 'FHA and conventional loans each have distinct advantages. Your credit profile, down payment, and long-term goals determine which fits best.',
    categories: ['FHA', 'Conventional'],
    gradient: 'linear-gradient(135deg, #c4ccaa 0%, #A8B08E 100%)',
    readTime: '5 min read',
    date: 'March 30, 2025',
    featured: false,
    relatedSlugs: ['va-loan-benefits', 'jumbo-loan-requirements', 'buying-before-selling'],
    faqs: [
      {
        question: 'What is the minimum down payment for an FHA loan?',
        answer: 'FHA loans allow a down payment as low as 3.5% for borrowers with a credit score of 580 or higher. Borrowers with scores between 500–579 may qualify with a 10% down payment.',
      },
      {
        question: 'Can I use an FHA loan for an investment property?',
        answer: 'No. FHA loans are for primary residences only. For investment properties, consider conventional, DSCR, or other non-QM programs.',
      },
      {
        question: 'When can I remove mortgage insurance on a conventional loan?',
        answer: 'Conventional PMI can be removed once you reach 20% equity through appreciation or principal paydown. FHA MIP, by contrast, typically lasts the life of the loan if your down payment was less than 10%.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'For many homebuyers, the choice between FHA and conventional financing comes down to credit score, down payment, and long-term cost. Neither is universally superior — each serves a distinct borrower profile.' },
      { type: 'heading', text: 'FHA Loans: Greater Accessibility' },
      { type: 'paragraph', text: 'FHA loans are backed by the Federal Housing Administration and designed to broaden homeownership access. They allow credit scores as low as 580 with a 3.5% down payment, and qualifying guidelines are generally more flexible for borrowers with higher debt-to-income ratios or recent credit challenges.' },
      { type: 'heading', text: 'Conventional Loans: More Flexibility Over Time' },
      { type: 'paragraph', text: 'Conventional loans are not government-backed, and they typically require a stronger credit profile. However, they offer significant advantages: no upfront mortgage insurance premium, lower total insurance costs for well-qualified borrowers, and the ability to finance second homes and investment properties.' },
      { type: 'callout', text: 'FHA MIP is required for the life of the loan if your down payment is below 10%. Conventional PMI drops off once you reach 20% equity — an important long-term cost consideration.' },
      { type: 'heading', text: 'Key Comparison Points' },
      { type: 'list', items: [
        'Minimum credit score: FHA 580 (3.5% down) vs. Conventional 620+',
        'Down payment: FHA 3.5% minimum vs. Conventional 3–5% minimum',
        'Mortgage insurance: FHA MIP (life of loan if <10% down) vs. Conventional PMI (removable at 20% equity)',
        'Property types: FHA primary residences only vs. Conventional primary, second home, investment',
        'Upfront MIP: FHA charges 1.75% upfront; conventional has no equivalent',
      ]},
      { type: 'quote', text: 'The right program is the one that gets you into the home you want while minimizing long-term cost. That calculation is different for every borrower.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'va-loan-benefits',
    title: 'VA Loan Benefits: What Every Eligible Borrower Should Know',
    excerpt: 'VA loans offer some of the most favorable terms available in residential lending. Here\'s what eligible service members and veterans should understand.',
    categories: ['VA'],
    gradient: 'linear-gradient(135deg, #bcc8c4 0%, #6a8a86 100%)',
    readTime: '5 min read',
    date: 'March 15, 2025',
    featured: false,
    relatedSlugs: ['fha-vs-conventional', 'jumbo-loan-requirements', 'buying-before-selling'],
    faqs: [
      {
        question: 'Can I use a VA loan more than once?',
        answer: 'Yes. VA loan benefits can be used multiple times, as long as you have remaining entitlement or restore your entitlement after repaying a previous VA loan.',
      },
      {
        question: 'Is there a VA loan limit?',
        answer: 'As of 2020, VA loan limits were eliminated for borrowers with full entitlement. Borrowers with reduced entitlement may still have limits tied to conforming loan amounts in their county.',
      },
      {
        question: 'Do I need a down payment for a VA loan?',
        answer: 'In most cases, eligible borrowers can purchase with no down payment. This is one of the most significant advantages of VA financing and sets it apart from virtually every other loan type.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'The VA loan program was established in 1944 as part of the GI Bill, and it remains one of the most powerful mortgage benefits available to eligible service members, veterans, and surviving spouses. Despite its advantages, VA financing is consistently underutilized — often because borrowers are unaware of what the program truly offers.' },
      { type: 'heading', text: 'No Down Payment Required' },
      { type: 'paragraph', text: 'Perhaps the most significant advantage of a VA loan is the ability to purchase a home with no down payment. This benefit alone can allow a veteran to move from renting to homeownership without years of saving, freeing capital for other financial priorities.' },
      { type: 'heading', text: 'No Private Mortgage Insurance' },
      { type: 'paragraph', text: 'Unlike FHA and conventional loans with less than 20% down, VA loans do not require private mortgage insurance. This can represent hundreds of dollars in monthly savings — compounded over the life of the loan.' },
      { type: 'callout', text: 'VA loans do have a funding fee — a one-time charge that can be financed into the loan. Certain borrowers, including those with service-connected disabilities, may be exempt from this fee entirely.' },
      { type: 'heading', text: 'Additional Benefits Worth Knowing' },
      { type: 'list', items: [
        'Competitive interest rates — often lower than conventional alternatives',
        'No prepayment penalties',
        'Flexible credit and debt-to-income guidelines',
        'Assumable loans — a future buyer can take over your VA loan, which can be valuable in a rising rate environment',
        'No loan limits for borrowers with full entitlement',
      ]},
      { type: 'quote', text: 'The VA loan is one of the most underused benefits available to those who\'ve served. If you\'re eligible and not using it, it\'s worth understanding exactly what you\'re leaving on the table.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
  {
    slug: 'jumbo-loan-requirements',
    title: 'Jumbo Loan Requirements: What to Expect',
    excerpt: 'Jumbo loans exceed conventional lending limits and require a stronger qualifying profile. Here\'s what lenders look for and how to prepare.',
    categories: ['Jumbo'],
    gradient: 'linear-gradient(135deg, #d4c8be 0%, #b0a29a 100%)',
    readTime: '5 min read',
    date: 'February 28, 2025',
    featured: false,
    relatedSlugs: ['fha-vs-conventional', 'bank-statement-loans', 'dscr-loans-explained'],
    faqs: [
      {
        question: 'What is the jumbo loan threshold in 2025?',
        answer: 'In most U.S. counties, jumbo loans begin above $766,550 for a single-family home. High-cost areas have higher conforming limits. Loan amounts above these thresholds require non-conforming financing.',
      },
      {
        question: 'Can I get a jumbo loan with less than 20% down?',
        answer: 'Some jumbo programs allow down payments as low as 10%, though they typically require strong credit and may carry higher rates or require mortgage insurance.',
      },
      {
        question: 'Are jumbo loan rates higher than conforming rates?',
        answer: 'Historically, jumbo rates were higher than conforming rates. In recent years, the gap has narrowed significantly — and jumbo rates are sometimes competitive with or lower than conforming rates, depending on the lender and borrower profile.',
      },
    ],
    body: [
      { type: 'paragraph', text: 'When a loan amount exceeds the conforming limit set by the Federal Housing Finance Agency, it enters jumbo territory. Because these loans cannot be sold to Fannie Mae or Freddie Mac, lenders carry the risk themselves — which typically translates to more rigorous qualification requirements.' },
      { type: 'heading', text: 'Credit Score Requirements' },
      { type: 'paragraph', text: 'Most jumbo lenders require a credit score of at least 700, with many preferring 720 or higher. The higher your score, the more competitive the pricing you\'re likely to receive. Some lenders tier their rates based on specific score bands, so the difference between 719 and 720 can be meaningful.' },
      { type: 'heading', text: 'Down Payment and Reserves' },
      { type: 'paragraph', text: 'While some jumbo programs allow 10–15% down, most lenders prefer 20% or more. Beyond the down payment, jumbo lenders often require substantial cash reserves — typically 6 to 12 months of principal, interest, taxes, and insurance — held in verifiable accounts.' },
      { type: 'callout', text: 'Reserves matter significantly in jumbo underwriting. Having 12 or more months of PITIA in reserve can meaningfully improve your rate, your approval odds, and the overall underwriting experience.' },
      { type: 'heading', text: 'Debt-to-Income Ratio' },
      { type: 'paragraph', text: 'Conforming loan guidelines allow DTI ratios up to 50% in some cases. Jumbo lenders are generally stricter, preferring a DTI of 43% or below. Some will go higher with significant reserves and a well-rounded financial profile.' },
      { type: 'heading', text: 'Documentation' },
      { type: 'paragraph', text: 'Most jumbo programs require full income documentation — two years of tax returns, W-2s, and 30 days of pay stubs for W-2 earners. For high-income self-employed borrowers, some lenders offer jumbo bank statement programs that bypass traditional income documentation requirements.' },
      { type: 'quote', text: 'Jumbo buyers often have complex financial profiles. Taking time to position your application thoughtfully can make a meaningful difference in both approval odds and final pricing.', attribution: 'Jennifer Ko, Founder of Koast Capital' },
    ],
  },
]

export default articles

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as Article[]
}
