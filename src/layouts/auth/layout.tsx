import Container from '@components/Container'
import React, { PropsWithChildren } from 'react'
import ParallaxSlider from '@components/ParallaxSlider'
import BG_AUTH_01 from '/images/bg_auth_01.png'
import BG_AUTH_02 from '/images/bg_auth_02.png'
import BG_AUTH_03 from '/images/bg_auth_03.png'
import BG_AUTH_04 from '/images/bg_auth_04.png'
import Image from '@components/Image'
import FadeIn from '@components/Animation/FadeIn'
import Header from './Header'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-full">
      {/* 헤더 */}
      <Header />

      {/* 컨텐츠 */}
      <section className="h-[calc(100vh-64px)] overflow-y-auto py-16">
        <Container className="mx-auto max-w-[420px] px-6">
          <div className="mb-10 hidden overflow-hidden rounded-md border-2 border-cyan-500 tablet:block">
            <ParallaxSlider showPagination={false}>
              <Image
                src={BG_AUTH_01}
                alt="bg_01"
                className="size-full object-cover"
                draggable={false}
                ratio={4 / 3}
              />
              <Image
                src={BG_AUTH_02}
                alt="bg_02"
                className="size-full object-cover"
                draggable={false}
                ratio={4 / 3}
              />
              <Image
                src={BG_AUTH_03}
                alt="bg_03"
                className="size-full object-cover"
                draggable={false}
                ratio={4 / 3}
              />
              <Image
                src={BG_AUTH_04}
                alt="bg_03"
                className="size-full object-cover"
                draggable={false}
                ratio={4 / 3}
              />
            </ParallaxSlider>
          </div>

          <FadeIn>{children}</FadeIn>
        </Container>
      </section>
    </main>
  )
}
