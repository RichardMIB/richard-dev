import { useEffect, type RefObject } from 'react'

/** Onde existe, o CSS calcula o progresso sozinho (ver hero.css) e o JS fica de fora. */
const supportsScrollTimeline =
  typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')

interface ScrollProgressOptions {
  enabled?: boolean
  /** Variável CSS que recebe o progresso (0..1). */
  property?: string
}

/**
 * Progresso do elemento saindo pelo topo da viewport: 0 quando o topo dele encosta
 * no topo da tela, 1 quando a base sai. Mesmo intervalo do `exit-crossing` no CSS.
 * Um listener passivo + rAF; pausa quando o elemento está fora da tela.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, property = '--p' }: ScrollProgressOptions = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || supportsScrollTimeline) return

    let raf = 0
    let visible = true

    const update = () => {
      raf = 0
      if (!visible) return
      const r = el.getBoundingClientRect()
      const p = Math.min(Math.max(-r.top / r.height, 0), 1)
      el.style.setProperty(property, p.toFixed(4))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    })
    io.observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    schedule()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      el.style.removeProperty(property)
    }
  }, [ref, enabled, property])
}
