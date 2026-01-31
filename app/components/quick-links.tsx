import { MiniCard, MiniCardProps } from './ui/mini-card'

const STEPS: Array<MiniCardProps> = [
  {
    id: '01',
    title: 'Dashboard',
    description: 'Access your account dashboard.',
    icon: 'cash'
  },
  {
    id: '02',
    title: 'Developer',
    description: 'Explore our API documentation and SDKs.',
    icon: 'code'
  },
  {
    id: '03',
    title: 'Integration',
    description: 'Integrate our payments to your website.',
    icon: 'container'
  }
] as const

export function QuickLinksSection() {
  return (
    <section
      id='quick-links'
      className='border-t border-neutral-200 dark:bg-neutral-500/10 px-8 md:px-4 py-18 dark:border-neutral-900 bg-neutral-950/10 sm:px-6 sm:py-24 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <ol className='grid gap-2 sm:grid-cols-3' role='list' aria-label='Steps to integrate'>
          {STEPS.map((item) => (
            <MiniCard key={item.id} {...item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
