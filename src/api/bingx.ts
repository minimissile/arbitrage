import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function toPair(symbol: string) {
  return `${symbol.toUpperCase()}-USDT`
}

export async function fetchBingxFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = toPair(symbol)
    const url = `/bingx/openApi/swap/v2/fundingRate?symbol=${pair}`
    const resp: any = await get<any>(url)
    const d: any = Array.isArray(resp?.data) ? resp.data[0] : (resp?.data ?? resp)
    if (!d) return null
    const rate = Number(d.fundingRate ?? d.lastFundingRate ?? 0)
    const nextTs = Number(d.nextFundingTime ?? d.nextSettleTime ?? 0)
    const cycle = Number(d.fundingIntervalHours ?? d.fundingRateInterval ?? 8) || 8
    return {
      exchange: 'BingX',
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

export async function fetchBingxFundingRows(): Promise<FundingRow[]> {
  try {
    const bases = ['BTC', 'ETH', 'SOL', 'BNB']
    const tasks = bases.map(b => fetchBingxFundingRow(b))
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
