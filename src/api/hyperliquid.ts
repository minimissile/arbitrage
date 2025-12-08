import { post } from '@/api/client'
import type { FundingRow } from '@/types/funding'

function nextHourTimestamp(nowMs = Date.now()): number {
  const base = new Date(nowMs)
  base.setMinutes(0, 0, 0)
  const ts = base.getTime()
  return ts <= nowMs ? ts + 60 * 60 * 1000 : ts
}

export async function fetchHyperliquidFundingRows(): Promise<FundingRow[]> {
  try {
    const body = { type: 'metaAndAssetCtxs' }
    const resp: any = await post<any>('/hyperliquid/info', body, {
      headers: { 'Content-Type': 'application/json' }
    })
    const meta = Array.isArray(resp) ? resp[0] : resp?.meta
    const ctxs = Array.isArray(resp) ? resp[1] : resp?.assetCtxs
    const universe: any[] = meta?.universe ?? []
    const rows: FundingRow[] = []
    const cycle = 1
    const nextTs = nextHourTimestamp()
    for (let i = 0; i < Math.min(universe.length, Array.isArray(ctxs) ? ctxs.length : 0); i++) {
      const coin = String(universe[i]?.name ?? '').toUpperCase()
      const ctx = ctxs[i] ?? {}
      const rate = Number(ctx?.funding ?? 0)
      const price = Number(ctx?.markPx ?? ctx?.oraclePx ?? ctx?.midPx ?? 0)
      if (!coin) continue
      rows.push({
        exchange: 'Hyperliquid',
        symbol: coin,
        fundingRate: rate,
        nextFundingTimestamp: nextTs,
        price,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      })
    }
    return rows
  } catch {
    return []
  }
}

export async function fetchHyperliquidFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const body = { type: 'metaAndAssetCtxs' }
    const resp: any = await post<any>('/hyperliquid/info', body, {
      headers: { 'Content-Type': 'application/json' }
    })
    const meta = Array.isArray(resp) ? resp[0] : resp?.meta
    const ctxs = Array.isArray(resp) ? resp[1] : resp?.assetCtxs
    const universe: any[] = meta?.universe ?? []
    const target = String(symbol).toUpperCase()
    const idx = universe.findIndex(u => String(u?.name ?? '').toUpperCase() === target)
    if (idx < 0) return null
    const ctx = Array.isArray(ctxs) ? ctxs[idx] : null
    const rate = Number(ctx?.funding ?? 0)
    const price = Number(ctx?.markPx ?? ctx?.oraclePx ?? ctx?.midPx ?? 0)
    const cycle = 1
    const nextTs = nextHourTimestamp()
    return {
      exchange: 'Hyperliquid',
      symbol: target,
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
