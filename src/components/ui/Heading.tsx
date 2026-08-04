import type { ElementType, HTMLAttributes } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  size?: HeadingSize
}

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-4xl font-bold tracking-tight sm:text-5xl',
  xl: 'text-3xl font-bold tracking-tight sm:text-4xl',
  lg: 'text-2xl font-semibold tracking-tight sm:text-3xl',
  md: 'text-xl font-semibold sm:text-2xl',
  sm: 'text-lg font-semibold',
}

export function Heading({ as = 'h2', className = '', size = 'xl', ...props }: HeadingProps) {
  const Component = as as ElementType

  return (
    <Component className={`font-sans text-foreground ${sizeClasses[size]} ${className}`} {...props} />
  )
}