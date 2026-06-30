import { useState } from 'react'

const emptyForm = { name: '', targetAmount: '', currentAmount: '0' }

export default function GoalForm({ goal, onSave, onCancel }) {
  const [form, setForm] = useState(
    goal
      ? {
          name: goal.name,
          targetAmount: String(goal.targetAmount),
          currentAmount: String(goal.currentAmount),
        }
      : emptyForm,
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.targetAmount) return
    onSave({
      name: form.name.trim(),
      targetAmount: parseFloat(form.targetAmount),
      currentAmount: parseFloat(form.currentAmount) || 0,
    })
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>{goal ? 'Edit Goal' : 'New Savings Goal'}</h3>

      <label>
        Goal Name
        <input
          type="text"
          placeholder="e.g. New Laptop"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
      </label>

      <label>
        Target Amount (R)
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="25000"
          value={form.targetAmount}
          onChange={(e) => setForm((f) => ({ ...f, targetAmount: e.target.value }))}
          required
        />
      </label>

      <label>
        Current Amount (R)
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={form.currentAmount}
          onChange={(e) => setForm((f) => ({ ...f, currentAmount: e.target.value }))}
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {goal ? 'Save Changes' : 'Create Goal'}
        </button>
      </div>
    </form>
  )
}
