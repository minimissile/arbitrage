import axios from 'axios'
import type { FundingRow } from '@/types/funding'

export interface MarkPriceItem {
  symbol: string
  fundingRate: string
  indexPrice: string
  markPrice: string
  nextFundingTimestamp: number
}

// Deprecated local type removed; using types/funding

export async function fetchBackpackFundingRows(): Promise<FundingRow[]> {
  const url = '/backpack/api/v1/markPrices'
  const res = await axios.get(url, { timeout: 10000 })
  const list = Array.isArray(res.data) ? res.data : res.data?.result ?? []
  const cycle = 8
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
}

// Bybit fetching moved to src/api/bybit.ts

// Unified funding moved to FundingStore

export function formatFundingRate(rateStr: string | number): string {
  const r = Number(rateStr)
  if (!isFinite(r)) return '-'
  return `${(r * 100).toFixed(4)}%`
}

export function formatPrice(pStr: string | number): string {
  const p = Number(pStr)
  if (!isFinite(p)) return '-'
  return p >= 100 ? p.toFixed(2) : p >= 1 ? p.toFixed(4) : p.toFixed(6)
}

export function formatTime(ts: number): string {
  if (!ts) return '-'
  try {
    const d = new Date(ts)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    return `${mm}/${dd} ${hh}:${mi}`
  } catch {
    return '-'
  }
}
