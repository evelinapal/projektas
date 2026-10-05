import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const vite = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom',
})

after(async () => {
  await vite.close()
})

const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
const { default: DienosProgresas } = await vite.ssrLoadModule('/src/DienosProgresas.jsx')
const { default: NaujaUzduotis } = await vite.ssrLoadModule('/src/NaujaUzduotis.jsx')

function render(component) {
  return renderToStaticMarkup(component)
}

test('pradinė sąsaja rodo augintinio vardo lauką ir visas penkias neatliktas užduotis', () => {
  const html = render(React.createElement(App))

  assert.match(html, /Įvesk augintinio vardą/)
  assert.match(html, /Neatlikta \(5\)/)
  assert.match(html, /Atlikta \(0\)/)
  assert.equal((html.match(/type="checkbox"/g) ?? []).length, 5)
  assert.match(html, /Pamaitinti ryte/)
  assert.match(html, /Patikrinti vandenį/)
})

test('dienos progresas teisingai atvaizduoja atliktų užduočių skaičių ir procentą', () => {
  const html = render(
    React.createElement(DienosProgresas, {
      tasks: [
        { id: '1', title: 'Pirma', completed: true },
        { id: '2', title: 'Antra', completed: false },
        { id: '3', title: 'Trečia', completed: false },
      ],
    }),
  )

  assert.match(html, /33%/)
  assert.match(html, /aria-valuenow="33"/)
  assert.match(html, /Atlikta <strong>1<\/strong> iš <strong>3<\/strong> užduočių/)
})

test('tuščiam užduočių sąrašui progresas yra nulis', () => {
  const html = render(React.createElement(DienosProgresas))

  assert.match(html, /0%/)
  assert.match(html, /aria-valuenow="0"/)
  assert.match(html, /Atlikta <strong>0<\/strong> iš <strong>0<\/strong> užduočių/)
})

test('naujos užduoties forma pateikia lietuvišką įvestį ir pridėjimo mygtuką', () => {
  const html = render(React.createElement(NaujaUzduotis, { onAddTask: () => {} }))

  assert.match(html, /Pridėti naują užduotį/)
  assert.match(html, /Įvesk naują užduotį/)
  assert.match(html, />Pridėti<\/button>/)
})
