export const cn = (...classes) =>
  classes.filter(Boolean).join(' ')

export const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const headerOffset = 72
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: 'smooth' })
}
