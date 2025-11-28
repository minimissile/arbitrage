import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Dashboard from '@/views/Dashboard'
import Funding from '@/views/Funding'

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
