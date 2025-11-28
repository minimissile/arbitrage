import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, HStack, Input, Table, Thead, Tbody, Tr, Th, Td, Box, Spinner, Text } from '@chakra-ui/react'
import { fetchMarkPrices, formatFundingRate, formatPrice, formatTime } from '../api/backpack'
import type { MarkPriceItem } from '../api/backpack'

export default function FundingRatesTable() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, refetch, isFetching } = useQuery<MarkPriceItem[]>({
    queryKey: ['backpack', 'markPrices'],
    queryFn: fetchMarkPrices,
    refetchInterval: 30_000
  })

  const rows = useMemo(() => {
    const list = (data ?? []).filter(x => x.symbol.toLowerCase().includes(search.trim().toLowerCase()))
    // sort by absolute funding rate desc
    return list.sort((a, b) => Math.abs(Number(b.fundingRate)) - Math.abs(Number(a.fundingRate)))
  }, [data, search])

  return (
    <Box p={4}>
      <HStack gap={3} mb={3}>
        <Input placeholder="搜索交易对 (如 BTC_USDC_PERP)" value={search} onChange={e => setSearch(e.target.value)} />
        <Button onClick={() => refetch()} disabled={isFetching} colorScheme="brand">
          {isFetching ? '刷新中…' : '手动刷新'}
        </Button>
      </HStack>

      {isLoading && (
        <HStack>
          <Spinner />
          <Text>加载中…</Text>
        </HStack>
      )}
      {isError && <Text>加载失败，请稍后重试</Text>}

      {!isLoading && !isError && (
        <Table>
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>Mark Price</Th>
              <Th>Index Price</Th>
              <Th>Funding Rate</Th>
              <Th>Next Funding</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map(r => (
              <Tr key={r.symbol}>
                <Td>{r.symbol}</Td>
                <Td>{formatPrice(r.markPrice)}</Td>
                <Td>{formatPrice(r.indexPrice)}</Td>
                <Td>{formatFundingRate(r.fundingRate)}</Td>
                <Td>{formatTime(r.nextFundingTimestamp)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
