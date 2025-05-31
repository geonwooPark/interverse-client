import Container from '@components/Container'
import React, { PropsWithChildren } from 'react'
import Logo from '@components/Logo'
import { Link } from 'react-router-dom'
import ParallaxSlider from '@components/ParallaxSlider'
import BG_AUTH_01 from '/images/bg_auth_01.png'
import BG_AUTH_02 from '/images/bg_auth_02.png'
import BG_AUTH_03 from '/images/bg_auth_03.png'
import BG_AUTH_04 from '/images/bg_auth_04.png'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative grid h-screen grid-cols-1 tablet:grid-cols-2">
      {/* 로고 */}
      <div className="fixed left-6 top-6 z-popover rounded-full px-6 py-4">
        <Link to={'/'}>
          <Logo width={160} className="pointer-events-none" />
        </Link>
      </div>

      {/* 이미지 영역 */}
      <div className="hidden size-full min-h-0 tablet:block">
        <ParallaxSlider>
          <img
            src={BG_AUTH_01}
            alt="bg_01"
            className="size-full object-cover"
            draggable={false}
          />
          <img
            src={BG_AUTH_02}
            alt="bg_02"
            className="size-full object-cover"
            draggable={false}
          />
          <img
            src={BG_AUTH_03}
            alt="bg_03"
            className="size-full object-cover"
            draggable={false}
          />
          <img
            src={BG_AUTH_04}
            alt="bg_03"
            className="size-full object-cover"
            draggable={false}
          />
        </ParallaxSlider>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex size-full min-h-0 items-center justify-center tablet:bg-inherit">
        <Container className="max-w-[420px] px-6">{children}</Container>
      </div>
    </main>
  )
}
