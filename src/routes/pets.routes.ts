import { Hono } from 'hono'
import { getPets, getPetById } from '../controllers/pets.controller'

const app = new Hono()

app.get('/', getPets)

app.get('/:id', getPetById)

export default app
