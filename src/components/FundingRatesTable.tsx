import { useEffect, useMemo, useState } from 'react'
import { Button, HStack, Input, Table, Thead, Tbody, Tr, Th, Td, Box, Spinner, Text } from '@chakra-ui/react'
import { useFundingStore, fundingFormat } from '@/stores/FundingStore'

export default function FundingRatesTable() {
  const [search, setSearch] = useState('')
  const { groups, load, loading, error } = useFundingStore()
  useEffect(() => {
    load()
    const id = setInterval(() => load(), 30000)
    return () => clearInterval(id)
  }, [load])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (groups ?? []).filter(
      g => g.symbol.toLowerCase().includes(q) || g.entries.some(e => e.exchange.toLowerCase().includes(q))
    )
  }, [groups, search])

  return (
    <Box p={4}>
      <HStack gap={3} mb={3}>
        <Input placeholder="搜索交易对 (如 BTC_USDC_PERP)" value={search} onChange={e => setSearch(e.target.value)} />
        <Button onClick={() => load()} disabled={loading} colorScheme="brand">
          {loading ? '刷新中…' : '手动刷新'}
        </Button>
      </HStack>

      {loading && (
        <HStack>
          <Spinner />
          <Text>加载中…</Text>
        </HStack>
      )}
      {error && <Text>加载失败，请稍后重试</Text>}

      {!loading && !error && (
        <Table>
          <Thead>
            <Tr>
              <Th>币种</Th>
              <Th>交易所 / 当前资金费率 / 当前价格 / 日化收益 / 结算周期 / 下一次结算时间</Th>
              <Th>最大资金费率差</Th>
              <Th>最近结算时间</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map(g => {
              const delta = g.delta
              const nearest = g.nearestTs
              return (
                <Tr key={g.symbol}>
                  <Td>{g.symbol}</Td>
                  <Td>
                    <HStack gap={2} wrap="wrap">
                      {g.entries.map(e => (
                        <Box key={`${e.exchange}-${g.symbol}`} px={2} py={1} borderWidth="1px" borderRadius="md">
                          <Text fontSize="xs">{e.exchange}</Text>
                          <Text fontSize="sm" fontWeight="medium">
                            {fundingFormat.formatFundingRate(e.fundingRate)}
                          </Text>
                          {e.price !== undefined && (
                            <Text fontSize="xs" color="gray.600">
                              价格 {fundingFormat.formatPrice(e.price)}
                            </Text>
                          )}
                          <Text fontSize="xs" color="gray.600">
                            日化 {fundingFormat.formatFundingRate(e.dailyFundingRate)}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            周期 {e.cycle}h
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            结算 {fundingFormat.formatTime(e.nextFundingTimestamp)}
                          </Text>
                        </Box>
                      ))}
                    </HStack>
                  </Td>
                  <Td color={Math.abs(delta) > 0.01 ? 'red.600' : 'gray.700'}>{(delta * 100).toFixed(4)}%</Td>
                  <Td>{fundingFormat.formatTime(nearest)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
