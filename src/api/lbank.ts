import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function toSymbol(symbol: string) {
  return `${symbol.toUpperCase()}_USDT`
}

export async function fetchLbankFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = toSymbol(symbol)
    const url = `/lbank/cfd/openApi/v1/pub/marketTicker?symbol=${pair}`
    const resp: any = await get<any>(url)
    const d: any = Array.isArray(resp?.data) ? resp.data[0] : (resp?.data ?? resp)
    if (!d) return null
    const rate = Number(d.fundingRate ?? 0)
    const cycle = Number(d.collectCycle ?? 8) || 8
    const nextTs = Number(d.nextSettleTime ?? 0)
    return {
      exchange: 'LBank',
      symbol: String(symbol).toUpperCase(),
      fundingRate: rate,
      nextFundingTimestamp: nextTs,
      price: Number(d.lastPrice ?? d.markPrice ?? d.indexPrice ?? 0),
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}

export async function fetchLbankFundingRows(): Promise<FundingRow[]> {
  try {
    const bases = ['BTC', 'ETH', 'SOL', 'BNB']
    const tasks = bases.map(b => fetchLbankFundingRow(b))
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
