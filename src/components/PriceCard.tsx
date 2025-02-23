import React from 'react';
import type { CryptoPrice } from '../types/crypto';
import { formatPrice } from '../utils/format';

interface PriceCardProps {
  data: CryptoPrice;
  showVolume?: boolean;
}

export function PriceCard({ data, showVolume = false }: PriceCardProps) {
  const isPositive = data.priceChange >= 0;
  const approximateUsdPrice = parseFloat(data.price).toLocaleString();
  
  // Split the symbol into parts for bold formatting
  const [firstCurrency, secondCurrency] = data.symbol
    .replace('USDT', '/USDT')
    .replace('BTC', '/BTC')
    .split('/')
    .filter(Boolean);
  
  // Format volume to show K, M, B
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return (volume / 1e9).toFixed(2) + 'B';
    }
    if (volume >= 1e6) {
      return (volume / 1e6).toFixed(2) + 'M';
    }
    if (volume >= 1e3) {
      return (volume / 1e3).toFixed(2) + 'K';
    }
    return volume.toFixed(2);
  };
  
  return (
    <div className="grid grid-cols-3 items-center py-4 border-b border-gray-800">
      {/* Name Column */}
      <div>
        <div className="text-white text-sm">
          <span className="font-bold">{firstCurrency}</span>/{secondCurrency}
        </div>
      </div>

      {/* Last Price Column */}
      <div className="text-right">
        <div className="text-white text-base font-bold">{formatPrice(data.price)}</div>
        <div className="text-gray-400 text-xs">≈ ${approximateUsdPrice}</div>
      </div>

      {/* Change/Volume Column */}
      <div className="flex justify-end">
        {showVolume ? (
          <span className="text-white text-sm">
            {formatVolume(data.quoteVolume)}
          </span>
        ) : (
          <span className={`px-3 py-1 rounded text-sm text-white ${
            isPositive ? 'bg-[#00B596]' : 'bg-[#D1425E]'
          }`}>
            {isPositive ? '+' : ''}{data.priceChange.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}