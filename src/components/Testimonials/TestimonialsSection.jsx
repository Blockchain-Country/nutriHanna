import Section from '@components/layout/Section/Section'
import Container from '@components/layout/Container/Container'
import TestimonialCard from './TestimonialCard'
import { TESTIMONIALS } from './testimonials.data'
import './TestimonialsSection.css'

const TestimonialsSection = () => (
  <Section id="testimonials" background="warm" className="testimonials">
    <Container>
      <div className="testimonials__header">
        <span className="overline">Отзывы</span>
        <h2 className="section-title">Истории тех,<br /><em>кто уже изменил жизнь</em></h2>
        <p className="section-subtitle testimonials__subtitle">
          Реальные результаты реальных людей. Каждая история — это труд,
          доверие и правильные решения.
        </p>
      </div>

      <div className="testimonials__grid">
        {TESTIMONIALS.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Container>
  </Section>
)

export default TestimonialsSection
