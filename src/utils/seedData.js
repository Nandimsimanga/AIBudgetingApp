const now = Date.now()
const day = 24 * 60 * 60 * 1000

export const SEED_EXPENSES = [
  { id: 1, title: 'Uber', amount: 120, category: 'Transport', date: now - 1 * day, notes: null },
  { id: 2, title: 'Coffee', amount: 45, category: 'Food', date: now - 2 * day, notes: null },
  { id: 3, title: 'Steam Game', amount: 299, category: 'Entertainment', date: now - 3 * day, notes: null },
  { id: 4, title: 'Groceries', amount: 850, category: 'Food', date: now - 5 * day, notes: 'Weekly shop' },
  { id: 5, title: 'Electricity', amount: 1200, category: 'Bills', date: now - 7 * day, notes: null },
  { id: 6, title: 'Netflix', amount: 199, category: 'Entertainment', date: now - 10 * day, notes: null },
  { id: 7, title: 'Petrol', amount: 750, category: 'Transport', date: now - 12 * day, notes: null },
  { id: 8, title: 'McDonald\'s', amount: 89, category: 'Food', date: now - 14 * day, notes: null },
  { id: 9, title: 'Takealot', amount: 450, category: 'Shopping', date: now - 20 * day, notes: null },
  { id: 10, title: 'Gym', amount: 350, category: 'Health', date: now - 25 * day, notes: null },
  { id: 11, title: 'Uber', amount: 95, category: 'Transport', date: now - 35 * day, notes: null },
  { id: 12, title: 'Restaurant', amount: 320, category: 'Food', date: now - 40 * day, notes: null },
  { id: 13, title: 'Cinema', amount: 180, category: 'Entertainment', date: now - 45 * day, notes: null },
  { id: 14, title: 'Rent', amount: 5500, category: 'Bills', date: now - 50 * day, notes: null },
  { id: 15, title: 'Spotify', amount: 60, category: 'Entertainment', date: now - 55 * day, notes: null },
]

export const SEED_GOALS = [
  { id: 1, name: 'New Laptop', targetAmount: 25000, currentAmount: 15000 },
  { id: 2, name: 'Holiday', targetAmount: 10000, currentAmount: 4000 },
  { id: 3, name: 'Emergency Fund', targetAmount: 15000, currentAmount: 8500 },
]

export const DEFAULT_INCOME = 15000
