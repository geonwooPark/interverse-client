import React, { PropsWithChildren, ReactNode, Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'ventileco-ui'

interface ErrorFallbackProps {
  error?: unknown
  onReset?: () => void
}

interface BoundaryProps {
  ErrorFallback: React.ComponentType<ErrorFallbackProps>
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
        <ErrorBoundary
          fallback={(props) => <ErrorFallback {...props} />}
          onReset={reset}
        >
          <Suspense fallback={LoadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
