import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 backpack 资金费率
 */
export async function fetchBackpackFundingRows(): Promise<FundingRow[]> {
  const url = '/backpack/api/v1/markPrices'
  const cycle = 1

  try {
    const data = await get<any>(url)
    const list = Array.isArray(data) ? data : (data?.result ?? [])

    return (list as any[]).map(item => {
      const rate = Number(item.fundingRate ?? item.funding_rate ?? 0)
      const mark = Number(item.markPrice ?? item.mark_price ?? item.indexPrice ?? item.index_price ?? 0)
      const ts = Number(item.nextFundingTimestamp ?? item.next_funding_time ?? 0)

      return {
        exchange: 'Backpack',
        symbol: String(item.symbol ?? item.market ?? ''),
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price: mark,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      }
    })
  } catch (_err) {
    return []
  }
}
