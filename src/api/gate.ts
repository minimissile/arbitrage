import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

const BASE = '/gate/api/v4'
const SETTLE = 'usdt'

function canonBaseSymbol(contract: string): string {
  const up = String(contract || '').toUpperCase()
  // Gate 合约命名类似 BTC_USDT、ETH_USDT
  const m = up.match(/^([A-Z0-9]+)[_-]USDT$/)
  return m ? m[1] : up.replace(/[._-]?USDT$/, '')
}

export async function fetchGateFundingRows(): Promise<FundingRow[]> {
  try {
    const url = `${BASE}/futures/${SETTLE}/contracts`
    const list: any[] = await get<any[]>(url)
    if (!Array.isArray(list)) return []
    return list
      .filter(i =>
        String(i?.name ?? '')
          .toUpperCase()
          .endsWith('USDT')
      )
      .map(item => {
        const name = String(item?.name ?? '')
        const symbol = canonBaseSymbol(name)
        const rate = Number(item?.funding_rate ?? item?.funding_rate_indicative ?? 0)
        const intervalSec = Number(item?.funding_interval ?? 0)
        const cycle = intervalSec ? intervalSec / 3600 : 8
        const nextApplySec = Number(item?.funding_next_apply ?? 0)
        const nextTs = nextApplySec ? nextApplySec * 1000 : 0
        const price = Number(item?.mark_price ?? item?.index_price ?? item?.last_price ?? 0)
        return {
          exchange: 'Gate',
          symbol,
          fundingRate: rate,
          nextFundingTimestamp: nextTs,
          price,
          dailyFundingRate: rate * (24 / cycle),
          cycle
        } as FundingRow
      })
  } catch {
    return []
  }
}

export async function fetchGateFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const contract = `${symbol.toUpperCase()}_USDT`
    const url = `${BASE}/futures/${SETTLE}/contracts/${contract}`
    const item: any = await get<any>(url)
    if (!item || !item?.name) return null
    const name = String(item?.name ?? '')
    const base = canonBaseSymbol(name)
    const rate = Number(item?.funding_rate ?? item?.funding_rate_indicative ?? 0)
    const intervalSec = Number(item?.funding_interval ?? 0)
    const cycle = intervalSec ? intervalSec / 3600 : 8
    const nextApplySec = Number(item?.funding_next_apply ?? 0)
    const nextTs = nextApplySec ? nextApplySec * 1000 : 0
    const price = Number(item?.mark_price ?? item?.index_price ?? item?.last_price ?? 0)
    return {
      exchange: 'Gate',
      symbol: base,
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
