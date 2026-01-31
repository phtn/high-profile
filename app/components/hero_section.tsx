'use client'

import { Icon } from '@/lib/icons'
import { motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { Tracer } from './tracer'
import { LinkButton } from './ui/link-button'

export function HeroSection() {
  return (
    <section
      className='px-4 pb-24 pt-20 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28'
      aria-labelledby='hero-heading'>
      <div className='mx-auto grid md:max-w-6xl md:gap-12 grid-cols-2 lg:items-center lg:gap-16'>
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
      <p className='mt-8 max-w-xl text-sm md:text-lg opacity-80'>Fast, reliable and top-notch security.</p>
      <div className='mt-10 flex flex-row gap-0'>
        <LinkButton href='#cta'>Get started</LinkButton>
        <LinkButton href='#how-it-works' variant='secondary'>
          How it works
        </LinkButton>
      </div>
    </div>
  )
}

const RightColumn = () => {
  const [rotationKey, setRotationKey] = useState(0)
  const handleTraceStart = useCallback(() => {
    setRotationKey((k) => k + 1)
  }, [])
  return (
    <div className='relative aspect-5/3 w-full overflow-hidden flex items-center justify-center' aria-hidden>
      <motion.div
        id='cycle-container'
        key={rotationKey}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className='absolute'>
        <Icon name='cyc' className='md:size-100 size-50' />
      </motion.div>
      <div className='absolute inset-0 flex items-center justify-center text-sm font-medium text-background'>
        <Tracer onTraceStart={handleTraceStart} />
      </div>
    </div>
  )
}
