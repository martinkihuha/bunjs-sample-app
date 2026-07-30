import { Eta } from 'eta'
import { join } from 'path'

const eta = new Eta({
  views: join(import.meta.dir, '../views'),
  autoEscape: false,
  defaultExtension: '.html',
})

export function renderView(view: string, data: Record<string, unknown>) {
  const body = eta.render(view, data)
  return eta.render('layout', { ...data, body })
}
