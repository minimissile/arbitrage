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
import type { FundingRow } from '@/types/funding'
import { fetchAsterFundingRow } from '@/api/aster'
import { fetchEdgexFundingRowBySymbol } from '@/api/edgex'
import { fetchBinanceFundingRow } from '@/api/binance'
import { fetchBackpackFundingRow } from '@/api/backpack'
import { fetchBybitFundingRow } from '@/api/bybit'
import { fetchReyaFundingRow } from '@/api/reya'
import { fetchBitgetFundingRow } from '@/api/bitget'
import { fetchGateFundingRow } from '@/api/gate'
import { fetchOkxFundingRow } from '@/api/okx'
import { fetchKucoinFundingRow } from '@/api/kucoin'
import { fetchBingxFundingRow } from '@/api/bingx'
import { fetchHtxFundingRow } from '@/api/htx'
import { fetchLbankFundingRow } from '@/api/lbank'
import { fetchHyperliquidFundingRow } from '@/api/hyperliquid'
import { fetchApexFundingRow } from '@/api/apex'
import { fetchMexcFundingRow } from '@/api/mexc'

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
  const [asterRows, setAsterRows] = useState<Record<string, FundingRow | null>>({})
  const [edgexRows, setEdgexRows] = useState<Record<string, FundingRow | null>>({})
  const [binanceRows, setBinanceRows] = useState<Record<string, FundingRow | null>>({})
  const [backpackRows, setBackpackRows] = useState<Record<string, FundingRow | null>>({})
  const [bybitRows, setBybitRows] = useState<Record<string, FundingRow | null>>({})
  const [reyaRows, setReyaRows] = useState<Record<string, FundingRow | null>>({})
  const [bitgetRows, setBitgetRows] = useState<Record<string, FundingRow | null>>({})
  const [gateRows, setGateRows] = useState<Record<string, FundingRow | null>>({})
  const [okxRows, setOkxRows] = useState<Record<string, FundingRow | null>>({})
  const [kucoinRows, setKucoinRows] = useState<Record<string, FundingRow | null>>({})
  const [bingxRows, setBingxRows] = useState<Record<string, FundingRow | null>>({})
  const [htxRows, setHtxRows] = useState<Record<string, FundingRow | null>>({})
  const [lbankRows, setLbankRows] = useState<Record<string, FundingRow | null>>({})
  const [hyperRows, setHyperRows] = useState<Record<string, FundingRow | null>>({})
  const [apexRows, setApexRows] = useState<Record<string, FundingRow | null>>({})
  const [mexcRows, setMexcRows] = useState<Record<string, FundingRow | null>>({})

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

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBybitFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBybitRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchReyaFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setReyaRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBitgetFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBitgetRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchGateFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setGateRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchOkxFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setOkxRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchKucoinFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setKucoinRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBingxFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBingxRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchHtxFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setHtxRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchLbankFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setLbankRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchHyperliquidFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setHyperRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchApexFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setApexRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchMexcFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setMexcRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchEdgexFundingRowBySymbol(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setEdgexRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBinanceFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBinanceRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBackpackFundingRow(s)])
      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBackpackRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  useEffect(() => {
    const run = async () => {
      const tasks = watchlistSymbols.map(async s => [s.toUpperCase(), await fetchBybitFundingRow(s)])

      console.log('tasks', tasks)

      const results = await Promise.all(tasks)
      const map: Record<string, FundingRow | null> = {}
      for (const [sym, row] of results) map[sym] = row
      setBybitRows(map)
    }
    run().then()
  }, [watchlistSymbols])

  console.log('watchlistSymbols', watchlistSymbols)

  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg">观察列表</Heading>
        <Text fontSize="sm" color="gray.600">
          手动输入币种并观察各交易所资金费率
        </Text>
      </Box>

      <HStack gap={2}>
        <Input
          fontSize={'sm'}
          px={3}
          borderRadius={'base'}
          placeholder="输入币种，如BTC、ETH、SOL..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              apply()
            }
          }}
        />
        <Button colorScheme="brand" onClick={apply} fontSize={'sm'} borderRadius={'base'}>
          开始观察
        </Button>
        <Button variant="outline" onClick={clearWatchlist} fontSize={'sm'} borderRadius={'base'}>
          清空
        </Button>
      </HStack>

      {/*观察中的币种列表*/}
      {watchlistSymbols.length > 0 && (
        <HStack gap={2} flexWrap="wrap">
          {watchlistSymbols.map(sym => (
            <Tag key={`sym-${sym}`} size="md" borderRadius="base" variant="subtle" colorScheme="gray">
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
                      {gateRows[group.symbol] && (
                        <ExchangeFundingCard key={`Gate-${group.symbol}`} {...gateRows[group.symbol]!} />
                      )}
                      {okxRows[group.symbol] && <ExchangeFundingCard key={`OKX-${group.symbol}`} {...okxRows[group.symbol]!} />}
                      {kucoinRows[group.symbol] && (
                        <ExchangeFundingCard key={`KuCoin-${group.symbol}`} {...kucoinRows[group.symbol]!} />
                      )}
                      {bingxRows[group.symbol] && (
                        <ExchangeFundingCard key={`BingX-${group.symbol}`} {...bingxRows[group.symbol]!} />
                      )}
                      {mexcRows[group.symbol] && (
                        <ExchangeFundingCard key={`MEXC-${group.symbol}`} {...mexcRows[group.symbol]!} />
                      )}
                      {htxRows[group.symbol] && <ExchangeFundingCard key={`HTX-${group.symbol}`} {...htxRows[group.symbol]!} />}
                      {lbankRows[group.symbol] && (
                        <ExchangeFundingCard key={`LBank-${group.symbol}`} {...lbankRows[group.symbol]!} />
                      )}
                      {hyperRows[group.symbol] && (
                        <ExchangeFundingCard key={`Hyperliquid-${group.symbol}`} {...hyperRows[group.symbol]!} />
                      )}
                      {apexRows[group.symbol] && (
                        <ExchangeFundingCard key={`ApeX-${group.symbol}`} {...apexRows[group.symbol]!} />
                      )}
                      {bitgetRows[group.symbol] && (
                        <ExchangeFundingCard key={`Bitget-${group.symbol}`} {...bitgetRows[group.symbol]!} />
                      )}
                      {reyaRows[group.symbol] && (
                        <ExchangeFundingCard key={`Reya-${group.symbol}`} {...reyaRows[group.symbol]!} />
                      )}
                      {bybitRows[group.symbol] && (
                        <ExchangeFundingCard key={`Bybit-${group.symbol}`} {...bybitRows[group.symbol]!} />
                      )}
                      {backpackRows[group.symbol] && (
                        <ExchangeFundingCard key={`Backpack-${group.symbol}`} {...backpackRows[group.symbol]!} />
                      )}
                      {binanceRows[group.symbol] && (
                        <ExchangeFundingCard key={`Binance-${group.symbol}`} {...binanceRows[group.symbol]!} />
                      )}
                      {asterRows[group.symbol] && (
                        <ExchangeFundingCard key={`Aster-${group.symbol}`} {...asterRows[group.symbol]!} />
                      )}
                      {edgexRows[group.symbol] && (
                        <ExchangeFundingCard key={`EdgeX-${group.symbol}`} {...edgexRows[group.symbol]!} />
                      )}
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
