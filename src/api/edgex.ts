import { get } from '@/api/client'
import type { FundingRow } from '@/types/funding'

interface EdgexLabel {
  contractId?: number
  contract_id?: number
  symbol?: string
  contractName?: string
  name?: string
  label?: string
}

/**
 * 获取 EdgeX 合约标签列表
 */
export async function fetchEdgexContractLabels(): Promise<EdgexLabel[]> {
  try {
    const url = '/edgex/api/v1/public/contract-labels'
    const resp: any = await get<any>(url)
    const categories: any[] = Array.isArray(resp?.data) ? resp.data : []
    const labels: EdgexLabel[] = []
    for (const cat of categories) {
      const contracts: any[] = Array.isArray(cat?.contracts) ? cat.contracts : []
      for (const c of contracts) {
        labels.push({
          contractId: Number(c?.contractId ?? c?.id ?? 0) || undefined,
          contractName: String(c?.contractName ?? c?.name ?? ''),
          name: String(c?.contractName ?? ''),
          label: String(c?.contractName ?? '')
        })
      }
    }
    return labels
  } catch (_err) {
    return []
  }
}

function matchLabelToSymbol(lbl: EdgexLabel, symbol: string): boolean {
  const target = `${symbol.toUpperCase()}USD`
  const fields = [lbl.symbol, lbl.contractName, lbl.name, lbl.label]
  for (const f of fields) {
    if (f && String(f).toUpperCase() === target) return true
  }
  return false
}

/**
 * 通过合约ID获取 EdgeX 资金费率，返回首条记录
 */
export async function fetchEdgexFundingRowByContractId(contractId: number, symbol: string): Promise<FundingRow | null> {
  try {
    const url = `/edgex/api/v1/public/funding/getFundingRatePage?filterSettlementFundingRate=true&contractId=${contractId}`
    const resp: any = await get<any>(url)
    const list: any[] = Array.isArray(resp?.data?.dataList) ? resp.data.dataList : []
    const d: any = list.length ? list[0] : null
    if (!d) return null
    const rate = Number(d?.fundingRate ?? d?.settlementFundingRate ?? d?.rate ?? 0)
    const price = Number(d?.markPrice ?? d?.price ?? d?.indexPrice ?? 0)
    const fundingTime = Number(d?.fundingTime ?? d?.settlementTime ?? d?.time ?? 0)
    const cycleMin = Number(d?.fundingRateIntervalMin ?? 0)
    const cycle = cycleMin ? cycleMin / 60 : Number(d?.fundingIntervalHours ?? d?.intervalHours ?? 4) || 4
    const nextTs = fundingTime ? fundingTime + cycle * 60 * 60 * 1000 : Number(d?.nextFundingTime ?? 0)
    return {
      exchange: 'EdgeX',
      symbol: symbol.toUpperCase(),
      fundingRate: rate,
      nextFundingTimestamp: nextTs,
      price: isFinite(price) && price > 0 ? price : undefined,
      dailyFundingRate: rate * (24 / cycle),
      cycle
    }
  } catch {
    return null
  }
}

/**
 * 通过币种查找合约并返回资金费率首条记录
 */
export async function fetchEdgexFundingRowBySymbol(symbol: string): Promise<FundingRow | null> {
  const labels = await fetchEdgexContractLabels()
  const lbl = labels.find(l => matchLabelToSymbol(l, symbol))
  const id = (lbl?.contractId ?? lbl?.contract_id) as number | undefined
  if (!id) return null
  return await fetchEdgexFundingRowByContractId(id, symbol)
}
