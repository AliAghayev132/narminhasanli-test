import { format } from 'date-fns'

/** Formats a numeric price in AZN, e.g. 240 -> "240 ₼". */
export function formatPrice(price) {
  if (price === undefined || price === null) return ''
  return `${price} ₼`
}

const AZ_MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'İyun',
  'İyul',
  'Avqust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
]

/** Formats a date as "12 İyun 2026" (Azerbaijani month names). */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return `${format(d, 'd')} ${AZ_MONTHS[d.getMonth()]} ${format(d, 'yyyy')}`
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/** Converts a 1-based index to a roman numeral (1 -> "I", 2 -> "II", ...). */
export function toRoman(n) {
  return ROMAN_NUMERALS[n - 1] || String(n)
}
