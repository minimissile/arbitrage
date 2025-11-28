// 头部导航栏：展示项目标题与运行状态（监控/告警）
import { Activity, AlertCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isFunding = location.pathname.startsWith('/funding')
  const logoUrl = new URL('../assets/logo.svg', import.meta.url).href
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Arbitrage" className="h-9 w-9" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">套利情报站</h1>
              <p className="text-xs text-gray-600">跨交易所实时机会监控与展示</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="text-success-600 h-4 w-4" />
              <span>实时监控</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="text-warning-600 h-4 w-4" />
              <span>告警开启</span>
            </div>
            <nav className="ml-4 flex gap-2">
              <Link
                to="/"
                className={`rounded-md px-3 py-1.5 transition-colors ${!isFunding ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                仪表盘
              </Link>
              <Link
                to="/funding"
                className={`rounded-md px-3 py-1.5 transition-colors ${isFunding ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                资金费率
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
