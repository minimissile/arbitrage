import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function toSymbol(symbol: string) {
  return `${symbol.toUpperCase()}_USDT`
}

export async function fetchMexcFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = toSymbol(symbol)
    const url = `/mexc/api/v1/contract/fundingRate?symbol=${pair}`
    const resp: any = await get<any>(url)
    const d: any = resp?.data ?? resp
    if (!d || !d.symbol) return null
    const rate = Number(d.fundingRate ?? 0)
    const cycle = Number(d.collectCycle ?? 8) || 8
    const nextTs = Number(d.nextSettleTime ?? 0)
    return {
      exchange: 'MEXC',
      symbol: String(symbol).toUpperCase(),
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

export async function fetchMexcFundingRows(): Promise<FundingRow[]> {
  try {
    const bases = ['BTC', 'ETH', 'SOL', 'BNB']
    const tasks = bases.map(b => fetchMexcFundingRow(b))
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
