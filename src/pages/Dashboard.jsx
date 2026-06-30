import { useBudget } from '../hooks/useBudget'
import { formatCurrency, formatDate, formatMonthYear } from '../utils/format'
import { getMonthlyExpenses, sumByCategory } from '../utils/finance'
import { CATEGORY_COLORS } from '../constants/categories'
import StatCard from '../components/StatCard'
import ExpensePieChart from '../components/ExpensePieChart'

export default function Dashboard() {
  const { expenses, income } = useBudget()
  const monthly = getMonthlyExpenses(expenses)
  const totalExpenses = monthly.reduce((s, e) => s + e.amount, 0)
  const savings = income - totalExpenses
  const balance = savings
  const categoryTotals = sumByCategory(monthly)
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  const recent = [...monthly].sort((a, b) => b.date - a.date).slice(0, 5)

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">AI Budget Tracker</p>
          <h1>Dashboard</h1>
        </div>
        <span className="month-badge">{formatMonthYear()}</span>
      </header>

      <div className="prototype-notice" role="note">
        Dummy data has been loaded for this prototype demo (sample expenses, goals, and income).
      </div>

      <div className="stat-grid">
        <StatCard label="Total Balance" value={formatCurrency(balance)} accent />
        <StatCard label="Monthly Expenses" value={formatCurrency(totalExpenses)} />
        <StatCard label="Monthly Savings" value={formatCurrency(savings)} sub={`Income: ${formatCurrency(income)}`} />
      </div>

      <section className="section">
        <h2>Expense Breakdown</h2>
        <ExpensePieChart data={pieData} />
      </section>

      <section className="section">
        <h2>Recent Transactions</h2>
        {recent.length ? (
          <ul className="expense-list">
            {recent.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div
                  className="expense-dot"
                  style={{ background: CATEGORY_COLORS[expense.category] || '#94a3b8' }}
                />
                <div className="expense-info">
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-meta">
                    {expense.category} · {formatDate(expense.date)}
                  </span>
                </div>
                <span className="expense-amount">{formatCurrency(expense.amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No transactions this month</p>
        )}
      </section>
    </div>
  )
}
