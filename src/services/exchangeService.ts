/**
 * 交易所服务层（ExchangeService）
 * 作用：统一管理各交易所配置，并提供价格与资金费率数据的拉取能力
 * 说明：
 * - 使用内置 Map 保存交易所配置，便于根据 id 读取与拓展
 * - getPriceData：按交易所类型分发到具体实现（此处演示 CEX）
 * - getFundingRate：拉取永续合约资金费率数据（示例以 Binance 为主）
 * 注意：实际生产环境需增加：鉴权、错误重试、速率限制与缓存策略
 */
import axios from 'axios'
import type { Exchange, PriceData, FundingRateData } from '@/types'

export class ExchangeService {
  private exchanges: Map<string, Exchange> = new Map()

  constructor() {
    this.initializeExchanges()
  }

  private initializeExchanges() {
    const defaultExchanges: Exchange[] = [
      {
        id: 'binance',
        name: 'Binance',
        type: 'cex',
        baseUrl: import.meta.env?.DEV ? '/binance' : 'https://api.binance.com',
        isActive: true
      },
      {
        id: 'okx',
        name: 'OKX',
        type: 'cex',
        baseUrl: import.meta.env?.DEV ? '/okx' : 'https://www.okx.com',
        isActive: true
      },
      {
        id: 'bybit',
        name: 'Bybit',
        type: 'cex',
        baseUrl: import.meta.env?.DEV ? '/bybit' : 'https://api.bybit.com',
        isActive: true
      },
      {
        id: 'backpack',
        name: 'Backpack',
        type: 'cex',
        baseUrl: import.meta.env?.DEV ? '/backpack' : 'https://api.backpack.exchange',
        isActive: true
      }
    ]

    defaultExchanges.forEach(exchange => {
      this.exchanges.set(exchange.id, exchange)
    })
  }

  async getPriceData(exchangeId: string, symbol: string): Promise<PriceData | null> {
    const exchange = this.exchanges.get(exchangeId)
    if (!exchange || !exchange.isActive) return null

    try {
      // 此处可根据不同类型（cex/dex）进行分发，当前示例以 CEX 为主
      if (exchange.type === 'cex') {
        return await this.getCEXPrice(exchange, symbol)
      }
      return null
    } catch (error) {
      console.error(`Error fetching price from ${exchangeId}:`, error)
      return null
    }
  }

  private async getCEXPrice(exchange: Exchange, symbol: string): Promise<PriceData | null> {
    try {
      let response

      switch (exchange.id) {
        case 'binance':
          // Binance 现货 24h ticker，字段统一映射到 PriceData
          response = await axios.get(`${exchange.baseUrl}/api/v3/ticker/24hr`, {
            params: { symbol: symbol.replace('/', '') }
          })
          return {
            exchange: exchange.id,
            symbol,
            price: parseFloat(response.data.lastPrice),
            timestamp: Date.now(),
            volume: parseFloat(response.data.volume),
            bid: parseFloat(response.data.bidPrice),
            ask: parseFloat(response.data.askPrice)
          }

        case 'okx': {
          response = await axios.get(`${exchange.baseUrl}/api/v5/market/ticker`, {
            params: { instId: symbol.replace('/', '-') }
          })
          const ticker = response.data.data[0]
          return {
            exchange: exchange.id,
            symbol,
            price: parseFloat(ticker.last),
            timestamp: Date.now(),
            volume: parseFloat(ticker.vol24h),
            bid: parseFloat(ticker.bidPx),
            ask: parseFloat(ticker.askPx)
          }
        }

        case 'bybit': {
          // Bybit spot tickers，返回列表，选第一项
          response = await axios.get(`${exchange.baseUrl}/v5/market/tickers`, {
            params: { category: 'spot', symbol }
          })
          const bybitTicker = response.data.result.list[0]
          return {
            exchange: exchange.id,
            symbol,
            price: parseFloat(bybitTicker.lastPrice),
            timestamp: Date.now(),
            volume: parseFloat(bybitTicker.volume24h),
            bid: parseFloat(bybitTicker.bid1Price),
            ask: parseFloat(bybitTicker.ask1Price)
          }
        }

        default:
          return null
      }
    } catch (error) {
      console.error(`Error fetching CEX price from ${exchange.id}:`, error)
      return null
    }
  }

  async getFundingRate(exchangeId: string, symbol: string): Promise<FundingRateData | null> {
    const exchange = this.exchanges.get(exchangeId)
    if (!exchange || !exchange.isActive) return null

    try {
      switch (exchange.id) {
        case 'binance': {
          const response = await axios.get(`${exchange.baseUrl}/fapi/v1/premiumIndex`, {
            params: { symbol: symbol.replace('/', '') }
          })
          const fundingData = response.data
          return {
            exchange: exchange.id,
            symbol,
            fundingRate: parseFloat(fundingData.lastFundingRate),
            nextFundingTime: Number(fundingData.nextFundingTime),
            timestamp: Date.now()
          }
        }

        default:
          return null
      }
    } catch (error) {
      console.error(`Error fetching funding rate from ${exchangeId}:`, error)
      return null
    }
  }

  async getAllFundingRates(exchangeId: string): Promise<FundingRateData[]> {
    const exchange = this.exchanges.get(exchangeId)
    if (!exchange || !exchange.isActive) return []

    try {
      switch (exchange.id) {
        case 'binance': {
          const response = await axios.get(`${exchange.baseUrl}/fapi/v1/premiumIndex`)
          const list = Array.isArray(response.data) ? response.data : [response.data]
          return list.map((item: any) => {
            const s: string = item.symbol
            let sym = s
            if (s.endsWith('USDT')) sym = `${s.slice(0, -4)}/USDT`
            else if (s.endsWith('USD')) sym = `${s.slice(0, -3)}/USD`
            else if (s.endsWith('USDC')) sym = `${s.slice(0, -4)}/USDC`
            else if (s.endsWith('BUSD')) sym = `${s.slice(0, -4)}/BUSD`
            return {
              exchange: exchange.id,
              symbol: sym,
              fundingRate: parseFloat(item.lastFundingRate),
              nextFundingTime: Number(item.nextFundingTime),
              timestamp: Date.now()
            }
          })
        }
        case 'bybit': {
          const base = exchange.baseUrl
          const resp = await axios.get(`${base}/v5/market/tickers`, {
            params: { category: 'linear' }
          })
          const list = resp.data?.result?.list || []
          return list.map((item: any) => {
            const s: string = item.symbol
            let sym = s
            if (s.endsWith('USDT')) sym = `${s.slice(0, -4)}/USDT`
            else if (s.endsWith('USD')) sym = `${s.slice(0, -3)}/USD`
            return {
              exchange: exchange.id,
              symbol: sym,
              fundingRate: parseFloat(item.fundingRate ?? '0'),
              nextFundingTime: Number(item.nextFundingTime ?? 0),
              timestamp: Date.now(),
              indexPrice: parseFloat(item.indexPrice ?? '0'),
              markPrice: parseFloat(item.markPrice ?? '0')
            }
          })
        }
        case 'backpack': {
          const resp = await axios.get(`${exchange.baseUrl}/api/v1/markPrices`)
          return (resp.data as any[]).map((item: any) => {
            const s: string = item.symbol
            const parts = s.split('_')
            const sym = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : s
            return {
              exchange: exchange.id,
              symbol: sym,
              fundingRate: parseFloat(item.fundingRate),
              nextFundingTime: Number(item.nextFundingTimestamp),
              timestamp: Date.now(),
              indexPrice: parseFloat(item.indexPrice),
              markPrice: parseFloat(item.markPrice)
            }
          })
        }
        default:
          return []
      }
    } catch (error) {
      console.error(`Error fetching all funding rates from ${exchangeId}:`, error)
      return []
    }
  }

  getActiveExchanges(): Exchange[] {
    // 过滤出当前被启用的交易所，便于前端遍历调用
    return Array.from(this.exchanges.values()).filter(ex => ex.isActive)
  }

  addExchange(exchange: Exchange) {
    // 支持运行时动态添加交易所配置
    this.exchanges.set(exchange.id, exchange)
  }

  removeExchange(exchangeId: string) {
    // 支持运行时移除交易所配置
    this.exchanges.delete(exchangeId)
  }
}
