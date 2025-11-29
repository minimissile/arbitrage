import axios from 'axios'
import type { FundingRow } from '@/types/funding'

export async function fetchBybitFundingRows(): Promise<FundingRow[]> {
  const path = '/v5/market/tickers'
  const params = { category: 'linear' }
  const cycle = 8
  try {
    const res = await axios.get(`/bybit${path}`, { params, timeout: 10000 })
    const list = res.data?.result?.list ?? []
    return (list as any[]).map(item => {
      const rate = Number(item.fundingRate ?? 0)
      const price = Number(item.lastPrice ?? item.markPrice ?? item.indexPrice ?? 0)
      const ts = Number(item.nextFundingTime ?? 0)
      return {
        exchange: 'Bybit',
        symbol: String(item.symbol ?? ''),
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      }
    })
  } catch (_err) {
    const res = await axios.get(`/bybit2${path}`, { params, timeout: 10000 })
    const list = res.data?.result?.list ?? []
    return (list as any[]).map(item => {
      const rate = Number(item.fundingRate ?? 0)
      const price = Number(item.lastPrice ?? item.markPrice ?? item.indexPrice ?? 0)
      const ts = Number(item.nextFundingTime ?? 0)
      return {
        exchange: 'Bybit',
        symbol: String(item.symbol ?? ''),
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      }
    })
  }
}
