import { useMemo, useEffect } from 'react'
import {
  Box,
  Text,
  HStack,
  Heading,
  Skeleton,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex
} from '@chakra-ui/react'
import { coinglassFormat } from '@/hooks/querys/coinglass'
import Pagination from '@/components/Pagination'
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'
import { tradeUrlForExchange } from '@/config'
import { useArbitrageStore } from '@/stores/arbitrageStore'

/**
 * 套利机会列表
 * @constructor
 */
function ArbitrageOpportunities() {
  const arbPage = useArbitrageStore(s => s.arbPage)
  const arbPageSize = useArbitrageStore(s => s.arbPageSize)
  const arbTotal = useArbitrageStore(s => s.arbTotal)
  const arbLoading = useArbitrageStore(s => s.arbLoading)
  const arbError = useArbitrageStore(s => s.arbError)
  const arbPageData = useArbitrageStore(s => s.arbPageData)
  const setArbPage = useArbitrageStore(s => s.setArbPage)
  const arbFilters = useArbitrageStore(s => s.arbFilters)
  const setArbFilters = useArbitrageStore(s => s.setArbFilters)
  const arbExchangeOptions = useArbitrageStore(s => s.arbExchangeOptions)

  const frTotalPages = useMemo(() => Math.max(1, Math.ceil(arbTotal / arbPageSize)), [arbTotal, arbPageSize])

  useEffect(() => {
    useArbitrageStore.getState().fetchCoinGlassArb(10000)
  }, [])

  const formatUSDCompact = (v: number) => {
    const n = Number(v)
    if (!isFinite(n) || n <= 0) return '--'
    return `$${(n / 10000).toFixed(2)}万`
  }

  const exchangeOptions = arbExchangeOptions

  const filtered = arbPageData

  return (
    <Box>
      <Box mb={6}>
        <Heading size="sm" mt={1}>
          资金费率套利（跨交易所）
        </Heading>
        <Box position="sticky" top={0} zIndex={10} bg="white" pb={3} pt={3}>
          <HStack gap={3} justifyContent="space-between">
            <Flex gap={2}>
              <Input
                px={3}
                borderRadius={'base'}
                fontSize={'14px'}
                width="300px"
                placeholder="搜索币种或交易所"
                value={arbFilters.search}
                onChange={e => setArbFilters({ search: e.target.value })}
              />
              <Input
                px={3}
                borderRadius={'base'}
                fontSize={'14px'}
                type="number"
                width="180px"
                placeholder="最小APR(%)"
                value={arbFilters.minApr ?? ''}
                onChange={e => setArbFilters({ minApr: e.target.value ? parseFloat(e.target.value) : null })}
              />
            </Flex>

            <Flex gap={2}>
              <Select
                value={arbFilters.exchange}
                onChange={e => setArbFilters({ exchange: e.target.value })}
                maxW="220px"
                fontSize={'sm'}
                borderRadius={'base'}
              >
                <option value="ALL">全部交易所</option>
                {exchangeOptions.map(ex => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </Select>

              <Button
                onClick={() => setArbFilters({ order: arbFilters.order === 'desc' ? 'asc' : 'desc' })}
                variant="outline"
                flexShrink={0}
                gap={1}
                fontSize={'sm'}
                borderRadius={'base'}
                fontWeight="normal"
              >
                <Text as="span">APR排序</Text>
                <div>{arbFilters.order === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}</div>
              </Button>
            </Flex>
          </HStack>
        </Box>

        {arbError && <Text color="red.600">资金费率套利数据加载失败</Text>}

        {arbLoading ? (
          <Table>
            <Tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <Tr key={`loading-${i}`}>
                  <Td>
                    <Skeleton w="48px" h="16px" borderRadius="md" />
                  </Td>
                  <Td>
                    <Skeleton w="200px" h="16px" />
                  </Td>
                  <Td>
                    <Skeleton w="160px" h="16px" />
                  </Td>
                  <Td>
                    <Skeleton w="100px" h="16px" />
                  </Td>
                  <Td>
                    <Skeleton w="80px" h="16px" />
                  </Td>
                  <Td>
                    <Skeleton w="140px" h="16px" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : filtered.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            暂无资金费率套利数据
          </Text>
        ) : (
          <Table>
            <Thead position="sticky" top="64px" zIndex={9} bg="white">
              <Tr bg="gray.100" fontWeight="bold">
                <Th>排名</Th>
                <Th>币种</Th>
                <Th>套利组合</Th>
                <Th>
                  <Flex
                    align={'center'}
                    cursor={'pointer'}
                    onClick={() =>
                      setArbFilters({
                        sortBy: 'apr',
                        order: arbFilters.order === 'desc' ? 'asc' : 'desc'
                      })
                    }
                    gap={1}
                  >
                    当前年化
                    <ArrowDown
                      size={13}
                      style={{
                        transition: 'transform 0.25s ease',
                        transform: arbFilters.order === 'desc' && arbFilters.sortBy === 'apr' ? 'rotate(0deg)' : 'rotate(180deg)'
                      }}
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex
                    align={'center'}
                    cursor={'pointer'}
                    onClick={() =>
                      setArbFilters({
                        sortBy: 'funding',
                        order: arbFilters.order === 'desc' ? 'asc' : 'desc'
                      })
                    }
                    gap={1}
                  >
                    净资金率
                    <ArrowDown
                      size={13}
                      style={{
                        transition: 'transform 0.25s ease',
                        transform:
                          arbFilters.order === 'desc' && arbFilters.sortBy === 'funding' ? 'rotate(0deg)' : 'rotate(180deg)'
                      }}
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex
                    align={'center'}
                    cursor={'pointer'}
                    onClick={() =>
                      setArbFilters({
                        sortBy: 'spread',
                        order: arbFilters.order === 'desc' ? 'asc' : 'desc'
                      })
                    }
                    gap={1}
                  >
                    价差率
                    <ArrowDown
                      size={13}
                      style={{
                        transition: 'transform 0.25s ease',
                        transform:
                          arbFilters.order === 'desc' && arbFilters.sortBy === 'spread' ? 'rotate(0deg)' : 'rotate(180deg)'
                      }}
                    />
                  </Flex>
                </Th>
                <Th>持仓</Th>
                <Th>距离结算</Th>
                <Th textAlign={'center'}>交易</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((item, idx) => (
                <Tr key={`${item.symbol}-${item.buy.exchange}-${item.sell.exchange}`} px={1}>
                  <Td py={1.5} fontWeight="medium">
                    {(arbPage - 1) * arbPageSize + idx + 1}
                  </Td>
                  <Td py={1.5} fontWeight="medium">
                    {item.symbol}
                  </Td>
                  <Td py={1.5} lineHeight={1.25}>
                    <Text fontSize="xs" fontWeight="semibold" color="green.600">
                      做多 {item.symbol} @ {item.buy.exchange}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      资金费率 {coinglassFormat.formatFundingRate((item.buy.funding_rate ?? 0) / 100)}
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" color="red.600" mt={1}>
                      做空 {item.symbol} @ {item.sell.exchange}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      资金费率 {coinglassFormat.formatFundingRate((item.sell.funding_rate ?? 0) / 100)}
                    </Text>
                  </Td>
                  <Td py={1.5} fontWeight="bold" color={(item.apr ?? 0) > 100 ? 'orange.600' : 'gray.800'}>
                    {(item.apr ?? 0).toFixed(2)}%
                  </Td>
                  <Td py={1.5} color={Math.abs(item.funding ?? 0) > 1 ? 'red.600' : 'gray.700'}>
                    {coinglassFormat.formatFundingRate((item.funding ?? 0) / 100)}
                  </Td>
                  <Td py={1.5} color="gray.700">
                    {coinglassFormat.formatFundingRate((item.spread ?? 0) / 100)}
                  </Td>
                  <Td py={1.5} fontSize={'sm'}>
                    <Text>{formatUSDCompact(item.buy?.open_interest_usd ?? 0)}</Text>
                    <Text>{formatUSDCompact(item.sell?.open_interest_usd ?? 0)}</Text>
                  </Td>
                  <Td py={1.5}>{coinglassFormat.formatTime(item.next_funding_time)}</Td>
                  <Td py={1.5} textAlign={'center'}>
                    <HStack gap={0} w={'full'} justifyContent={'center'}>
                      <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={<ExternalLink size={14} />}
                        onClick={() => {
                          window.open(tradeUrlForExchange(item.buy.exchange, item.symbol, 'futures'), '_blank')
                        }}
                      >
                        多
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={<ExternalLink size={14} />}
                        onClick={() => {
                          window.open(tradeUrlForExchange(item.sell.exchange, item.symbol, 'futures'), '_blank')
                        }}
                      >
                        空
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Pagination mt={3} page={arbPage} totalPages={frTotalPages} onChange={setArbPage} />
      </Box>
    </Box>
  )
}

export default ArbitrageOpportunities
