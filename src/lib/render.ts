import { Eta } from 'eta'
import type { Context } from 'hono'
import { join } from 'path'

const eta = new Eta({
  views: join(import.meta.dir, '../views'),
  autoEscape: false,
  defaultExtension: '.html',
  useWith: true,
})

export function renderView(c: Context, view: string, data: Record<string, unknown>) {
  const navLinks = c.get('navLinks') ?? []
  const currentPath = c.req.path
  const body = eta.render(view, data)
  return eta.render('layout/app', { ...data, navLinks, currentPath, body })
}
