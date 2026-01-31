'use client'

import { Dialog } from '@base-ui/react/dialog'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ROOT = Dialog.Root
const PORTAL = Dialog.Portal
const BACKDROP = Dialog.Backdrop
const VIEWPORT = Dialog.Viewport
const POPUP = Dialog.Popup
const TITLE = Dialog.Title
const CLOSE = Dialog.Close

export { ROOT as DialogRoot, PORTAL, BACKDROP, VIEWPORT, POPUP, TITLE, CLOSE }

export interface ModalProps extends Omit<ComponentPropsWithoutRef<typeof ROOT>, 'open' | 'onOpenChange'> {
  isOpen: boolean
  onClose: VoidFunction
  children: ReactNode
}

function Modal({ isOpen, onClose, children, ...rootProps }: ModalProps) {
  return (
    <ROOT
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      modal
      {...rootProps}
    >
      {children}
    </ROOT>
  )
}

const backdropStyles = cn(
  'fixed inset-0 z-50',
  'bg-black/25 dark:bg-black/50',
  'backdrop-blur-[2px]',
  'transition-opacity duration-200 ease-out',
  'data-[closed]:opacity-0 data-[open]:opacity-100',
  'data-[ending-style]:opacity-0'
)

const viewportStyles = cn(
  'fixed inset-0 z-50 flex items-center justify-center p-4',
  'pointer-events-none [&>*]:pointer-events-auto'
)

const popupBaseStyles = cn(
  'relative z-50',
  'w-full max-w-[calc(100vw-2rem)]',
  'rounded-2xl',
  'border border-border/80 dark:border-white/10',
  'bg-card dark:bg-card/95',
  'shadow-xl dark:shadow-2xl',
  'transition-[opacity,transform] duration-200 ease-out',
  'data-[closed]:opacity-0 data-[closed]:scale-[0.98]',
  'data-[open]:opacity-100 data-[open]:scale-100',
  'data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.98]',
  'focus:outline-none'
)

export interface ModalContentProps extends ComponentPropsWithoutRef<typeof POPUP> {
  className?: string
  children?: ReactNode
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <>
      <PORTAL>
        <BACKDROP className={backdropStyles} />
        <VIEWPORT className={viewportStyles}>
          <POPUP ref={ref} className={cn(popupBaseStyles, className)} {...props} />
        </VIEWPORT>
      </PORTAL>
    </>
  )
)
ModalContent.displayName = 'ModalContent'

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn('shrink-0 px-6 pt-6 pb-2 text-left text-lg font-medium text-foreground', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

function ModalBody({ className, children, ...props }: ModalBodyProps) {
  return (
    <div className={cn('flex-1 overflow-auto px-6 py-4 text-sm text-muted-foreground', className)} {...props}>
      {children}
    </div>
  )
}

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn('shrink-0 flex flex-wrap items-center justify-end gap-2 border-t border-border/60 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TITLE as DialogTitle,
  CLOSE as DialogClose
}
