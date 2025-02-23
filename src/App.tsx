import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Market } from './pages/Market';
import { Trade } from './pages/Trade';
import { Futures } from './pages/Futures';
import { Assets } from './pages/Assets';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;