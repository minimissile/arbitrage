import { useState } from 'react'
import { useArbitrageStore } from '@/stores/arbitrageStore'
import { ArbitrageOverview } from '@/components/ArbitrageOverview'
import { ArbitrageHistory } from '@/components/ArbitrageHistory'
import { PriceHeatmap } from '@/components/PriceHeatmap'

export default function Dashboard() {
  const { marketData } = useArbitrageStore()
  const [monitoring, setMonitoring] = useState(true)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">套利仪表盘</h1>

      <ArbitrageOverview
        opportunities={marketData.arbitrageOpportunities}
        isMonitoring={monitoring}
        onToggleMonitoring={() => setMonitoring(m => !m)}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">机会列表</h2>
          <ArbitrageHistory opportunities={marketData.arbitrageOpportunities} />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">价格热力图</h2>
          <PriceHeatmap prices={marketData.prices} />
        </div>
      </section>
    </div>
  )
}
