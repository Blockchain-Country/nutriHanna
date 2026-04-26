import Section from '@components/layout/Section/Section'
import Container from '@components/layout/Container/Container'
import { PROCESS_STEPS } from './process.data'
import './ProcessSection.css'

const ProcessSection = () => (
  <Section id="process" background="warm" className="process">
    <Container>
      <div className="process__header">
        <span className="overline">Как я работаю</span>
        <h2 className="section-title">Путь к результату<br /><em>в четыре шага</em></h2>
        <p className="section-subtitle process__subtitle">
          Понятный процесс без лишней сложности. Каждый шаг направлен на
          то, чтобы вы чувствовали поддержку и двигались к цели уверенно.
        </p>
      </div>

      <div className="process__steps stagger" data-stagger>
        {PROCESS_STEPS.map(({ step, title, description, duration }) => (
          <div key={step} className="process__step">
            <div className="process__step-number" aria-hidden="true">{step}</div>
            <div className="process__step-body">
              <div className="process__step-meta">
                <span className="process__step-duration">{duration}</span>
              </div>
              <h3 className="process__step-title">{title}</h3>
              <p className="process__step-desc">{description}</p>
            </div>
            <div className="process__step-connector" aria-hidden="true" />
          </div>
        ))}
      </div>
    </Container>
  </Section>
)

export default ProcessSection
