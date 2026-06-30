import { Home, Wallet, Target, BarChart3, Bot } from 'lucide-react'
import { ICON } from '../constants/iconProps'

const TABS = [
  { id: 'dashboard', label: 'Home', Icon: Home },
  { id: 'expenses', label: 'Expenses', Icon: Wallet },
  { id: 'goals', label: 'Goals', Icon: Target },
  { id: 'reports', label: 'Reports', Icon: BarChart3 },
  { id: 'ai', label: 'AI', Icon: Bot },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`nav-item ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">
            <tab.Icon {...ICON} aria-hidden="true" />
          </span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
