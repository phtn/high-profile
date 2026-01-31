'use client'

const MOCK_PRICES = [
  { symbol: 'BTC', price: '97,234.56', change: '+1.24%' },
  { symbol: 'ETH', price: '3,456.78', change: '-0.52%' },
  { symbol: 'SOL', price: '198.42', change: '+2.18%' },
  { symbol: 'USDT', price: '1.00', change: '0.00%' },
  { symbol: 'USDC', price: '1.00', change: '0.00%' },
  { symbol: 'XRP', price: '2.34', change: '+0.89%' },
  { symbol: 'AVAX', price: '42.15', change: '+3.45%' },
  { symbol: 'MATIC', price: '0.89', change: '-0.34%' }
] as const

function TickerItem({ symbol, price, change }: { symbol: string; price: string; change: string }) {
  const isPositive = change.startsWith('+') || (change.startsWith('0') && !change.includes('-'))
  return (
    <span className='flex shrink-0 items-center justify-center gap-2 whitespace-nowrap px-6 text-sm font-okx'>
      <span className='font-semibold text-white'>{symbol}</span>
      <span className='text-white'>${price}</span>
      <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
        <span className=''>{isPositive ? '▲' : '▼'}</span>
        <span className={isPositive ? 'text-emerald-300' : 'text-rose-300'}>{change}</span>
      </span>
      <span className='opacity-80 text-white' aria-hidden>
        ·
      </span>
    </span>
  )
}

export function CryptoMarquee() {
  return (
    <div className='relative overflow-hidden bg-black py-2.5' aria-label='Crypto prices ticker'>
      <div className='flex animate-marquee gap-0'>
        {MOCK_PRICES.map((item) => (
          <TickerItem key={item.symbol} symbol={item.symbol} price={item.price} change={item.change} />
        ))}
        {/* Duplicate for seamless loop */}
        {MOCK_PRICES.map((item) => (
          <TickerItem key={`${item.symbol}-dup`} symbol={item.symbol} price={item.price} change={item.change} />
        ))}
      </div>
    </div>
  )
}
