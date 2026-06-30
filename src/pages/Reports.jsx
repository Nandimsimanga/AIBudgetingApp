import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useBudget } from '../hooks/useBudget'
import { formatCurrency, formatMonthYear } from '../utils/format'
import {
  getMonthlyExpenses,
  sumByCategory,
  getTopCategory,
  getMonthlyTotals,
} from '../utils/finance'
import { generateSpendingInsights } from '../utils/ai'
import { ICON_SM } from '../constants/iconProps'
import ExpensePieChart from '../components/ExpensePieChart'
import SpendingLineChart from '../components/SpendingLineChart'

export default function Reports() {
  const { expenses, income, goals } = useBudget()
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)

  const monthly = getMonthlyExpenses(expenses)
  const totalExpenses = monthly.reduce((s, e) => s + e.amount, 0)
  const savings = income - totalExpenses
  const categoryTotals = sumByCategory(monthly)
  const top = getTopCategory(categoryTotals)
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  const lineData = getMonthlyTotals(expenses)

  const handleAnalyze = () => {
    setLoading(true)
    const prevDate = new Date()
    prevDate.setMonth(prevDate.getMonth() - 1)
    const prevMonth = getMonthlyExpenses(expenses, prevDate)

    setTimeout(() => {
      const result = generateSpendingInsights(expenses, income, goals, prevMonth)
      setInsights(result)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">Financial overview</p>
          <h1>Reports</h1>
        </div>
        <span className="month-badge">{formatMonthYear()}</span>
      </header>

      <div className="report-card">
        <h2>{formatMonthYear()} Report</h2>
        <div className="report-row">
          <span>Income</span>
          <strong>{formatCurrency(income)}</strong>
        </div>
        <div className="report-row">
          <span>Expenses</span>
          <strong className="text-danger">{formatCurrency(totalExpenses)}</strong>
        </div>
        <div className="report-row">
          <span>Savings</span>
          <strong className="text-success">{formatCurrency(savings)}</strong>
        </div>
        {top && (
          <div className="report-highlight">
            <span>Top Spending Category</span>
            <strong>{top[0]} ({formatCurrency(top[1])})</strong>
          </div>
        )}
      </div>

      <section className="section">
        <h2>Category Breakdown</h2>
        <ExpensePieChart data={pieData} />
      </section>

      <section className="section">
        <h2>Spending Over Time</h2>
        <SpendingLineChart data={lineData} />
      </section>

      <section className="section">
        <h2>AI Spending Insights</h2>
        <button
          type="button"
          className="btn-primary btn-full btn-with-icon"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : (
            <>
              <Sparkles {...ICON_SM} aria-hidden="true" />
              Analyze My Spending
            </>
          )}
        </button>
        {insights && (
          <div className="ai-insights">
            {insights.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
