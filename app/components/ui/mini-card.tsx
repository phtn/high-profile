import { Icon, IconName } from '@/lib/icons'

export interface MiniCardProps {
  id: string
  title: string
  description: string
  icon: IconName
}

export const MiniCard = ({ id, title, description, icon }: MiniCardProps) => {
  return (
    <li
      key={id}
      className='dark:bg-white bg-neutral-900 flex flex-col border border-neutral-900 hover:border-blue-500 group hover:bg-blue-500 p-8 rounded-xs'>
      <Icon
        name={icon}
        className='size-8 tabular-nums text-neutral-300 dark:text-neutral-800 group-hover:text-white'
        aria-hidden
      />
      <h3 className='mt-2 text-lg font-cv font-semibold text-white dark:text-neutral-800'>{title}</h3>
      <p className='mt-1 text-sm text-neutral-500 dark:text-neutral-600 group-hover:text-white'>{description}</p>
    </li>
  )
}
