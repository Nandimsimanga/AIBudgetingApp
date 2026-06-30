# AI Budget Tracker

**Mobile-first web app prototype** for personal finance management — track spending, set savings goals, view reports, and explore AI-assisted budgeting insights.

**Live demo:** https://nandimsimanga.github.io/AIBudgetingApp/

> **Ongoing project** — This is an active portfolio build. Features are being expanded over time, with planned work including real AI model integration (e.g. Gemini API), improved data persistence, and additional analytics.

---

## What this app is for

AI Budget Tracker helps users understand and manage their money in one place. It is designed as a **portfolio-grade prototype** that goes beyond basic CRUD: it combines expense tracking, goal planning, financial reporting, data visualisation, and AI-style budgeting assistance in a clean mobile-first interface.

The app uses **South African Rand (ZAR)** formatting and sample data to demonstrate real-world budgeting scenarios (transport, food, bills, savings goals, etc.).

---

## Features

### Expense tracking
- Add, edit, and delete expenses
- Categorise spending (Food, Transport, Entertainment, Bills, and more)
- Auto-suggest categories from expense descriptions (e.g. "Uber" → Transport)
- View recent transactions on the dashboard

### Goal management
- Create savings goals with target and current amounts
- Visual progress bars for each goal

### Financial reports
- Monthly summary: income, expenses, savings, top spending category
- Pie chart — expense breakdown by category
- Line chart — spending trends over time
- Local spending insights (rule-based analysis of your data)

### AI assistant (prototype)
- Chat-style interface for budgeting questions
- Suggested prompts (e.g. affordability checks, spending summaries)
- **Not connected to a live AI model yet** — responses are simulated locally from your budget data

### Dashboard
- Total balance, monthly expenses, and savings at a glance
- Category breakdown chart and recent activity

---

## Skills demonstrated

| Area | What this project shows |
|------|-------------------------|
| **Frontend development** | React 19, component architecture, hooks, Context API |
| **Mobile-first UI** | Responsive layout, bottom navigation, touch-friendly forms |
| **State management** | Centralised app state with `BudgetProvider` and custom hooks |
| **Data persistence** | Client-side storage with `localStorage` |
| **Financial logic** | Monthly totals, category aggregation, goal progress, savings calculations |
| **Data visualisation** | Interactive charts with Recharts (pie + line) |
| **AI integration (planned)** | Prototype categorisation, insights, and chat — structured for future API wiring |
| **DevOps / deployment** | Vite build pipeline, GitHub Actions CI/CD, GitHub Pages hosting |
| **UX & product thinking** | Clear prototype disclaimers, dummy data for demos, portfolio-ready feature set |

---

## Tech stack

- **React** + **Vite**
- **Recharts** — charts and graphs
- **Lucide React** — minimal icons
- **localStorage** — offline-first data persistence
- **GitHub Actions** — automated deploy to GitHub Pages

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser (resize to mobile width for the intended layout).

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Deployment

Pushes to `main` deploy automatically via [GitHub Actions](.github/workflows/deploy.yml).

1. In the repo go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. After the workflow completes, the site is live at the demo URL above

---

## Roadmap (ongoing)

- [ ] Connect AI assistant to a real model (Gemini API)
- [ ] User-configurable income and budgets
- [ ] Export / import data
- [ ] Dark mode
- [ ] Backend or sync for multi-device support

---

## Author

**Nandim Simanga** — portfolio project demonstrating full-stack-minded frontend development with finance, analytics, and AI integration.
