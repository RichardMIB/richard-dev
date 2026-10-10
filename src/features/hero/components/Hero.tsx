import { useRef } from 'react'
import { buttonVariants } from '@/components/ui'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { GlowCard } from './GlowCard'
import { HeroLayers } from './HeroLayers'
import '../hero.css'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  useScrollProgress(ref, { enabled: !reducedMotion })

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="hero grid min-h-[calc(100svh-4rem)] place-items-center px-4 pt-16 pb-20"
    >
      <HeroLayers />

      <div className="w-full max-w-[40rem]">
        <GlowCard className="p-6 sm:p-10">
          <p className="mb-4 text-xs tracking-wide text-accent">&gt; status: disponível para estágio</p>
          <h1
            id="hero-title"
            className="text-[clamp(2.5rem,9vw,4.5rem)] leading-none font-bold tracking-tight"
          >
            Richard
            <span className="hero-caret text-accent" aria-hidden="true">
              _
            </span>
          </h1>
          <p className="mt-3 text-base tracking-[0.08em] uppercase sm:text-xl">
            Desenvolvedor Full Stack
          </p>
          <p className="mt-5 max-w-[46ch] text-muted">
            Backend, automação e inteligência artificial. Construo sistemas que funcionam de
            verdade — do banco de dados ao pixel.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className={buttonVariants({ variant: 'primary' })} href="#projetos">
              Ver projetos
            </a>
            <a className={buttonVariants({ variant: 'outline' })} href="#contato">
              Contato
            </a>
          </div>
          <dl className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-border pt-4 text-xs">
            <div className="flex gap-2">
              <dt className="text-neutral-500 after:content-[':']">loc</dt>
              <dd>Fortaleza-CE</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-neutral-500 after:content-[':']">stack</dt>
              <dd>TS · React · Node · SQL</dd>
            </div>
          </dl>
        </GlowCard>
      </div>
    </section>
  )
}
