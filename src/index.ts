import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import staticPagesRoutes from './routes/static_pages.routes'
import petRoutes from './routes/pets.routes'
import { injectNavLinks } from './middleware/inject_nav_links'

const app = new Hono()

app.use(cors())
app.use(injectNavLinks)

app.use('/css/*', serveStatic({ root: './src/public' }))
app.use('/js/*', serveStatic({ root: './src/public' }))

app.get('/', (c) =>  c.redirect('/dashboard'))

app.route('/', staticPagesRoutes)

app.route('/pets', petRoutes)

export default app
