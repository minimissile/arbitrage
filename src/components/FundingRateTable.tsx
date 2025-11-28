import { useMemo, useState } from 'react'
import type { FundingRateData } from '@/types'

interface Props {
  data: FundingRateData[]
}

export function FundingRateTable({ data }: Props) {
  const [search, setSearch] = useState('')
  const [exchange, setExchange] = useState('all')
  const [sortBy, setSortBy] = useState<'rate' | 'symbol'>('rate')
  const [sortDesc, setSortDesc] = useState(true)

  const filtered = useMemo(() => {
    let rows = data
    if (exchange !== 'all') rows = rows.filter(r => r.exchange === exchange)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(r => r.symbol.toLowerCase().includes(q))
    }
    return rows
  }, [data, exchange, search])

  const sorted = useMemo(() => {
    const rows = [...filtered]
    rows.sort((a, b) => {
      if (sortBy === 'rate') {
        const va = a.fundingRate
        const vb = b.fundingRate
        return sortDesc ? vb - va : va - vb
      }
      return sortDesc ? b.symbol.localeCompare(a.symbol) : a.symbol.localeCompare(b.symbol)
    })
    return rows
  }, [filtered, sortBy, sortDesc])

  const exchanges = useMemo(() => Array.from(new Set(data.map(d => d.exchange))), [data])

  const formatRate = (r: number) => `${(r * 100).toFixed(4)}%`
  const formatTime = (t: number) => new Date(t).toLocaleString()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <select value={exchange} onChange={e => setExchange(e.target.value)} className="rounded border bg-white px-3 py-2">
            <option value="all">全部交易所</option>
            {exchanges.map(ex => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索币种（如 BTC/USDC）"
            className="w-64 rounded border px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSortBy('rate')
              setSortDesc(s => !s)
            }}
            className="rounded border bg-white px-3 py-2"
          >
            按资金费率排序{sortBy === 'rate' ? (sortDesc ? '↓' : '↑') : ''}
          </button>
          <button
            onClick={() => {
              setSortBy('symbol')
              setSortDesc(s => !s)
            }}
            className="rounded border bg-white px-3 py-2"
          >
            按币种排序{sortBy === 'symbol' ? (sortDesc ? '↓' : '↑') : ''}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">交易所</th>
              <th className="px-4 py-2 text-left">币种</th>
              <th className="px-4 py-2 text-left">资金费率</th>
              <th className="px-4 py-2 text-left">下次结算时间</th>
              <th className="px-4 py-2 text-left">Index</th>
              <th className="px-4 py-2 text-left">Mark</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => (
              <tr key={`${row.exchange}-${row.symbol}-${row.timestamp}`} className="border-t">
                <td className="px-4 py-2">{row.exchange}</td>
                <td className="px-4 py-2">{row.symbol}</td>
                <td
                  className={`px-4 py-2 font-medium ${row.fundingRate > 0 ? 'text-green-600' : row.fundingRate < 0 ? 'text-red-600' : ''}`}
                >
                  {formatRate(row.fundingRate)}
                </td>
                <td className="px-4 py-2">{formatTime(row.nextFundingTime)}</td>
                <td className="px-4 py-2">{row.indexPrice !== undefined ? Number(row.indexPrice).toFixed(6) : '-'}</td>
                <td className="px-4 py-2">{row.markPrice !== undefined ? Number(row.markPrice).toFixed(6) : '-'}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
