import FundingRatesTable from '@/components/FundingRatesTable'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useUnifiedFundingQuery, fundingFormat } from '@/hooks/querys'

/**
 * 资金费率页面
 * @constructor
 */
export default function FundingPage() {
  const { dataUpdatedAt } = useUnifiedFundingQuery()
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
    </Box>
  )
}
