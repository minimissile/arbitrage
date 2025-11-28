// 套利概览卡片：汇总当前最佳机会、平均价差、总机会数与最近机会
import { TrendingUp, DollarSign, AlertTriangle, Clock } from 'lucide-react'
import { Box, Grid, GridItem, Text, Heading, Button, Flex } from '@chakra-ui/react'
import type { ArbitrageOpportunity } from '@/types'

interface ArbitrageOverviewProps {
  opportunities: ArbitrageOpportunity[]
  isMonitoring: boolean
  onToggleMonitoring: () => void
}

export function ArbitrageOverview({ opportunities, isMonitoring, onToggleMonitoring }: ArbitrageOverviewProps) {
  // 计算关键指标：最佳机会、平均价差、总机会与近 5 分钟机会数
  const bestOpportunity = opportunities[0]
  const averageSpread =
    opportunities.length > 0 ? opportunities.reduce((sum, opp) => sum + opp.spreadPercentage, 0) / opportunities.length : 0

  const totalOpportunities = opportunities.length
  const recentOpportunities = opportunities.filter(
    opp => Date.now() - opp.timestamp < 5 * 60 * 1000 // Last 5 minutes
  ).length

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={6}>
      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4} boxShadow="sm">
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600">
              最佳机会
            </Text>
            <Heading size="lg" color="green.600">
              {bestOpportunity ? `${bestOpportunity.spreadPercentage.toFixed(2)}%` : '0.00%'}
            </Heading>
            <Text fontSize="xs" color="gray.500">
              {bestOpportunity
                ? `${bestOpportunity.pair}（${bestOpportunity.buyExchange} → ${bestOpportunity.sellExchange}）`
                : '暂无机会'}
            </Text>
          </Box>
          <Box bg="green.100" borderRadius="md" p={3}>
            <TrendingUp className="h-6 w-6" color="#16a34a" />
          </Box>
        </Flex>
      </Box>

      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4} boxShadow="sm">
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600">
              平均价差
            </Text>
            <Heading size="lg" color="brand.600">
              {averageSpread.toFixed(2)}%
            </Heading>
            <Text fontSize="xs" color="gray.500">
              所有交易对
            </Text>
          </Box>
          <Box bg="brand.100" borderRadius="md" p={3}>
            <DollarSign className="h-6 w-6" color="#7cba59" />
          </Box>
        </Flex>
      </Box>

      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4} boxShadow="sm">
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600">
              机会总数
            </Text>
            <Heading size="lg" color="orange.600">
              {totalOpportunities}
            </Heading>
            <Text fontSize="xs" color="gray.500">
              当前活跃
            </Text>
          </Box>
          <Box bg="orange.100" borderRadius="md" p={3}>
            <AlertTriangle className="h-6 w-6" color="#f59e0b" />
          </Box>
        </Flex>
      </Box>

      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4} boxShadow="sm">
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600">
              最近（5分钟）
            </Text>
            <Heading size="lg" color="brand.600">
              {recentOpportunities}
            </Heading>
            <Text fontSize="xs" color="gray.500">
              近 5 分钟
            </Text>
          </Box>
          <Box bg="brand.100" borderRadius="md" p={3}>
            <Clock className="h-6 w-6" color="#7cba59" />
          </Box>
        </Flex>
      </Box>

      <GridItem colSpan={{ base: 1, lg: 4 }}>
        <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4} boxShadow="sm">
          <Flex align="center" justify="space-between">
            <Box>
              <Heading size="md" color="gray.900">
                监控控制
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {isMonitoring ? '实时监控已开启' : '监控已暂停'}
              </Text>
            </Box>
            <Button onClick={onToggleMonitoring} colorScheme={isMonitoring ? 'gray' : 'brand'}>
              {isMonitoring ? '暂停监控' : '开始监控'}
            </Button>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  )
}
