import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Dashboard from '@/pages/Dashboard'
import Funding from '@/pages/Funding'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'funding', element: <Funding /> }
    ]
  }
])

export default router
