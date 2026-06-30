import { useEffect, useState } from 'react'
import { SEED_EXPENSES, SEED_GOALS, DEFAULT_INCOME } from '../utils/seedData'
import { BudgetContext } from './budget-context'

const STORAGE_KEY = 'ai-budget-tracker'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        expenses: Array.isArray(parsed.expenses) ? parsed.expenses : SEED_EXPENSES,
        goals: Array.isArray(parsed.goals) ? parsed.goals : SEED_GOALS,
        income: typeof parsed.income === 'number' ? parsed.income : DEFAULT_INCOME,
        nextExpenseId: parsed.nextExpenseId ?? 16,
        nextGoalId: parsed.nextGoalId ?? 4,
        initialized: true,
      }
    }
  } catch {
    /* use defaults */
  }
  return {
    expenses: SEED_EXPENSES,
    goals: SEED_GOALS,
    income: DEFAULT_INCOME,
    nextExpenseId: 16,
    nextGoalId: 4,
    initialized: true,
  }
}

export function BudgetProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addExpense = (expense) => {
    setState((s) => ({
      ...s,
      expenses: [{ ...expense, id: s.nextExpenseId }, ...s.expenses],
      nextExpenseId: s.nextExpenseId + 1,
    }))
  }

  const updateExpense = (id, updates) => {
    setState((s) => ({
      ...s,
      expenses: s.expenses.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }))
  }

  const deleteExpense = (id) => {
    setState((s) => ({
      ...s,
      expenses: s.expenses.filter((e) => e.id !== id),
    }))
  }

  const addGoal = (goal) => {
    setState((s) => ({
      ...s,
      goals: [...s.goals, { ...goal, id: s.nextGoalId }],
      nextGoalId: s.nextGoalId + 1,
    }))
  }

  const updateGoal = (id, updates) => {
    setState((s) => ({
      ...s,
      goals: s.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }))
  }

  const deleteGoal = (id) => {
    setState((s) => ({
      ...s,
      goals: s.goals.filter((g) => g.id !== id),
    }))
  }

  const setIncome = (income) => {
    setState((s) => ({ ...s, income }))
  }

  const resetData = () => {
    setState({
      expenses: SEED_EXPENSES,
      goals: SEED_GOALS,
      income: DEFAULT_INCOME,
      nextExpenseId: 16,
      nextGoalId: 4,
      initialized: true,
    })
  }

  return (
    <BudgetContext.Provider
      value={{
        expenses: state.expenses,
        goals: state.goals,
        income: state.income,
        addExpense,
        updateExpense,
        deleteExpense,
        addGoal,
        updateGoal,
        deleteGoal,
        setIncome,
        resetData,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
