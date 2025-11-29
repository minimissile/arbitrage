import { useQuery } from '@tanstack/react-query'
import { get } from '@/api/client'
import { fundingFormat } from '@/hooks/querys'

export interface CoinGlassArb {
  symbol: string
  buy: {
    exchange: string
    open_interest_usd: number
    funding_rate_interval: number
    funding_rate: number
  }
  sell: {
    exchange: string
    open_interest_usd: number
    funding_rate_interval: number
    funding_rate: number
  }
  apr: number
  funding: number
  fee: number
  spread: number
  next_funding_time: number
}

export interface CoinGlassArbPage {
  items: CoinGlassArb[]
  total: number
}

/**
 * 获取CoinGlass资金费率套利
 * @param page 页码
 * @param pageSize 每页条数
 * @param usd USD金额
 */
export function useCoinGlassFundingArbQuery(page = 1, pageSize = 12, usd = 10000) {
  return useQuery<CoinGlassArbPage>({
    queryKey: ['coinGlass', 'fr-arbitrage', page, pageSize, usd],
    queryFn: async () => {
      const res = await get<{ code: string; msg: string; data: any[] }>('/coinglass/api/futures/funding-rate/arbitrage', {
        params: { usd: String(usd) }
      })
      const raw = res?.data ?? []
      const mapped: CoinGlassArb[] = (raw as any[]).map(item => ({
        symbol: String(item.symbol ?? ''),
        buy: {
          exchange: String(item.buy?.exchange ?? ''),
          open_interest_usd: Number(item.buy?.open_interest_usd ?? 0),
          funding_rate_interval: Number(item.buy?.funding_rate_interval ?? 0),
          funding_rate: Number(item.buy?.funding_rate ?? 0)
        },
        sell: {
          exchange: String(item.sell?.exchange ?? ''),
          open_interest_usd: Number(item.sell?.open_interest_usd ?? 0),
          funding_rate_interval: Number(item.sell?.funding_rate_interval ?? 0),
          funding_rate: Number(item.sell?.funding_rate ?? 0)
        },
        apr: Number(item.apr ?? 0),
        funding: Number(item.funding ?? 0),
        fee: Number(item.fee ?? 0),
        spread: Number(item.spread ?? 0),
        next_funding_time: Number(item.next_funding_time ?? 0)
      }))
      const total = mapped.length
      const start = Math.max(0, (page - 1) * pageSize)
      const end = start + pageSize
      return { items: mapped.slice(start, end), total }
    },
    refetchInterval: 20_000,
    staleTime: 15_000
  })
}

export const coinglassFormat = fundingFormat
