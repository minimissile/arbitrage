import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 bybit 资金费率
 */
export async function fetchBybitFundingRows(): Promise<FundingRow[]> {
  const path = '/v5/market/tickers'
  const params = { category: 'linear' }

  try {
    const data = await get<any>(`/bybit${path}`, { params })
    const list = data?.result?.list ?? []
    console.log('list', list.length)
    const filtered = (list as any[]).filter(i => {
      return String(i.symbol ?? '')
        .toUpperCase()
        .endsWith('USDT')
    })
    console.log('filtered', filtered.length)
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
