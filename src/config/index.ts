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
