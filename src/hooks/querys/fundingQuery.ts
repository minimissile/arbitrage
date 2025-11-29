import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchBackpackFundingRows } from '@/api/backpack'
import { fetchBybitFundingRows } from '@/api/bybit'
import type { FundingRow } from '@/types/funding'
import { formatFundingRate, formatPrice, formatTime } from '@/utils'

export function useBackpackFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'backpack'],
    queryFn: fetchBackpackFundingRows,
    refetchInterval: 30_000,
    staleTime: 20_000,
    placeholderData: keepPreviousData
  })
}

export function useBybitFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'bybit'],
    queryFn: fetchBybitFundingRows,
    refetchInterval: 30_000,
    staleTime: 20_000
  })
}

export function useUnifiedFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'unified'],
    queryFn: async () => {
      const [bp, by] = await Promise.all([fetchBackpackFundingRows(), fetchBybitFundingRows()])
      const rowsRaw = [...(bp ?? []), ...(by ?? [])]
      return rowsRaw.map(r => ({
        ...r,
        id:
          globalThis.crypto && (globalThis.crypto as any).randomUUID
            ? (globalThis.crypto as any).randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      }))
    },
    refetchInterval: 30_000,
    staleTime: 20_000
  })
}

export function groupFundingRows(rows: FundingRow[]) {
  const canon = (s: string) => {
    const up = s.toUpperCase()
    const sepMatch = up.match(/^([A-Z0-9]+)[_\-/]/)
    if (sepMatch) return sepMatch[1]
    const QUOTES = ['USDT', 'USDC', 'USD', 'BUSD', 'EUR', 'AUD', 'GBP', 'JPY', 'BRL', 'TRY', 'IDR']
    const quote = QUOTES.find(q => up.endsWith(q))
    if (quote) return up.slice(0, up.length - quote.length)
    return up.replace(/[_-]?PERP$/, '')
  }
  const map = new Map<string, FundingRow[]>()
  for (const r of rows) {
    const key = canon(r.symbol)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(r)
  }
  return Array.from(map.entries())
    .map(([symbol, entries]) => {
      const dedup: Record<string, FundingRow> = {}
      for (const e of entries) {
        const ex = dedup[e.exchange]
        if (!ex || Math.abs(e.fundingRate) > Math.abs(ex.fundingRate)) dedup[e.exchange] = e
      }
      const uniq = Object.values(dedup)
      const rates = uniq.map(e => e.fundingRate)
      const delta = rates.length ? Math.max(...rates) - Math.min(...rates) : 0
      const nearestTs = uniq.reduce(
        (min, e) => (min === 0 || (e.nextFundingTimestamp && e.nextFundingTimestamp < min) ? e.nextFundingTimestamp : min),
        0
      )
      return { symbol, entries: uniq, delta, nearestTs }
    })
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
}

export const fundingFormat = { formatFundingRate, formatPrice, formatTime }
