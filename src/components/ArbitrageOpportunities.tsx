import { useMemo, useState } from 'react'
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
import { useCoinglassFundingArbQuery, coinglassFormat } from '@/hooks/querys/coinglass'
import Pagination from '@/components/Pagination'
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'

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

  const [search, setSearch] = useState('')
  const [selectedExchange, setSelectedExchange] = useState<string>('ALL')
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [minApr, setMinApr] = useState<string>('')

  const exchangeOptions = useMemo(() => {
    const set = new Set<string>()
    for (const it of frItems) {
      if (it?.buy?.exchange) set.add(it.buy.exchange)
      if (it?.sell?.exchange) set.add(it.sell.exchange)
    }
    return Array.from(set).sort()
  }, [frItems])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const min = minApr ? parseFloat(minApr) : undefined
    return frItems
      .filter(it => {
        const matchQ = q
          ? it.symbol?.toLowerCase().includes(q) ||
            it.buy?.exchange?.toLowerCase().includes(q) ||
            it.sell?.exchange?.toLowerCase().includes(q)
          : true
        const matchEx =
          selectedExchange === 'ALL'
            ? true
            : it.buy?.exchange?.toLowerCase() === selectedExchange.toLowerCase() ||
              it.sell?.exchange?.toLowerCase() === selectedExchange.toLowerCase()
        const matchApr = min !== undefined ? (it.apr ?? 0) >= min : true
        return matchQ && matchEx && matchApr
      })
      .sort((a, b) => {
        const av = a.apr ?? 0
        const bv = b.apr ?? 0
        return order === 'desc' ? bv - av : av - bv
      })
  }, [frItems, search, selectedExchange, minApr, order])

  return (
    <Box>
      <Box mb={6}>
        <Heading size="sm" mb={3}>
          资金费率套利（跨交易所）
        </Heading>
        <Box position="sticky" top={0} zIndex={10} bg="white" pb={3} pt={3}>
          <HStack gap={3} justifyContent="space-between">
            <Flex gap={3}>
              <Input width="300px" placeholder="搜索币种或交易所" value={search} onChange={e => setSearch(e.target.value)} />
              <Input
                type="number"
                width="180px"
                placeholder="最小APR(%)"
                value={minApr}
                onChange={e => setMinApr(e.target.value)}
              />
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
                variant="outline"
                flexShrink={0}
                gap={1}
                fontWeight="normal"
              >
                <Text as="span">APR排序</Text>
                <div>{order === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}</div>
              </Button>
            </Flex>
          </HStack>
        </Box>

        {frError && <Text color="red.600">资金费率套利数据加载失败</Text>}

        {frLoading ? (
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
                <Th>当前年化</Th>
                <Th>净资金率</Th>
                <Th>价差率</Th>
                <Th>持仓</Th>
                <Th>距离结算</Th>
                <Th>交易</Th>
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
                  <Td py={1.5}>
                    <Text fontSize="xs" fontWeight="semibold" color="green.600">
                      做多 {item.symbol}/USDT @ {item.buy.exchange}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      资金费率 {coinglassFormat.formatFundingRate((item.buy.funding_rate ?? 0) / 100)}
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" color="red.600" mt={1}>
                      做空 {item.symbol}/USDT @ {item.sell.exchange}
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
                    --
                  </Td>
                  <Td py={1.5} color="gray.700">
                    --
                  </Td>
                  <Td py={1.5}>{coinglassFormat.formatTime(item.next_funding_time)}</Td>
                  <Td py={1.5}>
                    <HStack gap={2}>
                      <Button size="xs" variant="ghost" rightIcon={<ExternalLink size={14} />}>
                        多
                      </Button>
                      <Button size="xs" variant="ghost" rightIcon={<ExternalLink size={14} />}>
                        空
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Pagination page={arbPage} totalPages={frTotalPages} onChange={setArbPage} />
      </Box>
    </Box>
  )
}

export default ArbitrageOpportunities
