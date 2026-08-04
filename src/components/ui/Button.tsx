import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-neutral-0 shadow-sm hover:bg-brand-700 focus-visible:ring-brand-600',
  secondary:
    'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 focus-visible:ring-neutral-500',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-surface focus-visible:ring-brand-600',
  ghost:
    'bg-transparent text-foreground hover:bg-surface focus-visible:ring-brand-600',
  danger:
    'bg-danger text-neutral-0 shadow-sm hover:bg-danger/90 focus-visible:ring-danger',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-8 px-3 text-sm',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      type={type}
      {...props}
    />
  )
}