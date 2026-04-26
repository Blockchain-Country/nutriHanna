import Section from '@components/layout/Section/Section'
import Container from '@components/layout/Container/Container'
import { BENEFITS } from './benefits.data'
import './BenefitsSection.css'

const BenefitsSection = () => (
  <Section id="benefits" background="green" className="benefits">
    <Container>
      <div className="benefits__header">
        <span className="overline">Почему я</span>
        <h2 className="section-title">Что делает мой подход<br /><em>особенным</em></h2>
      </div>

      <div className="benefits__grid">
        {BENEFITS.map(({ icon, title, description }) => (
          <div key={title} className="benefits__card">
            <div className="benefits__icon" aria-hidden="true">{icon}</div>
            <h3 className="benefits__title">{title}</h3>
            <p className="benefits__desc">{description}</p>
          </div>
        ))}
      </div>
    </Container>
  </Section>
)

export default BenefitsSection
