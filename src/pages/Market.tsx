import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useBinanceWebSocket } from '../hooks/useBinanceWebSocket';
import { formatPrice } from '../utils/format';

export function Market() {
  const marketData = useBinanceWebSocket();
  const [selectedTab, setSelectedTab] = useState('USDT');
  
  const tabs = ['USDT', 'USDC', 'BTC', 'ETH'];

  const formatVolume = (volume: number) => {
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
    return volume.toFixed(2);
  };

  // Filter coins based on selected tab
  const filteredCoins = marketData.hot.filter(coin => {
    return coin.symbol.endsWith(selectedTab);
  });

  // Format the trading pair correctly
  const formatTradingPair = (symbol: string, quoteAsset: string) => {
    // Remove the quote asset from the end and add separator
    return symbol.slice(0, -quoteAsset.length) + '/' + quoteAsset;
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-4 bg-[#1D1D1F]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <div className="w-full bg-black/30 rounded-full py-2 pl-9 pr-4 text-sm text-gray-400">
            Search
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 px-4 py-2 border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`py-2 text-sm font-medium ${
              selectedTab === tab
                ? 'text-yellow-500 border-b-2 border-yellow-500'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Market List */}
      <div className="divide-y divide-gray-800">
        {/* Column Headers */}
        <div className="grid grid-cols-3 px-4 py-3 text-sm text-gray-400">
          <div>Market</div>
          <div className="text-right">Last Price</div>
          <div className="text-right">Change</div>
        </div>

        {/* Market Items */}
        {filteredCoins.map(coin => {
          const isPositive = coin.priceChange >= 0;
          const formattedPair = formatTradingPair(coin.symbol, selectedTab);
          
          return (
            <div key={coin.symbol} className="grid grid-cols-3 px-4 py-4 items-center">
              <div>
                <div className="text-sm font-medium text-white">
                  {formattedPair}
                </div>
                <div className="text-xs text-gray-400">
                  Vol {formatVolume(coin.volume)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white">{formatPrice(coin.price)}</div>
                <div className="text-xs text-gray-400">
                  ≈${formatPrice(coin.price)}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded text-sm text-white ${
                  isPositive ? 'bg-[#00B596]' : 'bg-[#D1425E]'
                }`}>
                  {isPositive ? '+' : ''}{coin.priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}

        {/* Show message when no coins are available for the selected tab */}
        {filteredCoins.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400">
            No trading pairs available for {selectedTab}
          </div>
        )}
      </div>
    </div>
  );
}