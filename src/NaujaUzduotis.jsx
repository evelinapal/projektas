import { useState } from 'react'

const TASK_CATEGORIES = [
  { id: 'maitinimas', name: 'Maitinimas', icon: '🍽️' },
  { id: 'aktyvumas', name: 'Aktyvumas', icon: '🐾' },
  { id: 'prieziura', name: 'Priežiūra', icon: '🧼' },
  { id: 'sveikata', name: 'Sveikata', icon: '🩺' },
]

function NaujaUzduotis({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('')
  const [category, setCategory] = useState('maitinimas')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = taskTitle.trim()

    if (!trimmedTitle) {
      setError('Užduoties pavadinimas negali būti tuščias.')
      return
    }

    // Perduodame naują užduotį tėviniam komponentui
    onAddTask(trimmedTitle, category)
    setTaskTitle('')
    setError('')
  }

  return (
    <div className="tasks-card add-task-card">
      <h2 className="tasks-title">Pridėti naują užduotį</h2>

      <form onSubmit={handleSubmit} className="add-task-form">
        <fieldset className="task-category-picker">
          <legend>Pasirink kategoriją</legend>
          <div className="task-category-options">
            {TASK_CATEGORIES.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`task-category-option${category === option.id ? ' selected' : ''}`}
                aria-pressed={category === option.id}
                onClick={() => setCategory(option.id)}
              >
                <span aria-hidden="true">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="add-task-row">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value)
              if (error) setError('')
            }}
            placeholder="Įvesk naują užduotį..."
            className="add-task-input"
            aria-invalid={Boolean(error)}
          />
          <button type="submit" className="add-task-btn">
            Pridėti
          </button>
        </div>

        {error ? <p className="pet-name-error">{error}</p> : null}
      </form>
    </div>
  )
}

export default NaujaUzduotis
