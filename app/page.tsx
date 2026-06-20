import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import FundedLoans from '@/components/FundedLoans'
import LoanPrograms from '@/components/LoanPrograms'
import ClientReviews from '@/components/ClientReviews'
import BookConsultation from '@/components/BookConsultation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutMe />
      <FundedLoans />
      <LoanPrograms />
      <ClientReviews />
      <BookConsultation />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
