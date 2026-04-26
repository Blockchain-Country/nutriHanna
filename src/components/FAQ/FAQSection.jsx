import Section from '@components/layout/Section/Section'
import Container from '@components/layout/Container/Container'
import FAQItem from './FAQItem'
import { FAQ_ITEMS } from './faq.data'
import './FAQSection.css'

const FAQSection = () => (
  <Section id="faq" background="white" className="faq">
    <Container size="narrow">
      <div className="faq__header">
        <span className="overline">FAQ</span>
        <h2 className="section-title">Часто задаваемые<br /><em>вопросы</em></h2>
        <p className="section-subtitle">
          Не нашли ответа? Напишите мне — отвечу лично.
        </p>
      </div>

      <div className="faq__list" role="list">
        {FAQ_ITEMS.map(item => (
          <FAQItem key={item.id} {...item} />
        ))}
      </div>
    </Container>
  </Section>
)

export default FAQSection
