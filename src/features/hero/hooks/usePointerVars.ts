import { useEffect, type RefObject } from 'react'

interface PointerVarsOptions {
  enabled?: boolean
  /** Tempo (ms) até a luz apagar depois que o dedo sai da tela. */
  touchFadeDelay?: number
}

/**
 * Escreve a posição do ponteiro (em %) em `--mx`/`--my` do elemento, no máximo
 * uma vez por frame, e marca `data-lit` enquanto ele deve ficar "aceso".
 * - Mouse/caneta: segue o ponteiro enquanto está sobre o elemento.
 * - Toque: acende no ponto tocado e apaga sozinho.
 * - Teclado: leva a posição até o elemento com foco visível dentro dele.
 */
export function usePointerVars<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, touchFadeDelay = 700 }: PointerVarsOptions = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    let raf = 0
    let x = 50
    let y = 50
    let fadeTimer: number | undefined

    const write = () => {
      raf = 0
      el.style.setProperty('--mx', `${x.toFixed(1)}%`)
      el.style.setProperty('--my', `${y.toFixed(1)}%`)
    }

    // Lê o layout uma vez por evento; a escrita fica para o próximo frame.
    const moveTo = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect()
      x = ((clientX - r.left) / r.width) * 100
      y = ((clientY - r.top) / r.height) * 100
      if (!raf) raf = requestAnimationFrame(write)
    }

    const light = () => el.setAttribute('data-lit', '')
    const unlight = () => el.removeAttribute('data-lit')
    const isTouch = (e: PointerEvent) => e.pointerType === 'touch'

    const onEnter = (e: PointerEvent) => {
      if (!isTouch(e)) light()
    }
    const onMove = (e: PointerEvent) => {
      if (!isTouch(e)) moveTo(e.clientX, e.clientY)
    }
    const onLeave = (e: PointerEvent) => {
      if (!isTouch(e)) unlight()
    }
    const onDown = (e: PointerEvent) => {
      if (!isTouch(e)) return
      window.clearTimeout(fadeTimer)
      moveTo(e.clientX, e.clientY)
      light()
    }
    const onUp = (e: PointerEvent) => {
      if (!isTouch(e)) return
      window.clearTimeout(fadeTimer)
      fadeTimer = window.setTimeout(unlight, touchFadeDelay)
    }
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target
      if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return
      const r = target.getBoundingClientRect()
      moveTo(r.left + r.width / 2, r.top + r.height / 2)
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown, { passive: true })
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('focusin', onFocusIn)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fadeTimer)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('focusin', onFocusIn)
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
      unlight()
    }
  }, [ref, enabled, touchFadeDelay])
}
