import { Navigate, useRoutes } from 'react-router-dom'
import { authRoutes } from './route/auth'
import { mainRoutes } from './route/main'
import { commonRoutes } from './route/common'

export default function Router() {
  return useRoutes([
    ...authRoutes,
    ...mainRoutes,
    ...commonRoutes,
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}
