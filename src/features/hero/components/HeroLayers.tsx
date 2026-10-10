import type { CSSProperties } from 'react'

interface HeroLayersProps {
  /** Multiplica o deslocamento do parallax (1 = intensidade aprovada). */
  intensity?: number
}

const TAGS = [
  { label: '[ typescript ]', className: 'top-[22%] left-[6%]' },
  { label: '// node · postgres', className: 'top-[30%] right-[8%]' },
  { label: '>_ automação + IA', className: 'bottom-[26%] left-[10%] max-sm:hidden' },
  { label: '0x52', className: 'bottom-[18%] right-[14%] max-sm:hidden' },
]

/** Camadas decorativas do hero. Só visual: ficam fora da árvore de acessibilidade. */
export function HeroLayers({ intensity = 1 }: HeroLayersProps) {
  const style = { '--hero-intensity': intensity } as CSSProperties

  return (
    <div aria-hidden="true" style={style}>
      <div className="hero-layer hero-layer--bg">
        <div className="hero-grid" />
      </div>
      <div className="hero-layer hero-layer--mid">
        <span className="hero-ghost">
          FULL
          <br />
          STACK
        </span>
      </div>
      <div className="hero-layer hero-layer--front">
        {TAGS.map((tag) => (
          <span key={tag.label} className={`hero-tag ${tag.className}`}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  )
}
