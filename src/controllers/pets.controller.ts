import type { Context } from 'hono'
import { pets } from '../data/pets'
import { renderView } from '../lib/render'

export const getPets = (c: Context) => {
  const { species, adopted, minAge, maxAge } = c.req.query()

  let filtered = [...pets]

  if (species) {
    filtered = filtered.filter(
      (p) => p.species.toLowerCase() === species.toLowerCase(),
    )
  }

  if (adopted === 'true' || adopted === 'false') {
    filtered = filtered.filter((p) => p.adopted === (adopted === 'true'))
  }

  if (minAge) {
    filtered = filtered.filter((p) => p.age >= Number(minAge))
  }

  if (maxAge) {
    filtered = filtered.filter((p) => p.age <= Number(maxAge))
  }

  return c.html(
    renderView('pets', {
      title: 'Pets — Pet Shelter',
      pets: filtered,
      species: species || '',
      adopted: adopted || '',
      minAge: minAge || '',
      maxAge: maxAge || '',
    }),
  )
}

export const getPetById = (c: Context) => {
  const id = Number(c.req.param('id'))
  const pet = pets.find((p) => p.id === id)
  if (!pet) {
    c.status(404)
    return c.html(renderView('404-pet', { title: 'Pet Not Found', id }))
  }
  return c.html(renderView('pet', { title: `${pet.name} — Pet Shelter`, pet }))
}
