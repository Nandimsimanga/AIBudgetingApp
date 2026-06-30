import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import EmptyState from '../components/EmptyState'

export default function Expenses() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useBudget()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const sorted = [...expenses].sort((a, b) => b.date - a.date)

  const handleSave = (data) => {
    if (editing) {
      updateExpense(editing.id, data)
      setEditing(null)
    } else {
      addExpense(data)
    }
    setShowForm(false)
  }

  const handleEdit = (expense) => {
    setEditing(expense)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this expense?')) deleteExpense(id)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">Track spending</p>
          <h1>Expenses</h1>
        </div>
        {!showForm && (
          <button type="button" className="btn-primary btn-sm" onClick={() => setShowForm(true)}>
            + Add
          </button>
        )}
      </header>

      {showForm ? (
        <ExpenseForm expense={editing} onSave={handleSave} onCancel={handleCancel} />
      ) : sorted.length ? (
        <ExpenseList expenses={sorted} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <EmptyState
          icon={Wallet}
          title="No expenses yet"
          message="Tap + Add to record your first expense"
        />
      )}
    </div>
  )
}
