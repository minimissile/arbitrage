import { useMemo } from 'react'
import { Box, Grid, HStack, Text } from '@chakra-ui/react'
import type { PriceData } from '@/types'

interface PriceHeatmapProps {
  prices: PriceData[]
}

export function PriceHeatmapChakra({ prices }: PriceHeatmapProps) {
  const heatmapData = useMemo(() => {
    const symbolGroups = new Map<string, Map<string, PriceData>>()
    for (const price of prices) {
      if (!symbolGroups.has(price.symbol)) symbolGroups.set(price.symbol, new Map())
      symbolGroups.get(price.symbol)!.set(price.exchange, price)
    }
    const spreads: Array<{ symbol: string; exchanges: string[]; maxSpread: number; maxSpreadPercentage: number; prices: { exchange: string; price: number }[] }> = []
    for (const [symbol, exchangePrices] of symbolGroups) {
      const arr = Array.from(exchangePrices.values())
      if (arr.length < 2) continue
      const minPrice = Math.min(...arr.map(p => p.price))
      const maxPrice = Math.max(...arr.map(p => p.price))
      const maxSpread = maxPrice - minPrice
      const maxSpreadPercentage = (maxSpread / minPrice) * 100
      spreads.push({ symbol, exchanges: Array.from(exchangePrices.keys()), maxSpread, maxSpreadPercentage, prices: arr.map(p => ({ exchange: p.exchange, price: p.price })) })
    }
    return spreads.sort((a, b) => b.maxSpreadPercentage - a.maxSpreadPercentage)
  }, [prices])

  const getSpreadBg = (p: number) => (p > 1 ? 'red.500' : p > 0.5 ? 'orange.500' : p > 0.2 ? 'green.500' : 'gray.300')
  const getTextColor = (p: number) => (p > 0.2 ? 'white' : 'gray.900')

  if (heatmapData.length === 0) {
    return <Box display="flex" h={64} alignItems="center" justifyContent="center" color="gray.500">暂无价格数据</Box>
  }

  return (
    <Box display="grid" gap={4}>
      <Grid templateColumns="1fr" gap={3}>
        {heatmapData.slice(0, 10).map(item => (
          <Box key={item.symbol} borderRadius="lg" p={4} bg={getSpreadBg(item.maxSpreadPercentage)} color={getTextColor(item.maxSpreadPercentage)}>
            <HStack mb={2} justifyContent="space-between">
              <Text fontWeight="semibold">{item.symbol}</Text>
              <Text fontSize="sm" fontWeight="medium">最大价差 {item.maxSpreadPercentage.toFixed(2)}%</Text>
            </HStack>

            <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize="xs">
              {item.prices.map(price => (
                <HStack key={price.exchange} justifyContent="space-between">
                  <Text>{price.exchange}：</Text>
                  <Text>${price.price.toLocaleString()}</Text>
                </HStack>
              ))}
            </Grid>

            <Box mt={2} borderTopWidth="1px" borderColor="whiteAlpha.400" pt={2}>
              <HStack justifyContent="space-between" fontSize="xs" opacity={0.8}>
                <Text>交易所：{item.exchanges.join(', ')}</Text>
                <Text>价差：${item.maxSpread.toFixed(2)}</Text>
              </HStack>
            </Box>
          </Box>
        ))}
      </Grid>

      {heatmapData.length > 10 && (
        <Text textAlign="center" fontSize="sm" color="gray.500">已展示前 10 条机会，剩余 {heatmapData.length - 10} 条</Text>
      )}
    </Box>
  )
}

export default PriceHeatmapChakra
