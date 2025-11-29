import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const api = axios.create({
  timeout: 10000,
  withCredentials: false
})

api.interceptors.request.use(config => {
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
