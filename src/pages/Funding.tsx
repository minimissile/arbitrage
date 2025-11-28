import FundingRatesTable from '@/components/FundingRatesTable'

export default function Funding() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">永续资金费率</h1>
          <p className="text-sm text-gray-600">实时查看交易对资金费率与结算时间</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <FundingRatesTable />
      </div>
    </div>
  )
}
