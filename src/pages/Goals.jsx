import { useState } from 'react'
import { Target } from 'lucide-react'
import { useBudget } from '../hooks/useBudget'
import GoalForm from '../components/GoalForm'
import GoalList from '../components/GoalList'
import EmptyState from '../components/EmptyState'

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useBudget()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSave = (data) => {
    if (editing) {
      updateGoal(editing.id, data)
      setEditing(null)
    } else {
      addGoal(data)
    }
    setShowForm(false)
  }

  const handleEdit = (goal) => {
    setEditing(goal)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this goal?')) deleteGoal(id)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">Save for what matters</p>
          <h1>Goals</h1>
        </div>
        {!showForm && (
          <button type="button" className="btn-primary btn-sm" onClick={() => setShowForm(true)}>
            + New
          </button>
        )}
      </header>

      {showForm ? (
        <GoalForm goal={editing} onSave={handleSave} onCancel={handleCancel} />
      ) : goals.length ? (
        <GoalList goals={goals} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <EmptyState
          icon={Target}
          title="No goals yet"
          message="Create a savings goal to start tracking progress"
        />
      )}
    </div>
  )
}
