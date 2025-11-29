/**
 * Zustand 全局状态（ArbitrageStore）
 * 作用：集中管理市场数据、加载状态、错误信息与告警设置等
 * 说明：
 * - marketData：页面展示所需的聚合数据
 * - addXXX：增量写入数据并做容量控制（slice），避免无限增长导致性能问题
 */
import { create } from 'zustand'
import type { MarketData, AlertSettings, ArbitrageOpportunity, PriceData, FundingRateData } from '@/types'
import type { FundingRow } from '@/api/backpack'

interface ArbitrageStore {
  marketData: MarketData
  isLoading: boolean
  error: string | null
  alertSettings: AlertSettings
  selectedTimeframe: string
  fundingRows: FundingRow[]
  fundingComparisons: { symbol: string; entries: FundingRow[] }[]

  setMarketData: (data: Partial<MarketData>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateAlertSettings: (settings: Partial<AlertSettings>) => void
  setTimeframe: (timeframe: string) => void
  addPriceData: (data: PriceData) => void
  addArbitrageOpportunity: (opportunity: ArbitrageOpportunity) => void
  addFundingRateData: (data: FundingRateData) => void
  setFundingRows: (rows: FundingRow[]) => void
}

export const useArbitrageStore = create<ArbitrageStore>(set => ({
  marketData: {
    prices: [],
    arbitrageOpportunities: [],
    fundingRates: [],
    triangularOpportunities: []
  },
  isLoading: false,
  error: null,
  alertSettings: {
    minSpreadPercentage: 0.5,
    minProfit: 10,
    enabled: true,
    soundEnabled: true,
    emailEnabled: false
  },
  selectedTimeframe: '1h',
  fundingRows: [],
  fundingComparisons: [],

  setMarketData: data =>
    set(state => ({
      // 合并局部更新，保持不可变数据结构
      marketData: { ...state.marketData, ...data }
    })),

  setLoading: loading => set({ isLoading: loading }),

  setError: error => set({ error }),

  updateAlertSettings: settings =>
    set(state => ({
      // 更新告警设置，保留既有字段
      alertSettings: { ...state.alertSettings, ...settings }
    })),

  setTimeframe: timeframe => set({ selectedTimeframe: timeframe }),

  addPriceData: data =>
    set(state => ({
      marketData: {
        ...state.marketData,
        // 价格数据保留最近 1000 条，避免内存爆涨
        prices: [...state.marketData.prices, data].slice(-1000)
      }
    })),

  addArbitrageOpportunity: opportunity =>
    set(state => ({
      marketData: {
        ...state.marketData,
        // 套利机会列表保留最新 50 条（按时间倒序）
        arbitrageOpportunities: [opportunity, ...state.marketData.arbitrageOpportunities].slice(0, 50)
      }
    })),

  addFundingRateData: data =>
    set(state => ({
      marketData: {
        ...state.marketData,
        // 资金费率数据保留最近 100 条
        fundingRates: [...state.marketData.fundingRates, data].slice(-100)
      }
    })),

  setFundingRows: rows =>
    set(() => {
      const canon = (s: string) => {
        const up = s.toUpperCase()
        if (up.includes('_')) {
          const parts = up.split('_')
          const base = parts[0]
          const quote = parts[1] || ''
          return `${base}${quote}`.replace('PERP', '')
        }
        return up.replace('PERP', '')
      }
      const map = new Map<string, FundingRow[]>()
      for (const r of rows) {
        const key = canon(r.symbol)
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(r)
      }
      const grouped = Array.from(map.entries()).map(([symbol, entries]) => ({ symbol, entries }))
      return { fundingRows: rows, fundingComparisons: grouped }
    })
}))
