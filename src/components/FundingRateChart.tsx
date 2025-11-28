// 资金费率对比图：将各交易所资金费率按时间序列绘制折线图，便于横向比较
import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { FundingRateData } from '@/types'

interface FundingRateChartProps {
  fundingRates: FundingRateData[]
}

export function FundingRateChart({ fundingRates }: FundingRateChartProps) {
  const chartData = useMemo(() => {
    // 先按交易所分组，再按分钟聚合时间序列点
    const exchangeGroups = new Map<string, FundingRateData[]>()

    // Group funding rates by exchange
    for (const rate of fundingRates) {
      if (!exchangeGroups.has(rate.exchange)) {
        exchangeGroups.set(rate.exchange, [])
      }
      exchangeGroups.get(rate.exchange)!.push(rate)
    }

    // 构建时间序列数据结构（按分钟对齐）
    const timeSeries = new Map<number, any>()

    for (const [exchange, rates] of exchangeGroups) {
      for (const rate of rates) {
        const timeKey = Math.floor(rate.timestamp / (60 * 1000)) * (60 * 1000) // Group by minute
        if (!timeSeries.has(timeKey)) {
          timeSeries.set(timeKey, { time: new Date(timeKey).toLocaleTimeString() })
        }
        timeSeries.get(timeKey)[exchange] = (rate.fundingRate * 100).toFixed(4)
      }
    }

    return Array.from(timeSeries.values())
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(-20) // Last 20 data points
  }, [fundingRates])

  const exchanges = useMemo(() => {
    // 提取参与绘制的交易所集合
    const uniqueExchanges = new Set(fundingRates.map(rate => rate.exchange))
    return Array.from(uniqueExchanges)
  }, [fundingRates])

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

  if (chartData.length === 0) {
    return <div className="flex h-64 items-center justify-center text-gray-500">暂无资金费率数据</div>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} label={{ value: '资金费率（%）', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: any) => [`${value}%`, '资金费率']}
          />
          <Legend />

          {exchanges.map((exchange, index) => (
            <Line
              key={exchange}
              type="monotone"
              dataKey={exchange}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={`${exchange} 资金费率`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
