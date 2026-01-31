'use client'

import { useCMC } from '@/hooks/use-cmc'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

const MIN_ITEM_WIDTH_PX = 180
const CYCLE_INTERVAL_MS = 4000
const MAX_SLOTS = 36

type DocumentWithStartViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<unknown> }
}

interface CryptoItemData {
  symbol: string
  price: number
  change: number
}

interface CryptoItemProps {
  symbol: string
  price: number
  change: number
}

function CryptoItem({ symbol, price, change }: CryptoItemProps) {
  const isDown = change < 0
  return (
    <div className='flex w-full min-w-0 items-center gap-2 whitespace-nowrap px-4 text-sm font-okx bg-black md:px-6'>
      <span className='font-semibold text-white'>{symbol}</span>
      <span className='text-white'>
        ${price.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
      </span>
      <span className={isDown ? 'text-rose-400' : 'text-emerald-400'}>
        <span>{isDown ? '▼' : '▲'}</span>
        <span
          className={cn('text-foreground opacity-80', {
            'text-rose-300 opacity-100': isDown,
            'text-emerald-300 opacity-100': !isDown
          })}>
          {change.toFixed(2)}%
        </span>
      </span>
    </div>
  )
}

export const CryptoFlapDisplay = () => {
  const { data } = useCMC()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setContainerWidth(el.offsetWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [data?.length])

  const prices = useMemo((): CryptoItemData[] => {
    if (!data?.length) return []
    return data.map((item) => ({
      symbol: item.symbol,
      price: item.price,
      change: item.percentChange24h
    }))
  }, [data])

  const total = prices.length

  const visibleCount = useMemo(() => {
    if (containerWidth <= 0 || total === 0) return 1
    const count = Math.max(1, Math.min(MAX_SLOTS, Math.floor(containerWidth / MIN_ITEM_WIDTH_PX)))
    return Math.min(count, total)
  }, [containerWidth, total])

  const [offset, setOffset] = useState(0)

  const advanceOffset = useCallback(() => {
    if (total === 0) return
    const doc = document as DocumentWithStartViewTransition
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        flushSync(() => {
          setOffset((prev) => (prev + 1) % total)
        })
      })
    } else {
      setOffset((prev) => (prev + 1) % total)
    }
  }, [total])

  useEffect(() => {
    if (total === 0) return
    const id = setInterval(advanceOffset, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [total, advanceOffset])

  const slots = useMemo(() => {
    if (total === 0) return []
    return Array.from({ length: visibleCount }, (_, i) => {
      const index = (offset + i) % total
      return prices[index]
    })
  }, [prices, visibleCount, offset, total])

  if (total === 0) {
    return (
      <div
        className='flex w-full items-center justify-center bg-foreground px-4 max-h-7.5 min-h-7.5 border-b border-dotted border-neutral-200/80 dark:border-neutral-800'
        aria-label='Crypto prices ticker'>
        <span className='text-sm text-background opacity-60'>Loading prices…</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className='flex w-full items-center overflow-hidden bg-black min-h-7.5 max-h-7.5 border-b border-dotted border-neutral-200/80 dark:border-neutral-800'
      aria-label='Crypto prices ticker'>
      <div
        className='grid w-full mx-auto gap-0'
        style={{ gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))` }}>
        {slots.map((item, i) => {
          return (
            <div key={item.symbol} className='min-w-0 overflow-hidden' style={{ viewTransitionName: `flap-${i}` }}>
              <CryptoItem symbol={item.symbol} price={item.price} change={item.change} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
