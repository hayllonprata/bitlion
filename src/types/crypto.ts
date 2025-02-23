export interface CryptoPrice {
  symbol: string;
  price: string;
  priceChange: number;
  volume: number;
  quoteVolume: number; // Volume em USDT
  highPrice: number;
  lowPrice: number;
  hotScore: number;
}

export interface MarketData {
  hot: CryptoPrice[];
  topGainers: CryptoPrice[];
  topLosers: CryptoPrice[];
  volLeaders: CryptoPrice[];
}