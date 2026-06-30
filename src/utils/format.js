export function formatCurrency(amount) {
  return `R${Number(amount).toLocaleString('en-ZA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatMonthYear(date = new Date()) {
  return date.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })
}

export function monthKey(timestamp) {
  const d = new Date(timestamp)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
