import { useState } from 'react'
import { BudgetProvider } from './context/BudgetProvider'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Goals from './pages/Goals'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'
import './App.css'

const PAGES = {
  dashboard: Dashboard,
  expenses: Expenses,
  goals: Goals,
  reports: Reports,
  ai: AIAssistant,
}

function App() {
  const [tab, setTab] = useState('dashboard')
  const Page = PAGES[tab]

  return (
    <BudgetProvider>
      <div className="app-shell">
        <main className="app-main">
          <Page />
        </main>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    </BudgetProvider>
  )
}

export default App
