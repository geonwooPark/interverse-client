import { PropsWithChildren } from 'react'
import Header from './Header'

export default function GameLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-popover">
      <Header />

      <main className="h-screen pt-[64px]">{children}</main>
    </div>
  )
}
