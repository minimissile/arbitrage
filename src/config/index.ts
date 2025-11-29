// 各交易所邀请码
export const invitationCode = {
  binance: '50200949'
}

// 外部链接
export const externalLinks = {
  // binance 合约交易链接
  binanceFutures: (symbol: string) => `https://www.binance.com/zh-CN/futures/${symbol}USDT?ref=${invitationCode.binance}`,
  binanceSPot: (symbol: string) => `https://www.binance.com/zh-CN/trade/${symbol}_USDT?type=spot&ref=${invitationCode.binance}`
}

export const okxSpot = (symbol: string) => `https://www.okx.com/markets/spot/${symbol.toLowerCase()}-usdt`
export const okxFutures = (symbol: string) => `https://www.okx.com/trade-market/swap-${symbol.toLowerCase()}-usdt`
export const bybitSpot = (symbol: string) => `https://www.bybit.com/en/trade/spot/${symbol.toUpperCase()}/USDT`
export const bybitPerp = (symbol: string) => `https://www.bybit.com/en/trade/usdt/${symbol.toUpperCase()}USDT`
export const krakenSpot = (symbol: string) => `https://pro.kraken.com/app/trade/${symbol.toUpperCase()}-USDT`
export const mexcSpot = (symbol: string) => `https://www.mexc.com/exchange/${symbol.toUpperCase()}_USDT`
export const mexcFutures = (symbol: string) => `https://www.mexc.com/futures/${symbol.toUpperCase()}_USDT`
export const gateSpot = (symbol: string) => `https://www.gate.io/trade/${symbol.toUpperCase()}_USDT`
export const gateFutures = (symbol: string) => `https://www.gate.io/futures/${symbol.toUpperCase()}_USDT`
export const whitebitSpot = (symbol: string) => `https://whitebit.com/trade/${symbol.toUpperCase()}_USDT`

export function tradeUrlForExchange(exchange: string, symbol: string, type: 'spot' | 'futures' = 'spot') {
  const ex = exchange.trim().toLowerCase()
  const base = symbol.trim().toUpperCase()
  if (ex.includes('binance')) return type === 'spot' ? externalLinks.binanceSPot(base) : externalLinks.binanceFutures(base)
  if (ex.includes('okx')) return type === 'spot' ? okxSpot(base) : okxFutures(base)
  if (ex.includes('bybit')) return type === 'spot' ? bybitSpot(base) : bybitPerp(base)
  if (ex.includes('kraken')) return krakenSpot(base)
  if (ex.includes('mexc')) return type === 'spot' ? mexcSpot(base) : mexcFutures(base)
  if (ex.includes('gate')) return type === 'spot' ? gateSpot(base) : gateFutures(base)
  if (ex.includes('whitebit')) return whitebitSpot(base)
  return externalLinks.binanceSPot(base)
}
