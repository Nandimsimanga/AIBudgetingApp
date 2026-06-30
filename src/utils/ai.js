import { formatCurrency } from './format'
import { getMonthlyExpenses, sumByCategory, getTopCategory } from './finance'

const CATEGORY_KEYWORDS = {
  Food: ['mcdonald', 'kfc', 'starbucks', 'coffee', 'restaurant', 'uber eats', 'checkers', 'pick n pay', 'woolworths food'],
  Transport: ['uber', 'bolt', 'taxi', 'petrol', 'shell', 'engen', 'gautrain'],
  Entertainment: ['steam', 'netflix', 'spotify', 'cinema', 'game', 'playstation', 'xbox'],
  Bills: ['electricity', 'water', 'rent', 'dstv', 'vodacom', 'mtn', 'telkom', 'internet'],
  Shopping: ['takealot', 'amazon', 'clothing', 'mr price', 'h&m', 'zara'],
  Health: ['pharmacy', 'clicks', 'dis-chem', 'gym', 'doctor', 'hospital'],
  Savings: ['savings', 'investment', 'deposit'],
}

export function categorizeExpense(title) {
  const lower = title.toLowerCase()
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return category
  }
  return 'Other'
}

export function generateSpendingInsights(expenses, income, goals, previousMonthExpenses) {
  const current = getMonthlyExpenses(expenses)
  const totals = sumByCategory(current)
  const top = getTopCategory(totals)
  const insights = []

  if (top && income > 0) {
    const pct = Math.round((top[1] / income) * 100)
    insights.push(`You spent ${pct}% of your budget on ${top[0].toLowerCase()}.`)
  }

  if (previousMonthExpenses.length) {
    const prevTotals = sumByCategory(previousMonthExpenses)
    for (const [cat, amount] of Object.entries(totals)) {
      const prev = prevTotals[cat] || 0
      if (prev > 0 && amount > prev) {
        const increase = Math.round(((amount - prev) / prev) * 100)
        if (increase >= 10) {
          insights.push(
            `${cat} spending increased by ${increase}% compared to last month.`,
          )
        }
      }
    }
  }

  const entertainment = totals.Entertainment || 0
  if (entertainment > 0 && goals.length) {
    insights.push(
      `Consider reducing entertainment expenses by ${formatCurrency(500)} to reach your savings goals sooner.`,
    )
  }

  if (!insights.length) {
    insights.push('Your spending looks balanced this month. Keep tracking expenses to build better habits.')
  }

  return insights.join('\n')
}

export function generateChatResponse(message, { expenses, income, goals }) {
  const lower = message.toLowerCase()
  const monthly = getMonthlyExpenses(expenses)
  const totalSpent = monthly.reduce((s, e) => s + e.amount, 0)
  const avgSavings = income - totalSpent

  if (lower.includes('ps5') || lower.includes('afford')) {
    const price = 12000
    const months = avgSavings > 0 ? Math.ceil(price / avgSavings) : null
    if (months) {
      return `Based on your average monthly savings of ${formatCurrency(avgSavings)}, you could afford a PS5 in approximately ${months} month${months > 1 ? 's' : ''} without affecting your emergency fund.`
    }
    return `Your current monthly expenses exceed or match your income. I'd recommend reducing discretionary spending before making a large purchase like a PS5.`
  }

  if (lower.includes('save') || lower.includes('goal')) {
    if (!goals.length) {
      return 'You haven\'t set any savings goals yet. Head to the Goals tab to create one!'
    }
    const next = goals.find((g) => g.currentAmount < g.targetAmount)
    if (next) {
      const remaining = next.targetAmount - next.currentAmount
      return `Your next goal is "${next.name}". You need ${formatCurrency(remaining)} more to reach your target of ${formatCurrency(next.targetAmount)}.`
    }
    return 'Congratulations! You\'ve reached all your savings goals.'
  }

  if (lower.includes('spend') || lower.includes('expense')) {
    const totals = sumByCategory(monthly)
    const top = getTopCategory(totals)
    if (top) {
      return `This month you've spent ${formatCurrency(totalSpent)} total. Your top category is ${top[0]} at ${formatCurrency(top[1])}.`
    }
    return 'No expenses recorded this month yet. Start tracking to get personalized insights!'
  }

  return `I'm your AI budget assistant. Ask me things like "Can I afford a PS5 next month?" or "How much did I spend on food?" Based on your data, you've spent ${formatCurrency(totalSpent)} this month with ${formatCurrency(Math.max(0, avgSavings))} in savings.`
}
