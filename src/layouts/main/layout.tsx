import Container from '@components/Container'
import { PropsWithChildren } from 'react'
import Header from './Header'

export default function RoomLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* 헤더 */}
      <Header />

      {/* 게임 */}
      <div id="game-container" className="fixed inset-0 z-[-1]" />

      {/* UI */}
      <main className="flex-1 overflow-y-auto">
        <Container className="mx-auto h-full max-w-[1440px] px-4 desktop:px-20">
          {children}
        </Container>
      </main>
    </div>
  )
}
