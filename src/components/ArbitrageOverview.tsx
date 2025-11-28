// 套利概览卡片：汇总当前最佳机会、平均价差、总机会数与最近机会
import { TrendingUp, DollarSign, AlertTriangle, Clock } from 'lucide-react'
import type { ArbitrageOpportunity } from '@/types'

interface ArbitrageOverviewProps {
  opportunities: ArbitrageOpportunity[]
  isMonitoring: boolean
  onToggleMonitoring: () => void
}

export function ArbitrageOverview({ opportunities, isMonitoring, onToggleMonitoring }: ArbitrageOverviewProps) {
  // 计算关键指标：最佳机会、平均价差、总机会与近 5 分钟机会数
  const bestOpportunity = opportunities[0]
  const averageSpread =
    opportunities.length > 0 ? opportunities.reduce((sum, opp) => sum + opp.spreadPercentage, 0) / opportunities.length : 0

  const totalOpportunities = opportunities.length
  const recentOpportunities = opportunities.filter(
    opp => Date.now() - opp.timestamp < 5 * 60 * 1000 // Last 5 minutes
  ).length

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* 最佳机会卡片 */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">最佳机会</p>
            <p className="text-success-600 text-2xl font-bold">
              {bestOpportunity ? `${bestOpportunity.spreadPercentage.toFixed(2)}%` : '0.00%'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {bestOpportunity
                ? `${bestOpportunity.pair}（${bestOpportunity.buyExchange} → ${bestOpportunity.sellExchange}）`
                : '暂无机会'}
            </p>
          </div>
          <div className="bg-success-100 rounded-lg p-3">
            <TrendingUp className="text-success-600 h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 平均价差卡片 */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">平均价差</p>
            <p className="text-primary-600 text-2xl font-bold">{averageSpread.toFixed(2)}%</p>
            <p className="mt-1 text-xs text-gray-500">所有交易对</p>
          </div>
          <div className="bg-primary-100 rounded-lg p-3">
            <DollarSign className="text-primary-600 h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 机会总数卡片 */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">机会总数</p>
            <p className="text-warning-600 text-2xl font-bold">{totalOpportunities}</p>
            <p className="mt-1 text-xs text-gray-500">当前活跃</p>
          </div>
          <div className="bg-warning-100 rounded-lg p-3">
            <AlertTriangle className="text-warning-600 h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 最近机会卡片 */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">最近（5分钟）</p>
            <p className="text-info-600 text-2xl font-bold">{recentOpportunities}</p>
            <p className="mt-1 text-xs text-gray-500">近 5 分钟</p>
          </div>
          <div className="bg-primary-100 rounded-lg p-3">
            <Clock className="text-primary-600 h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="lg:col-span-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">监控控制</h3>
              <p className="text-sm text-gray-600">{isMonitoring ? '实时监控已开启' : '监控已暂停'}</p>
            </div>
            <button onClick={onToggleMonitoring} className={`btn-${isMonitoring ? 'secondary' : 'primary'}`}>
              {isMonitoring ? '暂停监控' : '开始监控'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
