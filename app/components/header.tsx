'use client'

import { Popover } from '@base-ui/react/popover'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { LinkButton } from './ui/link-button'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' }
] as const

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95'>
      <div className='mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='text-lg font-medium tracking-tight text-neutral-900 dark:text-white'
          aria-label='High Profile – Home'>
          &Cash
        </Link>

        {/* Desktop nav – centered */}
        <nav className='hidden md:flex md:items-center md:justify-center' aria-label='Main navigation'>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className='font-okx font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-12 border-l'>
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop: theme toggle + CTA – right */}
        <div className='hidden items-center justify-end gap-2 md:flex'>
          <ThemeToggle />
          <LinkButton href='#cta' variant='primary' className='font-semibold'>
            Sign in
          </LinkButton>
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
                  className='w-[calc(100vw-2rem)] rounded border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900'
                  initialFocus={false}>
                  <div className='flex flex-col gap-0.5'>
                    {NAV_LINKS.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className='rounded px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'>
                        {label}
                      </Link>
                    ))}
                    <div className='mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800'>
                      <LinkButton href='#cta' variant='primary' className='w-full justify-center'>
                        Get started
                      </LinkButton>
                    </div>
                  </div>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </header>
  )
}
