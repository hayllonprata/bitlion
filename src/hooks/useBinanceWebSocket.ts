import { useState, useEffect, useRef } from 'react';
import type { CryptoPrice, MarketData } from '../types/crypto';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
const RECONNECT_DELAY = 3000; // 3 seconds

// Lista dos pares mais populares para a seção "Hot" (limitado a 10)
const HOT_PAIRS = [
  'btcusdt', 'ethbtc', 'ethusdt', 'dogeusdt', 'adaeth',
  'bnbusdt', 'avaxusdt', 'solusdt', 'xrpusdt', 'dotusdt'
];

// Lista expandida de pares para capturar mais dados
const TRADING_PAIRS = [
  // USDT pairs
  'btcusdt', 'ethusdt', 'bnbusdt', 'solusdt', 'adausdt',
  'xrpusdt', 'dotusdt', 'dogeusdt', 'maticusdt', 'linkusdt',
  'uniusdt', 'atomusdt', 'ltcusdt', 'etcusdt', 'algousdt',
  'vetusdt', 'icpusdt', 'filusdt', 'trxusdt', 'xlmusdt',
  'aaveusdt', 'cakeusdt', 'compusdt', 'sushiusdt', 'yfiusdt',
  'avaxusdt', 'nearusdt', 'ftmusdt', 'sandusdt', 'manausdt',
  'thetausdt', 'runeusdt', 'chzusdt', 'enjusdt', 'mkrusdt',

  // BTC pairs
  'ethbtc', 'bnbbtc', 'adabtc', 'xrpbtc', 'dotbtc',
  'linkbtc', 'unibtc', 'atombtc', 'ltcbtc', 'etcbtc',
  'algobtc', 'vetbtc', 'trxbtc', 'xlmbtc', 'aavebtc',
  'solbtc', 'maticbtc', 'dogebtc', 'avaxbtc', 'nearbtc',
  'ftmbtc', 'sandbtc', 'manabtc', 'runebtc', 'icpbtc',
  'filbtc', 'compbtc', 'sushbtc', 'yfibtc', 'cakebtc',
  'thetabtc', 'chzbtc', 'enjbtc', 'mkrbtc', 'onebtc',

  // ETH pairs
  'bnbeth', 'adaeth', 'linketh', 'unieth', 'atometh',
  'ltceth', 'etceth', 'aaveeth', 'competh', 'yfield',

  // USDC pairs
  'btcusdc', 'ethusdc', 'bnbusdc', 'solusdc', 'adausdc',
  'xrpusdc', 'dogeusdc', 'maticusdc', 'linkusdc', 'uniusdc',
  'atomusdc', 'ltcusdc', 'etcusdc', 'algousdc', 'vetusdc',
  'icpusdc', 'filusdc', 'trxusdc', 'xlmusdc', 'aaveusdc',
  'compusdc', 'sushiusdc', 'yfiusdc', 'avaxusdc', 'nearusdc',
  'ftmusdc', 'sandusdc', 'manausdc', 'thetausdc', 'runeusdc'
];

export function useBinanceWebSocket() {
  const [marketData, setMarketData] = useState<MarketData>({
    hot: [],
    topGainers: [],
    topLosers: [],
    volLeaders: []
  });

  const wsRef = useRef<WebSocket | null>(null);
  const pricesRef = useRef(new Map<string, CryptoPrice>());
  const reconnectTimeoutRef = useRef<number>();

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket(BINANCE_WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        // Clear any pending reconnection timeout
        if (reconnectTimeoutRef.current) {
          window.clearTimeout(reconnectTimeoutRef.current);
        }

        // Subscribe to trading pairs
        ws.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: TRADING_PAIRS.map(pair => `${pair}@ticker`),
          id: 1
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.e === '24hrTicker') {
          const price: CryptoPrice = {
            symbol: data.s,
            price: parseFloat(data.c).toFixed(8), // Updated to 8 decimal places for BTC pairs
            priceChange: parseFloat(data.P),
            volume: parseFloat(data.v),
            quoteVolume: parseFloat(data.q),
            highPrice: parseFloat(data.h),
            lowPrice: parseFloat(data.l),
            hotScore: 0
          };

          pricesRef.current.set(data.s, price);
          
          const allPrices = Array.from(pricesRef.current.values());
          
          // Mantém a ordem dos pares HOT conforme definido (limitado a 10)
          const hotPrices = HOT_PAIRS
            .map(pair => pricesRef.current.get(pair.toUpperCase()))
            .filter((price): price is CryptoPrice => price !== undefined)
            .slice(0, 10);
          
          setMarketData({
            hot: hotPrices,
            topGainers: [...allPrices]
              .sort((a, b) => b.priceChange - a.priceChange)
              .slice(0, 10),
            topLosers: [...allPrices]
              .sort((a, b) => a.priceChange - b.priceChange)
              .slice(0, 10),
            volLeaders: [...allPrices]
              .sort((a, b) => b.quoteVolume - a.quoteVolume)
              .slice(0, 10)
          });
        }
      };

      ws.onerror = () => {
        if (ws.readyState !== WebSocket.CLOSED) {
          ws.close();
        }
      };

      ws.onclose = () => {
        // Schedule reconnection
        reconnectTimeoutRef.current = window.setTimeout(() => {
          connect();
        }, RECONNECT_DELAY);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      // Schedule reconnection on error
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, RECONNECT_DELAY);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      // Cleanup on unmount
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return marketData;
}