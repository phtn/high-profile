'use client'

import { Icon } from '@/lib/icons'
import { useTheme } from 'next-themes'
import { useCallback, useEffect } from 'react'
import { Button } from './ui/button'

const THEME_TOGGLE_KEY = 'i'
const THEME_TOGGLE_META = true // Cmd on Mac, Win on Windows

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((THEME_TOGGLE_META ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === THEME_TOGGLE_KEY) {
        event.preventDefault()
        toggleTheme()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  return (
    <Button
      variant='ghost'
      onClick={toggleTheme}
      className='p-2! rounded-full!'
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode (⌘I)' : 'Switch to dark mode (⌘I)'}
      title={resolvedTheme === 'dark' ? 'Switch to light mode (⌘I)' : 'Switch to dark mode (⌘I)'}>
      {resolvedTheme === 'dark' ? (
        <Icon name='dark-theme' className='size-4' />
      ) : (
        <Icon name='dark-theme' className='size-4 rotate-180' />
      )}
    </Button>
  )
}
