import type { Context, Next } from 'hono'
import { navLinks } from '../data/nav_links'

export const injectNavLinks = (c: Context, next: Next) => {
  c.set('navLinks', navLinks)
  return next()
}
