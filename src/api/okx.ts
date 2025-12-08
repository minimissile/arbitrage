import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

const BASE = '/okx/api/v5'

function toInstId(symbol: string) {
  return `${symbol.toUpperCase()}-USDT-SWAP`
}

function baseFromInstId(instId: string) {
  const up = String(instId || '').toUpperCase()
  const m = up.match(/^([A-Z0-9]+)-USDT-?SWAP$/)
  return m ? m[1] : up.replace(/-USDT-?SWAP$/, '')
}

export async function fetchOkxFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const instId = toInstId(symbol)
    const url = `${BASE}/public/funding-rate?instId=${instId}`
    const resp: any = await get<any>(url)
    const d: any = Array.isArray(resp?.data) ? resp.data[0] : resp?.data
    if (!d || !d.instId) return null
    const rate = Number(d.fundingRate ?? 0)
    const prevTs = Number(d.fundingTime ?? 0)
    const nextTs = Number(d.nextFundingTime ?? 0)
    const cycle = prevTs && nextTs ? (nextTs - prevTs) / 3600000 : 8
    return {
      exchange: 'OKX',
      symbol: baseFromInstId(d.instId),
      fundingRate: rate,
      nextFundingTimestamp: nextTs || prevTs,
      price: undefined,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}

export async function fetchOkxFundingRows(): Promise<FundingRow[]> {
  try {
    const tickersUrl = `${BASE}/market/tickers?instType=SWAP`
    const resp: any = await get<any>(tickersUrl)
    const list: any[] = Array.isArray(resp?.data) ? resp.data : []
    const usdt = list.filter(i =>
      String(i.instId ?? '')
        .toUpperCase()
        .endsWith('-USDT-SWAP')
    )
    const top = usdt.slice(0, 50)
    const tasks = top.map(async t => {
      const instId = String(t.instId)
      const frUrl = `${BASE}/public/funding-rate?instId=${instId}`
      const frResp: any = await get<any>(frUrl)
      const d: any = Array.isArray(frResp?.data) ? frResp.data[0] : frResp?.data
      if (!d) return null
      const rate = Number(d.fundingRate ?? 0)
      const prevTs = Number(d.fundingTime ?? 0)
      const nextTs = Number(d.nextFundingTime ?? 0)
      const cycle = prevTs && nextTs ? (nextTs - prevTs) / 3600000 : 8
      const price = Number(t.last ?? t.lastPx ?? 0)
      return {
        exchange: 'OKX',
        symbol: baseFromInstId(instId),
        fundingRate: rate,
        nextFundingTimestamp: nextTs || prevTs,
        price,
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
