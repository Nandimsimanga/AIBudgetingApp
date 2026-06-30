import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils/format'
import { getGoalProgress } from '../utils/finance'
import { ICON_SM } from '../constants/iconProps'

export default function GoalList({ goals, onEdit, onDelete }) {
  if (!goals.length) return null

  return (
    <div className="goal-list">
      {goals.map((goal) => {
        const progress = getGoalProgress(goal)
        return (
          <div key={goal.id} className="goal-card">
            <div className="goal-header">
              <span className="goal-name">{goal.name}</span>
              <div className="goal-actions">
                <button type="button" className="icon-btn" onClick={() => onEdit(goal)} aria-label="Edit">
                  <Pencil {...ICON_SM} />
                </button>
                <button type="button" className="icon-btn" onClick={() => onDelete(goal.id)} aria-label="Delete">
                  <Trash2 {...ICON_SM} />
                </button>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="goal-footer">
              <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
              <span className="goal-pct">{progress}%</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
