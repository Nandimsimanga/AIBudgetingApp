import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/format'
import { CATEGORY_COLORS } from '../constants/categories'
import { ICON_SM } from '../constants/iconProps'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) return null

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
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
          <div className="expense-actions">
            <button type="button" className="icon-btn" onClick={() => onEdit(expense)} aria-label="Edit">
              <Pencil {...ICON_SM} />
            </button>
            <button type="button" className="icon-btn" onClick={() => onDelete(expense.id)} aria-label="Delete">
              <Trash2 {...ICON_SM} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
