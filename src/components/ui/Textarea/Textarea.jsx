import { cn } from '@utils/helpers'
import './Textarea.css'

const Textarea = ({
  label,
  name,
  value,
  placeholder,
  error,
  hint,
  rows      = 4,
  required  = false,
  disabled  = false,
  className = '',
  onChange,
  onBlur,
  ...props
}) => {
  const id = `textarea-${name}`

  return (
    <div className={cn('textarea-field', error && 'textarea-field--error', disabled && 'textarea-field--disabled', className)}>
      {label && (
        <label htmlFor={id} className="textarea-field__label">
          {label}
          {required && <span className="textarea-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="textarea-field__input"
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && <span id={`${id}-error`} className="textarea-field__error" role="alert">{error}</span>}
      {!error && hint && <span id={`${id}-hint`} className="textarea-field__hint">{hint}</span>}
    </div>
  )
}

export default Textarea
