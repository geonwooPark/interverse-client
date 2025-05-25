import Container from '@components/Container'
import Logo from '@components/Logo'
import React, { PropsWithChildren } from 'react'
import gifImage from '/gif/interverse.gif'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative grid h-screen grid-cols-1 tablet:grid-cols-2">
      {/* 로고 */}
      <div className="fixed left-6 top-6 rounded-full px-6 py-4">
        <Link to={'/'}>
          <Logo width={160} className="pointer-events-none" />
        </Link>
      </div>

      {/* 이미지 영역 */}
      <div className="hidden size-full bg-gray-400 tablet:block">
        <div className="aspect-square size-full overflow-hidden">
          <img src={gifImage} alt="GIF" className="size-full object-cover" />
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex w-full items-center justify-center tablet:bg-inherit">
        <Container className="max-w-[420px] px-6">{children}</Container>
      </div>
    </main>
  )
}
