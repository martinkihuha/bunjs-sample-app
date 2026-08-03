import type { Context } from 'hono'
import { renderView } from '../lib/render'

export const dashboard = (c: Context) => {
  const breadcrumbs = [
    {
      title: 'Dashboard',
      url: '#',
      icon: 'heroicons:home',
    },
  ]

  return c.html(
    renderView(c, 'dashboard', {
      title: 'Dashboard',
      breadcrumbs,
    }),
  )
}