import { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  HStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Skeleton,
  SkeletonText,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'
import { useArbitrageStore } from '@/stores/arbitrageStore'
import ExchangeFundingCard from '@/components/ExchangeFundingCard'

/**
 * 观察列表页面
 * @constructor
 */
export default function WatchlistPage() {
  const watchlistSymbols = useArbitrageStore(s => s.watchlistSymbols)
  const watchlistData = useArbitrageStore(s => s.watchlistData)
  const watchlistLoading = useArbitrageStore(s => s.watchlistLoading)
  const setWatchlistSymbols = useArbitrageStore(s => s.setWatchlistSymbols)
  const startWatch = useArbitrageStore(s => s.startWatch)
  const clearWatchlist = useArbitrageStore(s => s.clearWatchlist)
  const [text, setText] = useState('')

  const apply = () => {
    const tokens = text
      .replace(/，/g, ',')
      .split(/[,\s]+/)
      .map(t => t.trim().toUpperCase())
      .filter(Boolean)
    const union = Array.from(new Set([...watchlistSymbols, ...tokens]))
    setWatchlistSymbols(union)
    startWatch().then()
    setText('')
  }

  useEffect(() => {
    const { loadWatchlistFromCache } = useArbitrageStore.getState()
    loadWatchlistFromCache()
  }, [])

  useEffect(() => {
    if (watchlistSymbols.length) startWatch().then()
  }, [startWatch, watchlistSymbols])

  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg">观察列表</Heading>
        <Text fontSize="sm" color="gray.600">
          手动输入币种并观察各交易所资金费率
        </Text>
      </Box>

      <HStack gap={3}>
        <Input
          placeholder="输入币种，如 BTC,ETH,SOL"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              apply()
            }
          }}
        />
        <Button colorScheme="brand" onClick={apply}>
          开始观察
        </Button>
        <Button variant="outline" onClick={clearWatchlist}>
          清空
        </Button>
      </HStack>

      {watchlistSymbols.length > 0 && (
        <HStack gap={2} flexWrap="wrap">
          {watchlistSymbols.map(sym => (
            <Tag key={`sym-${sym}`} size="md" borderRadius="full" variant="subtle" colorScheme="gray">
              <TagLabel>{sym}</TagLabel>
              <TagCloseButton
                onClick={async () => {
                  const next = watchlistSymbols.filter(s => s !== sym)
                  setWatchlistSymbols(next)
                  if (next.length) await startWatch()
                }}
              />
            </Tag>
          ))}
        </HStack>
      )}

      <Box borderWidth="0.5px" borderColor="gray.200" bg="white" p={4} borderRadius="base">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>币种</Th>
              <Th>交易所 / 当前资金费率 / 当前价格 / 日化收益 / 结算周期 / 下一次结算时间</Th>
            </Tr>
          </Thead>
          {watchlistLoading ? (
            <Tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <Tr key={`wl-loading-${i}`}>
                  <Td>
                    <Skeleton w="64px" h="16px" borderRadius="md" />
                  </Td>
                  <Td>
                    <HStack gap={2} wrap="wrap">
                      {Array.from({ length: 3 }).map((__, j) => (
                        <Box key={`wl-card-${i}-${j}`} px={2} py={2} borderWidth="1px" borderRadius="md" minW="200px">
                          <Skeleton w="96px" h="12px" mb={2} />
                          <SkeletonText noOfLines={3} spacing="2" skeletonHeight="10px" />
                        </Box>
                      ))}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : watchlistData.length === 0 ? (
            <Tbody>
              <Tr>
                <Td colSpan={2} py={8} textAlign="center">
                  <Box>
                    <Heading size="sm" color="gray.800">
                      暂无观察数据
                    </Heading>
                    <Text mt={2} fontSize="sm" color="gray.600">
                      请输入币种并添加到观察列表
                    </Text>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {watchlistData.map(group => (
                <Tr key={`wl-${group.symbol}`}>
                  <Td py={1.5} fontWeight="medium">
                    {group.symbol}
                  </Td>
                  <Td py={1.5}>
                    <HStack gap={2} wrap="wrap">
                      {group.entries.map(e => (
                        <ExchangeFundingCard key={`${e.exchange}-${group.symbol}`} {...e} />
                      ))}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </Box>
    </Box>
  )
}
