import React from 'react';
import { Home, BookOpen, Wallet } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const MarketIcon = () => (
    <svg viewBox="0 0 1024 1024" className="w-5 h-5">
      <path d="M362.666667 149.333333h-85.333334v170.666667H128v512h149.333333v170.666667h85.333334v-170.666667H512v-512H362.666667v-170.666667z" fill={isActive('/market') ? "#F59E0B" : "rgba(144, 144, 144, 1)"} />
      <path d="M832 21.333333h-85.333333v170.666667H640v512h106.666667v170.666667h85.333333v-170.666667H938.666667v-512h-106.666667v-170.666667z" fill={isActive('/market') ? "#F59E0B" : "rgba(106, 106, 106, 1)"} />
    </svg>
  );

  const TradeIcon = () => (
    <svg viewBox="0 0 1024 1024" className="w-5 h-5">
      <path d="M626.730667 202.752a411.818667 411.818667 0 0 0-8.064-0.085333c-212.053333 0-384 162.389333-384 362.666666 0 16.938667 1.237333 33.578667 3.584 49.877334a288 288 0 1 1 388.48-412.458667z" fill={isActive('/trade') ? "#F59E0B" : "rgba(106, 106, 106, 1)"} />
      <path d="M298.666667 608a330.666667 330.666667 0 1 0 661.333333 0 330.666667 330.666667 0 1 0-661.333333 0Z" fill={isActive('/trade') ? "#F59E0B" : "rgba(144, 144, 144, 1)"} />
      <path d="M477.866667 597.333333l150.869333-150.869333L779.52 597.333333l-150.826667 150.869334z" fill={isActive('/trade') ? "#F59E0B" : "rgba(106, 106, 106, 1)"} />
    </svg>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1D1D1F] border-t border-gray-800">
      <div className="flex justify-around items-center p-3">
        <Link to="/">
          <NavItem icon={<Home className="w-5 h-5" />} label="Home" active={isActive('/')} />
        </Link>
        <Link to="/market">
          <NavItem icon={<MarketIcon />} label="Market" active={isActive('/market')} />
        </Link>
        <Link to="/trade">
          <NavItem icon={<TradeIcon />} label="Trade" active={isActive('/trade')} />
        </Link>
        <Link to="/futures">
          <NavItem icon={<BookOpen className="w-5 h-5" />} label="Futures" active={isActive('/futures')} />
        </Link>
        <Link to="/assets">
          <NavItem icon={<Wallet className="w-5 h-5" />} label="Assets" active={isActive('/assets')} />
        </Link>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div className="flex flex-col items-center">
      <span className={active ? 'text-yellow-500' : 'text-gray-400'}>
        {icon}
      </span>
      <span className={`text-xs mt-1 ${active ? 'text-yellow-500' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}