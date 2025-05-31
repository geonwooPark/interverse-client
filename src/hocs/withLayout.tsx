import React, { ComponentType, ReactNode } from 'react'

export default function withLayout<T extends JSX.IntrinsicAttributes>(
  Layout: ComponentType<{ children: ReactNode }>,
  Component: ComponentType<T>,
) {
  const WrappedComponent = (props: T) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  WrappedComponent.displayName = `withLayout(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
