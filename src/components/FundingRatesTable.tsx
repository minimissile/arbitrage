import { useMemo, useState } from 'react'
import {
  Button,
  HStack,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Skeleton,
  SkeletonText,
  Flex
} from '@chakra-ui/react'
import { useUnifiedFundingQuery, groupFundingRows, fundingFormat } from '@/hooks/querys'
import { ArrowDown, ArrowUp } from 'lucide-react'

/**
 * 资金费率表格
 * @constructor
 */
export default function FundingRatesTable() {
  const [search, setSearch] = useState('')
  const [selectedExchange, setSelectedExchange] = useState<string>('ALL')
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const { data, isLoading, isError, refetch, isFetching } = useUnifiedFundingQuery()

  const groups = useMemo(() => groupFundingRows(data ?? []), [data])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (groups ?? []).filter(
      g => g.symbol.toLowerCase().includes(q) || g.entries.some(e => e.exchange.toLowerCase().includes(q))
    )
  }, [groups, search])

  const exchangeOptions = useMemo(() => {
    const set = new Set<string>()
    for (const g of groups) {
      for (const e of g.entries) set.add(e.exchange)
    }
    return Array.from(set).sort()
  }, [groups])

  const sorted = useMemo(() => {
    const getRate = (g: (typeof groups)[number]) => {
      if (selectedExchange === 'ALL') {
        if (!g.entries.length) return null
        return Math.max(...g.entries.map(e => e.fundingRate))
      }
      const entry = g.entries.find(e => e.exchange.toLowerCase() === selectedExchange.toLowerCase())
      return entry ? entry.fundingRate : null
    }
    const arr = [...filtered]
    arr.sort((a, b) => {
      const ra = getRate(a)
      const rb = getRate(b)
      if (ra == null && rb == null) return 0
      if (ra == null) return 1
      if (rb == null) return -1
      return order === 'desc' ? rb - ra : ra - rb
    })
    return arr
  }, [filtered, selectedExchange, order])

  return (
    <Box p={4} pt={0}>
      {/*筛选区*/}
      <Box position="sticky" top={0} zIndex={10} bg="white" pb={3} pt={3}>
        <HStack gap={3} justifyContent={'space-between'}>
          <Flex gap={3}>
            <Input
              width={'300px'}
              placeholder="搜索币种 (如 BTC、ETH...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={() => refetch()} disabled={isFetching} colorScheme="brand">
              {isFetching ? '刷新中…' : '手动刷新'}
            </Button>
          </Flex>

          <Flex gap={3}>
            <Select value={selectedExchange} onChange={e => setSelectedExchange(e.target.value)} maxW="220px">
              <option value="ALL">全部交易所</option>
              {exchangeOptions.map(ex => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </Select>

            <Button
              onClick={() => setOrder(o => (o === 'desc' ? 'asc' : 'desc'))}
              variant={'outline'}
              flexShrink={0}
              gap={1}
              fontWeight={'normal'}
            >
              <Text as="span">资金费率</Text>
              <div>{order === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}</div>
            </Button>
          </Flex>
        </HStack>
      </Box>

      {isError && <Text>加载失败，请稍后重试</Text>}

      {!isError && (
        <Table>
          <Thead position="sticky" top="64px" zIndex={9} bg="white">
            <Tr bg={'gray.100'} fontWeight={'bold'}>
              <Th>币种</Th>
              <Th>交易所 / 当前资金费率 / 当前价格 / 日化收益 / 结算周期 / 下一次结算时间</Th>
              <Th>
                <Flex align={'center'}>
                  最大资金费率差
                  <ArrowDown size={13} />
                </Flex>
              </Th>
              <Th>最近结算时间</Th>
            </Tr>
          </Thead>

          {isLoading ? (
            <Tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <Tr key={`loading-${i}`}>
                  <Td>
                    <Skeleton w="48px" h="16px" borderRadius="md" />
                  </Td>
                  <Td>
                    <HStack gap={2} wrap="wrap">
                      {Array.from({ length: 3 }).map((__, j) => (
                        <Box key={`card-${i}-${j}`} px={2} py={2} borderWidth="1px" borderRadius="md" minW="160px">
                          <Skeleton w="64px" h="12px" mb={2} />
                          <SkeletonText noOfLines={3} spacing="2" skeletonHeight="10px" />
                        </Box>
                      ))}
                    </HStack>
                  </Td>
                  <Td>
                    <Skeleton w="72px" h="16px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="16px" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              {sorted.map(g => {
                const delta = g.delta
                const nearest = g.nearestTs
                return (
                  <Tr key={g.symbol} px={1}>
                    <Td py={1.5}>{g.symbol}</Td>
                    <Td py={1.5}>
                      <HStack gap={2} wrap="wrap">
                        {/*各交易所资金费率数据*/}
                        {g.entries.map(e => (
                          <Box
                            fontSize={'11px'}
                            key={e.id ?? `${e.exchange}-${g.symbol}`}
                            px={1.5}
                            py={0.5}
                            lineHeight={'1.45'}
                            borderWidth="1px"
                            borderRadius="base"
                            letterSpacing={'-0.3px'}
                          >
                            <Text>{e.exchange}</Text>
                            <Text fontSize={'xs'} fontWeight="medium">
                              {fundingFormat.formatFundingRate(e.fundingRate)}
                            </Text>
                            {e.price !== undefined && (
                              <Text fontSize="xs" color="gray.600">
                                价格: {fundingFormat.formatPrice(e.price)}
                              </Text>
                            )}
                            <Text color="gray.600">日化: {fundingFormat.formatFundingRate(e.dailyFundingRate)}</Text>
                            <Text color="gray.600">周期: {e.cycle}h</Text>
                            <Text color="gray.600">结算: {fundingFormat.formatTime(e.nextFundingTimestamp)}</Text>
                          </Box>
                        ))}
                      </HStack>
                    </Td>
                    <Td py={1.5} color={Math.abs(delta) > 0.01 ? 'red.600' : 'gray.700'}>
                      {(delta * 100).toFixed(4)}%
                    </Td>
                    <Td py={1.5}>{fundingFormat.formatTime(nearest)}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          )}
        </Table>
      )}
    </Box>
  )
}
