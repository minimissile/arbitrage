// 各交易所邀请码
export const invitationCode = {
  binance: '50200949',
  reya: 'h9kehws7',
  aster: '17b881',
  edgex: '533945374'
}

// 外部链接
export const externalLinks = {
  // binance 合约交易链接
  binanceFutures: (symbol: string) => `https://www.binance.com/zh-CN/futures/${symbol}USDT?ref=${invitationCode.binance}`,
  // binance 现货交易链接
  binanceSPot: (symbol: string) => `https://www.binance.com/zh-CN/trade/${symbol}_USDT?type=spot&ref=${invitationCode.binance}`,
  // okx 现货交易链接
  okxSpot: (symbol: string) => `https://www.okx.com/markets/spot/${symbol.toLowerCase()}-usdt`,
  // okx 合约交易链接
  okxFutures: (symbol: string) => `https://www.okx.com/trade-market/swap-${symbol.toLowerCase()}-usdt`,
  // bybit 现货交易链接
  bybitSpot: (symbol: string) => `https://www.bybit.com/en/trade/spot/${symbol.toUpperCase()}/USDT`,
  // bybit 合约交易链接
  bybitPerp: (symbol: string) => `https://www.bybit.com/en/trade/usdt/${symbol.toUpperCase()}USDT`,
  // kraken 现货交易链接
  krakenSpot: (symbol: string) => `https://pro.kraken.com/app/trade/${symbol.toUpperCase()}-USDT`,
  // mexc 现货交易链接
  mexcSpot: (symbol: string) => `https://www.mexc.com/exchange/${symbol.toUpperCase()}_USDT`,
  // mexc 合约交易链接
  mexcFutures: (symbol: string) => `https://www.mexc.com/futures/${symbol.toUpperCase()}_USDT`,
  // gate 现货交易链接
  gateSpot: (symbol: string) => `https://www.gate.io/trade/${symbol.toUpperCase()}_USDT`,
  // gate 合约交易链接
  gateFutures: (symbol: string) => `https://www.gate.io/futures/${symbol.toUpperCase()}_USDT`,
  // whitebit 现货交易链接
  whitebitSpot: (symbol: string) => `https://whitebit.com/trade/${symbol.toUpperCase()}_USDT`,
  // Reya 合约交易链接
  reyaFutures: (symbol: string) => `https://app.reya.xyz/trade/${symbol.toLowerCase()}?referredBy=${invitationCode.reya}`,
  // Aster 合约交易链接
  asterFutures: (symbol: string) =>
    `https://www.asterdex.com/zh-CN/trade/pro/futures/${symbol.toUpperCase()}USDT?ref=${invitationCode.aster}`,
  // Aster 现货交易链接
  asterSpot: (symbol: string) =>
    `https://www.asterdex.com/zh-CN/trade/pro/spot/${symbol.toUpperCase()}USDT?ref=${invitationCode.aster}`,
  // EdgeX 合约交易链接
  edgexFutures: (_symbol: string) => `https://pro.edgex.exchange/referral/${invitationCode.edgex}`
}

/**
 * 获取交易所交易链接
 * @param exchange 交易所名称
 * @param symbol 交易币种
 * @param type 交易类型 spot/futures
 */
export function tradeUrlForExchange(exchange: string, symbol: string, type: 'spot' | 'futures' = 'spot') {
  const ex = exchange.trim().toLowerCase()
  const base = symbol.trim().toUpperCase()

  if (ex.includes('binance')) return type === 'spot' ? externalLinks.binanceSPot(base) : externalLinks.binanceFutures(base)
  if (ex.includes('okx')) return type === 'spot' ? externalLinks.okxSpot(base) : externalLinks.okxFutures(base)
  if (ex.includes('bybit')) return type === 'spot' ? externalLinks.bybitSpot(base) : externalLinks.bybitPerp(base)
  if (ex.includes('kraken')) return externalLinks.krakenSpot(base)
  if (ex.includes('reya')) return externalLinks.reyaFutures(base)
  if (ex.includes('mexc')) return type === 'spot' ? externalLinks.mexcSpot(base) : externalLinks.mexcFutures(base)
  if (ex.includes('gate')) return type === 'spot' ? externalLinks.gateSpot(base) : externalLinks.gateFutures(base)
  if (ex.includes('whitebit')) return externalLinks.whitebitSpot(base)
  if (ex.includes('edgex')) return externalLinks.edgexFutures(base)
  if (ex.includes('aster')) return type === 'spot' ? externalLinks.asterSpot(base) : externalLinks.asterFutures(base)

  return externalLinks.binanceSPot(base)
}
