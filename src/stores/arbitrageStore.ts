/**
 * Zustand 全局状态（ArbitrageStore）
 * 作用：集中管理市场数据、加载状态、错误信息与告警设置等
 * 说明：
 * - marketData：页面展示所需的聚合数据
 * - addXXX：增量写入数据并做容量控制（slice），避免无限增长导致性能问题
 */
import { create } from 'zustand'
import type { CoinGlassArb } from '@/hooks/querys/coinglass'
import { fetchCoinGlassFundingArb } from '@/hooks/querys/coinglass'
import type { MarketData, AlertSettings, ArbitrageOpportunity, PriceData, FundingRateData } from '@/types'
import type { FundingRow } from '@/types/funding'

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

  coinGlassArbAll: CoinGlassArb[]
  coinGlassArbFiltered: CoinGlassArb[]
  arbPageData: CoinGlassArb[]
  arbPage: number
  arbPageSize: number
  arbTotal: number
  arbLoading: boolean
  arbError: string | null
  arbFilters: {
    search: string
    exchange: string
    minApr: number | null
    order: 'desc' | 'asc'
    sortBy: 'apr' | 'funding' | 'spread'
  }
  arbExchangeOptions: string[]
  fetchCoinGlassArb: (usd?: number) => Promise<void>
  setArbFilters: (
    filters: Partial<{
      search: string
      exchange: string
      minApr: number | null
      order: 'desc' | 'asc'
      sortBy: 'apr' | 'funding' | 'spread'
    }>
  ) => void
  setArbPage: (page: number) => void
  setArbPageSize: (size: number) => void
  _applyArbFilters: (
    items: CoinGlassArb[],
    filters: {
      search: string
      exchange: string
      minApr: number | null
      order: 'desc' | 'asc'
      sortBy: 'apr' | 'funding' | 'spread'
    }
  ) => CoinGlassArb[]
  watchlistSymbols: string[]
  watchlistData: { symbol: string; entries: FundingRow[] }[]
  watchlistLoading: boolean
  setWatchlistSymbols: (symbols: string[]) => void
  clearWatchlist: () => void
  startWatch: () => Promise<void>
  loadWatchlistFromCache: () => void
}

export const useArbitrageStore = create<ArbitrageStore>((set, get) => ({
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
    }),

  coinGlassArbAll: [],
  coinGlassArbFiltered: [],
  arbPageData: [],
  arbPage: 1,
  arbPageSize: 10,
  arbTotal: 0,
  arbLoading: false,
  arbError: null,
  arbFilters: { search: '', exchange: 'ALL', minApr: null, order: 'desc', sortBy: 'apr' },
  arbExchangeOptions: [],
  fetchCoinGlassArb: async (usd = 10000) => {
    set({ arbLoading: true, arbError: null })
    try {
      const items = await fetchCoinGlassFundingArb(usd)
      const setEx = new Set<string>()
      for (const it of items) {
        if (it?.buy?.exchange) setEx.add(it.buy.exchange)
        if (it?.sell?.exchange) setEx.add(it.sell.exchange)
      }
      const exchangeOptions = Array.from(setEx).sort()
      set({ coinGlassArbAll: items, arbExchangeOptions: exchangeOptions, arbPage: 1 })
      const { arbFilters, arbPageSize } = get()
      const filtered = get()._applyArbFilters(items, arbFilters)
      const total = filtered.length
      const pageData = filtered.slice(0, arbPageSize)
      set({ coinGlassArbFiltered: filtered, arbTotal: total, arbPageData: pageData })
    } catch (e: any) {
      const msg = String(e?.message ?? e)
      const code = (e?.code ?? '') as string
      const isAbort = code === 'ERR_CANCELED' || msg.toLowerCase().includes('abort') || msg.toLowerCase().includes('aborted')
      if (isAbort) {
        set({ arbError: null })
      } else {
        set({ arbError: msg, coinGlassArbAll: [], coinGlassArbFiltered: [], arbPageData: [], arbTotal: 0 })
      }
    } finally {
      set({ arbLoading: false })
    }
  },
  setArbFilters: filters => {
    const next = { ...get().arbFilters, ...filters }
    set({ arbFilters: next })
    const filtered = get()._applyArbFilters(get().coinGlassArbAll, next)
    const total = filtered.length
    const { arbPage, arbPageSize } = get()
    const start = Math.max(0, (arbPage - 1) * arbPageSize)
    const pageData = filtered.slice(start, start + arbPageSize)
    set({ coinGlassArbFiltered: filtered, arbTotal: total, arbPageData: pageData })
  },
  setArbPage: page => {
    const { arbPageSize, coinGlassArbFiltered } = get()
    const start = Math.max(0, (page - 1) * arbPageSize)
    const pageData = coinGlassArbFiltered.slice(start, start + arbPageSize)
    set({ arbPage: page, arbPageData: pageData })
  },
  setArbPageSize: size => {
    const { arbPage, coinGlassArbFiltered } = get()
    const start = Math.max(0, (arbPage - 1) * size)
    const pageData = coinGlassArbFiltered.slice(start, start + size)
    set({ arbPageSize: size, arbPageData: pageData })
  },

  _applyArbFilters: (
    items: CoinGlassArb[],
    filters: {
      search: string
      exchange: string
      minApr: number | null
      order: 'desc' | 'asc'
      sortBy: 'apr' | 'funding' | 'spread'
    }
  ) => {
    const q = filters.search.trim().toLowerCase()
    const min = filters.minApr ?? null
    const arr = items.filter(it => {
      const matchQ = q
        ? it.symbol?.toLowerCase().includes(q) ||
          it.buy?.exchange?.toLowerCase().includes(q) ||
          it.sell?.exchange?.toLowerCase().includes(q)
        : true
      const matchEx =
        filters.exchange === 'ALL'
          ? true
          : it.buy?.exchange?.toLowerCase() === filters.exchange.toLowerCase() ||
            it.sell?.exchange?.toLowerCase() === filters.exchange.toLowerCase()
      const matchApr = min !== null ? (it.apr ?? 0) >= min : true
      return matchQ && matchEx && matchApr
    })
    arr.sort((a, b) => {
      const pick = (x: CoinGlassArb) => {
        if (filters.sortBy === 'funding') return x.funding ?? 0
        if (filters.sortBy === 'spread') return x.spread ?? 0
        return x.apr ?? 0
      }
      const av = pick(a)
      const bv = pick(b)
      return filters.order === 'desc' ? bv - av : av - bv
    })
    return arr
  },
  watchlistSymbols: [],
  watchlistData: [],
  watchlistLoading: false,
  setWatchlistSymbols: symbols => {
    const norm = Array.from(new Set(symbols.map(s => s.trim().toUpperCase()).filter(Boolean)))
    set({ watchlistSymbols: norm })
    try {
      localStorage.setItem('arb_watchlist_symbols', JSON.stringify(norm))
    } catch {
      return
    }
  },
  clearWatchlist: () => {
    set({ watchlistSymbols: [], watchlistData: [] })
    try {
      localStorage.removeItem('arb_watchlist_symbols')
    } catch {
      return
    }
  },
  startWatch: async () => {
    set({ watchlistLoading: true })
    const syms = get().watchlistSymbols
    const now = Date.now()
    const base = new Date(now)
    base.setMinutes(0, 0, 0)
    let nextHour = base.getTime()
    if (nextHour <= now) nextHour += 60 * 60 * 1000
    const make = (exchange: string, symbol: string, cycle: number, nextTs: number): FundingRow => ({
      exchange,
      symbol,
      fundingRate: 0,
      nextFundingTimestamp: nextTs,
      price: undefined,
      dailyFundingRate: 0,
      cycle
    })
    const data = syms.map(symbol => ({
      symbol,
      entries: [make('Bybit', symbol, 4, 0), make('Backpack', symbol, 1, 0), make('Reya', symbol, 1, nextHour)]
    }))
    set({ watchlistData: data, watchlistLoading: false })
  },
  loadWatchlistFromCache: () => {
    try {
      const raw = localStorage.getItem('arb_watchlist_symbols')
      const arr = raw ? (JSON.parse(raw) as string[]) : []
      const norm = Array.from(new Set(arr.map(s => String(s).trim().toUpperCase()).filter(Boolean)))
      set({ watchlistSymbols: norm })
    } catch {
      set({ watchlistSymbols: [] })
    }
  }
}))
