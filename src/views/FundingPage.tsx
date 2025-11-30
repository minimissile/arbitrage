import FundingRatesTable from '@/components/FundingRatesTable'
import { Box, Flex, Heading, Text, HStack, Skeleton, SkeletonText } from '@chakra-ui/react'
import { useUnifiedFundingQuery, fundingFormat } from '@/hooks/querys'
import { useEffect, useState } from 'react'
import { fetchAsterFundingRows } from '@/api/aster'
import ExchangeFundingCard from '@/components/ExchangeFundingCard'

/**
 * 资金费率页面
 * @constructor
 */
export default function FundingPage() {
  const { dataUpdatedAt } = useUnifiedFundingQuery()
  const [asterRows, setAsterRows] = useState([] as ReturnType<typeof Array<never>> & any)
  const [asterLoading, setAsterLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      setAsterLoading(true)
      const rows = await fetchAsterFundingRows()
      setAsterRows(rows)
      setAsterLoading(false)
    }
    run()
  }, [])
  return (
    <Box display="grid" gap={6}>
      <Flex alignItems={'center'} justifyContent={'space-between'} gap={2}>
        <Flex flexDirection={'column'} gap={0.5}>
          <Heading size="lg" color="gray.900">
            永续资金费率
          </Heading>
          <Text fontSize="sm" color="gray.600">
            实时查看交易对资金费率与结算时间
          </Text>
        </Flex>

        <Text fontSize={'sm'} color={'gray.500'}>
          更新时间：{dataUpdatedAt ? fundingFormat.formatTime(dataUpdatedAt) : '--/-- --:--'}
        </Text>
      </Flex>

      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg">
        <FundingRatesTable />
      </Box>

      <Box>
        <Heading size="md" color="gray.900">
          Aster 资金费率（USDT）
        </Heading>
        <Text fontSize="sm" color="gray.600">
          来自 Aster 全量接口，已过滤非 USDT 交易对
        </Text>
        <Box mt={3} borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={3}>
          {asterLoading ? (
            <HStack gap={2} wrap="wrap">
              {Array.from({ length: 8 }).map((_, i) => (
                <Box key={`aster-skeleton-${i}`} px={2} py={2} borderWidth="0.5px" borderRadius="base" minW="200px">
                  <Skeleton w="96px" h="12px" mb={2} />
                  <SkeletonText noOfLines={3} spacing="2" skeletonHeight="10px" />
                </Box>
              ))}
            </HStack>
          ) : asterRows.length === 0 ? (
            <Text fontSize="sm" color="gray.600">
              暂无 Aster 数据
            </Text>
          ) : (
            <HStack gap={2} wrap="wrap">
              {asterRows.map((row: any) => (
                <ExchangeFundingCard key={`aster-${row.exchange}-${row.symbol}`} {...row} />
              ))}
            </HStack>
          )}
        </Box>
      </Box>
    </Box>
  )
}
