import { create } from 'zustand'
import type { FundingRow } from '@/types/funding'
import { fetchBackpackFundingRows, formatFundingRate, formatPrice, formatTime } from '@/api/backpack'
import { fetchBybitFundingRows } from '@/api/bybit'

interface FundingState {
  rows: FundingRow[]
  groups: { symbol: string; entries: FundingRow[]; delta: number; nearestTs: number }[]
  loading: boolean
  error: string | null
  load: () => Promise<void>
}

export const useFundingStore = create<FundingState>(set => ({
  rows: [],
  groups: [],
  loading: false,
  error: null,
  load: async () => {
    set({ loading: true, error: null })
    try {
      const [bp, by] = await Promise.all([fetchBackpackFundingRows(), fetchBybitFundingRows()])
      const rows = [...bp, ...by]
      const canon = (s: string) => {
        const up = s.toUpperCase()
        // Pattern like BTC_USDC_PERP / ADA_USDC_PERP → take base before first separator
        const sepMatch = up.match(/^([A-Z0-9]+)[_\-/]/)
        if (sepMatch) return sepMatch[1]
        // Remove trailing quote currency from concatenated symbols (e.g., BTCUSDT, ETHUSD, BNBUSDC)
        const QUOTES = ['USDT', 'USDC', 'USD', 'BUSD', 'EUR', 'AUD', 'GBP', 'JPY', 'BRL', 'TRY', 'IDR']
        const quote = QUOTES.find(q => up.endsWith(q))
        if (quote) return up.slice(0, up.length - quote.length)
        // Fallback: strip PERP suffix if present
        return up.replace(/[_-]?PERP$/, '')
      }
      const map = new Map<string, FundingRow[]>()
      for (const r of rows) {
        const key = canon(r.symbol)
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(r)
      }
      const groups = Array.from(map.entries())
        .map(([symbol, entries]) => {
          const rates = entries.map(e => e.fundingRate)
          const delta = Math.max(...rates) - Math.min(...rates)
          const nearestTs = entries.reduce(
            (min, e) => (min === 0 || (e.nextFundingTimestamp && e.nextFundingTimestamp < min) ? e.nextFundingTimestamp : min),
            0
          )
          return { symbol, entries, delta, nearestTs }
        })
        .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      set({ rows, groups, loading: false })
    } catch (err: any) {
      set({ loading: false, error: String(err?.message || 'load failed') })
    }
  }
}))

export const fundingFormat = { formatFundingRate, formatPrice, formatTime }
