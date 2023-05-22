export const inn = (value: string): boolean => {
  return /^[\d+]{10}$/.test(value) || /^[\d+]{12}$/.test(value)
}

/**
 * Check if value contains at least six characters
 * only letters, numbers, special characters
 */
export const password = (value: string): boolean => {
  const regex = /^[\w!"#$%&'()*+,./:;<=>?@^`{}~-]{6,}$/
  return regex.test(value)
}
