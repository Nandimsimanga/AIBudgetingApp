import { useState, useRef, useEffect } from 'react'
import { Bot } from 'lucide-react'
import { useBudget } from '../hooks/useBudget'
import { generateChatResponse } from '../utils/ai'
import { ICON_SM } from '../constants/iconProps'

const SUGGESTIONS = [
  'Can I afford a PS5 next month?',
  'How much did I spend this month?',
  'What are my savings goals?',
]

export default function AIAssistant() {
  const budget = useBudget()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I\'m a prototype budget assistant. I\'m not connected to a real AI model yet — responses are generated locally from your budget data using simple rules.',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', text: text.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = generateChatResponse(text, budget)
      setMessages((m) => [...m, { role: 'assistant', text: reply }])
      setTyping(false)
    }, 600)
  }

  return (
    <div className="page chat-page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">Prototype — no model connected</p>
          <h1>AI Assistant</h1>
        </div>
      </header>

      <div className="prototype-notice" role="note">
        This assistant is not connected to Gemini, OpenAI, or any other AI model. Replies are simulated locally for demo purposes.
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.role === 'assistant' && (
              <span className="chat-avatar">
                <Bot {...ICON_SM} aria-hidden="true" />
              </span>
            )}
            <p>{msg.text}</p>
          </div>
        ))}
        {typing && (
          <div className="chat-bubble assistant">
            <span className="chat-avatar">
              <Bot {...ICON_SM} aria-hidden="true" />
            </span>
            <p className="typing-dots">Thinking...</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" className="suggestion-chip" onClick={() => sendMessage(s)}>
            {s}
          </button>
        ))}
      </div>

      <form
        className="chat-input-bar"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
      >
        <input
          type="text"
          placeholder="Ask a budgeting question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
