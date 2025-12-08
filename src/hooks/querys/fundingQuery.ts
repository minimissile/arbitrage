import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { formatFundingRate, formatPrice, formatTime } from '@/utils'
import { fetchBackpackFundingRows } from '@/api/backpack'
import { fetchBybitFundingRows } from '@/api/bybit'
import { fetchReyaFundingRows } from '@/api/reya'
import type { FundingRow } from '@/types/funding'
import { v4 as uuidv4 } from 'uuid'
import { fetchAsterFundingRows } from '@/api/aster.ts'
import { fetchBinanceFundingRows } from '@/api/binance'
import { fetchBitgetFundingRows } from '@/api/bitget'
import { fetchGateFundingRows } from '@/api/gate'
import { fetchOkxFundingRows } from '@/api/okx'

/**
 * backpack 资金费率查询
 */
export function useBackpackFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'backpack'],
    queryFn: fetchBackpackFundingRows,
    refetchInterval: 30_000,
    staleTime: 20_000,
    placeholderData: keepPreviousData
  })
}

/**
 * bybit 资金费率查询
 */
export function useBybitFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'bybit'],
    queryFn: fetchBybitFundingRows,
    refetchInterval: 30_000,
    staleTime: 20_000
  })
}

/**
 * 统一资金费率查询
 */
export function useUnifiedFundingQuery() {
  return useQuery<FundingRow[]>({
    queryKey: ['funding', 'unified'],
    refetchInterval: 60_000,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const [bp, by, ry, ast, bn, bg, gt, ok] = await Promise.all([
        fetchBackpackFundingRows(),
        fetchBybitFundingRows(),
        fetchReyaFundingRows(),
        fetchAsterFundingRows(),
        fetchBinanceFundingRows(),
        fetchBitgetFundingRows(),
        fetchGateFundingRows(),
        fetchOkxFundingRows()
      ])
      const rowsRaw = [
        ...(bp ?? []),
        ...(by ?? []),
        ...(ry ?? []),
        ...(ast ?? []),
        ...(bn ?? []),
        ...(bg ?? []),
        ...(gt ?? []),
        ...(ok ?? [])
      ]
      return rowsRaw.map(r => ({ id: uuidv4(), ...r }))
    }
  })
}

/**
 * 资金费率分组
 */
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
