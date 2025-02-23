import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Assets() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSliding, setIsSliding] = useState(false);

  const handleSlideStart = () => {
    setIsSliding(true);
  };

  const handleSlideEnd = () => {
    setIsSliding(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Log In</h1>
      
      <div className="space-y-6">
        {/* Email Input */}
        <div>
          <input
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Verification Slider */}
        <div className="relative h-12 bg-[#111111] rounded">
          <div className="absolute inset-0 flex items-center px-4 text-gray-500 text-sm">
            Please slide to verify
          </div>
          <button
            className={`absolute left-0 top-0 h-full w-12 bg-yellow-500 rounded flex items-center justify-center transition-transform ${
              isSliding ? 'translate-x-[calc(100vw-112px)]' : ''
            }`}
            onMouseDown={handleSlideStart}
            onMouseUp={handleSlideEnd}
            onTouchStart={handleSlideStart}
            onTouchEnd={handleSlideEnd}
          >
            <ArrowRight className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full py-3 bg-[#39393C] text-gray-400 rounded text-center">
          Log In
        </button>

        {/* Additional Links */}
        <div className="flex justify-between text-sm mt-4">
          <div className="text-gray-500">
            No Account? <a href="#" className="text-yellow-500">Sign Up</a>
          </div>
          <a href="#" className="text-yellow-500">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}