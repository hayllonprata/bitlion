import React, { useState } from 'react';
import { ArrowLeft, Settings, Plus, Minus, Clock, BarChart2 } from 'lucide-react';
import { useBinanceWebSocket } from '../hooks/useBinanceWebSocket';
import { formatPrice } from '../utils/format';
import { TradingChart } from '../components/TradingChart';

export function Futures() {
  const marketData = useBinanceWebSocket();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30min');
  const [selectedChartTab, setSelectedChartTab] = useState('K Line');

  // Sample data for the chart with both up and down movements
  const [chartData] = useState([
    { time: '2024-03-22', open: 95300, high: 96000, low: 95200, close: 95800 },
    { time: '2024-03-23', open: 95800, high: 96200, low: 95600, close: 95700 }, // Down candle
    { time: '2024-03-24', open: 95700, high: 96500, low: 95500, close: 96400 },
    { time: '2024-03-25', open: 96400, high: 96800, low: 96200, close: 96300 }, // Down candle
    { time: '2024-03-26', open: 96300, high: 96900, low: 96100, close: 96800 },
    { time: '2024-03-27', open: 96800, high: 97000, low: 96400, close: 96300 }, // Down candle
    { time: '2024-03-28', open: 96300, high: 96700, low: 96000, close: 96600 },
    { time: '2024-03-29', open: 96600, high: 97200, low: 96500, close: 97100 },
    { time: '2024-03-30', open: 97100, high: 97400, low: 96800, close: 96700 }, // Down candle
  ]);

  // Get BTC/USDT data from market data
  const btcData = marketData.hot.find(coin => coin.symbol === 'BTCUSDT') || {
    symbol: 'BTCUSDT',
    price: '95,393.5',
    priceChange: 0.0045,
    volume: 32.48,
    highPrice: 96794.5,
    lowPrice: 95359.7
  };

  const timeframes = ['1min', '5min', '15min', '30min', '60min', '1day'];
  const chartTabs = ['K Line', 'Order Book', 'Depth Chart', 'Recent Trades'];
  const orderTabs = ['Positions', 'Open Orders', 'Trigger Orders'];

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">BTC/USDT</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Price and Stats */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold">{btcData.price}</span>
          <span className="text-sm text-gray-400">0%</span>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Mark Price</span>
            <span>{formatPrice(btcData.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24H High</span>
            <span>{formatPrice(btcData.highPrice.toString())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Index Price</span>
            <span>{formatPrice(btcData.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24H Low</span>
            <span>{formatPrice(btcData.lowPrice.toString())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24H Volume</span>
            <span>{btcData.volume.toFixed(2)}M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Funding Rate/CountDown</span>
            <span className="text-[#00B596]">+0.0045% 06:58:45</span>
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
      <div className="flex space-x-4 p-2 border-b border-gray-800 overflow-x-auto">
        {timeframes.map(timeframe => (
          <button
            key={timeframe}
            className={`px-3 py-1 text-sm whitespace-nowrap ${
              selectedTimeframe === timeframe
                ? 'text-white border-b-2 border-yellow-500'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </button>
        ))}
        <button className="px-3 py-1 text-sm text-gray-400 whitespace-nowrap">
          Indicators
        </button>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative bg-black">
        <div className="absolute left-0 top-4 flex flex-col space-y-2 p-2">
          <button className="p-2 text-gray-400 hover:text-white">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Minus className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Clock className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>
        {selectedChartTab === 'K Line' ? (
          <TradingChart data={chartData} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            {selectedChartTab} visualization will be implemented here
          </div>
        )}
      </div>

      {/* Order Tabs */}
      <div className="border-t border-gray-800">
        <div className="flex border-b border-gray-800">
          {orderTabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm ${
                tab === 'Positions' ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-4 py-3 text-sm text-gray-400 ml-auto">
            More
          </button>
        </div>

        {/* Trading Controls */}
        <div className="p-4">
          <div className="text-center text-gray-400 mb-4">
            Log In or Sign Up to trade
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-6 bg-[#00B596] text-white rounded-lg font-medium">
              Open Long
            </button>
            <button className="py-3 px-6 bg-[#D1425E] text-white rounded-lg font-medium">
              Open Short
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}