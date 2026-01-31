const FEATURES = [
  {
    title: 'Multi-chain',
    description: 'Accept Bitcoin, Ethereum, and stablecoins through a single integration.',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
      />
    )
  },
  {
    title: 'Instant settlement',
    description: 'Settle in fiat or hold crypto. Real-time rates and transparent fees.',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
      />
    )
  },
  {
    title: 'Developer API',
    description: 'REST and webhooks. Clear docs and sandbox. Go live in hours.',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
      />
    )
  }
] as const

export function FeaturesSection() {
  return (
    <section
      id='features'
      className='border-t border-neutral-200 bg-neutral-50/50 px-4 py-20 dark:border-neutral-800 dark:bg-neutral-900/30 sm:px-6 sm:py-28 lg:px-8'
      aria-labelledby='features-heading'>
      <div className='mx-auto max-w-6xl'>
        <h2
          id='features-heading'
          className='text-3xl font-cv font-semibold text-neutral-900 dark:text-white sm:text-3xl'>
          Built for Modern Commerce
        </h2>
        <p className='mt-3 max-w-xl text-sm md:text-base text-neutral-500 dark:text-neutral-400'>
          One API. Multiple chains. Instant confirmation and flexible settlement.
        </p>
        <ul className='mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3' role='list'>
          {FEATURES.map((item) => (
            <li key={item.title} className='group bg-white p-8 dark:bg-neutral-950'>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400 group-hover:border-neutral-300 group-hover:text-neutral-900 dark:group-hover:border-neutral-600 dark:group-hover:text-white'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden>
                  {item.icon}
                </svg>
              </span>
              <h3 className='mt-5 text-lg font-cv font-medium text-neutral-900 dark:text-white'>{item.title}</h3>
              <p className='mt-2 text-sm text-neutral-500 dark:text-neutral-400'>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
