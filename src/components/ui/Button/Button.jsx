import { cn } from '@utils/helpers'
import './Button.css'

const Button = ({
  variant   = 'primary',
  size      = 'md',
  fullWidth = false,
  loading   = false,
  disabled  = false,
  iconLeft,
  iconRight,
  href,
  className = '',
  children,
  ...props
}) => {
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      disabled={!href && (disabled || loading)}
      aria-disabled={disabled || loading}
      className={cn(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth  && 'btn--full',
        loading    && 'btn--loading',
        disabled   && 'btn--disabled',
        className
      )}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && iconLeft  && <span className="btn__icon">{iconLeft}</span>}
      <span className="btn__label">{children}</span>
      {!loading && iconRight && <span className="btn__icon">{iconRight}</span>}
    </Tag>
  )
}

export default Button
