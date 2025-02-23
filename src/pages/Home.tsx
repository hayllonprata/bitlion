import React from 'react';
import { Search } from 'lucide-react';
import { useBinanceWebSocket } from '../hooks/useBinanceWebSocket';
import { MarketTabs } from '../components/MarketTabs';
import { MarketOverview } from '../components/MarketOverview';
import { Banners } from '../components/Banners';

export function Home() {
  const marketData = useBinanceWebSocket();

  return (
    <>
      {/* Header */}
      <header className="p-3 flex items-center justify-between">
        <img 
          src="https://cbl13isq6gv9.s3.ap-northeast-1.amazonaws.com/1006/upload/c897cbb23e32cfa0269e634eaacd5597.png" 
          alt="User" 
          className="w-6 h-6"
        />
        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <div className="w-full bg-[#1D1D1F] rounded-full py-1.5 pl-9 pr-4 text-sm text-gray-400">
              Search
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1024 1024" className="w-6 h-6">
          <path 
            d="M155.4432 310.272a409.6 409.6 0 0 0 331.8272 610.6112l-22.784-57.088-5.3248-13.312 2.3552-14.08 17.0496-102.4 5.376-32.3584 31.6416-8.6528 258.7136-70.5536 49.664-106.496 9.3696-19.968 20.8896-6.9632 64.9728-21.6576a407.7568 407.7568 0 0 0-93.0816-218.2656l-7.7824 41.8304-4.608 25.088-22.8352 11.3664L665.6 390.0416v134.9632l-37.12 10.5984-179.2 51.2-40.8576 11.7248-18.9952-38.0416-70.7584-141.4144-163.2256-108.8512z m124.3648-135.7312A407.7056 407.7056 0 0 1 512 102.4c82.944 0 160.2048 24.6784 224.7168 67.072l-14.4384 77.7216-130.7648 65.4336-28.3136 14.1312v121.0368l-101.2224 28.8768-57.8048-115.5584-6.0416-12.1856-11.3152-7.5264-169.984-113.3568a412.16 412.16 0 0 1 17.3056-16.9984l45.6704-36.5056z m636.7744 401.6128l-9.1136 3.072-50.432 108.032-9.984 21.504-22.9376 6.2464-249.9584 68.1472-9.3184 55.9104 27.6992 69.2224 132.5056-46.3872a409.856 409.856 0 0 0 191.5392-285.696z" 
            fill="rgba(255, 255, 255, 1)"
          />
        </svg>
      </header>

      {/* Banners */}
      <Banners />

      {/* Market Overview */}
      <MarketOverview data={marketData.hot} />

      {/* Market Data */}
      <div className="p-4">
        <MarketTabs marketData={marketData} />
      </div>
    </>
  );
}