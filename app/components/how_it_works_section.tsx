const STEPS = [
  {
    step: '01',
    title: 'Create an account',
    description: 'Sign up, verify your business, and get API keys.'
  },
  {
    step: '02',
    title: 'Integrate',
    description: 'Add our SDK or REST API. Use webhooks for payment events.'
  },
  {
    step: '03',
    title: 'Go live',
    description: 'Switch to production and settle on your schedule.'
  }
] as const

export function HowItWorksSection() {
  return (
    <section id='how-it-works' className='px-8 md:px-4 py-20 sm:px-6 sm:py-28 lg:px-8' aria-labelledby='how-heading'>
      <div className='mx-auto max-w-6xl'>
        <h2 id='how-heading' className='text-3xl font-cv font-semibold text-neutral-900 dark:text-white sm:text-3xl'>
          How it works
        </h2>
        <p className='mt-3 max-w-xl text-neutral-500 dark:text-neutral-400'>Three steps to start accepting crypto.</p>
        <ol className='mt-14 grid gap-12 sm:grid-cols-3' role='list' aria-label='Steps to integrate'>
          {STEPS.map((item) => (
            <li key={item.step} className='flex flex-col'>
              <span
                className='text-sm font-cv font-medium tabular-nums text-neutral-400 dark:text-neutral-500'
                aria-hidden>
                {item.step}
              </span>
              <h3 className='mt-2 text-lg font-cv font-semibold text-neutral-800 dark:text-white'>{item.title}</h3>
              <p className='mt-1 text-xs md:text-sm text-neutral-500 dark:text-neutral-400'>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
