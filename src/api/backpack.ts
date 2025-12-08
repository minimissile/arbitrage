import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

/**
 * 获取 backpack 资金费率列表
 */
export async function fetchBackpackFundingRows(): Promise<FundingRow[]> {
  const url = '/backpack/api/v1/markPrices'
  const cycle = 1

  try {
    const data = await get<any>(url)
    const list = Array.isArray(data) ? data : (data?.result ?? [])

    return (list as any[]).map(item => {
      const rate = Number(item.fundingRate ?? item.funding_rate ?? 0)
      const mark = Number(item.markPrice ?? item.mark_price ?? item.indexPrice ?? item.index_price ?? 0)
      const ts = Number(item.nextFundingTimestamp ?? item.next_funding_time ?? 0)

      return {
        exchange: 'Backpack',
        symbol: String(item.symbol ?? item.market ?? ''),
        fundingRate: rate,
        nextFundingTimestamp: ts,
        price: mark,
        dailyFundingRate: rate * (24 / cycle),
        cycle
      }
    })
  } catch (_err) {
    return []
  }
}

function canonSymbol(s: string): string {
  const up = String(s || '').toUpperCase()
  const sepMatch = up.match(/^([A-Z0-9]+)[_\-/]/)
  if (sepMatch) return sepMatch[1]
  const QUOTES = ['USDT', 'USDC', 'USD', 'BUSD', 'EUR', 'AUD', 'GBP', 'JPY', 'BRL', 'TRY', 'IDR']
  const quote = QUOTES.find(q => up.endsWith(q))
  if (quote) return up.slice(0, up.length - quote.length)
  return up.replace(/[_-]?PERP$/, '')
}

/**
 * 获取 backpack 单币种资金费率信息（通过列表匹配）
 * @param symbol 币种（如 BTC、ETH）
 */
export async function fetchBackpackFundingRow(symbol: string): Promise<FundingRow | null> {
  try {
    const list = await fetchBackpackFundingRows()
    const base = symbol.toUpperCase()
    const found = list.find(r => canonSymbol(r.symbol) === base)
    return found ?? null
  } catch {
    return null
  }
}
