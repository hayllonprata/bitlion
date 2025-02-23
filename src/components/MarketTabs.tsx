import React, { useState } from 'react';
import type { MarketData } from '../types/crypto';
import { PriceCard } from './PriceCard';

interface MarketTabsProps {
  marketData: MarketData;
}

export function MarketTabs({ marketData }: MarketTabsProps) {
  const [activeTab, setActiveTab] = useState('hot');
  
  const tabs = [
    { id: 'hot', label: 'Hot' },
    { id: 'topGainers', label: 'Top Gainers' },
    { id: 'topLosers', label: 'Top Losers' },
    { id: 'volLeaders', label: 'VOL Leaders' }
  ];

  // Determine which column header to show based on active tab
  const getThirdColumnHeader = () => {
    if (activeTab === 'volLeaders') {
      return '24H Volume';
    }
    return 'Change';
  };

  return (
    <div className="mt-4">
      <div className="flex space-x-4 mb-4 border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`pb-2 px-3 text-sm ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-yellow-500'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Column Headers */}
      <div className="grid grid-cols-3 px-4 py-2 text-gray-400 text-sm">
        <div>Name</div>
        <div className="text-right">Last Price</div>
        <div className="text-right">{getThirdColumnHeader()}</div>
      </div>
      
      <div className="px-4">
        {marketData[activeTab as keyof MarketData].map(price => (
          <PriceCard 
            key={price.symbol} 
            data={price} 
            showVolume={activeTab === 'volLeaders'} 
          />
        ))}
      </div>
    </div>
  );
}