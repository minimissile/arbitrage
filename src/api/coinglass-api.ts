import { get } from '@/api/client'
import type { AxiosRequestConfig } from 'axios'

let secret: string | undefined

function auth(key: string) {
  secret = key
}

async function frArbitrage(params?: Record<string, string | number>) {
  const config: AxiosRequestConfig = {}
  if (secret) config.headers = { coinglassSecret: secret }
  if (params) config.params = params
  return await get<any>('/coinglass/api/futures/funding-rate/arbitrage', config)
}

const coinglassApi = { auth, frArbitrage }
export default coinglassApi
