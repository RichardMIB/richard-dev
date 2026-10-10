import type { ButtonHTMLAttributes } from 'react'
import { buttonVariants, type ButtonSize, type ButtonVariant } from './buttonVariants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} type={type} {...props} />
}
