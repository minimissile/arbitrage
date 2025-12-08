import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function toSymbol(symbol: string) {
  return `${symbol.toUpperCase()}-USDT`
}

export async function fetchApexFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = toSymbol(symbol)
    const url = `/apex/api/v3/history-funding?symbol=${pair}`
    const resp: any = await get<any>(url)
    const arr: any[] = resp?.historyFunds ?? []
    const last = arr.length ? arr[arr.length - 1] : null
    if (!last) return null
    const rate = Number(last.rate ?? 0)
    const price = Number(last.price ?? 0)
    const nextTs = Number(last.fundingTimestamp ?? last.fundingTime ?? 0)
    const cycle = 1
    return {
      exchange: 'ApeX',
      symbol: String(symbol).toUpperCase(),
      fundingRate: rate,
      nextFundingTimestamp: nextTs,
      price,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}

export async function fetchApexFundingRows(): Promise<FundingRow[]> {
  try {
    const bases = ['BTC', 'ETH', 'SOL', 'BNB']
    const tasks = bases.map(b => fetchApexFundingRow(b))
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
