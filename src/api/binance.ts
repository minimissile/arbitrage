import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 Binance 合约资金费率周期（小时）
 */
export async function fetchBinanceFundingCycleHours(): Promise<number> {
  try {
    const url = '/binance/bapi/futures/v1/public/future/common/get-funding-info'
    const resp: any = await get<any>(url)
    const d = resp?.data ?? resp ?? {}
    const min = Number(d?.fundingIntervalMin ?? d?.fundingIntervalMinutes ?? 480)
    return min / 60
  } catch {
    return 8
  }
}

/**
 * 获取 Binance USDT 结尾合约的实时资金费率列表
 */
export async function fetchBinanceFundingRows(): Promise<FundingRow[]> {
  try {
    const url = '/binance/fapi/v1/premiumIndex'
    const list: any[] = await get<any[]>(url)
    if (!Array.isArray(list)) return []
    const cycle = await fetchBinanceFundingCycleHours()
    return list
      .filter(i =>
        String(i.symbol ?? '')
          .toUpperCase()
          .endsWith('USDT')
      )
      .map(item => {
        const symRaw = String(item.symbol ?? '')
        const symbol = symRaw.toUpperCase().endsWith('USDT') ? symRaw.toUpperCase().slice(0, -4) : symRaw.toUpperCase()
        const rate = Number(item.lastFundingRate ?? item.fundingRate ?? item.premiumIndex ?? 0)
        const price = Number(item.markPrice ?? item.price ?? 0)
        const nextTs = Number(item.nextFundingTime ?? 0)
        return {
          exchange: 'Binance',
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

let binanceCycleMap: Record<string, number> | null = null

export async function fetchBinanceFundingCycleMap(): Promise<Record<string, number>> {
  if (binanceCycleMap) return binanceCycleMap
  try {
    const url = '/binance/bapi/futures/v1/public/future/common/get-funding-info'
    const resp: any = await get<any>(url)
    const dataArr: any[] = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : []
    const map: Record<string, number> = {}
    if (Array.isArray(dataArr) && dataArr.length) {
      for (const it of dataArr) {
        const sym = String(it?.symbol ?? '').toUpperCase()
        const hours = Number(it?.fundingIntervalHours ?? it?.fundingIntervalHour ?? 8) || 8
        if (sym) map[sym] = hours
      }
    } else {
      const d = resp?.data ?? resp ?? {}
      const min = Number(d?.fundingIntervalMin ?? d?.fundingIntervalMinutes ?? 480)
      const hours = min / 60
      map.DEFAULT = hours
    }
    binanceCycleMap = map
    return map
  } catch {
    binanceCycleMap = { DEFAULT: 8 }
    return binanceCycleMap
  }
}

export async function fetchBinanceFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const pair = `${symbol.toUpperCase()}USDT`
    const url = `/binance/fapi/v1/premiumIndex?symbol=${pair}`
    const d: any = await get<any>(url)
    if (!d || !d.symbol) return null
    const cycleMap = await fetchBinanceFundingCycleMap()
    const symKey = String(d.symbol).toUpperCase()
    const cycle = Number(cycleMap[symKey] ?? cycleMap.DEFAULT ?? 8) || 8
    const rate = Number(d.lastFundingRate ?? d.fundingRate ?? d.premiumIndex ?? 0)
    const price = Number(d.markPrice ?? d.price ?? 0)
    const nextTs = Number(d.nextFundingTime ?? 0)
    return {
      exchange: 'Binance',
      symbol: symbol.toUpperCase(),
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
