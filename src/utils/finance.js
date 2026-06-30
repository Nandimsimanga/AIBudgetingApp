import { monthKey } from './format'

export function getMonthlyExpenses(expenses, date = new Date()) {
  const key = monthKey(date.getTime())
  return expenses.filter((e) => monthKey(e.date) === key)
}

export function sumByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})
}

export function getTopCategory(categoryTotals) {
  const entries = Object.entries(categoryTotals)
  if (!entries.length) return null
  return entries.sort((a, b) => b[1] - a[1])[0]
}

export function getMonthlyTotals(expenses, months = 6) {
  const result = []
  const now = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = monthKey(d.getTime())
    const total = expenses
      .filter((e) => monthKey(e.date) === key)
      .reduce((sum, e) => sum + e.amount, 0)
    result.push({
      month: d.toLocaleDateString('en-ZA', { month: 'short' }),
      total,
    })
  }
  return result
}

export function getGoalProgress(goal) {
  if (!goal.targetAmount) return 0
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
}
