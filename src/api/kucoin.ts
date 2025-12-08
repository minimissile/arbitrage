import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

const BASE = '/kucoin/api/v1'

function toPair(symbol: string) {
  return `${symbol.toUpperCase()}USDTM`
}

function baseFromPair(pair: string) {
  const up = String(pair || '').toUpperCase()
  return up.endsWith('USDTM') ? up.slice(0, -6) : up
}

export async function fetchKucoinFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = toPair(symbol)
    const url = `${BASE}/funding-rate/${pair}/current`
    const resp: any = await get<any>(url)
    const d: any = resp?.data ?? null
    if (!d) return null
    const rate = Number(d.value ?? d.fundingRate ?? 0)
    const ts = Number(d.timePoint ?? d.fundingTime ?? 0)
    const granMs = Number(d.granularity ?? 0)
    const cycle = granMs ? granMs / 3600000 : 8
    return {
      exchange: 'KuCoin',
      symbol: baseFromPair(pair),
      fundingRate: rate,
      nextFundingTimestamp: ts,
      price: undefined,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}

export async function fetchKucoinFundingRows(): Promise<FundingRow[]> {
  try {
    const url = `${BASE}/contracts/active`
    const resp: any = await get<any>(url)
    const list: any[] = Array.isArray(resp?.data) ? resp.data : []
    const usdtm = list.filter(i =>
      String(i.symbol ?? '')
        .toUpperCase()
        .endsWith('USDTM')
    )
    const top = usdtm.slice(0, 50)
    const tasks = top.map(async c => {
      const pair = String(c.symbol)
      const frUrl = `${BASE}/funding-rate/${pair}/current`
      const frResp: any = await get<any>(frUrl)
      const d: any = frResp?.data ?? null
      if (!d) return null
      const rate = Number(d.value ?? d.fundingRate ?? 0)
      const ts = Number(d.timePoint ?? d.fundingTime ?? 0)
      const granMs = Number(d.granularity ?? 0)
      const cycle = granMs ? granMs / 3600000 : 8
      const symbol = baseFromPair(pair)
      return {
        exchange: 'KuCoin',
        symbol,
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price: undefined,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      } as FundingRow
    })
    const rows = await Promise.all(tasks)
    return rows.filter(Boolean) as FundingRow[]
  } catch {
    return []
  }
}
