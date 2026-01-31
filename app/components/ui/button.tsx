'use client'

import { IconName } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button'
import { Button as BaseButton } from '@base-ui/react/button'
import type { ReactNode } from 'react'

const variantStyles = {
  primary:
    'bg-black text-white border border-black hover:bg-neutral-800 hover:border-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200 dark:hover:border-neutral-200 dark:focus-visible:outline-white',
  secondary:
    'bg-transparent text-neutral-800 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-white dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-500',
  ghost:
    'bg-transparent text-black border border-transparent hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:text-white dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-500',
  solid:
    'bg-foreground text-background border border-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
  flat: 'bg-foreground/10 text-foreground border border-transparent hover:bg-foreground/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50',
  light:
    'bg-transparent text-foreground border border-transparent hover:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/50'
} as const

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
  md: 'px-3 sm:px-4 py-1 text-sm rounded-md gap-2',
  lg: 'px-4 sm:px-6 py-2 text-base rounded-lg gap-2.5'
} as const

export type ButtonVariant = keyof typeof variantStyles
export type ButtonSize = keyof typeof sizeStyles

export interface ButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  variant?: ButtonVariant
  icon?: IconName
  size?: ButtonSize
  startContent?: ReactNode
  isIconOnly?: boolean
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClick?: BaseButtonProps['onClick']
}

type ButtonClickEvent = Parameters<NonNullable<BaseButtonProps['onClick']>>[0]

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  startContent,
  isIconOnly = false,
  onPress,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (e: ButtonClickEvent) => {
    onPress?.(e as React.MouseEvent<HTMLButtonElement>)
    onClick?.(e)
  }
  return (
    <BaseButton
      type={props.type ?? 'button'}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap group',
        variantStyles[variant],
        sizeStyles[size],
        isIconOnly && 'p-2 [&>svg]:size-5',
        className
      )}
      onClick={handleClick}
      {...props}>
      {startContent && <span className='shrink-0 [&>svg]:size-5'>{startContent}</span>}
      {isIconOnly ? (
        children
      ) : (
        <span className='select-none group-active:scale-85 transition-all duration-300'>{children}</span>
      )}
    </BaseButton>
  )
}
