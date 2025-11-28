/**
 * 套利服务层（ArbitrageService）
 * 作用：对统一的价格与资金费率数据进行分析，产出不同类型的套利机会
 * 包含：
 * - 价差套利（同一交易对在不同交易所的买卖差）
 * - 资金费率套利（不同交易所永续合约资金费率差）
 * - 三角套利（同一交易所内通过三条交易路径形成闭环）
 * 注意：实际交易需考虑手续费、滑点、成交量与风控，这里为检测逻辑示范
 */
/**
 * 套利服务层（ArbitrageService）
 * 作用：对统一的价格与资金费率数据进行分析，产出不同类型的套利机会
 * 包含：
 * - 价差套利（同一交易对在不同交易所的买卖差）
 * - 资金费率套利（不同交易所永续合约资金费率差）
 * - 三角套利（同一交易所内通过三条交易路径形成闭环）
 * 注意：实际交易需考虑手续费、滑点、成交量与风控，这里为检测逻辑示范
 */
import type { PriceData, ArbitrageOpportunity, FundingRateData, TriangularArbitrageOpportunity } from '@/types'

export class ArbitrageService {
  private priceHistory: Map<string, PriceData[]> = new Map()

  detectArbitrageOpportunities(prices: PriceData[]): ArbitrageOpportunity[] {
    // 将同一 symbol 的不同交易所价格合并，逐一计算买卖差
    const opportunities: ArbitrageOpportunity[] = []
    const symbolGroups = this.groupPricesBySymbol(prices)

    for (const [symbol, exchangePrices] of symbolGroups) {
      if (exchangePrices.length < 2) continue

      const opportunitiesForSymbol = this.findArbitrageForSymbol(symbol, exchangePrices)
      opportunities.push(...opportunitiesForSymbol)
    }

    return opportunities.sort((a, b) => b.spreadPercentage - a.spreadPercentage)
  }

  private groupPricesBySymbol(prices: PriceData[]): Map<string, PriceData[]> {
    // 根据 symbol 进行聚合，便于后续对每个交易对独立分析
    const groups = new Map<string, PriceData[]>()

    for (const price of prices) {
      if (!groups.has(price.symbol)) {
        groups.set(price.symbol, [])
      }
      groups.get(price.symbol)!.push(price)
    }

    return groups
  }

  private findArbitrageForSymbol(symbol: string, prices: PriceData[]): ArbitrageOpportunity[] {
    // 双层循环比较任意两个交易所价格，确定买低卖高的机会
    const opportunities: ArbitrageOpportunity[] = []

    for (let i = 0; i < prices.length; i++) {
      for (let j = i + 1; j < prices.length; j++) {
        const buyExchange = prices[i]
        const sellExchange = prices[j]

        if (buyExchange.price < sellExchange.price) {
          // spread 为绝对价差，spreadPercentage 为相对百分比
          const spread = sellExchange.price - buyExchange.price
          const spreadPercentage = (spread / buyExchange.price) * 100

          const opportunity: ArbitrageOpportunity = {
            id: `${symbol}-${buyExchange.exchange}-${sellExchange.exchange}-${Date.now()}`,
            pair: symbol,
            buyExchange: buyExchange.exchange,
            sellExchange: sellExchange.exchange,
            buyPrice: buyExchange.price,
            sellPrice: sellExchange.price,
            spread,
            spreadPercentage,
            estimatedProfit: spread * 1000, // Assuming 1000 unit trade
            timestamp: Date.now(),
            volume: Math.min(buyExchange.volume || 0, sellExchange.volume || 0)
          }

          opportunities.push(opportunity)
        }
      }
    }

    return opportunities
  }

  detectFundingRateArbitrage(fundingRates: FundingRateData[]): FundingRateData[] {
    // 简单检测：同一 symbol 的资金费率差异是否超过阈值
    const opportunities: FundingRateData[] = []
    const symbolGroups = this.groupFundingRatesBySymbol(fundingRates)

    for (const [_symbol, rates] of symbolGroups) {
      if (rates.length < 2) continue

      const maxRate = Math.max(...rates.map(r => r.fundingRate))
      const minRate = Math.min(...rates.map(r => r.fundingRate))
      const rateDifference = Math.abs(maxRate - minRate)

      if (rateDifference > 0.0001) {
        // 0.01% threshold
        opportunities.push(...rates)
      }
    }

    return opportunities
  }

  private groupFundingRatesBySymbol(rates: FundingRateData[]): Map<string, FundingRateData[]> {
    // 将资金费率按 symbol 聚合
    const groups = new Map<string, FundingRateData[]>()

    for (const rate of rates) {
      if (!groups.has(rate.symbol)) {
        groups.set(rate.symbol, [])
      }
      groups.get(rate.symbol)!.push(rate)
    }

    return groups
  }

  detectTriangularArbitrage(prices: PriceData[]): TriangularArbitrageOpportunity[] {
    // 在同一交易所内寻找三角路径，例如：BTC/USDT -> ETH/USDT -> ETH/BTC
    const opportunities: TriangularArbitrageOpportunity[] = []
    const exchangeGroups = this.groupPricesByExchange(prices)

    for (const [exchange, exchangePrices] of exchangeGroups) {
      const triangularPaths = this.findTriangularPaths(exchangePrices)

      for (const path of triangularPaths) {
        const profit = this.calculateTriangularProfit(path)
        if (profit > 0.001) {
          // 0.1% profit threshold
          opportunities.push({
            id: `${exchange}-${path.map(p => p.symbol).join('-')}-${Date.now()}`,
            path: path.map(p => p.symbol),
            rates: path.map(p => p.price),
            profit,
            profitPercentage: profit * 100,
            timestamp: Date.now()
          })
        }
      }
    }

    return opportunities.sort((a, b) => b.profit - a.profit)
  }

  private groupPricesByExchange(prices: PriceData[]): Map<string, PriceData[]> {
    // 将价格按交易所分组，用于同所内路径搜索
    const groups = new Map<string, PriceData[]>()

    for (const price of prices) {
      if (!groups.has(price.exchange)) {
        groups.set(price.exchange, [])
      }
      groups.get(price.exchange)!.push(price)
    }

    return groups
  }

  private findTriangularPaths(prices: PriceData[]): PriceData[][] {
    // 穷举可能的三角路径：以共享 quote 为入口，寻找第三条 base/quote 互换路径
    const paths: PriceData[][] = []
    // 此处不需要去重集合，直接遍历价格列表进行路径枚举

    for (const price of prices) {
      const [base, quote] = price.symbol.split('/')

      // Find potential triangular arbitrage paths
      for (const otherPrice of prices) {
        if (otherPrice.symbol === price.symbol) continue

        const [otherBase, otherQuote] = otherPrice.symbol.split('/')

        // Example: BTC/USDT -> ETH/USDT -> ETH/BTC -> BTC/USDT
        if (quote === otherQuote && base !== otherBase) {
          const thirdSymbol = `${otherBase}/${base}`
          const thirdPrice = prices.find(p => p.symbol === thirdSymbol)

          if (thirdPrice) {
            paths.push([price, otherPrice, thirdPrice])
          }
        }
      }
    }

    return paths
  }

  private calculateTriangularProfit(path: PriceData[]): number {
    // 简化模型：忽略手续费与滑点，仅根据价格推导，返回绝对收益（起始 1 单位）
    if (path.length !== 3) return 0

    const [first, second, third] = path

    // Calculate the profit from the triangular arbitrage
    // Start with 1 unit of the first asset
    const initialAmount = 1
    const amountAfterFirstTrade = initialAmount * first.price
    const amountAfterSecondTrade = amountAfterFirstTrade / second.price
    const finalAmount = amountAfterSecondTrade * third.price

    return finalAmount - initialAmount
  }

  addPriceData(data: PriceData) {
    // 记录价格历史，便于后续做趋势分析或回测
    const key = `${data.exchange}-${data.symbol}`
    if (!this.priceHistory.has(key)) {
      this.priceHistory.set(key, [])
    }

    const history = this.priceHistory.get(key)!
    history.push(data)

    // Keep only last 1000 data points
    if (history.length > 1000) {
      history.shift()
    }
  }

  getPriceHistory(exchange: string, symbol: string): PriceData[] {
    // 获取指定交易所与交易对的历史价格序列
    const key = `${exchange}-${symbol}`
    return this.priceHistory.get(key) || []
  }
}
