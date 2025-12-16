import { JsonRpcProvider, Contract } from 'ethers'

const PANCAKE_FACTORY_V2 = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
const BUSD = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
const USDT = '0x55d398326f99059fF775485246999027B3197955'

const erc20Abi = [
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function decimals() view returns (uint8)'
]

const factoryAbi = ['function getPair(address tokenA, address tokenB) external view returns (address pair)']

const pairAbi = [
  'function token0() view returns (address)',
  'function token1() view returns (address)',
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
]

function getProvider() {
  const env = (import.meta as any).env ?? {}
  const rpc = (env.VITE_BSC_RPC_URL as string | undefined) || 'https://bsc-dataseed.binance.org/'
  return new JsonRpcProvider(rpc)
}

const provider = getProvider()

function toChecksum(address: string): string {
  return address.trim()
}

export const pancakeRefs = {
  factory: PANCAKE_FACTORY_V2,
  wbnb: WBNB,
  busd: BUSD,
  usdt: USDT
}

export interface OnchainPriceInput {
  token: string
  quote?: 'USDT'
}

export interface OnchainPriceResult {
  tokenAddress: string
  quoteAddress: string
  tokenSymbol: string
  tokenName: string
  quoteSymbol: string
  tokenDecimals: number
  quoteDecimals: number
  price: number
  inversePrice: number
  reserveToken: number
  reserveQuote: number
  blockTimestampLast: number
}

async function fetchTokenMeta(addr: string) {
  const c = new Contract(addr, erc20Abi, provider)
  const [symbol, name, decimals] = await Promise.all([c.symbol(), c.name(), c.decimals()])
  return {
    symbol: String(symbol),
    name: String(name),
    decimals: Number(decimals)
  }
}

async function fetchPairAddress(tokenAddress: string, quoteAddress: string) {
  const factory = new Contract(PANCAKE_FACTORY_V2, factoryAbi, provider)
  const pair: string = await factory.getPair(tokenAddress, quoteAddress)
  if (!pair || pair === '0x0000000000000000000000000000000000000000') return null
  return pair
}

export async function fetchOnchainPancakePrice(input: OnchainPriceInput): Promise<OnchainPriceResult> {
  const tokenRaw = toChecksum(input.token)
  const quoteSymbol: 'USDT' = input.quote ?? 'USDT'
  const quoteAddress = USDT

  const pairAddress = await fetchPairAddress(tokenRaw, quoteAddress)
  if (!pairAddress) {
    throw new Error('Pair not found on PancakeSwap V2')
  }

  const tokenMeta = await fetchTokenMeta(tokenRaw)
  const quoteMeta = await fetchTokenMeta(quoteAddress)

  const pair = new Contract(pairAddress, pairAbi, provider)
  const [token0, token1, reserves] = await Promise.all([pair.token0(), pair.token1(), pair.getReserves()])

  const t0 = String(token0).toLowerCase()
  const t1 = String(token1).toLowerCase()
  const target = tokenRaw.toLowerCase()
  const quote = quoteAddress.toLowerCase()

  let reserveToken: bigint
  let reserveQuote: bigint

  if (t0 === target && t1 === quote) {
    reserveToken = reserves[0]
    reserveQuote = reserves[1]
  } else if (t1 === target && t0 === quote) {
    reserveToken = reserves[1]
    reserveQuote = reserves[0]
  } else {
    throw new Error('Unexpected pair tokens')
  }

  if (reserveToken === 0n || reserveQuote === 0n) {
    throw new Error('No liquidity in pair')
  }

  const tokenScale = 10 ** tokenMeta.decimals
  const quoteScale = 10 ** quoteMeta.decimals

  const rToken = Number(reserveToken) / tokenScale
  const rQuote = Number(reserveQuote) / quoteScale

  const price = rQuote / rToken
  const inversePrice = rToken / rQuote

  return {
    tokenAddress: tokenRaw,
    quoteAddress,
    tokenSymbol: tokenMeta.symbol,
    tokenName: tokenMeta.name,
    quoteSymbol,
    tokenDecimals: tokenMeta.decimals,
    quoteDecimals: quoteMeta.decimals,
    price,
    inversePrice,
    reserveToken: rToken,
    reserveQuote: rQuote,
    blockTimestampLast: Number(reserves[2])
  }
}
