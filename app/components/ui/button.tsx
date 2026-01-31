'use client'

import { IconName } from '@/lib/icons'
import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button'
import { Button as BaseButton } from '@base-ui/react/button'

const variantStyles = {
  primary:
    'bg-black text-white border border-black hover:bg-neutral-800 hover:border-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200 dark:hover:border-neutral-200 dark:focus-visible:outline-white',
  secondary:
    'bg-transparent text-neutral-800 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-white dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-500',
  ghost:
    'bg-transparent text-black border border-transparent hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-white dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-500'
} as const

export type ButtonVariant = keyof typeof variantStyles

export interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant
  icon?: IconName
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <BaseButton
      className={`inline-flex items-center justify-center rounded-xs px-8 py-1 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}>
      <span>{props.children}</span>
    </BaseButton>
  )
}
