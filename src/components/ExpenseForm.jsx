import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { CATEGORIES } from '../constants/categories'
import { categorizeExpense } from '../utils/ai'
import { ICON_SM } from '../constants/iconProps'

const emptyForm = { title: '', amount: '', category: 'Food', date: Date.now(), notes: '' }

export default function ExpenseForm({ expense, onSave, onCancel }) {
  const [form, setForm] = useState(
    expense
      ? { ...expense, amount: String(expense.amount), notes: expense.notes || '' }
      : emptyForm,
  )
  const [aiSuggestion, setAiSuggestion] = useState(null)

  const handleTitleChange = (title) => {
    setForm((f) => ({ ...f, title }))
    if (title.length > 2 && !expense) {
      const suggested = categorizeExpense(title)
      setAiSuggestion(suggested)
      setForm((f) => ({ ...f, title, category: suggested }))
    } else {
      setAiSuggestion(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.amount) return
    onSave({
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      date: Number(form.date),
      notes: form.notes.trim() || null,
    })
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>{expense ? 'Edit Expense' : 'Add Expense'}</h3>

      <label>
        Description
        <input
          type="text"
          placeholder="e.g. Uber, Coffee"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
        {aiSuggestion && (
          <span className="ai-tag">
            <Sparkles {...ICON_SM} aria-hidden="true" />
            AI categorized as {aiSuggestion}
          </span>
        )}
      </label>

      <label>
        Amount (R)
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          required
        />
      </label>

      <label>
        Category
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          value={new Date(Number(form.date)).toISOString().split('T')[0]}
          onChange={(e) =>
            setForm((f) => ({ ...f, date: new Date(e.target.value).getTime() }))
          }
        />
      </label>

      <label>
        Notes (optional)
        <input
          type="text"
          placeholder="Add a note..."
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {expense ? 'Save Changes' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}
