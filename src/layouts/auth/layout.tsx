import Container from '@components/Container'
import React, { PropsWithChildren } from 'react'
import gifImage from '/gif/interverse.gif'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative grid h-screen grid-cols-1 tablet:grid-cols-2">
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
