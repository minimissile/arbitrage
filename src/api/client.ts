import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const api = axios.create({
  timeout: 10000,
  withCredentials: false
})

api.interceptors.request.use(config => {
  const headers = config.headers as any
  if (headers && typeof headers.set === 'function') {
    headers.set('Accept', 'application/json')
  } else {
    config.headers = { ...(headers || {}), Accept: 'application/json' }
  }

  const url = String(config.url || '')
  const key = (import.meta as any).env?.VITE_COINGLASS_KEY as string | undefined
  if (key && (url.startsWith('/coinglass') || url.includes('coinglass'))) {
    if (headers && typeof headers.set === 'function') {
      headers.set('Cg-Api-Key', key)
    } else {
      config.headers = { ...(headers || {}), 'Cg-Api-Key': key }
    }
  }
  return config
})

api.interceptors.response.use(
  res => res,
  (error: AxiosError) => {
    throw error
  }
)

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.get(url, config)
  return res.data as T
}

export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.post(url, data, config)
  return res.data as T
}
