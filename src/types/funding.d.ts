export interface FundingRow {
  // 交易所
  exchange: string
  // 币种(BTC、ETH、SOL...)
  symbol: string
  // 当前资金费率(例：0.01, 计算了百分比的，展示时直接添加%)
  fundingRate: number
  // 下一次资金费率结算时间
  nextFundingTimestamp: number
  // 当前价格
  price?: number
  // 资金费率日化收益(根据资金费率结算周期计算)
  dailyFundingRate: number
  // 结算周期(多久结算一次资金费率)
  cycle: number
}
