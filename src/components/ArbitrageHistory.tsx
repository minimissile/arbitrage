// 套利机会历史列表：支持最小价差过滤与多维排序，展示近 20 条机会
import { useState } from 'react'
import type { ArbitrageOpportunity } from '@/types'
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'

interface ArbitrageHistoryProps {
  opportunities: ArbitrageOpportunity[]
}

export function ArbitrageHistory({ opportunities }: ArbitrageHistoryProps) {
  const [sortBy, setSortBy] = useState<'timestamp' | 'spread' | 'profit'>('spread')
  const [filterMinSpread, setFilterMinSpread] = useState(0.1)

  const sortedOpportunities = [...opportunities]
    .filter(opp => opp.spreadPercentage >= filterMinSpread)
    .sort((a, b) => {
      // 根据选择的维度排序：时间/价差/利润
      switch (sortBy) {
        case 'timestamp':
          return b.timestamp - a.timestamp
        case 'spread':
          return b.spreadPercentage - a.spreadPercentage
        case 'profit':
          return b.estimatedProfit - a.estimatedProfit
        default:
          return 0
      }
    })
    .slice(0, 20)

  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / (1000 * 60))
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes} 分钟前`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} 小时前`
    return `${Math.floor(hours / 24)} 天前`
  }

  if (sortedOpportunities.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <TrendingUp className="mx-auto mb-4 h-12 w-12 opacity-50" />
        <p>未发现套利机会</p>
        <p className="text-sm">可以尝试调整最小价差过滤条件</p>
      </div>
    )
  }

  return (
    <div>
      {/* 过滤与排序 */}
      <div className="mb-6 flex flex-wrap gap-4 rounded-lg bg-gray-50 p-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">最小价差（%）</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={filterMinSpread}
            onChange={e => setFilterMinSpread(parseFloat(e.target.value) || 0)}
            className="focus:ring-primary-500 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">排序方式</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="focus:ring-primary-500 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          >
            <option value="spread">价差（%）</option>
            <option value="timestamp">时间</option>
            <option value="profit">利润</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-3">
        {sortedOpportunities.map(opportunity => (
          <div
            key={opportunity.id}
            className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-success-100 rounded-lg p-2">
                  <TrendingUp className="text-success-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{opportunity.pair}</h4>
                  <p className="text-sm text-gray-600">
                    {opportunity.buyExchange} → {opportunity.sellExchange}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-success-600 text-lg font-bold">+{opportunity.spreadPercentage.toFixed(2)}%</p>
                <p className="text-sm text-gray-500">${opportunity.spread.toFixed(2)} spread</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingDown className="text-success-600 h-4 w-4" />
                <span className="text-gray-600">买入：</span>
                <span className="font-medium">${opportunity.buyPrice.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="text-danger-600 h-4 w-4" />
                <span className="text-gray-600">卖出：</span>
                <span className="font-medium">${opportunity.sellPrice.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="text-primary-600 h-4 w-4" />
                <span className="text-gray-600">预估利润：</span>
                <span className="text-success-600 font-medium">${opportunity.estimatedProfit.toFixed(2)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">时间：</span>
                <span className="font-medium">{formatTimeAgo(opportunity.timestamp)}</span>
              </div>
            </div>

            {opportunity.volume && opportunity.volume > 0 && (
              <div className="mt-3 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">可用成交量：</span>
                  <span className="font-medium">{opportunity.volume.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 汇总统计 */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <div>
            <p className="text-primary-600 text-2xl font-bold">{opportunities.length}</p>
            <p className="text-sm text-gray-600">总计发现</p>
          </div>
          <div>
            <p className="text-success-600 text-2xl font-bold">
              {opportunities.filter(opp => opp.spreadPercentage > 0.5).length}
            </p>
            <p className="text-sm text-gray-600">高价差（&gt;0.5%）</p>
          </div>
          <div>
            <p className="text-warning-600 text-2xl font-bold">
              ${opportunities.reduce((sum, opp) => sum + opp.estimatedProfit, 0).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">总利润潜力</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {(opportunities.reduce((sum, opp) => sum + opp.spreadPercentage, 0) / opportunities.length || 0).toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600">平均价差</p>
          </div>
        </div>
      </div>
    </div>
  )
}
