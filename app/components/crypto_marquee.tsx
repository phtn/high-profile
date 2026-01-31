"use client";

const MOCK_PRICES = [
  { symbol: "BTC", price: "97,234.56", change: "+1.24%" },
  { symbol: "ETH", price: "3,456.78", change: "-0.52%" },
  { symbol: "SOL", price: "198.42", change: "+2.18%" },
  { symbol: "USDT", price: "1.00", change: "0.00%" },
  { symbol: "USDC", price: "1.00", change: "0.00%" },
  { symbol: "XRP", price: "2.34", change: "+0.89%" },
  { symbol: "DOGE", price: "0.38", change: "-1.12%" },
  { symbol: "AVAX", price: "42.15", change: "+3.45%" },
  { symbol: "LINK", price: "18.92", change: "+0.67%" },
  { symbol: "MATIC", price: "0.89", change: "-0.34%" },
] as const;

function TickerItem({
  symbol,
  price,
  change,
}: {
  symbol: string;
  price: string;
  change: string;
}) {
  const isPositive = change.startsWith("+") || (change.startsWith("0") && !change.includes("-"));
  return (
    <span className="flex shrink-0 items-center gap-3 whitespace-nowrap px-6 text-sm">
      <span className="font-medium text-white">{symbol}</span>
      <span className="text-neutral-300">${price}</span>
      <span
        className={
          isPositive ? "text-emerald-400" : "text-red-400"
        }
      >
        {change}
      </span>
      <span className="text-neutral-600" aria-hidden>
        ·
      </span>
    </span>
  );
}

export function CryptoMarquee() {
  return (
    <div
      className="relative overflow-hidden bg-black py-2.5"
      aria-label="Crypto prices ticker"
    >
      <div className="flex animate-marquee gap-0">
        {MOCK_PRICES.map((item) => (
          <TickerItem
            key={item.symbol}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
          />
        ))}
        {/* Duplicate for seamless loop */}
        {MOCK_PRICES.map((item) => (
          <TickerItem
            key={`${item.symbol}-dup`}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
          />
        ))}
      </div>
    </div>
  );
}
