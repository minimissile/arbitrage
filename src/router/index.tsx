import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        lazy: () => import('@/views/Dashboard').then(m => ({ Component: m.default }))
      },
      {
        path: 'funding',
        lazy: () => import('@/views/Funding').then(m => ({ Component: m.default }))
      }
    ]
  }
])

export default router
