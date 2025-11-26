import React, { ComponentType, Suspense, ReactNode } from 'react'
import GlobalLoading from '@components/GlobalLoading'

export default function withSuspense<T extends object>(
  Component: ComponentType<T>,
  fallback: ReactNode = <GlobalLoading />,
): ComponentType<T> {
  return function EnhancedComponent(props: T) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }
}
