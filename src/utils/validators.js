export const required = (value) =>
  !value?.toString().trim() ? 'Это поле обязательно' : null

export const email = (value) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.trim() ?? '')
    ? 'Введите корректный email'
    : null

export const phone = (value) =>
  !/^[\+]?[0-9\s\-\(\)]{7,15}$/.test(value?.trim() ?? '')
    ? 'Введите корректный номер телефона'
    : null

export const minLength = (min) => (value) =>
  (value?.length ?? 0) < min ? `Минимум ${min} символов` : null

export const maxLength = (max) => (value) =>
  (value?.length ?? 0) > max ? `Максимум ${max} символов` : null

export const composeValidators = (...fns) => (value, allValues) => {
  for (const fn of fns) {
    const error = fn(value, allValues)
    if (error) return error
  }
  return null
}
