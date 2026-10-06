import { useState } from 'react'

function AugintiniuNavigacija({ pets, activePetId, onSelectPet, onAddPet }) {
  const [petName, setPetName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const name = petName.trim()

    if (!name) return

    onAddPet(name)
    setPetName('')
  }

  return (
    <nav className="pet-navigation" aria-label="Augintinių pasirinkimas">
      <div className="pet-tabs">
        {pets.map((pet) => (
          <button
            key={pet.id}
            type="button"
            className={`pet-tab${pet.id === activePetId ? ' pet-tab--active' : ''}`}
            aria-pressed={pet.id === activePetId}
            onClick={() => onSelectPet(pet.id)}
          >
            {pet.name}
          </button>
        ))}
      </div>

      <form className="pet-add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={petName}
          onChange={(event) => setPetName(event.target.value)}
          placeholder="Augintinio vardas"
          aria-label="Naujo augintinio vardas"
        />
        <button type="submit">+ Pridėti</button>
      </form>
    </nav>
  )
}

export default AugintiniuNavigacija
