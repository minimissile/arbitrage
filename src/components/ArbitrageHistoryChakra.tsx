import { useState } from 'react'
import type { ArbitrageOpportunity } from '@/types'
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'
import {
  Box,
  Text,
  Select as ChakraSelect,
  Input as ChakraInput,
  HStack,
  Grid,
  Heading,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react'
import { useCoinglassFundingArbQuery, coinglassFormat } from '@/hooks/querys/coinglass'

interface Props {
  opportunities: ArbitrageOpportunity[]
}

/**
 * 套利机会列表
 * @param opportunities
 * @constructor
 */
function ArbitrageHistoryChakra({ opportunities }: Props) {
  const [arbPage, setArbPage] = useState(1)
  const [arbPageSize] = useState(20)
  const { data: frPage, isLoading: frLoading, isError: frError } = useCoinglassFundingArbQuery(arbPage, arbPageSize, 10000)
  const [sortBy, setSortBy] = useState<'timestamp' | 'spread' | 'profit'>('spread')
  const [filterMinSpread, setFilterMinSpread] = useState(0.1)

  const sorted = [...opportunities]
    .filter(opp => opp.spreadPercentage >= filterMinSpread)
    .sort((a, b) =>
      sortBy === 'timestamp'
        ? b.timestamp - a.timestamp
        : sortBy === 'spread'
          ? b.spreadPercentage - a.spreadPercentage
          : b.estimatedProfit - a.estimatedProfit
    )
    .slice(0, 20)

  console.log('sorted', frPage, sorted)

  const frItems = frPage?.items ?? []
  const frTotal = frPage?.total ?? 0
  const frTotalPages = Math.max(1, Math.ceil(frTotal / arbPageSize))

  const formatTimeAgo = (timestamp: number) => {
    const now = new Date().getTime()
    const minutes = Math.floor((now - timestamp) / (1000 * 60))
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes} 分钟前`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} 小时前`
    return `${Math.floor(hours / 24)} 天前`
  }

  return (
    <Box>
      {/* 资金费率套利（来自 Coinglass） */}
      <Box mb={6}>
        <Heading size="sm" mb={3}>
          资金费率套利（跨交易所）
        </Heading>
        {frError && <Text color="red.600">资金费率套利数据加载失败</Text>}
        {frLoading ? (
          <HStack gap={2}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={`arb-skeleton-${i}`} px={3} py={3} borderWidth="1px" borderRadius="md" minW="220px">
                <Skeleton w="96px" h="16px" mb={2} />
                <SkeletonText noOfLines={3} spacing="2" skeletonHeight="10px" />
              </Box>
            ))}
          </HStack>
        ) : frItems.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            暂无资金费率套利数据
          </Text>
        ) : (
          <HStack gap={2} wrap="wrap">
            {frItems.map(item => (
              <Box
                key={`${item.symbol}-${item.buy.exchange}-${item.sell.exchange}`}
                px={3}
                py={3}
                borderWidth="1px"
                borderRadius="md"
              >
                <Text fontWeight="semibold">{item.symbol}</Text>
                <Text fontSize="xs" color="gray.600">
                  多：{item.buy.exchange} {coinglassFormat.formatFundingRate(item.buy.funding_rate / 100)}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  空：{item.sell.exchange} {coinglassFormat.formatFundingRate(item.sell.funding_rate / 100)}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  差值：{coinglassFormat.formatFundingRate(item.funding / 100)}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  APR：{item.apr.toFixed(2)}%
                </Text>
                <Text fontSize="xs" color="gray.600">
                  下一结算：{coinglassFormat.formatTime(item.next_funding_time)}
                </Text>
              </Box>
            ))}
          </HStack>
        )}
        <HStack mt={3} gap={2}>
          <Box fontSize="sm" color="gray.600">
            第 {arbPage} 页 / 共 {frTotalPages} 页
          </Box>
          <HStack>
            <Box
              as="button"
              onClick={() => setArbPage(p => Math.max(1, p - 1))}
              disabled={arbPage <= 1}
              px={2}
              py={1}
              borderWidth="1px"
              borderRadius="md"
            >
              上一页
            </Box>
            <Box
              as="button"
              onClick={() => setArbPage(p => Math.min(frTotalPages, p + 1))}
              disabled={arbPage >= frTotalPages}
              px={2}
              py={1}
              borderWidth="1px"
              borderRadius="md"
            >
              下一页
            </Box>
          </HStack>
        </HStack>
      </Box>

      <HStack spacing={4} mb={6} bg="gray.50" p={4} borderRadius="lg" flexWrap="wrap">
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">
            最小价差（%）
          </Text>
          <ChakraInput
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={filterMinSpread}
            onChange={e => {
              const v = parseFloat(e.target.value)
              setFilterMinSpread(Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0)
            }}
            size="sm"
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">
            排序方式
          </Text>
          <ChakraSelect value={sortBy} onChange={e => setSortBy(e.target.value as any)} size="sm">
            <option value="spread">价差（%）</option>
            <option value="timestamp">时间</option>
            <option value="profit">利润</option>
          </ChakraSelect>
        </Box>
      </HStack>

      {sorted.length === 0 ? (
        <Box py={8} textAlign="center" color="gray.500">
          <TrendingUp className="mx-auto mb-4 h-12 w-12" />
          <Text>未发现套利机会</Text>
          <Text fontSize="sm">可以尝试调整最小价差过滤条件</Text>
        </Box>
      ) : (
        <Box display="grid" gap={3}>
          {sorted.map(opportunity => (
            <Box
              key={opportunity.id}
              borderWidth="1px"
              borderColor="gray.200"
              bg="white"
              p={4}
              borderRadius="lg"
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
            >
              <HStack justifyContent="space-between" mb={3} alignItems="center">
                <HStack spacing={3} alignItems="center">
                  <Box bg="green.100" borderRadius="md" p={2}>
                    <TrendingUp className="h-5 w-5" color="#16a34a" />
                  </Box>
                  <Box>
                    <Heading as="h4" size="sm" color="gray.900">
                      {opportunity.pair}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {opportunity.buyExchange} → {opportunity.sellExchange}
                    </Text>
                  </Box>
                </HStack>
                <Box textAlign="right">
                  <Text color="green.600" fontSize="lg" fontWeight="bold">
                    +{opportunity.spreadPercentage.toFixed(2)}%
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    ${opportunity.spread.toFixed(2)} spread
                  </Text>
                </Box>
              </HStack>

              <Grid templateColumns="repeat(2, 1fr)" gap={4} fontSize="sm">
                <HStack spacing={2}>
                  <TrendingDown className="h-4 w-4" color="#16a34a" />
                  <Text color="gray.600">买入：</Text>
                  <Text fontWeight="medium">${opportunity.buyPrice.toLocaleString()}</Text>
                </HStack>
                <HStack spacing={2}>
                  <TrendingUp className="h-4 w-4" color="#dc2626" />
                  <Text color="gray.600">卖出：</Text>
                  <Text fontWeight="medium">${opportunity.sellPrice.toLocaleString()}</Text>
                </HStack>
                <HStack spacing={2}>
                  <DollarSign className="h-4 w-4" color="#7cba59" />
                  <Text color="gray.600">预估利润：</Text>
                  <Text color="green.600" fontWeight="medium">
                    ${opportunity.estimatedProfit.toFixed(2)}
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Clock className="h-4 w-4" color="#9ca3af" />
                  <Text color="gray.600">时间：</Text>
                  <Text fontWeight="medium">{formatTimeAgo(opportunity.timestamp)}</Text>
                </HStack>
              </Grid>

              {opportunity.volume && opportunity.volume > 0 && (
                <Box mt={3} borderTopWidth="1px" borderColor="gray.100" pt={3}>
                  <HStack justifyContent="space-between" fontSize="sm">
                    <Text color="gray.600">可用成交量：</Text>
                    <Text fontWeight="medium">{opportunity.volume.toLocaleString()}</Text>
                  </HStack>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      <Box mt={6} bg="gray.50" p={4} borderRadius="lg">
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4} textAlign="center">
          <Box>
            <Text color="brand.600" fontSize="2xl" fontWeight="bold">
              {opportunities.length}
            </Text>
            <Text fontSize="sm" color="gray.600">
              总计发现
            </Text>
          </Box>
          <Box>
            <Text color="green.600" fontSize="2xl" fontWeight="bold">
              {opportunities.filter(opp => opp.spreadPercentage > 0.5).length}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {'高价差（>0.5%）'}
            </Text>
          </Box>
          <Box>
            <Text color="orange.600" fontSize="2xl" fontWeight="bold">
              ${opportunities.reduce((sum, opp) => sum + opp.estimatedProfit, 0).toFixed(0)}
            </Text>
            <Text fontSize="sm" color="gray.600">
              总利润潜力
            </Text>
          </Box>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.600">
              {(opportunities.reduce((sum, opp) => sum + opp.spreadPercentage, 0) / opportunities.length || 0).toFixed(2)}%
            </Text>
            <Text fontSize="sm" color="gray.600">
              平均价差
            </Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default ArbitrageHistoryChakra
