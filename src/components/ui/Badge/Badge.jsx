import { cn } from '@utils/helpers'
import './Badge.css'

const Badge = ({
  variant   = 'primary',
  size      = 'md',
  className = '',
  children,
  ...props
}) => (
  <span
    className={cn('badge', `badge--${variant}`, `badge--${size}`, className)}
    {...props}
  >
    {children}
  </span>
)

export default Badge
