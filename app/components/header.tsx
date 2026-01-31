'use client'

import { useAuth } from '@/hooks/use-auth'
import { Popover } from '@base-ui/react/popover'
import Link from 'next/link'
import { useAuthCtx } from '../ctx/auth'
import { AuthModal } from './auth-modal'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { WalletConnector } from './wallet'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' }
] as const

export function Header() {
  const connect = () => {
    console.log('Connecting...')
  }

  const { user, loading: authLoading } = useAuth()
  const { isAuthModalOpen, setAuthModalOpen, closeAuthModal } = useAuthCtx()
  const handleOpenAuthModal = () => setAuthModalOpen(true)
  return (
    <header className='sticky top-0 z-50 w-full border-b border-dotted border-neutral-200/80 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95'>
      <div className='mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='text-lg font-cv font-semibold text-neutral-800 dark:text-white'
          aria-label='High Profile – Home'>
          <span className='opacity-50 font-medium'>&</span>Cash
        </Link>

        {/* Desktop nav – centered */}
        <nav className='hidden md:flex md:items-center md:justify-center' aria-label='Main navigation'>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className='font-cv font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-12 py-0.5'>
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop: theme toggle + CTA – right */}
        <div className='hidden items-center justify-end gap-2 md:flex'>
          <ThemeToggle />
          <Button onClick={handleOpenAuthModal} variant='primary' size='md' className='font-cv font-medium'>
            {user ? user.displayName?.substring(0, 4).toUpperCase() : 'Sign in'}
          </Button>
          <WalletConnector ref={null} />
        </div>

        {/* Mobile nav: theme toggle + Base UI Popover */}
        <div className='col-start-3 flex items-center justify-end gap-1 md:hidden'>
          <ThemeToggle />
          <Popover.Root>
            <Popover.Trigger
              className='flex list-none cursor-pointer items-center justify-center rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white'
              aria-label='Open menu'>
              <svg
                className='size-5'
                fill='none'
                strokeWidth={1.5}
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden>
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup
                  className='w-[calc(100vw-12rem)] rounded border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900'
                  initialFocus={false}>
                  <div className='flex flex-col gap-0.5 font-cv'>
                    {NAV_LINKS.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className='rounded px-3 py-2.5 text-sm hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'>
                        {label}
                      </Link>
                    ))}
                    <div className='mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800'>
                      <Button variant='primary' className='w-full justify-center' onPress={handleOpenAuthModal}>
                        Sign in
                      </Button>
                    </div>
                  </div>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  )
}
