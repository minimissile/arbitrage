import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

const PRODUCT_USDT = 'usdt-futures'

export async function fetchBitgetFundingRows(): Promise<FundingRow[]> {
  try {
    const url = `/bitget/api/v2/mix/market/current-fund-rate?productType=${PRODUCT_USDT}`
    const resp: any = await get<any>(url)
    const list: any[] = Array.isArray(resp?.data) ? resp.data : []
    return list
      .filter(i =>
        String(i.symbol ?? '')
          .toUpperCase()
          .endsWith('USDT')
      )
      .map(item => {
        const symRaw = String(item.symbol ?? '')
        const symbol = symRaw.toUpperCase().endsWith('USDT') ? symRaw.toUpperCase().slice(0, -4) : symRaw.toUpperCase()
        const rate = Number(item.fundingRate ?? 0)
        const cycle = Number(item.fundingRateInterval ?? item.ratePeriod ?? 8) || 8
        const nextTs = Number(item.nextUpdate ?? item.nextFundingTime ?? 0)
        return {
          exchange: 'Bitget',
          symbol,
          fundingRate: rate,
          nextFundingTimestamp: nextTs,
          price: undefined,
          dailyFundingRate: rate * (24 / cycle),
          cycle
        } as FundingRow
      })
  } catch {
    return []
  }
}

export async function fetchBitgetFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = `${symbol.toUpperCase()}USDT`
    const url = `/bitget/api/v2/mix/market/current-fund-rate?productType=${PRODUCT_USDT}&symbol=${pair}`
    const resp: any = await get<any>(url)
    const arr: any[] = Array.isArray(resp?.data) ? resp.data : []
    const d: any = arr.length ? arr[0] : null
    if (!d) return null
    const rate = Number(d.fundingRate ?? 0)
    const cycle = Number(d.fundingRateInterval ?? d.ratePeriod ?? 8) || 8
    const nextTs = Number(d.nextUpdate ?? d.nextFundingTime ?? 0)
    return {
      exchange: 'Bitget',
      symbol: symbol.toUpperCase(),
      fundingRate: rate,
      nextFundingTimestamp: nextTs,
      price: undefined,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}
