// 价格热力图：按交易对展示跨交易所的最大价差与百分比，并以颜色区分风险等级
import { useMemo } from 'react'
import type { PriceData } from '@/types'

interface PriceHeatmapProps {
  prices: PriceData[]
}

export function PriceHeatmap({ prices }: PriceHeatmapProps) {
  const heatmapData = useMemo(() => {
    // 将价格按 symbol -> exchange 进行双层聚合
    const symbolGroups = new Map<string, Map<string, PriceData>>()

    // Group prices by symbol and exchange
    for (const price of prices) {
      if (!symbolGroups.has(price.symbol)) {
        symbolGroups.set(price.symbol, new Map())
      }
      symbolGroups.get(price.symbol)!.set(price.exchange, price)
    }

    // 计算每个 symbol 的最大价差与百分比
    const spreads: Array<{
      symbol: string
      exchanges: string[]
      maxSpread: number
      maxSpreadPercentage: number
      prices: { exchange: string; price: number }[]
    }> = []

    for (const [symbol, exchangePrices] of symbolGroups) {
      const prices = Array.from(exchangePrices.values())
      if (prices.length < 2) continue

      const minPrice = Math.min(...prices.map(p => p.price))
      const maxPrice = Math.max(...prices.map(p => p.price))
      const maxSpread = maxPrice - minPrice
      const maxSpreadPercentage = (maxSpread / minPrice) * 100

      spreads.push({
        symbol,
        exchanges: Array.from(exchangePrices.keys()),
        maxSpread,
        maxSpreadPercentage,
        prices: prices.map(p => ({ exchange: p.exchange, price: p.price }))
      })
    }

    return spreads.sort((a, b) => b.maxSpreadPercentage - a.maxSpreadPercentage)
  }, [prices])

  const getSpreadColor = (spreadPercentage: number) => {
    // 根据价差百分比映射颜色：>1% 红色，>0.5% 橙色，>0.2% 绿色，其余灰色
    if (spreadPercentage > 1) return 'bg-danger-500'
    if (spreadPercentage > 0.5) return 'bg-warning-500'
    if (spreadPercentage > 0.2) return 'bg-success-500'
    return 'bg-gray-300'
  }

  const getTextColor = (spreadPercentage: number) => {
    // 价差区块文字颜色：高亮区块使用白字，其余使用深色
    if (spreadPercentage > 0.2) return 'text-white'
    return 'text-gray-900'
  }

  if (heatmapData.length === 0) {
    return <div className="flex h-64 items-center justify-center text-gray-500">暂无价格数据</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {heatmapData.slice(0, 10).map(item => (
          <div
            key={item.symbol}
            className={`rounded-lg p-4 ${getSpreadColor(item.maxSpreadPercentage)} ${getTextColor(item.maxSpreadPercentage)}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">{item.symbol}</span>
              <span className="text-sm font-medium">最大价差 {item.maxSpreadPercentage.toFixed(2)}%</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {item.prices.map(price => (
                <div key={price.exchange} className="flex justify-between">
                  <span>{price.exchange}：</span>
                  <span>${price.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-opacity-20 mt-2 border-t border-white pt-2">
              <div className="flex justify-between text-xs opacity-80">
                <span>交易所：{item.exchanges.join(', ')}</span>
                <span>价差：${item.maxSpread.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {heatmapData.length > 10 && (
        <div className="text-center text-sm text-gray-500">已展示前 10 条机会，剩余 {heatmapData.length - 10} 条</div>
      )}
    </div>
  )
}
