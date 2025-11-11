import clsx from 'clsx'
import Icon from '@components/Icon'
import React, { useRef } from 'react'
import { Navigation } from 'swiper/modules'
import {
  Swiper as SwiperComponent,
  type SwiperClass,
  type SwiperProps as SwiperComponentProps,
} from 'swiper/react'
import type { NavigationOptions } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'

type Props = SwiperComponentProps

export default function Swiper({
  children,
  className,
  slidesPerView = 1,
  onBeforeInit,
  onSwiper,
  ...rest
}: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  const assignNavigationElements = (swiper: SwiperClass) => {
    const navigation = swiper.params.navigation as NavigationOptions | undefined

    if (!navigation || typeof navigation === 'boolean') return

    navigation.prevEl = prevRef.current
    navigation.nextEl = nextRef.current
  }

  return (
    <SwiperComponent
      {...rest}
      modules={[Navigation]}
      navigation
      slidesPerView={slidesPerView}
      className={clsx('relative', className)}
      onBeforeInit={(swiper) => {
        assignNavigationElements(swiper)

        onBeforeInit?.(swiper)
      }}
      onSwiper={(swiper) => {
        assignNavigationElements(swiper)

        if (swiper.navigation && prevRef.current && nextRef.current) {
          swiper.navigation.destroy()
          swiper.navigation.init()
          swiper.navigation.update()
        }

        onSwiper?.(swiper)
      }}
    >
      {children}

      <button
        type="button"
        ref={prevRef}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-level2 transition-opacity hover:opacity-80 [&.swiper-button-disabled]:bg-gray-100 [&.swiper-button-disabled]:opacity-70 [&.swiper-button-lock]:hidden"
      >
        <Icon iconName="IconChevronLeft" className="size-5" />
      </button>

      <button
        type="button"
        ref={nextRef}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-level2 transition-opacity hover:opacity-80 [&.swiper-button-disabled]:bg-gray-100 [&.swiper-button-disabled]:opacity-70 [&.swiper-button-lock]:hidden"
      >
        <Icon iconName="IconChevronRight" className="size-5" />
      </button>
    </SwiperComponent>
  )
}
