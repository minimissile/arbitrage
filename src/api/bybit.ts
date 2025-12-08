import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 bybit 资金费率列表
 */
export async function fetchBybitFundingRows(): Promise<FundingRow[]> {
  const path = '/v5/market/tickers'
  const params = { category: 'linear' }
  // 最低成交额
  const minTurnover24h = 100000

  try {
    const data = await get<any>(`/bybit${path}`, { params })
    const list = data?.result?.list ?? []
    // 保留USDT结尾的合约以及成交额大于100000的合约
    const filtered = (list as any[]).filter(i => {
      const symOk = String(i.symbol ?? '')
        .toUpperCase()
        .endsWith('USDT')
      const turnover = Number(i.turnover24h ?? 0)
      return symOk && turnover >= minTurnover24h
    })

    return filtered.map(item => {
      const rate = Number(item.fundingRate ?? 0)
      const price = Number(item.lastPrice ?? item.markPrice ?? item.indexPrice ?? 0)
      const ts = Number(item.nextFundingTime ?? 0)
      const cycle = Number(item.fundingRateInterval ?? 4)

      const raw = String(item.symbol ?? '')
      const base = raw.toUpperCase().endsWith('USDT') ? raw.toUpperCase().slice(0, -4) : raw.toUpperCase()
      return {
        exchange: 'Bybit',
        symbol: base,
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      }
    })
  } catch (_err) {
    return []
  }
}

export async function fetchBybitFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const path = '/v5/market/tickers'
    const params = { category: 'linear' }
    const data = await get<any>(`/bybit${path}`, { params })
    const list: any[] = data?.result?.list ?? []
    const base = symbol.toUpperCase()
    const QUOTES = ['USDT', 'USDC', 'USD', 'BUSD']
    const canon = (s: string) => {
      const up = String(s ?? '').toUpperCase()
      const q = QUOTES.find(q => up.endsWith(q))
      return q ? up.slice(0, up.length - q.length) : up
    }
    const item = (list as any[]).find(i => canon(i.symbol) === base)
    if (!item) return null
    const rate = Number(item.fundingRate ?? 0)
    const price = Number(item.lastPrice ?? item.markPrice ?? item.indexPrice ?? 0)
    const ts = Number(item.nextFundingTime ?? 0)
    const cycle = Number(item.fundingRateInterval ?? 4) || 4
    return {
      exchange: 'Bybit',
      symbol: base,
      fundingRate: rate,
      nextFundingTimestamp: ts,
      price,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}
