import type { HTMLAttributes } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg'
}

const spacingClasses = {
  sm: 'py-8 md:py-10',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
}

export function Section({ className = '', spacing = 'md', ...props }: SectionProps) {
  return <section className={`${spacingClasses[spacing]} ${className}`} {...props} />
}