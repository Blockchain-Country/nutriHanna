import { cn } from '@utils/helpers'
import './Input.css'

const Input = ({
  label,
  name,
  type      = 'text',
  value,
  placeholder,
  error,
  hint,
  required  = false,
  disabled  = false,
  className = '',
  onChange,
  onBlur,
  ...props
}) => {
  const id = `input-${name}`

  return (
    <div className={cn('input-field', error && 'input-field--error', disabled && 'input-field--disabled', className)}>
      {label && (
        <label htmlFor={id} className="input-field__label">
          {label}
          {required && <span className="input-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="input-field__input"
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && <span id={`${id}-error`} className="input-field__error" role="alert">{error}</span>}
      {!error && hint && <span id={`${id}-hint`} className="input-field__hint">{hint}</span>}
    </div>
  )
}

export default Input
