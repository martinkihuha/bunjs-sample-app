import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { renderView } from './lib/render'
import petRoutes from './routes/pets.routes'

const app = new Hono()

app.use(cors())

app.use('/css/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(renderView('index', { title: 'Home', name: 'World' }))
})

app.get('/about', (c) => {
  return c.html(renderView('about', { title: 'About' }))
})

app.route('/pets', petRoutes)

export default app
