import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Flex, Heading, Text, Input, Table, Thead, Tbody, Tr, Th, Td, Skeleton, HStack, Tag } from '@chakra-ui/react'
import { formatPrice, formatTime } from '@/utils'
import { fetchOnchainPancakePrice, type OnchainPriceResult } from '@/lib/pancakeOnchain'

export default function PancakePricePage() {
  const [tokenAddress, setTokenAddress] = useState('0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
  const [amountStr, setAmountStr] = useState('1')

  const trimmed = tokenAddress.trim()
  const enabled = /^0x[0-9a-fA-F]{40}$/.test(trimmed)

  const { data, isLoading, isError, refetch, isFetching } = useQuery<OnchainPriceResult>({
    queryKey: ['pancake', 'onchain-price', trimmed, 'USDT'],
    queryFn: () => fetchOnchainPancakePrice({ token: trimmed, quote: 'USDT' }),
    enabled,
    refetchInterval: 1_000,
    staleTime: 0
  })

  const amountNum = Number(amountStr)
  const amount = Number.isFinite(amountNum) && amountNum > 0 ? amountNum : 0

  let outQuote = 0
  let linearQuote = 0
  let impact = 0

  if (data && amount > 0 && data.reserveToken > 0 && data.reserveQuote > 0) {
    const feeFactor = 0.9975
    const amountInWithFee = amount * feeFactor
    const out = (amountInWithFee * data.reserveQuote) / (data.reserveToken + amountInWithFee)
    outQuote = out
    linearQuote = amount * data.price
    const effectivePrice = out / amount
    if (data.price > 0 && effectivePrice > 0) {
      impact = ((data.price - effectivePrice) / data.price) * 100
    }
  }

  const updatedLabel = data?.blockTimestampLast ? formatTime(data.blockTimestampLast * 1000) : '--'

  return (
    <Box display="grid" gap={6}>
      <Box>
        <Heading size="lg" color="gray.900">
          PancakeSwap 币种实时价格
        </Heading>
        <Text fontSize="sm" color="gray.600">
          直接通过 PancakeSwap V2 合约读取池子储备，计算链上实时价格
        </Text>
        <HStack mt={3} spacing={2}>
          <Tag size="sm" variant="subtle" colorScheme="gray">
            数据来源：BSC 链上 PancakeSwap V2 Token/USDT 池子
          </Tag>
          <Tag size="sm" variant="subtle" colorScheme="gray">
            每秒自动刷新
          </Tag>
          {isFetching && (
            <Tag size="sm" variant="subtle" colorScheme="green">
              刷新中
            </Tag>
          )}
        </HStack>
      </Box>

      <Flex align="center" justify="space-between" gap={4}>
        <HStack spacing={3}>
          <Input
            maxW="420px"
            placeholder="输入代币合约地址，例如 CAKE：0x0E09...1cE82"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
            fontSize="sm"
            borderRadius="base"
            px={3}
          />
          <Input
            maxW="180px"
            type="number"
            placeholder="卖出数量"
            value={amountStr}
            onChange={e => setAmountStr(e.target.value)}
            fontSize="sm"
            borderRadius="base"
            px={3}
          />
        </HStack>
        <HStack spacing={3} fontSize="sm" color="gray.600">
          <Text>报价币种：USDT (BEP20)</Text>
          <Text>数据时间：{updatedLabel}</Text>
          <Text>|</Text>
          <Text as="button" onClick={() => refetch()}>
            手动刷新
          </Text>
        </HStack>
      </Flex>

      <Box borderWidth="1px" borderColor="gray.200" bg="white" borderRadius="lg" p={4}>
        {!enabled ? (
          <Box py={10} textAlign="center">
            <Heading size="sm" color="gray.800" mb={2}>
              请输入合法的 BEP20 合约地址
            </Heading>
            <Text fontSize="sm" color="gray.600">
              需要以 0x 开头的 42 位地址，例如 CAKE 合约地址
            </Text>
          </Box>
        ) : isLoading ? (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>代币</Th>
                <Th>报价币种</Th>
                <Th isNumeric>价格</Th>
                <Th isNumeric>反向价格</Th>
                <Th isNumeric>池子储备</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Skeleton w="120px" h="16px" borderRadius="md" />
                </Td>
                <Td>
                  <Skeleton w="80px" h="16px" borderRadius="md" />
                </Td>
                <Td isNumeric>
                  <Skeleton w="120px" h="16px" borderRadius="md" ml="auto" />
                </Td>
                <Td isNumeric>
                  <Skeleton w="120px" h="16px" borderRadius="md" ml="auto" />
                </Td>
                <Td isNumeric>
                  <Skeleton w="160px" h="16px" borderRadius="md" ml="auto" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        ) : isError ? (
          <Box py={10} textAlign="center">
            <Heading size="sm" color="red.500" mb={2}>
              无法通过合约获取价格
            </Heading>
            <Text fontSize="sm" color="gray.600">
              请检查合约地址是否为 PancakeSwap V2 上有池子的代币，或稍后重试
            </Text>
          </Box>
        ) : data ? (
          <>
            <Table>
              <Thead bg="gray.100">
                <Tr>
                  <Th>代币</Th>
                  <Th>报价币种</Th>
                  <Th isNumeric>价格</Th>
                  <Th isNumeric>反向价格</Th>
                  <Th isNumeric>池子储备</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td py={2} fontWeight="medium">
                    {data.tokenSymbol || '-'}
                    <Box fontSize="xs" color="gray.500">
                      {data.tokenName || '-'}
                    </Box>
                    <Box fontSize="xs" color="gray.500">
                      {data.tokenAddress}
                    </Box>
                  </Td>
                  <Td py={2}>
                    {data.quoteSymbol}
                    <Box fontSize="xs" color="gray.500">
                      {data.quoteAddress}
                    </Box>
                  </Td>
                  <Td py={2} isNumeric>
                    {data.price > 0 ? formatPrice(data.price) : '--'}
                  </Td>
                  <Td py={2} isNumeric>
                    {data.inversePrice > 0 ? formatPrice(data.inversePrice) : '--'}
                  </Td>
                  <Td py={2} isNumeric>
                    <Box>{`${formatPrice(data.reserveToken)} ${data.tokenSymbol}`}</Box>
                    <Box fontSize="xs" color="gray.500">
                      {`${formatPrice(data.reserveQuote)} ${data.quoteSymbol}`}
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            {amount > 0 && outQuote > 0 && (
              <Box mt={4} fontSize="sm" color="gray.800">
                <Text>
                  卖出 {formatPrice(amount)} {data.tokenSymbol} 预计可获得约 {formatPrice(outQuote)} {data.quoteSymbol}
                </Text>
                <Text mt={1} color="gray.600">
                  线性估算为 {formatPrice(linearQuote)} {data.quoteSymbol}
                  {impact ? `，价格冲击约 ${impact.toFixed(2)}%` : ''}
                </Text>
              </Box>
            )}
          </>
        ) : null}
      </Box>
    </Box>
  )
}
