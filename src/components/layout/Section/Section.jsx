import useScrollReveal from '@hooks/useScrollReveal'
import { cn } from '@utils/helpers'
import './Section.css'

const Section = ({
  id,
  background = 'default',
  reveal     = true,
  revealDir  = '',
  className  = '',
  children,
  ...props
}) => {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'section',
        `section--bg-${background}`,
        reveal  && 'reveal',
        revealDir && `reveal--${revealDir}`,
        reveal && isVisible && 'reveal--visible',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export default Section
