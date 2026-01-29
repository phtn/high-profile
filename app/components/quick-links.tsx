const STEPS = [
  {
    step: '01',
    title: 'Dashboard',
    description: 'Access your account dashboard.'
  },
  {
    step: '02',
    title: 'Developer',
    description: 'Explore our API documentation and SDKs.'
  },
  {
    step: '03',
    title: 'Integration',
    description: 'Integrate our payment gateway into your website.'
  }
] as const

export function QuickLinksSection() {
  return (
    <section
      id='quick-links'
      className='border-t border-neutral-200 bg-neutral-50/50 px-4 py-18 dark:border-neutral-800 dark:bg-neutral-900/30 sm:px-6 sm:py-20 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <h2
          id='how-heading'
          className='text-lg font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-xl'>
          Quick Links
        </h2>

        <ol className='mt-14 grid gap-12 sm:grid-cols-3' role='list' aria-label='Steps to integrate'>
          {STEPS.map((item) => (
            <li
              key={item.step}
              className='flex flex-col border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 ps-4 py-4'>
              <span className='text-sm font-medium tabular-nums text-neutral-400 dark:text-neutral-500' aria-hidden>
                {item.step}
              </span>
              <h3 className='mt-2 text-lg font-medium text-neutral-900 dark:text-white'>{item.title}</h3>
              <p className='mt-1 text-sm text-neutral-500 dark:text-neutral-400'>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
