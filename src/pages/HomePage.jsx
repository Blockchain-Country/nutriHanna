import useModal from '@hooks/useModal'
import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import HeroSection from '@components/Hero/HeroSection'
import AboutSection from '@components/About/AboutSection'
import ProcessSection from '@components/Process/ProcessSection'
import ServicesSection from '@components/Services/ServicesSection'
import BenefitsSection from '@components/Benefits/BenefitsSection'
import TestimonialsSection from '@components/Testimonials/TestimonialsSection'
import FAQSection from '@components/FAQ/FAQSection'
import ContactSection from '@components/Contact/ContactSection'
import BookingModal from '@components/Booking/BookingModal'
import './HomePage.css'

const HomePage = () => {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Header onBookingOpen={open} />

      <main className="home" id="main-content">
        <HeroSection     onBookingOpen={open} />
        <AboutSection    onBookingOpen={open} />
        <ProcessSection  />
        <ServicesSection onBookingOpen={open} />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />

      <BookingModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default HomePage
