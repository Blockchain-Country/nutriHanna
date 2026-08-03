import { useEffect, useRef, useState } from 'react'
import Button from '@components/ui/Button/Button'
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
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const checkClamped = () => {
      if (expanded) return
      setIsClamped(el.scrollHeight > el.clientHeight + 1)
    }

    checkClamped()

    const resizeObserver = new ResizeObserver(checkClamped)
    resizeObserver.observe(el)
    return () => resizeObserver.disconnect()
  }, [expanded])

  return (
    <article className="testimonial-card">
      <Stars count={rating} />
      <div className="testimonial-card__text-wrap">
        <blockquote
          ref={textRef}
          className={`testimonial-card__text${expanded ? ' testimonial-card__text--expanded' : ''}`}
        >
          "{text}"
        </blockquote>
      </div>
      <div className="testimonial-card__toggle-slot">
        {isClamped && (
          <Button
            type="button"
            variant="text"
            size="sm"
            className="testimonial-card__toggle"
            onClick={() => setExpanded(value => !value)}
            aria-expanded={expanded}
          >
            {expanded ? 'Свернуть' : 'Читать полностью'}
          </Button>
        )}
      </div>
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
