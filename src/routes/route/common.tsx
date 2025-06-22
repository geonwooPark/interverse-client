import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import withSuspense from '@hocs/withSuspense'

const OAuthPage = withSuspense(
  lazy(() => import('../../pages/common/oauth/page')),
)

// ----------------------------------------------------------------------

export const commonRoutes = [
  {
    element: <Outlet />,
    children: [{ path: 'oauth', element: <OAuthPage /> }],
  },
]
