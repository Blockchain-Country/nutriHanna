import './TestimonialCard.css'

const Stars = ({ count }) => (
  <div className="stars" aria-label={`Оценка: ${count} из 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`stars__star${i < count ? ' stars__star--filled' : ''}`}
        width="14" height="14" viewBox="0 0 14 14" fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 1.5l1.55 3.14 3.46.5-2.5 2.44.59 3.44L7 9.27l-3.1 1.65.59-3.44L2 5.14l3.46-.5L7 1.5z"
          fill="currentColor"
        />
      </svg>
    ))}
  </div>
)

const TestimonialCard = ({ testimonial }) => {
  const { name, role, rating, text, initials } = testimonial

  return (
    <article className="testimonial-card">
      <Stars count={rating} />
      <blockquote className="testimonial-card__text">"{text}"</blockquote>
      <footer className="testimonial-card__author">
        <div className="testimonial-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </footer>
    </article>
  )
}

export default TestimonialCard
