/**
 * Apply format to the phone number
 * @param phone - phone number
 * @returns
 * Formatted phone if input is correct; undefined otherwise
 * @example
 * formatPhone('+79044979272') => '+7 904 497-92-72'
 * formatPhone('89044979272') => undefined
 * formatPhone('79044979272') => undefined
 * formatPhone('+7904492') => undefined
 */
const formatPhone = (phone: string): string | undefined => {
  const match = phone.match(/^(\+7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
  return match
    ? `+7 ${match[2]} ${match[3]}-${match[4]}-${match[5]}`
    : undefined
}

export { formatPhone }
