import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMarkPrices, formatFundingRate, formatPrice, formatTime } from '../api/backpack'
import type { MarkPriceItem } from '../api/backpack'

export default function FundingRatesTable() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, refetch, isFetching } = useQuery<MarkPriceItem[]>({
    queryKey: ['backpack', 'markPrices'],
    queryFn: fetchMarkPrices,
    refetchInterval: 30_000
  })

  const rows = useMemo(() => {
    const list = (data ?? []).filter(x => x.symbol.toLowerCase().includes(search.trim().toLowerCase()))
    // sort by absolute funding rate desc
    return list.sort((a, b) => Math.abs(Number(b.fundingRate)) - Math.abs(Number(a.fundingRate)))
  }, [data, search])

  return (
    <div className="funding-table">
      <div className="toolbar">
        <input placeholder="搜索交易对 (如 BTC_USDC_PERP)" value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '刷新中…' : '手动刷新'}
        </button>
      </div>

      {isLoading && <p>加载中…</p>}
      {isError && <p>加载失败，请稍后重试</p>}

      {!isLoading && !isError && (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Mark Price</th>
              <th>Index Price</th>
              <th>Funding Rate</th>
              <th>Next Funding</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.symbol}>
                <td>{r.symbol}</td>
                <td>{formatPrice(r.markPrice)}</td>
                <td>{formatPrice(r.indexPrice)}</td>
                <td>{formatFundingRate(r.fundingRate)}</td>
                <td>{formatTime(r.nextFundingTimestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .funding-table { padding: 16px; }
        .toolbar { display: flex; gap: 8px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border-bottom: 1px solid #eaeaea; text-align: left; }
        thead th { position: sticky; top: 0; background: #fff; }
        tbody tr:hover { background: #fafafa; }
      `}</style>
    </div>
  )
}
