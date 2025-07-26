import React, { PropsWithChildren, ReactNode, Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'ventileco-ui'

interface BoundaryProps {
  ErrorFallback: any
  LoadingFallback: ReactNode
}

export default function Boundary({
  children,
  ErrorFallback,
  LoadingFallback,
}: PropsWithChildren<BoundaryProps>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={ErrorFallback} onReset={reset}>
          <Suspense fallback={LoadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
