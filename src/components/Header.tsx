// 头部导航栏：展示项目标题与运行状态（监控/告警）
import { Activity, TrendingUp, AlertCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isFunding = location.pathname.startsWith('/funding')
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 rounded-lg p-2">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">数字货币套利监控</h1>
              <p className="text-sm text-gray-600">跨交易所实时套利机会监控与展示</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="text-success-600 h-4 w-4" />
              <span>实时监控</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertCircle className="text-warning-600 h-4 w-4" />
              <span>告警开启</span>
            </div>
            <div className="ml-4 flex gap-2">
              <Link
                to="/"
                className={`rounded px-3 py-1 ${!isFunding ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                仪表盘
              </Link>
              <Link
                to="/funding"
                className={`rounded px-3 py-1 ${isFunding ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                资金费率
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
