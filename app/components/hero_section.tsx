import { LinkButton } from './ui/link-button'

export function HeroSection() {
  return (
    <section
      className='px-4 pb-24 pt-20 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-20'
      aria-labelledby='hero-heading'>
      <div className='mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16'>
        <LeftColumn />
        <RightColumn />
      </div>
    </section>
  )
}

const LeftColumn = () => {
  return (
    <div>
      <h1
        id='hero-heading'
        className='text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl'>
        <br />
        Crypto
        <br />
        Payments.
      </h1>
      <p className='mt-8 max-w-xl text-lg opacity-80'>Fast, reliable and top-notch security.</p>
      <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
        <LinkButton href='#cta'>Get started</LinkButton>
        <LinkButton href='#how-it-works' variant='secondary'>
          How it works
        </LinkButton>
      </div>
    </div>
  )
}

const RightColumn = () => {
  return (
    <div className='relative aspect-5/3 w-full overflow-hidden rounded border border-neutral-200' aria-hidden>
      <div className='absolute inset-0 flex items-center justify-center text-sm font-medium text-neutral-400 dark:text-neutral-500'>
        Visual placeholder
      </div>
    </div>
  )
}
