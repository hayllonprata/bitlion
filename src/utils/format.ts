export const formatSymbol = (symbol: string) => {
  return symbol.replace('USDT', '/USDT')
         .replace('BTC', '/BTC')
         .split('/')
         .filter(Boolean)
         .join('/');
};

export const formatPrice = (price: string) => {
  const num = parseFloat(price);
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
};