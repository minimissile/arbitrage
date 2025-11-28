import axios from 'axios'

export interface MarkPriceItem {
  symbol: string
  fundingRate: string
  indexPrice: string
  markPrice: string
  nextFundingTimestamp: number
}

export async function fetchMarkPrices(): Promise<MarkPriceItem[]> {
  const url = '/api/v1/markPrices'
  const res = await axios.get(url, {
    timeout: 10000
  })
  return res.data as MarkPriceItem[]
}

export function formatFundingRate(rateStr: string): string {
  const r = Number(rateStr)
  if (!isFinite(r)) return '-'
  return `${(r * 100).toFixed(4)}%`
}

export function formatPrice(pStr: string): string {
  const p = Number(pStr)
  if (!isFinite(p)) return '-'
  // dynamic precision based on magnitude
  return p >= 100 ? p.toFixed(2) : p >= 1 ? p.toFixed(4) : p.toFixed(6)
}

export function formatTime(ts: number): string {
  if (!ts) return '-'
  try {
    const d = new Date(ts)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  } catch {
    return '-'
  }
}
