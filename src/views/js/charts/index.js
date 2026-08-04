import ApexCharts from 'apexcharts'
import 'apexcharts/dist/apexcharts.css'
import { lineColumnArea } from './lineColumnArea'
import { gradientLine } from './gradientLine'

const registry = {
  'line-column-area': lineColumnArea,
  'gradient-line': gradientLine,
}

const charts = new Map()

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const isDark = () => document.documentElement.classList.contains('dark')

function withTheme(options) {
  const foreground = cssVar('--foreground')
  const border = cssVar('--border')
  return {
    ...options,
    theme: {
      ...options.theme,
      mode: isDark() ? 'dark' : 'light',
    },
    chart: {
      ...options.chart,
      foreColor: foreground,
      background: 'transparent',
    },
    title: options.title
      ? { ...options.title, style: { ...options.title.style, color: foreground } }
      : undefined,
    xaxis: options.xaxis
      ? {
          ...options.xaxis,
          labels: { ...options.xaxis.labels, style: { ...options.xaxis.labels?.style, colors: foreground } },
        }
      : undefined,
    yaxis: options.yaxis
      ? {
          ...options.yaxis,
          labels: { ...options.yaxis.labels, style: { ...options.yaxis.labels?.style, colors: foreground } },
          ...(options.yaxis.title
            ? { title: { ...options.yaxis.title, style: { ...options.yaxis.title.style, color: foreground } } }
            : {}),
        }
      : undefined,
    grid: {
      ...options.grid,
      borderColor: border,
    },
  }
}

function renderCharts() {
  for (const [el, chart] of charts) {
    if (!el.isConnected) {
      chart.destroy()
      charts.delete(el)
    }
  }

  document.querySelectorAll('[data-chart]').forEach((el) => {
    if (charts.has(el)) return
    const makeOptions = registry[el.dataset.chart]
    if (!makeOptions) return
    const chart = new ApexCharts(el, withTheme(makeOptions()))
    chart.render()
    charts.set(el, chart)
  })
}

function rethemeCharts() {
  for (const [el, chart] of charts) {
    const makeOptions = registry[el.dataset.chart]
    if (!makeOptions) return
    chart.updateOptions(withTheme(makeOptions()))
  }
}

document.addEventListener('htmx:load', renderCharts)
document.addEventListener('basecoat:themechange', rethemeCharts)

export { registry }
