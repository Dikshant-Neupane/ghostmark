export function sanitizeText(input: string, maxLength: number): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const cleaned = email.trim().toLowerCase().slice(0, 120)
  if (!emailRegex.test(cleaned)) return ''
  return cleaned
}
