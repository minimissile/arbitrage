/**
 * 格式化时间
 * @param ts 时间戳
 */
export function formatTime(ts: number): string {
  if (!ts) return '--'
  try {
    const d = new Date(ts)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    return `${mm}/${dd} ${hh}:${mi}`
  } catch {
    return '--'
  }
}

/**
 * 格式化价格
 * @param pStr 价格字符串
 */
export function formatPrice(pStr: string | number | undefined): string {
  const p = Number(pStr)
  if (!isFinite(p)) return '--'
  return p >= 100 ? p.toFixed(2) : p >= 1 ? p.toFixed(4) : p.toFixed(6)
}

/**
 * 格式化资金费率
 * @param rateStr 资金费率字符串
 */
export function formatFundingRate(rateStr: string | number): string {
  const r = Number(rateStr)
  if (!isFinite(r)) return '-'
  return `${(r * 100).toFixed(4)}%`
}
