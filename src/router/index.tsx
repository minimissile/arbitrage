import { createHashRouter } from 'react-router-dom'
import App from '@/App'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, lazy: () => import('@/views/DashboardPage').then(m => ({ Component: m.default })) },
      { path: 'funding', lazy: () => import('@/views/FundingPage').then(m => ({ Component: m.default })) },
      { path: 'watchlist', lazy: () => import('@/views/WatchlistPage').then(m => ({ Component: m.default })) },
      { path: 'pancake', lazy: () => import('@/views/PancakePricePage').then(m => ({ Component: m.default })) }
    ]
  }
])

export default router
