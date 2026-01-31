import Link from 'next/link'
import { LinkButton } from './ui/link-button'

export function CtaSection() {
  return (
    <section
      id='cta'
      className='border-t border-neutral-200 px-4 py-20 sm:px-6 sm:py-28 lg:px-8'
      aria-labelledby='cta-heading'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 id='cta-heading' className='text-3xl font-cv font-semibold text-neutral-900 dark:text-white sm:text-3xl'>
          Ready to accept crypto?
        </h2>
        <p className='mt-3 text-neutral-500 dark:text-neutral-400'>
          Join merchants who use High Profile for fast, low-fee payments.
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <LinkButton href='#cta'>Get started for free</LinkButton>
          <Link
            href='#'
            className='text-sm font-medium text-neutral-500 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white'>
            Contact sales
          </Link>
        </div>
      </div>
    </section>
  )
}
