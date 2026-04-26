import { cn } from '@utils/helpers'
import './Card.css'

const Card = ({
  variant   = 'default',
  padding   = 'md',
  hover     = false,
  className = '',
  children,
  ...props
}) => (
  <div
    className={cn(
      'card',
      `card--${variant}`,
      `card--pad-${padding}`,
      hover && 'card--hover',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export default Card
