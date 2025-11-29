import type { FromSchema } from 'json-schema-to-ts'
import * as schemas from './schemas'

export type AggregatedLiquidationHistoryMetadataParam = FromSchema<typeof schemas.AggregatedLiquidationHistory.metadata>
export type AggregatedLiquidationHistoryResponse200 = FromSchema<(typeof schemas.AggregatedLiquidationHistory.response)['200']>
export type AggregatedLiquidationHistoryResponse400 = FromSchema<(typeof schemas.AggregatedLiquidationHistory.response)['400']>
export type AggregatedTakerBuysellVolumeHistoryMetadataParam = FromSchema<
  typeof schemas.AggregatedTakerBuysellVolumeHistory.metadata
>
export type AggregatedTakerBuysellVolumeHistoryResponse200 = FromSchema<
  (typeof schemas.AggregatedTakerBuysellVolumeHistory.response)['200']
>
export type AggregatedTakerBuysellVolumeHistoryResponse400 = FromSchema<
  (typeof schemas.AggregatedTakerBuysellVolumeHistory.response)['400']
>
export type AggregatedTakerBuysellVolumeRatioMetadataParam = FromSchema<typeof schemas.AggregatedTakerBuysellVolumeRatio.metadata>
export type AggregatedTakerBuysellVolumeRatioResponse200 = FromSchema<
  (typeof schemas.AggregatedTakerBuysellVolumeRatio.response)['200']
>
export type AggregatedTakerBuysellVolumeRatioResponse400 = FromSchema<
  (typeof schemas.AggregatedTakerBuysellVolumeRatio.response)['400']
>
export type Ahr999Response200 = FromSchema<(typeof schemas.Ahr999.response)['200']>
export type Ahr999Response400 = FromSchema<(typeof schemas.Ahr999.response)['400']>
export type BitcoinBubbleIndexResponse200 = FromSchema<(typeof schemas.BitcoinBubbleIndex.response)['200']>
export type BitcoinBubbleIndexResponse400 = FromSchema<(typeof schemas.BitcoinBubbleIndex.response)['400']>
export type BitcoinEtfNetassetsHistoryMetadataParam = FromSchema<typeof schemas.BitcoinEtfNetassetsHistory.metadata>
export type BitcoinEtfNetassetsHistoryResponse200 = FromSchema<(typeof schemas.BitcoinEtfNetassetsHistory.response)['200']>
export type BitcoinEtfNetassetsHistoryResponse400 = FromSchema<(typeof schemas.BitcoinEtfNetassetsHistory.response)['400']>
export type BitcoinEtfPremiumDiscountHistoryMetadataParam = FromSchema<typeof schemas.BitcoinEtfPremiumDiscountHistory.metadata>
export type BitcoinEtfPremiumDiscountHistoryResponse200 = FromSchema<
  (typeof schemas.BitcoinEtfPremiumDiscountHistory.response)['200']
>
export type BitcoinEtfPremiumDiscountHistoryResponse400 = FromSchema<
  (typeof schemas.BitcoinEtfPremiumDiscountHistory.response)['400']
>
export type BitcoinEtfsResponse200 = FromSchema<(typeof schemas.BitcoinEtfs.response)['200']>
export type BitcoinEtfsResponse400 = FromSchema<(typeof schemas.BitcoinEtfs.response)['400']>
export type BitcoinProfitableDaysResponse200 = FromSchema<(typeof schemas.BitcoinProfitableDays.response)['200']>
export type BitcoinProfitableDaysResponse400 = FromSchema<(typeof schemas.BitcoinProfitableDays.response)['400']>
export type BitcoinRainbowChartResponse200 = FromSchema<(typeof schemas.BitcoinRainbowChart.response)['200']>
export type BitcoinRainbowChartResponse400 = FromSchema<(typeof schemas.BitcoinRainbowChart.response)['400']>
export type BitfinexMarginLongShortMetadataParam = FromSchema<typeof schemas.BitfinexMarginLongShort.metadata>
export type BitfinexMarginLongShortResponse200 = FromSchema<(typeof schemas.BitfinexMarginLongShort.response)['200']>
export type BitfinexMarginLongShortResponse400 = FromSchema<(typeof schemas.BitfinexMarginLongShort.response)['400']>
export type BorrowInterestRateMetadataParam = FromSchema<typeof schemas.BorrowInterestRate.metadata>
export type BorrowInterestRateResponse200 = FromSchema<(typeof schemas.BorrowInterestRate.response)['200']>
export type BorrowInterestRateResponse400 = FromSchema<(typeof schemas.BorrowInterestRate.response)['400']>
export type BullMarketPeakIndicatorResponse200 = FromSchema<(typeof schemas.BullMarketPeakIndicator.response)['200']>
export type BullMarketPeakIndicatorResponse400 = FromSchema<(typeof schemas.BullMarketPeakIndicator.response)['400']>
export type CoinbasePremiumIndexMetadataParam = FromSchema<typeof schemas.CoinbasePremiumIndex.metadata>
export type CoinbasePremiumIndexResponse200 = FromSchema<(typeof schemas.CoinbasePremiumIndex.response)['200']>
export type CoinbasePremiumIndexResponse400 = FromSchema<(typeof schemas.CoinbasePremiumIndex.response)['400']>
export type CoinsMarketsMetadataParam = FromSchema<typeof schemas.CoinsMarkets.metadata>
export type CoinsMarketsResponse200 = FromSchema<(typeof schemas.CoinsMarkets.response)['200']>
export type CoinsMarketsResponse400 = FromSchema<(typeof schemas.CoinsMarkets.response)['400']>
export type CoinsPriceChangeResponse200 = FromSchema<(typeof schemas.CoinsPriceChange.response)['200']>
export type CoinsPriceChangeResponse400 = FromSchema<(typeof schemas.CoinsPriceChange.response)['400']>
export type CoinsResponse200 = FromSchema<(typeof schemas.Coins.response)['200']>
export type CryptofearGreedindexResponse200 = FromSchema<(typeof schemas.CryptofearGreedindex.response)['200']>
export type CryptofearGreedindexResponse400 = FromSchema<(typeof schemas.CryptofearGreedindex.response)['400']>
export type CumulativeExchangeListMetadataParam = FromSchema<typeof schemas.CumulativeExchangeList.metadata>
export type CumulativeExchangeListResponse200 = FromSchema<(typeof schemas.CumulativeExchangeList.response)['200']>
export type CumulativeExchangeListResponse400 = FromSchema<(typeof schemas.CumulativeExchangeList.response)['400']>
export type EnterpriseFundingrateOhlcHistoryMetadataParam = FromSchema<typeof schemas.EnterpriseFundingrateOhlcHistory.metadata>
export type EnterpriseFundingrateOhlcHistoryResponse200 = FromSchema<
  (typeof schemas.EnterpriseFundingrateOhlcHistory.response)['200']
>
export type EnterpriseFundingrateOhlcHistoryResponse400 = FromSchema<
  (typeof schemas.EnterpriseFundingrateOhlcHistory.response)['400']
>
export type EnterpriseLiquidationAggregatedHeatmapMetadataParam = FromSchema<
  typeof schemas.EnterpriseLiquidationAggregatedHeatmap.metadata
>
export type EnterpriseLiquidationAggregatedHeatmapModel2MetadataParam = FromSchema<
  typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel2.metadata
>
export type EnterpriseLiquidationAggregatedHeatmapModel2Response200 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel2.response)['200']
>
export type EnterpriseLiquidationAggregatedHeatmapModel2Response400 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel2.response)['400']
>
export type EnterpriseLiquidationAggregatedHeatmapModel3MetadataParam = FromSchema<
  typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel3.metadata
>
export type EnterpriseLiquidationAggregatedHeatmapModel3Response200 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel3.response)['200']
>
export type EnterpriseLiquidationAggregatedHeatmapModel3Response400 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmapModel3.response)['400']
>
export type EnterpriseLiquidationAggregatedHeatmapResponse200 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmap.response)['200']
>
export type EnterpriseLiquidationAggregatedHeatmapResponse400 = FromSchema<
  (typeof schemas.EnterpriseLiquidationAggregatedHeatmap.response)['400']
>
export type EnterpriseLiquidationHeatmapMetadataParam = FromSchema<typeof schemas.EnterpriseLiquidationHeatmap.metadata>
export type EnterpriseLiquidationHeatmapModel2MetadataParam = FromSchema<
  typeof schemas.EnterpriseLiquidationHeatmapModel2.metadata
>
export type EnterpriseLiquidationHeatmapModel2Response200 = FromSchema<
  (typeof schemas.EnterpriseLiquidationHeatmapModel2.response)['200']
>
export type EnterpriseLiquidationHeatmapModel2Response400 = FromSchema<
  (typeof schemas.EnterpriseLiquidationHeatmapModel2.response)['400']
>
export type EnterpriseLiquidationHeatmapModel3MetadataParam = FromSchema<
  typeof schemas.EnterpriseLiquidationHeatmapModel3.metadata
>
export type EnterpriseLiquidationHeatmapModel3Response200 = FromSchema<
  (typeof schemas.EnterpriseLiquidationHeatmapModel3.response)['200']
>
export type EnterpriseLiquidationHeatmapModel3Response400 = FromSchema<
  (typeof schemas.EnterpriseLiquidationHeatmapModel3.response)['400']
>
export type EnterpriseLiquidationHeatmapResponse200 = FromSchema<(typeof schemas.EnterpriseLiquidationHeatmap.response)['200']>
export type EnterpriseLiquidationHeatmapResponse400 = FromSchema<(typeof schemas.EnterpriseLiquidationHeatmap.response)['400']>
export type EnterpriseLiquidationHistoryMetadataParam = FromSchema<typeof schemas.EnterpriseLiquidationHistory.metadata>
export type EnterpriseLiquidationHistoryResponse200 = FromSchema<(typeof schemas.EnterpriseLiquidationHistory.response)['200']>
export type EnterpriseLiquidationHistoryResponse400 = FromSchema<(typeof schemas.EnterpriseLiquidationHistory.response)['400']>
export type EnterpriseOpeninterestOhlcHistoryMetadataParam = FromSchema<typeof schemas.EnterpriseOpeninterestOhlcHistory.metadata>
export type EnterpriseOpeninterestOhlcHistoryResponse200 = FromSchema<
  (typeof schemas.EnterpriseOpeninterestOhlcHistory.response)['200']
>
export type EnterpriseOpeninterestOhlcHistoryResponse400 = FromSchema<
  (typeof schemas.EnterpriseOpeninterestOhlcHistory.response)['400']
>
export type EtfDetailMetadataParam = FromSchema<typeof schemas.EtfDetail.metadata>
export type EtfDetailResponse200 = FromSchema<(typeof schemas.EtfDetail.response)['200']>
export type EtfDetailResponse400 = FromSchema<(typeof schemas.EtfDetail.response)['400']>
export type EtfFlowsHistoryResponse200 = FromSchema<(typeof schemas.EtfFlowsHistory.response)['200']>
export type EtfFlowsHistoryResponse400 = FromSchema<(typeof schemas.EtfFlowsHistory.response)['400']>
export type EtfHistoryMetadataParam = FromSchema<typeof schemas.EtfHistory.metadata>
export type EtfHistoryResponse200 = FromSchema<(typeof schemas.EtfHistory.response)['200']>
export type EtfHistoryResponse400 = FromSchema<(typeof schemas.EtfHistory.response)['400']>
export type EtfPriceOhlcHistoryMetadataParam = FromSchema<typeof schemas.EtfPriceOhlcHistory.metadata>
export type EtfPriceOhlcHistoryResponse200 = FromSchema<(typeof schemas.EtfPriceOhlcHistory.response)['200']>
export type EtfPriceOhlcHistoryResponse400 = FromSchema<(typeof schemas.EtfPriceOhlcHistory.response)['400']>
export type EthereumEtfFlowsHistoryResponse200 = FromSchema<(typeof schemas.EthereumEtfFlowsHistory.response)['200']>
export type EthereumEtfFlowsHistoryResponse400 = FromSchema<(typeof schemas.EthereumEtfFlowsHistory.response)['400']>
export type EthereumEtfListResponse200 = FromSchema<(typeof schemas.EthereumEtfList.response)['200']>
export type EthereumEtfListResponse400 = FromSchema<(typeof schemas.EthereumEtfList.response)['400']>
export type EthereumEtfNetassetsHistoryResponse200 = FromSchema<(typeof schemas.EthereumEtfNetassetsHistory.response)['200']>
export type EthereumEtfNetassetsHistoryResponse400 = FromSchema<(typeof schemas.EthereumEtfNetassetsHistory.response)['400']>
export type ExchangeBalanceChartMetadataParam = FromSchema<typeof schemas.ExchangeBalanceChart.metadata>
export type ExchangeBalanceChartResponse200 = FromSchema<(typeof schemas.ExchangeBalanceChart.response)['200']>
export type ExchangeBalanceChartResponse400 = FromSchema<(typeof schemas.ExchangeBalanceChart.response)['400']>
export type ExchangeBalanceListMetadataParam = FromSchema<typeof schemas.ExchangeBalanceList.metadata>
export type ExchangeBalanceListResponse200 = FromSchema<(typeof schemas.ExchangeBalanceList.response)['200']>
export type ExchangeBalanceListResponse400 = FromSchema<(typeof schemas.ExchangeBalanceList.response)['400']>
export type ExchangeOnchainTransfersMetadataParam = FromSchema<typeof schemas.ExchangeOnchainTransfers.metadata>
export type ExchangeOnchainTransfersResponse200 = FromSchema<(typeof schemas.ExchangeOnchainTransfers.response)['200']>
export type ExchangeOnchainTransfersResponse400 = FromSchema<(typeof schemas.ExchangeOnchainTransfers.response)['400']>
export type ExchangeOpenInterestHistoryMetadataParam = FromSchema<typeof schemas.ExchangeOpenInterestHistory.metadata>
export type ExchangeOpenInterestHistoryResponse200 = FromSchema<(typeof schemas.ExchangeOpenInterestHistory.response)['200']>
export type ExchangeOpenInterestHistoryResponse400 = FromSchema<(typeof schemas.ExchangeOpenInterestHistory.response)['400']>
export type ExchangeVolumeHistoryMetadataParam = FromSchema<typeof schemas.ExchangeVolumeHistory.metadata>
export type ExchangeVolumeHistoryResponse200 = FromSchema<(typeof schemas.ExchangeVolumeHistory.response)['200']>
export type ExchangeVolumeHistoryResponse400 = FromSchema<(typeof schemas.ExchangeVolumeHistory.response)['400']>
export type FrArbitrageMetadataParam = FromSchema<typeof schemas.FrArbitrage.metadata>
export type FrArbitrageResponse200 = FromSchema<(typeof schemas.FrArbitrage.response)['200']>
export type FrArbitrageResponse400 = FromSchema<(typeof schemas.FrArbitrage.response)['400']>
export type FrExchangeListResponse200 = FromSchema<(typeof schemas.FrExchangeList.response)['200']>
export type FrExchangeListResponse400 = FromSchema<(typeof schemas.FrExchangeList.response)['400']>
export type FrOhlcHistroyMetadataParam = FromSchema<typeof schemas.FrOhlcHistroy.metadata>
export type FrOhlcHistroyResponse200 = FromSchema<(typeof schemas.FrOhlcHistroy.response)['200']>
export type FrOhlcHistroyResponse400 = FromSchema<(typeof schemas.FrOhlcHistroy.response)['400']>
export type FuturesAggregatedOrderbookHistoryMetadataParam = FromSchema<typeof schemas.FuturesAggregatedOrderbookHistory.metadata>
export type FuturesAggregatedOrderbookHistoryResponse200 = FromSchema<
  (typeof schemas.FuturesAggregatedOrderbookHistory.response)['200']
>
export type FuturesAggregatedOrderbookHistoryResponse400 = FromSchema<
  (typeof schemas.FuturesAggregatedOrderbookHistory.response)['400']
>
export type FuturesOrderbookHistoryMetadataParam = FromSchema<typeof schemas.FuturesOrderbookHistory.metadata>
export type FuturesOrderbookHistoryResponse200 = FromSchema<(typeof schemas.FuturesOrderbookHistory.response)['200']>
export type FuturesOrderbookHistoryResponse400 = FromSchema<(typeof schemas.FuturesOrderbookHistory.response)['400']>
export type FuturesRsiListResponse200 = FromSchema<(typeof schemas.FuturesRsiList.response)['200']>
export type FuturesRsiListResponse400 = FromSchema<(typeof schemas.FuturesRsiList.response)['400']>
export type GetApiexchangeassetsMetadataParam = FromSchema<typeof schemas.GetApiexchangeassets.metadata>
export type GetApiexchangeassetsResponse200 = FromSchema<(typeof schemas.GetApiexchangeassets.response)['200']>
export type GetApifuturesbasishistoryMetadataParam = FromSchema<typeof schemas.GetApifuturesbasishistory.metadata>
export type GetApifuturesbasishistoryResponse200 = FromSchema<(typeof schemas.GetApifuturesbasishistory.response)['200']>
export type GetApispotorderbookhistoryMetadataParam = FromSchema<typeof schemas.GetApispotorderbookhistory.metadata>
export type GetApispotorderbooklargeLimitOrderMetadataParam = FromSchema<
  typeof schemas.GetApispotorderbooklargeLimitOrder.metadata
>
export type GetApispotorderbooklargeLimitOrderResponse200 = FromSchema<
  (typeof schemas.GetApispotorderbooklargeLimitOrder.response)['200']
>
export type GetApispotpricehistoryMetadataParam = FromSchema<typeof schemas.GetApispotpricehistory.metadata>
export type GetApispotpricehistoryResponse200 = FromSchema<(typeof schemas.GetApispotpricehistory.response)['200']>
export type GlobalLongshortAccountRatioMetadataParam = FromSchema<typeof schemas.GlobalLongshortAccountRatio.metadata>
export type GlobalLongshortAccountRatioResponse200 = FromSchema<(typeof schemas.GlobalLongshortAccountRatio.response)['200']>
export type GlobalLongshortAccountRatioResponse400 = FromSchema<(typeof schemas.GlobalLongshortAccountRatio.response)['400']>
export type GoldenRatioMultiplierResponse200 = FromSchema<(typeof schemas.GoldenRatioMultiplier.response)['200']>
export type GoldenRatioMultiplierResponse400 = FromSchema<(typeof schemas.GoldenRatioMultiplier.response)['400']>
export type GrayscaleHoldingListResponse200 = FromSchema<(typeof schemas.GrayscaleHoldingList.response)['200']>
export type GrayscaleHoldingListResponse400 = FromSchema<(typeof schemas.GrayscaleHoldingList.response)['400']>
export type GrayscalePremiumHistoryMetadataParam = FromSchema<typeof schemas.GrayscalePremiumHistory.metadata>
export type GrayscalePremiumHistoryResponse200 = FromSchema<(typeof schemas.GrayscalePremiumHistory.response)['200']>
export type GrayscalePremiumHistoryResponse400 = FromSchema<(typeof schemas.GrayscalePremiumHistory.response)['400']>
export type HongKongBitcoinEtfFlowHistoryResponse200 = FromSchema<(typeof schemas.HongKongBitcoinEtfFlowHistory.response)['200']>
export type HongKongBitcoinEtfFlowHistoryResponse400 = FromSchema<(typeof schemas.HongKongBitcoinEtfFlowHistory.response)['400']>
export type HyperliquidWhaleAlertResponse200 = FromSchema<(typeof schemas.HyperliquidWhaleAlert.response)['200']>
export type HyperliquidWhaleAlertResponse400 = FromSchema<(typeof schemas.HyperliquidWhaleAlert.response)['400']>
export type HyperliquidWhalePositionResponse200 = FromSchema<(typeof schemas.HyperliquidWhalePosition.response)['200']>
export type HyperliquidWhalePositionResponse400 = FromSchema<(typeof schemas.HyperliquidWhalePosition.response)['400']>
export type InfoMetadataParam = FromSchema<typeof schemas.Info.metadata>
export type InfoResponse200 = FromSchema<(typeof schemas.Info.response)['200']>
export type InfoResponse400 = FromSchema<(typeof schemas.Info.response)['400']>
export type InstrumentsResponse200 = FromSchema<(typeof schemas.Instruments.response)['200']>
export type LargeLimitOrderHistory2MetadataParam = FromSchema<typeof schemas.LargeLimitOrderHistory2.metadata>
export type LargeLimitOrderHistory2Response200 = FromSchema<(typeof schemas.LargeLimitOrderHistory2.response)['200']>
export type LargeLimitOrderHistory2Response400 = FromSchema<(typeof schemas.LargeLimitOrderHistory2.response)['400']>
export type LargeOrderMetadataParam = FromSchema<typeof schemas.LargeOrder.metadata>
export type LargeOrderResponse200 = FromSchema<(typeof schemas.LargeOrder.response)['200']>
export type LargeOrderResponse400 = FromSchema<(typeof schemas.LargeOrder.response)['400']>
export type LargeOrderbookCopy2MetadataParam = FromSchema<typeof schemas.LargeOrderbookCopy2.metadata>
export type LargeOrderbookCopy2Response200 = FromSchema<(typeof schemas.LargeOrderbookCopy2.response)['200']>
export type LargeOrderbookCopy2Response400 = FromSchema<(typeof schemas.LargeOrderbookCopy2.response)['400']>
export type LargeOrderbookHistoryMetadataParam = FromSchema<typeof schemas.LargeOrderbookHistory.metadata>
export type LargeOrderbookHistoryResponse200 = FromSchema<(typeof schemas.LargeOrderbookHistory.response)['200']>
export type LargeOrderbookMetadataParam = FromSchema<typeof schemas.LargeOrderbook.metadata>
export type LargeOrderbookResponse200 = FromSchema<(typeof schemas.LargeOrderbook.response)['200']>
export type LargeOrderbookResponse400 = FromSchema<(typeof schemas.LargeOrderbook.response)['400']>
export type LiquidationAggregateHeatmapMetadataParam = FromSchema<typeof schemas.LiquidationAggregateHeatmap.metadata>
export type LiquidationAggregateHeatmapModel2MetadataParam = FromSchema<typeof schemas.LiquidationAggregateHeatmapModel2.metadata>
export type LiquidationAggregateHeatmapModel2Response200 = FromSchema<
  (typeof schemas.LiquidationAggregateHeatmapModel2.response)['200']
>
export type LiquidationAggregateHeatmapModel2Response400 = FromSchema<
  (typeof schemas.LiquidationAggregateHeatmapModel2.response)['400']
>
export type LiquidationAggregateHeatmapResponse200 = FromSchema<(typeof schemas.LiquidationAggregateHeatmap.response)['200']>
export type LiquidationAggregateHeatmapResponse400 = FromSchema<(typeof schemas.LiquidationAggregateHeatmap.response)['400']>
export type LiquidationAggregatedHeatmapModel3MetadataParam = FromSchema<
  typeof schemas.LiquidationAggregatedHeatmapModel3.metadata
>
export type LiquidationAggregatedHeatmapModel3Response200 = FromSchema<
  (typeof schemas.LiquidationAggregatedHeatmapModel3.response)['200']
>
export type LiquidationAggregatedHeatmapModel3Response400 = FromSchema<
  (typeof schemas.LiquidationAggregatedHeatmapModel3.response)['400']
>
export type LiquidationAggregatedMapMetadataParam = FromSchema<typeof schemas.LiquidationAggregatedMap.metadata>
export type LiquidationAggregatedMapResponse200 = FromSchema<(typeof schemas.LiquidationAggregatedMap.response)['200']>
export type LiquidationAggregatedMapResponse400 = FromSchema<(typeof schemas.LiquidationAggregatedMap.response)['400']>
export type LiquidationCoinListMetadataParam = FromSchema<typeof schemas.LiquidationCoinList.metadata>
export type LiquidationCoinListResponse200 = FromSchema<(typeof schemas.LiquidationCoinList.response)['200']>
export type LiquidationCoinListResponse400 = FromSchema<(typeof schemas.LiquidationCoinList.response)['400']>
export type LiquidationExchangeListMetadataParam = FromSchema<typeof schemas.LiquidationExchangeList.metadata>
export type LiquidationExchangeListResponse200 = FromSchema<(typeof schemas.LiquidationExchangeList.response)['200']>
export type LiquidationExchangeListResponse400 = FromSchema<(typeof schemas.LiquidationExchangeList.response)['400']>
export type LiquidationHeatmapMetadataParam = FromSchema<typeof schemas.LiquidationHeatmap.metadata>
export type LiquidationHeatmapModel2MetadataParam = FromSchema<typeof schemas.LiquidationHeatmapModel2.metadata>
export type LiquidationHeatmapModel2Response200 = FromSchema<(typeof schemas.LiquidationHeatmapModel2.response)['200']>
export type LiquidationHeatmapModel2Response400 = FromSchema<(typeof schemas.LiquidationHeatmapModel2.response)['400']>
export type LiquidationHeatmapModel3MetadataParam = FromSchema<typeof schemas.LiquidationHeatmapModel3.metadata>
export type LiquidationHeatmapModel3Response200 = FromSchema<(typeof schemas.LiquidationHeatmapModel3.response)['200']>
export type LiquidationHeatmapModel3Response400 = FromSchema<(typeof schemas.LiquidationHeatmapModel3.response)['400']>
export type LiquidationHeatmapResponse200 = FromSchema<(typeof schemas.LiquidationHeatmap.response)['200']>
export type LiquidationHeatmapResponse400 = FromSchema<(typeof schemas.LiquidationHeatmap.response)['400']>
export type LiquidationHistoryMetadataParam = FromSchema<typeof schemas.LiquidationHistory.metadata>
export type LiquidationHistoryResponse200 = FromSchema<(typeof schemas.LiquidationHistory.response)['200']>
export type LiquidationHistoryResponse400 = FromSchema<(typeof schemas.LiquidationHistory.response)['400']>
export type LiquidationMapMetadataParam = FromSchema<typeof schemas.LiquidationMap.metadata>
export type LiquidationMapResponse200 = FromSchema<(typeof schemas.LiquidationMap.response)['200']>
export type LiquidationMapResponse400 = FromSchema<(typeof schemas.LiquidationMap.response)['400']>
export type LiquidationOrderMetadataParam = FromSchema<typeof schemas.LiquidationOrder.metadata>
export type LiquidationOrderResponse200 = FromSchema<(typeof schemas.LiquidationOrder.response)['200']>
export type LiquidationOrderResponse400 = FromSchema<(typeof schemas.LiquidationOrder.response)['400']>
export type OiExchangeHistoryChartMetadataParam = FromSchema<typeof schemas.OiExchangeHistoryChart.metadata>
export type OiExchangeHistoryChartResponse200 = FromSchema<(typeof schemas.OiExchangeHistoryChart.response)['200']>
export type OiExchangeHistoryChartResponse400 = FromSchema<(typeof schemas.OiExchangeHistoryChart.response)['400']>
export type OiExchangeListMetadataParam = FromSchema<typeof schemas.OiExchangeList.metadata>
export type OiExchangeListResponse200 = FromSchema<(typeof schemas.OiExchangeList.response)['200']>
export type OiExchangeListResponse400 = FromSchema<(typeof schemas.OiExchangeList.response)['400']>
export type OiOhlcAggregatedCoinMarginHistoryMetadataParam = FromSchema<typeof schemas.OiOhlcAggregatedCoinMarginHistory.metadata>
export type OiOhlcAggregatedCoinMarginHistoryResponse200 = FromSchema<
  (typeof schemas.OiOhlcAggregatedCoinMarginHistory.response)['200']
>
export type OiOhlcAggregatedCoinMarginHistoryResponse400 = FromSchema<
  (typeof schemas.OiOhlcAggregatedCoinMarginHistory.response)['400']
>
export type OiOhlcAggregatedHistoryMetadataParam = FromSchema<typeof schemas.OiOhlcAggregatedHistory.metadata>
export type OiOhlcAggregatedHistoryResponse200 = FromSchema<(typeof schemas.OiOhlcAggregatedHistory.response)['200']>
export type OiOhlcAggregatedHistoryResponse400 = FromSchema<(typeof schemas.OiOhlcAggregatedHistory.response)['400']>
export type OiOhlcAggregatedStablecoinMarginHistoryMetadataParam = FromSchema<
  typeof schemas.OiOhlcAggregatedStablecoinMarginHistory.metadata
>
export type OiOhlcAggregatedStablecoinMarginHistoryResponse200 = FromSchema<
  (typeof schemas.OiOhlcAggregatedStablecoinMarginHistory.response)['200']
>
export type OiOhlcAggregatedStablecoinMarginHistoryResponse400 = FromSchema<
  (typeof schemas.OiOhlcAggregatedStablecoinMarginHistory.response)['400']
>
export type OiOhlcHistroyMetadataParam = FromSchema<typeof schemas.OiOhlcHistroy.metadata>
export type OiOhlcHistroyResponse200 = FromSchema<(typeof schemas.OiOhlcHistroy.response)['200']>
export type OiOhlcHistroyResponse400 = FromSchema<(typeof schemas.OiOhlcHistroy.response)['400']>
export type OiWeightOhlcHistoryMetadataParam = FromSchema<typeof schemas.OiWeightOhlcHistory.metadata>
export type OiWeightOhlcHistoryResponse200 = FromSchema<(typeof schemas.OiWeightOhlcHistory.response)['200']>
export type OiWeightOhlcHistoryResponse400 = FromSchema<(typeof schemas.OiWeightOhlcHistory.response)['400']>
export type OptionMaxPainMetadataParam = FromSchema<typeof schemas.OptionMaxPain.metadata>
export type OptionMaxPainResponse200 = FromSchema<(typeof schemas.OptionMaxPain.response)['200']>
export type OptionMaxPainResponse400 = FromSchema<(typeof schemas.OptionMaxPain.response)['400']>
export type OrderbookHeatmapMetadataParam = FromSchema<typeof schemas.OrderbookHeatmap.metadata>
export type PairsMarketsMetadataParam = FromSchema<typeof schemas.PairsMarkets.metadata>
export type PairsMarketsResponse200 = FromSchema<(typeof schemas.PairsMarkets.response)['200']>
export type PairsMarketsResponse400 = FromSchema<(typeof schemas.PairsMarkets.response)['400']>
export type PiResponse200 = FromSchema<(typeof schemas.Pi.response)['200']>
export type PiResponse400 = FromSchema<(typeof schemas.Pi.response)['400']>
export type PriceOhlcHistoryMetadataParam = FromSchema<typeof schemas.PriceOhlcHistory.metadata>
export type PriceOhlcHistoryResponse200 = FromSchema<(typeof schemas.PriceOhlcHistory.response)['200']>
export type PuellMultipleResponse200 = FromSchema<(typeof schemas.PuellMultiple.response)['200']>
export type PuellMultipleResponse400 = FromSchema<(typeof schemas.PuellMultiple.response)['400']>
export type SpotAggregatedHistoryMetadataParam = FromSchema<typeof schemas.SpotAggregatedHistory.metadata>
export type SpotAggregatedHistoryResponse200 = FromSchema<(typeof schemas.SpotAggregatedHistory.response)['200']>
export type SpotAggregatedHistoryResponse400 = FromSchema<(typeof schemas.SpotAggregatedHistory.response)['400']>
export type SpotAggregatedTakerBuysellHistoryMetadataParam = FromSchema<typeof schemas.SpotAggregatedTakerBuysellHistory.metadata>
export type SpotAggregatedTakerBuysellHistoryResponse200 = FromSchema<
  (typeof schemas.SpotAggregatedTakerBuysellHistory.response)['200']
>
export type SpotAggregatedTakerBuysellHistoryResponse400 = FromSchema<
  (typeof schemas.SpotAggregatedTakerBuysellHistory.response)['400']
>
export type SpotCoinsMarketsMetadataParam = FromSchema<typeof schemas.SpotCoinsMarkets.metadata>
export type SpotCoinsMarketsResponse200 = FromSchema<(typeof schemas.SpotCoinsMarkets.response)['200']>
export type SpotCoinsMarketsResponse400 = FromSchema<(typeof schemas.SpotCoinsMarkets.response)['400']>
export type SpotOrderbookHistoryMetadataParam = FromSchema<typeof schemas.SpotOrderbookHistory.metadata>
export type SpotOrderbookHistoryResponse200 = FromSchema<(typeof schemas.SpotOrderbookHistory.response)['200']>
export type SpotOrderbookHistoryResponse400 = FromSchema<(typeof schemas.SpotOrderbookHistory.response)['400']>
export type SpotPairsMarketsMetadataParam = FromSchema<typeof schemas.SpotPairsMarkets.metadata>
export type SpotPairsMarketsResponse200 = FromSchema<(typeof schemas.SpotPairsMarkets.response)['200']>
export type SpotPairsMarketsResponse400 = FromSchema<(typeof schemas.SpotPairsMarkets.response)['400']>
export type SpotSuportedExchangePairsResponse200 = FromSchema<(typeof schemas.SpotSuportedExchangePairs.response)['200']>
export type SpotSuportedExchangePairsResponse400 = FromSchema<(typeof schemas.SpotSuportedExchangePairs.response)['400']>
export type SpotSupportedCoinsResponse200 = FromSchema<(typeof schemas.SpotSupportedCoins.response)['200']>
export type SpotSupportedCoinsResponse400 = FromSchema<(typeof schemas.SpotSupportedCoins.response)['400']>
export type SpotTakerBuysellRatioHistoryMetadataParam = FromSchema<typeof schemas.SpotTakerBuysellRatioHistory.metadata>
export type SpotTakerBuysellRatioHistoryResponse200 = FromSchema<(typeof schemas.SpotTakerBuysellRatioHistory.response)['200']>
export type SpotTakerBuysellRatioHistoryResponse400 = FromSchema<(typeof schemas.SpotTakerBuysellRatioHistory.response)['400']>
export type StablecoinMarketcapHistoryResponse200 = FromSchema<(typeof schemas.StablecoinMarketcapHistory.response)['200']>
export type StablecoinMarketcapHistoryResponse400 = FromSchema<(typeof schemas.StablecoinMarketcapHistory.response)['400']>
export type StockFlowResponse200 = FromSchema<(typeof schemas.StockFlow.response)['200']>
export type StockFlowResponse400 = FromSchema<(typeof schemas.StockFlow.response)['400']>
export type TakerBuysellVolumeExchangeListMetadataParam = FromSchema<typeof schemas.TakerBuysellVolumeExchangeList.metadata>
export type TakerBuysellVolumeExchangeListResponse200 = FromSchema<
  (typeof schemas.TakerBuysellVolumeExchangeList.response)['200']
>
export type TakerBuysellVolumeExchangeListResponse400 = FromSchema<
  (typeof schemas.TakerBuysellVolumeExchangeList.response)['400']
>
export type TakerBuysellVolumeMetadataParam = FromSchema<typeof schemas.TakerBuysellVolume.metadata>
export type TakerBuysellVolumeResponse200 = FromSchema<(typeof schemas.TakerBuysellVolume.response)['200']>
export type TakerBuysellVolumeResponse400 = FromSchema<(typeof schemas.TakerBuysellVolume.response)['400']>
export type TopLongshortAccountRatioMetadataParam = FromSchema<typeof schemas.TopLongshortAccountRatio.metadata>
export type TopLongshortAccountRatioResponse200 = FromSchema<(typeof schemas.TopLongshortAccountRatio.response)['200']>
export type TopLongshortAccountRatioResponse400 = FromSchema<(typeof schemas.TopLongshortAccountRatio.response)['400']>
export type TopLongshortPositionRatioMetadataParam = FromSchema<typeof schemas.TopLongshortPositionRatio.metadata>
export type TopLongshortPositionRatioResponse200 = FromSchema<(typeof schemas.TopLongshortPositionRatio.response)['200']>
export type TopLongshortPositionRatioResponse400 = FromSchema<(typeof schemas.TopLongshortPositionRatio.response)['400']>
export type TowHundredWeekMovingAvgHeatmapResponse200 = FromSchema<
  (typeof schemas.TowHundredWeekMovingAvgHeatmap.response)['200']
>
export type TowHundredWeekMovingAvgHeatmapResponse400 = FromSchema<
  (typeof schemas.TowHundredWeekMovingAvgHeatmap.response)['400']
>
export type TowYearMaMultiplierResponse200 = FromSchema<(typeof schemas.TowYearMaMultiplier.response)['200']>
export type TowYearMaMultiplierResponse400 = FromSchema<(typeof schemas.TowYearMaMultiplier.response)['400']>
export type VolWeightOhlcHistoryMetadataParam = FromSchema<typeof schemas.VolWeightOhlcHistory.metadata>
export type VolWeightOhlcHistoryResponse200 = FromSchema<(typeof schemas.VolWeightOhlcHistory.response)['200']>
export type VolWeightOhlcHistoryResponse400 = FromSchema<(typeof schemas.VolWeightOhlcHistory.response)['400']>
