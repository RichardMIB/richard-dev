export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-none border-2 font-mono font-bold uppercase tracking-wider no-underline transition-[transform,box-shadow,background-color,border-color] motion-reduce:transition-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-brutal-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-focus active:translate-x-0 active:translate-y-0 active:shadow-none disabled:pointer-events-none disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-accent-ink hover:border-accent-hover hover:bg-accent-hover',
  secondary: 'border-border bg-surface-raised text-foreground hover:border-foreground',
  outline: 'border-foreground bg-transparent text-foreground',
  ghost: 'border-transparent bg-transparent text-foreground hover:border-border',
  danger: 'border-danger bg-danger text-neutral-950',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-8 px-3 text-xs',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-sm',
}

interface ButtonVariantOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Classes do botão, reutilizáveis em <a> e outros elementos que precisam parecer botão. */
export function buttonVariants({ variant = 'primary', size = 'md', className = '' }: ButtonVariantOptions = {}) {
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
}
