import { useState, useEffect } from 'react'
import puppyLogo from './assets/puppy-logo.png'
import DienosProgresas from './DienosProgresas'
import NaujaUzduotis from './NaujaUzduotis'
import './App.css'

const PET_NAME_KEY = 'petName'
const TASKS_KEY = 'petTasks'

const TASK_CATEGORIES = {
  maitinimas: { name: 'Maitinimas', icon: '🍽️' },
  aktyvumas: { name: 'Aktyvumas', icon: '🐾' },
  prieziura: { name: 'Priežiūra', icon: '🧼' },
  sveikata: { name: 'Sveikata', icon: '🩺' },
}

// Pradinės dienos užduotys
const INITIAL_TASKS = [
  { id: '1', title: 'Pamaitinti ryte', completed: false },
  { id: '2', title: 'Pamaitinti vakare', completed: false },
  { id: '3', title: 'Patikrinti vandenį', completed: false },
  { id: '4', title: 'Rytinis pasivaikščiojimas', completed: false },
  { id: '5', title: 'Vakarinis pasivaikščiojimas', completed: false },
]

function readStoredPetName() {
  try {
    return localStorage.getItem(PET_NAME_KEY) ?? ''
  } catch {
    return ''
  }
}

function readStoredTasks() {
  try {
    const saved = localStorage.getItem(TASKS_KEY)
    return saved ? JSON.parse(saved) : INITIAL_TASKS
  } catch {
    return INITIAL_TASKS
  }
}

function App() {
  const [draft, setDraft] = useState(readStoredPetName)
  const [petName, setPetName] = useState(readStoredPetName)
  const [error, setError] = useState('')
  const [tasks, setTasks] = useState(readStoredTasks)
  const today = new Intl.DateTimeFormat('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    } catch {
      // Ignoruojama klaida
    }
  }, [tasks])

  function handleSaveName(event) {
    event.preventDefault()
    const name = draft.trim()

    if (!name) {
      setError('Augintinio vardas negali būti tuščias.')
      return
    }

    setPetName(name)
    setError('')
    try {
      localStorage.setItem(PET_NAME_KEY, name)
    } catch {
      setError('Nepavyko išsaugoti vardo. Bandyk dar kartą.')
    }
  }

  function handleResetName() {
    setPetName('')
    setDraft('')
    try {
      localStorage.removeItem(PET_NAME_KEY)
    } catch {
      // Ignoruojama klaida
    }
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Funkcija naujai užduočiai pridėti
  function handleAddTask(title, category) {
    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      completed: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const completedTasks = tasks.filter((t) => t.completed)
  const pendingTasks = tasks.filter((t) => !t.completed)

  function getTaskCategory(task) {
    if (TASK_CATEGORIES[task.category]) return TASK_CATEGORIES[task.category]

    const normalizedTitle = task.title.toLocaleLowerCase('lt')
    if (normalizedTitle.includes('mait')) return TASK_CATEGORIES.maitinimas
    if (normalizedTitle.includes('pasivaikšč') || normalizedTitle.includes('aktyv')) {
      return TASK_CATEGORIES.aktyvumas
    }
    if (normalizedTitle.includes('sveikat') || normalizedTitle.includes('veterinar')) {
      return TASK_CATEGORIES.sveikata
    }
    if (normalizedTitle.includes('vand') || normalizedTitle.includes('šuk') || normalizedTitle.includes('maud')) {
      return TASK_CATEGORIES.prieziura
    }
    return { name: 'Kita', icon: '🐶' }
  }

  function getTaskIcon(title) {
    const normalizedTitle = title.toLocaleLowerCase('lt')

    if (normalizedTitle.includes('mait')) return '🍽️'
    if (normalizedTitle.includes('vand')) return '💧'
    if (normalizedTitle.includes('pasivaikšč')) return '🐾'
    return '🐶'
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={puppyLogo}
            className="logo-puppy"
            width="170"
            height="170"
            alt="Linksmo šuniuko logotipas"
          />
        </div>
        <div>
          <h1>Augintinio dienoraštis</h1>
          <div className="daily-greeting">
            <p className="daily-greeting-name">
              {petName || 'Įrašykite augintinio vardą'}
            </p>
            <p className="daily-greeting-date">{today}</p>
          </div>

          {/* 1 KORTELĖ: AUGINTINIO VARDAS */}
          <div className="tasks-card pet-card">
            {petName ? (
              <div className="pet-info-box">
                <h2 className="tasks-title">Augintinio vardas</h2>
                <p className="pet-name-display">{petName}</p>
                <button onClick={handleResetName} className="change-name-btn">
                  Keisti vardą
                </button>
              </div>
            ) : (
              <form className="pet-name-form" onSubmit={handleSaveName}>
                <h2 className="tasks-title">Įvesk augintinio vardą</h2>
                <div className="pet-name-row">
                  <input
                    id="pet-name"
                    type="text"
                    value={draft}
                    onChange={(event) => {
                      setDraft(event.target.value)
                      if (error) setError('')
                    }}
                    placeholder="Augintinio vardas..."
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'pet-name-error' : undefined}
                  />
                  <button type="submit" className="counter">
                    Išsaugoti
                  </button>
                </div>
                {error ? (
                  <p id="pet-name-error" className="pet-name-error" role="alert">
                    {error}
                  </p>
                ) : null}
              </form>
            )}
          </div>

          {/* 2 KORTELĖ: DIENOS UŽDUOTYS */}
          <div className="tasks-card">
            <h2 className="tasks-title">Dienos užduotys</h2>

            <div className="tasks-categories">
              <div className="task-category">
                <h3>Atlikta ({completedTasks.length})</h3>
                <ul className="task-list">
                  {completedTasks.length === 0 ? (
                    <li className="empty-task-msg">Nėra atliktų užduočių</li>
                  ) : (
                    completedTasks.map((task) => (
                      <li key={task.id} className="task-item completed">
                        <label>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <span className="task-icon" aria-hidden="true">{getTaskCategory(task).icon}</span>
                          <span className="task-title-text">{task.title}</span>
                          <span className="task-category-label">{getTaskCategory(task).name}</span>
                        </label>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="task-category pending-task-category">
                <h3>Neatlikta ({pendingTasks.length})</h3>
                <ul className="task-list">
                  {pendingTasks.length === 0 ? (
                    <li className="empty-task-msg">Visos užduotys atliktos! 🎉</li>
                  ) : (
                    pendingTasks.map((task) => (
                      <li key={task.id} className="task-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <span className="task-icon" aria-hidden="true">{getTaskCategory(task).icon}</span>
                          <span className="task-title-text">{task.title}</span>
                          <span className="task-category-label">{getTaskCategory(task).name}</span>
                        </label>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 3 KORTELĖ: DIENOS PROGRESAS */}
          <div className="tasks-card progress-card">
            <DienosProgresas tasks={tasks} />
          </div>

          {/* 4 KORTELĖ: PRIDĖTI NAUJĄ UŽDUOTĮ */}
          <NaujaUzduotis onAddTask={handleAddTask} />
        </div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
