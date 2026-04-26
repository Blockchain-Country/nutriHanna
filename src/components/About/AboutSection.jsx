import Section from '@components/layout/Section/Section'
import Container from '@components/layout/Container/Container'
import Badge from '@components/ui/Badge/Badge'
import Button from '@components/ui/Button/Button'
import { scrollToSection } from '@utils/helpers'
import './AboutSection.css'

const CREDENTIALS = [
  'Диплом нутрициолога — Европейский институт питания',
  'Сертификат клинической нутрициологии',
  'Курс функциональной медицины — IFM',
  'Специализация: метаболические нарушения',
]

const AboutSection = ({ onBookingOpen }) => (
  <Section id="about" background="white" className="about">
    <Container>
      <div className="about__inner">

        <div className="about__image-col">
          <div className="about__image-wrap">
            <div className="about__photo-placeholder" aria-label="Фото Ханны">
              <div className="about__photo-initials">ХН</div>
            </div>
            <div className="about__accent-block" aria-hidden="true">
              <span className="about__accent-number">500+</span>
              <span className="about__accent-text">изменённых жизней</span>
            </div>
          </div>
        </div>

        <div className="about__content">
          <span className="overline">Обо мне</span>
          <h2 className="section-title about__title">
            Привет, я Ханна —<br />
            <em>нутрициолог с душой</em>
          </h2>
          <p className="about__text">
            Я помогаю людям выстраивать здоровые отношения с едой и телом.
            Мой путь начался с личного опыта: несколько лет я сама страдала
            от нарушений пищевого поведения, пока не нашла научный подход
            к питанию.
          </p>
          <p className="about__text">
            Сегодня я работаю с клиентами по всему миру и верю: правильное
            питание — это не ограничения, а свобода. Свобода от усталости,
            лишнего веса и постоянной тревоги о том, что съесть.
          </p>

          <div className="about__credentials">
            <h3 className="about__credentials-title">Образование и сертификаты</h3>
            <ul className="about__credentials-list">
              {CREDENTIALS.map(item => (
                <li key={item} className="about__credentials-item">
                  <span className="about__credentials-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={onBookingOpen}>
            Записаться на консультацию
          </Button>
        </div>

      </div>
    </Container>
  </Section>
)

export default AboutSection
