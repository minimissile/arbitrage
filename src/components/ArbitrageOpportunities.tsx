import { useState } from 'react'
import { Box, Text, HStack, Heading, Skeleton, SkeletonText } from '@chakra-ui/react'
import { useCoinglassFundingArbQuery, coinglassFormat } from '@/hooks/querys/coinglass'
import Pagination from '@/components/Pagination'

/**
 * 套利机会列表
 * @constructor
 */
function ArbitrageOpportunities() {
  const [arbPage, setArbPage] = useState(1)
  const [arbPageSize] = useState(20)
  const { data: frPage, isLoading: frLoading, isError: frError } = useCoinglassFundingArbQuery(arbPage, arbPageSize, 10000)
  const frItems = frPage?.items ?? []
  const frTotal = frPage?.total ?? 0
  const frTotalPages = Math.max(1, Math.ceil(frTotal / arbPageSize))

  return (
    <Box>
      {/* 资金费率套利 */}
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

        <Pagination page={arbPage} totalPages={frTotalPages} onChange={setArbPage} />
      </Box>
    </Box>
  )
}

export default ArbitrageOpportunities
