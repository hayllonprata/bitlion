import React, { useState, useEffect } from 'react';
import { Star, MoreHorizontal, ArrowDownUp } from 'lucide-react';
import { useBinanceWebSocket } from '../hooks/useBinanceWebSocket';
import { formatPrice } from '../utils/format';
import { TradingChart } from '../components/TradingChart';

export function Trade() {
  const marketData = useBinanceWebSocket();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30min');
  const [selectedTab, setSelectedTab] = useState('Spot');
  const [selectedChartTab, setSelectedChartTab] = useState('K Line');

  // Sample data for the chart with both up and down movements
  const [chartData] = useState([
    { time: '2024-03-22', open: 2800, high: 2850, low: 2790, close: 2840 },
    { time: '2024-03-23', open: 2840, high: 2900, low: 2830, close: 2820 }, // Down candle
    { time: '2024-03-24', open: 2820, high: 2930, low: 2810, close: 2920 },
    { time: '2024-03-25', open: 2920, high: 2950, low: 2880, close: 2890 }, // Down candle
    { time: '2024-03-26', open: 2890, high: 2940, low: 2860, close: 2930 },
    { time: '2024-03-27', open: 2930, high: 2960, low: 2890, close: 2880 }, // Down candle
    { time: '2024-03-28', open: 2880, high: 2920, low: 2850, close: 2910 },
    { time: '2024-03-29', open: 2910, high: 2970, low: 2900, close: 2950 },
    { time: '2024-03-30', open: 2950, high: 2980, low: 2920, close: 2910 }, // Down candle
  ]);

  // Get ETH/USDC data from market data
  const ethData = marketData.hot.find(coin => coin.symbol === 'ETHUSDC') || {
    symbol: 'ETHUSDC',
    price: '2,813.40',
    priceChange: 1.08,
    volume: 10256.0540,
    highPrice: 2831.35,
    lowPrice: 2745.96
  };

  const timeframes = ['1min', '15min', '1day', '30min'];
  const tradingTabs = ['Spot', 'Margin', 'P2P'];
  const chartTabs = ['K Line', 'Order Book', 'Recent Trades', 'Currency'];

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <ArrowDownUp className="w-5 h-5" />
          <span className="text-lg font-medium">ETH/USDC</span>
        </div>
        <div className="flex items-center space-x-4">
          <Star className="w-5 h-5 text-gray-400" />
          <MoreHorizontal className="w-5 h-5" />
        </div>
      </div>

      {/* Trading Type Tabs */}
      <div className="flex border-b border-gray-800">
        {tradingTabs.map(tab => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center ${
              selectedTab === tab
                ? 'text-white bg-[#39393C]'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Price and Stats */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-[#00B596]">{ethData.price}</span>
          <span className="text-sm text-gray-400">≈ ${ethData.price}</span>
          <span className="text-sm text-[#00B596]">+{ethData.priceChange}%</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div>
            <div className="text-gray-400">24H High</div>
            <div>{formatPrice(ethData.highPrice.toString())}</div>
          </div>
          <div>
            <div className="text-gray-400">24H Low</div>
            <div>{formatPrice(ethData.lowPrice.toString())}</div>
          </div>
          <div>
            <div className="text-gray-400">24H Volume</div>
            <div>{ethData.volume.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex border-b border-gray-800">
        {chartTabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm ${
              selectedChartTab === tab ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setSelectedChartTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeframe Selection */}
      <div className="flex space-x-4 p-2 border-b border-gray-800">
        {timeframes.map(timeframe => (
          <button
            key={timeframe}
            className={`px-3 py-1 text-sm rounded ${
              selectedTimeframe === timeframe
                ? 'text-white border-b-2 border-yellow-500'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative bg-black">
        {selectedChartTab === 'K Line' ? (
          <TradingChart data={chartData} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            {selectedChartTab} visualization will be implemented here
          </div>
        )}
      </div>

      {/* Trading Controls */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Open Orders</span>
          <button className="text-gray-400">All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 px-6 bg-[#00B596] text-white rounded-lg font-medium">
            Buy
          </button>
          <button className="py-3 px-6 bg-[#D1425E] text-white rounded-lg font-medium">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}