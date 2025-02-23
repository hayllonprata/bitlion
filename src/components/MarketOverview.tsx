import React from 'react';
import type { CryptoPrice } from '../types/crypto';
import { formatPrice, formatSymbol } from '../utils/format';

interface MarketOverviewProps {
  data: CryptoPrice[];
}

export function MarketOverview({ data }: MarketOverviewProps) {
  // Take only BTC/USDT, ETH/BTC, and ETH/USDT for the overview
  const topPairs = ['BTCUSDT', 'ETHBTC', 'ETHUSDT'];
  const overviewCoins = data.filter(item => topPairs.includes(item.symbol));

  return (
    <div className="flex overflow-x-auto py-3 space-x-6 px-4">
      {overviewCoins.map((item) => (
        <div key={item.symbol} className="flex-none">
          <div className="flex items-baseline space-x-2">
            <span className="text-white text-sm font-medium">{formatSymbol(item.symbol)}</span>
            <span className={`text-xs ${item.priceChange >= 0 ? 'text-[#00B596]' : 'text-[#D1425E]'}`}>
              {item.priceChange >= 0 ? '+' : ''}{item.priceChange.toFixed(2)}%
            </span>
          </div>
          <div className={`text-2xl font-bold ${item.priceChange >= 0 ? 'text-[#00B596]' : 'text-[#D1425E]'}`}>
            {formatPrice(item.price)}
          </div>
          <div className="text-gray-400 text-xs">
            ${formatPrice(item.price)}
          </div>
        </div>
      ))}
    </div>
  );
}