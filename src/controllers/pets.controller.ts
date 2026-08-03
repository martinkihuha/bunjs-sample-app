import type { Context } from 'hono'
import { pets } from '../data/pets'
import { renderView } from '../lib/render'

const petPhotoUrl = (species: string, id: number): string => {
  return `https://loremflickr.com/640/480/${species.toLowerCase()}?lock=${id}`;
}

export const getPets = (c: Context) => {
  const { search, species, adopted, minAge, maxAge } = c.req.query()

  let filtered = [...pets]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q),
    )
  }

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

  const petsWithPhotos = filtered.map((pet) => ({
    ...pet,
    photo: petPhotoUrl(pet.species, pet.id),
  }));

  const breadcrumbs = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'heroicons:home-solid',
    },
    {
      title: 'Pets',
      url: '#',
      icon: 'fluent:animal-paw-print-20-regular',
    },
  ]

  return c.html(
    renderView(c, 'pets/index', {
      title: 'Pets — Pet Shelter',
      breadcrumbs,
      pets: petsWithPhotos,
      search: search || '',
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
    return c.html(renderView(c, '404-pet', { title: 'Pet Not Found', id }))
  }

  const breadcrumbs = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'heroicons:home-solid',
    },
    {
      title: 'Pets',
      url: '/pets',
      icon: 'fluent:animal-paw-print-20-filled',
    },
    {
      title: pet.name,
      url: '#',
      icon: 'fluent:animal-paw-print-20-regular',
    },
  ]

  return c.html(renderView(c, 'pets/show', { title: pet.name, breadcrumbs, pet: { ...pet, photo: petPhotoUrl(pet.species, pet.id) } }))
}
