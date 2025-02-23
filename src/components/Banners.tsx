import React, { useState, useEffect } from 'react';

const mainBanners = [
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=800&q=80"
];

const staticBanners = {
  left: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=400&q=80",
  right: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=400&q=80"
};

export function Banners() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % mainBanners.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4 px-4">
      {/* Main rotating banner */}
      <div className="relative h-40 rounded-lg overflow-hidden">
        {mainBanners.map((banner, index) => (
          <img
            key={banner}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        {/* Dots indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mainBanners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Static banners */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded-lg overflow-hidden">
          <img
            src={staticBanners.left}
            alt="Promotion 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-24 rounded-lg overflow-hidden">
          <img
            src={staticBanners.right}
            alt="Promotion 2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}