import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 Aster 单币种资金费率信息
 * @param symbol 币种（如 BTC、ETH）
 */
export async function fetchAsterFundingRow(symbol: string): Promise<FundingRow | null> {
  const pair = `${symbol.toUpperCase()}USDT`
  const url = `https://www.asterdex.com/bapi/futures/v1/public/future/common/real-time-funding-rate?symbol=${pair}`

  try {
    const resp: any = await get<any>(url)
    const arr: any[] = Array.isArray(resp?.data) ? resp.data : []
    const d: any = arr.length ? arr[0] : null
    if (!d) return null
    const rate = Number(d?.lastFundingRate ?? 0)
    const price = Number(d?.markPrice ?? d?.indexPrice ?? 0)
    const nextTs = Number(d?.nextFundingTime ?? 0)
    const cycle = Number(d?.fundingIntervalHours ?? 4) || 4

    return {
      exchange: 'Aster',
      symbol: symbol.toUpperCase(),
      fundingRate: rate,
      nextFundingTimestamp: nextTs,
      price,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch (_err) {
    return null
  }
}

/**
 * 获取 Aster 全部资金费率列表（仅 USDT 结尾）
 */
export async function fetchAsterFundingRows(): Promise<FundingRow[]> {
  try {
    const url = `https://www.asterdex.com/fapi/v1/premiumIndex`
    const list: any[] = await get<any[]>(url)
    if (!Array.isArray(list)) return []
    const usdt = (list as any[]).filter(i =>
      String(i.symbol ?? '')
        .toUpperCase()
        .endsWith('USDT')
    )
    return usdt.map(item => {
      const symRaw = String(item.symbol ?? '')
      const symbol = symRaw.toUpperCase().endsWith('USDT') ? symRaw.toUpperCase().slice(0, -4) : symRaw.toUpperCase()
      const rate = Number(item.fundingRate ?? item.lastFundingRate ?? item.rate ?? item.premiumIndex ?? 0)
      const price = Number(item.markPrice ?? item.price ?? 0)
      const nextTs = Number(item.nextFundingTime ?? 0)
      const cycle = Number(item.fundingRateInterval ?? item.intervalHours ?? 1) || 1
      return {
        exchange: 'Aster',
        symbol,
        fundingRate: rate,
        nextFundingTimestamp: nextTs,
        price,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      } as FundingRow
    })
  } catch (_err) {
    return []
  }
}
