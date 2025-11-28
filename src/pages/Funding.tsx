import FundingRatesTable from '@/components/FundingRatesTable'

export default function Funding() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">永续资金费率</h1>
      <FundingRatesTable />
    </div>
  )
}
