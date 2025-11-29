import { useState } from 'react'
import { useArbitrageStore } from '@/stores/arbitrageStore'
import { ArbitrageOverview } from '@/components/ArbitrageOverview'
import ArbitrageHistoryChakra from '@/components/ArbitrageHistoryChakra'
import PriceHeatmapChakra from '@/components/PriceHeatmapChakra'
import { Box, Heading, Text, Grid, GridItem } from '@chakra-ui/react'

/**
 * 统计页面
 * @constructor
 */
export default function DashboardPage() {
  const { marketData } = useArbitrageStore()
  const [monitoring, setMonitoring] = useState(true)

  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg" color="gray.900">
          套利仪表盘
        </Heading>
        <Text fontSize="sm" color="gray.600">
          监控跨交易所价差与历史机会
        </Text>
      </Box>

      <ArbitrageOverview
        opportunities={marketData.arbitrageOpportunities}
        isMonitoring={monitoring}
        onToggleMonitoring={() => setMonitoring(m => !m)}
      />

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
        <GridItem>
          <Box display="grid" gap={4}>
            <Heading size="md" color="gray.900">
              机会列表
            </Heading>
            <Box borderWidth="1px" borderColor="gray.200" bg="white" p={4} borderRadius="xl" boxShadow="sm">
              <ArbitrageHistoryChakra opportunities={marketData.arbitrageOpportunities} />
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box display="grid" gap={4}>
            <Heading size="md" color="gray.900">
              价格热力图
            </Heading>
            <Box borderWidth="1px" borderColor="gray.200" bg="white" p={4} borderRadius="xl" boxShadow="sm">
              <PriceHeatmapChakra prices={marketData.prices} />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}
