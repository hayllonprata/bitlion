export const formatSymbol = (symbol: string) => {
  // First handle special cases for quote assets (USDT, BTC, ETH, USDC)
  const quoteAssets = ['USDT', 'BTC', 'ETH', 'USDC'];
  let formattedSymbol = symbol;
  
  // Find which quote asset is used in this symbol
  const quoteAsset = quoteAssets.find(asset => symbol.endsWith(asset));
  
  if (quoteAsset) {
    // Remove the quote asset and add it back with proper separator
    const baseAsset = symbol.slice(0, -quoteAsset.length);
    formattedSymbol = `${baseAsset}/${quoteAsset}`;
  }
  
  return formattedSymbol;
};

export const formatPrice = (price: string) => {
  const num = parseFloat(price);
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
};