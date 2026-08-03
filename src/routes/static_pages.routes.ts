import { Hono } from 'hono'
import { dashboard } from '../controllers/static_pages.controller'

const app = new Hono()

app.get('/dashboard', dashboard)

export default app
