import { useArbitrageStore } from '@/stores/arbitrageStore'
import { ArbitrageOverview } from '@/components/ArbitrageOverview'
import ArbitrageOpportunities from '@/components/ArbitrageOpportunities.tsx'
import { Box, Heading, Text, Grid, GridItem, Button, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

/**
 * 统计页面
 * @constructor
 */
export default function DashboardPage() {
  const { marketData } = useArbitrageStore()

  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg" color="gray.900">
          套利仪表盘
        </Heading>
        <Text fontSize="sm" color="gray.600">
          监控跨交易所价差与历史机会
        </Text>
        <HStack mt={3}>
          <Button as={RouterLink} to="/watchlist" colorScheme="brand" variant="solid">
            手动观察列表
          </Button>
        </HStack>
      </Box>

      <ArbitrageOverview opportunities={marketData.arbitrageOpportunities} />

      <Grid templateColumns={{ base: '1fr', lg: '1fr' }} gap={6}>
        <GridItem>
          <Box display="grid" gap={4}>
            <Heading size="md" color="gray.900">
              机会列表
            </Heading>
            <Box borderWidth="0.5px" borderColor="gray.200" bg="white" p={4} borderRadius="base">
              <ArbitrageOpportunities />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}
