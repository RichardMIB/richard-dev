import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePointerVars } from '../hooks/usePointerVars'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

/** Card brutalista com luz que segue o cursor/toque/foco e borda que acende no mesmo ponto. */
export function GlowCard({ children, className = '' }: GlowCardProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  usePointerVars(ref, { enabled: !reducedMotion })

  return (
    <article ref={ref} className={`glow-card ${className}`}>
      <div className="glow-card__light" aria-hidden="true" />
      <div className="glow-card__border" aria-hidden="true" />
      <div className="glow-card__content">{children}</div>
    </article>
  )
}
