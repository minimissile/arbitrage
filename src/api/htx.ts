import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function toContract(symbol: string) {
  return `${symbol.toUpperCase()}-USDT`
}

function parseNextTs(v: any): number {
  if (!v) return 0
  const n = Number(v)
  if (!Number.isNaN(n) && n > 10_000_000) return n
  const d = Date.parse(String(v))
  return Number.isNaN(d) ? 0 : d
}

export async function fetchHtxFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const contract = toContract(symbol)
    const url = `/htx/linear-swap-api/v1/swap_funding_rate?contract_code=${contract}`
    const resp: any = await get<any>(url)
    const d: any = resp?.data ?? resp
    if (!d || (!d.contract_code && !d.symbol)) return null
    const rate = Number(d.funding_rate ?? 0)
    const nextTs = parseNextTs(d.next_funding_time)
    const cycle = 8
    return {
      exchange: 'HTX',
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

export async function fetchHtxFundingRows(): Promise<FundingRow[]> {
  try {
    const bases = ['BTC', 'ETH', 'SOL', 'BNB']
    const tasks = bases.map(b => fetchHtxFundingRow(b))
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
