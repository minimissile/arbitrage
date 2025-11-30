import { Box, Flex, Text } from '@chakra-ui/react'
import type { FundingRow } from '@/types/funding'
import { fundingFormat } from '@/hooks/querys'
import { ExternalLink } from 'lucide-react'
import { tradeUrlForExchange } from '@/config'

export default function ExchangeFundingCard(row: FundingRow) {
  const entry = row
  const sym = entry.symbol
  const openTrade = () => {
    try {
      window.open(tradeUrlForExchange(entry.exchange, sym, 'futures'), '_blank')
    } catch {}
  }

  return (
    <Box
      fontSize={'11px'}
      px={1.5}
      py={0.5}
      lineHeight={'1.45'}
      borderWidth="1px"
      borderRadius="base"
      letterSpacing={'-0.3px'}
      minW="200px"
    >
      {
        <Flex
          align={'center'}
          gap={1}
          textDecoration={'underline'}
          textDecorationColor={'blue.500'}
          cursor={'pointer'}
          onClick={openTrade}
        >
          <Text>{entry.exchange}</Text>
          <ExternalLink size={12} />
        </Flex>
      }

      <Text fontSize={'xs'} fontWeight="medium">
        {fundingFormat.formatFundingRate(entry.fundingRate)}
      </Text>
      {entry.price !== undefined && (
        <Text fontSize="xs" color="gray.600">
          价格: {fundingFormat.formatPrice(entry.price)}
        </Text>
      )}
      <Text color="gray.600">日化: {fundingFormat.formatFundingRate(entry.dailyFundingRate)}</Text>
      <Text color="gray.600">周期: {entry.cycle}h</Text>
      <Text color="gray.600">结算: {fundingFormat.formatTime(entry.nextFundingTimestamp)}</Text>
    </Box>
  )
}
