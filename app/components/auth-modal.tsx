'use client'

import { DitherPhoto, ImageDither } from '@/app/components/paper/dithering'
import { Button } from '@/app/components/ui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { useAuthCtx } from '@/app/ctx/auth'
import { useToggle } from '@/hooks/use-toggle'
import { loginWithGoogle, sendEmailLink } from '@/lib/firebase/auth'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Separator } from '@base-ui/react/separator'
import type { ActionCodeSettings } from 'firebase/auth'
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: VoidFunction
  mode?: 'login' | 'signup'
}

export const AuthModal = ({ isOpen, onClose, mode = 'login' }: AuthModalProps) => {
  const { setAuthModalOpen, isAuthModalOpen } = useAuthCtx()
  const [isLogin] = useState(mode === 'login')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAuthModalOpen(isOpen)
  }, [isOpen, setAuthModalOpen])

  useEffect(() => {
    return () => {
      setAuthModalOpen(false)
    }
  }, [setAuthModalOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin && email) {
        const actionCodeSettings: ActionCodeSettings = {
          url: window.location.origin,
          handleCodeInApp: true
        }
        await sendEmailLink(email, actionCodeSettings)
        setEmailSent(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setEmailSent(false)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      await loginWithGoogle()
      setAuthModalOpen(false)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const { on: isEmail, toggle: toggleEmail } = useToggle()
  const emailLink = useMemo(() => (email.includes('@') ? `https://${email.split('@').pop() ?? 'mail'}` : ''), [email])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        className={cn(
          'w-full max-w-sm overflow-hidden',
          'rounded-2xl border-border/80 dark:border-white/10',
          'bg-card/95 dark:bg-card/90 backdrop-blur-xl',
          'shadow-2xl'
        )}>
        <div className='pointer-events-none absolute left-1/4 top-20 flex h-48 w-48 items-center opacity-30'>
          <ImageDither image='/globe.svg' />
          <DitherPhoto />
        </div>
        <ModalHeader className='relative z-10 border-0 pb-0 pt-6'>
          <div className='w-fit rounded-lg bg-foreground/10 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm'>
            {emailSent ? (
              <a
                rel='noopener noreferrer'
                href={emailLink}
                target='_blank'
                className='flex items-center gap-1 font-medium text-foreground hover:underline'>
                <span>Check your email</span>
                <Icon name='arrow-right' className='size-4 -rotate-12' />
              </a>
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </div>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className='min-h-48 px-6 py-4'>
            {emailSent ? (
              <div className='relative z-10 flex min-h-48 flex-col items-center justify-center gap-4 rounded-xl bg-muted/30 px-4 py-6 text-center backdrop-blur-sm'>
                <Icon name='email' className='size-12 text-primary' />
                <p className='text-sm text-foreground'>
                  We&apos;ve sent a sign-in link to <strong className='font-medium text-foreground'>{email}</strong>
                </p>
                <p className='max-w-[28ch] text-xs text-muted-foreground'>
                  Click the link in your email to sign in. The link expires in 1 hour.
                </p>
                <Button
                  size='sm'
                  variant='light'
                  onPress={() => {
                    setEmailSent(false)
                    setEmail('')
                    setError(null)
                  }}>
                  Use a different email
                </Button>
              </div>
            ) : (
              <div
                role='presentation'
                onClick={toggleEmail}
                className='flex min-h-48 cursor-default items-center justify-center'
              />
            )}
            {error && (
              <div role='alert' className='mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive'>
                {error}
              </div>
            )}
          </ModalBody>
          <ModalFooter className='flex-col gap-3 border-t border-border/60 pt-4'>
            {!emailSent && isEmail ? (
              <div className='flex w-full items-center gap-2'>
                <Input
                  size='lg'
                  fullWidth
                  type='email'
                  inputMode='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='you@example.com'
                  className='flex-1'
                  classNames={{
                    inputWrapper: 'bg-muted/50 dark:bg-muted/30 border-border/60 focus-within:border-foreground/30',
                    input: 'text-foreground placeholder:text-muted-foreground'
                  }}
                  startContent={
                    <button
                      type='button'
                      onClick={toggleEmail}
                      className={cn('shrink-0 relative -left-2 rounded-full bg-foreground/5', {
                        hidden: email === ''
                      })}
                      aria-label='Close email field'>
                      <Icon name={email === '' ? 'email' : 'close'} className='size-4' />
                    </button>
                  }
                />
                <Button
                  size='lg'
                  isIconOnly
                  type='submit'
                  variant='solid'
                  disabled={email === '' || loading}
                  className='shrink-0'>
                  <Icon
                    name={loading ? 'spinner-ring' : 'arrow-right'}
                    className={cn('size-6', loading && 'text-primary')}
                  />
                </Button>
              </div>
            ) : !emailSent ? (
              <div className='flex w-full flex-wrap items-center justify-between gap-4'>
                <Button
                  size='lg'
                  type='button'
                  variant='solid'
                  onPress={handleGoogleLogin}
                  disabled={loading}
                  startContent={<Icon name={loading ? 'spinners-ring' : 'google'} className='size-5' />}
                  className='w-full font-cv font-medium'>
                  Continue with Google
                </Button>
                <Button
                  size='lg'
                  type='button'
                  variant='secondary'
                  onPress={toggleEmail}
                  startContent={<Icon name='email-fast' className='size-5' />}
                  className='w-full font-cv'>
                  Email Link
                </Button>
              </div>
            ) : null}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export interface SignInField {
  label: string
  placeholder: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required: boolean
  autoComplete: string
}

interface InputFieldsProps {
  fields: SignInField[]
}

export const InputFields = ({ fields }: InputFieldsProps) => {
  return (
    <div className='hidden space-y-3'>
      {fields.map((field, index) => (
        <Input
          key={index}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
          required={field.required}
          autoComplete={field.autoComplete}
        />
      ))}
      <div className='flex items-center gap-4'>
        <Separator orientation='horizontal' className='flex-1' />
        <span className='text-xs font-light text-muted-foreground'>OR</span>
        <Separator orientation='horizontal' className='flex-1' />
      </div>
    </div>
  )
}

export const SignInFooter = () => {
  return (
    <div className='hidden flex-col gap-2'>
      <Button type='submit' variant='flat' className='w-full'>
        Sign in
      </Button>
      <Button size='sm' type='button' variant='light'>
        Switch to sign up
      </Button>
    </div>
  )
}
