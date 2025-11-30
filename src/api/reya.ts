import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 Reya 资金费率列表
 * 来源: https://api.reya.xyz/api/markets
 */
export async function fetchReyaFundingRows(): Promise<FundingRow[]> {
  // Reya 每小时结算一次资金费率
  const cycle = 1
  const now = Date.now()
  const base = new Date(now)
  base.setMinutes(0, 0, 0)
  let nextFundingTimestamp = base.getTime()
  if (nextFundingTimestamp <= now) nextFundingTimestamp += 60 * 60 * 1000

  try {
    const list = await get<any[]>('https://api.reya.xyz/api/markets')
    if (!Array.isArray(list)) return []

    return (list as any[]).map(item => {
      const symbol = String(item.quoteToken ?? item.ticker ?? '').toUpperCase()
      const price = Number(item.markPrice ?? 0)
      const fundingRate = Number(item.fundingRate ?? 0) / 100
      // 将年化资金费率(百分比)换算为每日小数
      const annualPct = Number(item.fundingRateAnnualized ?? 0) / 100
      const dailyFundingRate = annualPct / 365

      return {
        exchange: 'Reya',
        symbol,
        fundingRate,
        nextFundingTimestamp,
        price,
        dailyFundingRate,
        cycle
      }
    })
  } catch (_err) {
    return []
  }
}
