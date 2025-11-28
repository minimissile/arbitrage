import FundingRatesTable from '@/components/FundingRatesTable'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function Funding() {
  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg" color="gray.900">永续资金费率</Heading>
        <Text fontSize="sm" color="gray.600">实时查看交易对资金费率与结算时间</Text>
      </Box>
      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="xl" boxShadow="sm">
        <FundingRatesTable />
      </Box>
    </Box>
  )
}
