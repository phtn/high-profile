'use client'

import { cn } from '@/lib/utils'
import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react'

export interface InputClassNames {
  inputWrapper?: string
  input?: string
  errorMessage?: string
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  className?: string
  classNames?: InputClassNames
  label?: string
  startContent?: React.ReactNode
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  errorMessage?: string
}

const sizeStyles = {
  sm: 'h-8 text-sm px-2.5',
  md: 'h-9 text-sm px-3',
  lg: 'h-10 text-base px-4'
} as const

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNames = {},
      label,
      startContent,
      fullWidth,
      size = 'md',
      value,
      onChange,
      errorMessage,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }
    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label className='text-sm font-medium text-foreground' htmlFor={inputProps.id}>
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border border-input bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
            sizeStyles[size],
            fullWidth && 'w-full',
            classNames.inputWrapper,
            className
          )}>
          {startContent && <span className='shrink-0 text-muted-foreground [&>svg]:size-5'>{startContent}</span>}
          <input
            ref={ref}
            value={value}
            onChange={handleChange}
            className={cn(
              'min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
              classNames.input
            )}
            {...inputProps}
          />
        </div>
        {errorMessage && <p className={cn('text-xs text-destructive', classNames.errorMessage)}>{errorMessage}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
