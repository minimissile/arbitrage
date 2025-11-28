/**
 * 类型定义集合：用于描述交易所、交易对、行情数据与套利机会等核心实体
 * 说明：统一前后端数据结构，便于在状态管理与服务层之间传递与校验
 */
export interface Exchange {
  id: string;
  name: string;
  type: 'cex' | 'dex';
  baseUrl: string;
  apiKey?: string;
  apiSecret?: string;
  isActive: boolean;
}

/**
 * 交易对：如 BTC/USDT，记录该交易对在哪些交易所被监控
 */
export interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  exchanges: string[];
}

/**
 * 价格数据：统一不同交易所的返回格式
 * price/bid/ask 采用数字类型，timestamp 为毫秒时间戳
 */
export interface PriceData {
  exchange: string;
  symbol: string;
  price: number;
  timestamp: number;
  volume?: number;
  bid?: number;
  ask?: number;
}

/**
 * 套利机会：同一交易对在不同交易所的价差及收益估算
 */
export interface ArbitrageOpportunity {
  id: string;
  pair: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  spreadPercentage: number;
  estimatedProfit: number;
  timestamp: number;
  volume?: number;
}

/**
 * 资金费率数据：永续合约的资金费率与下一次结算时间
 */
export interface FundingRateData {
  exchange: string;
  symbol: string;
  fundingRate: number;
  nextFundingTime: number;
  timestamp: number;
  indexPrice?: number;
  markPrice?: number;
}

/**
 * 三角套利机会：三条交易路径构成的循环与预估收益
 */
export interface TriangularArbitrageOpportunity {
  id: string;
  path: string[];
  rates: number[];
  profit: number;
  profitPercentage: number;
  timestamp: number;
}

/**
 * 市场数据聚合：页面展示所需的多个数据集合
 */
export interface MarketData {
  prices: PriceData[];
  arbitrageOpportunities: ArbitrageOpportunity[];
  fundingRates: FundingRateData[];
  triangularOpportunities: TriangularArbitrageOpportunity[];
}

/**
 * 告警设置：用于控制前端提示与阈值
 */
export interface AlertSettings {
  minSpreadPercentage: number;
  minProfit: number;
  enabled: boolean;
  soundEnabled: boolean;
  emailEnabled: boolean;
}