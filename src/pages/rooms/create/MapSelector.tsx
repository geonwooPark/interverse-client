import Image from '@components/Image'
import Swiper from '@components/Swiper'
import { useMapsQuery } from '@hooks/queries/assetsQueries'
import React, { useEffect } from 'react'
import { SwiperSlide } from 'swiper/react'

interface MapSelectorProps {
  onChange: (map: string) => void
}

export default function MapSelector({ onChange }: MapSelectorProps) {
  const { data: maps } = useMapsQuery()

  useEffect(() => {
    if (!maps?.length) return
    onChange(maps[0].mapSrc)
  }, [maps, onChange])

  return (
    <Swiper
      className="mb-4"
      onSlideChange={(swiper) => {
        if (!maps?.length) return
        onChange(maps[swiper.activeIndex].mapSrc)
      }}
    >
      {maps?.map((slide, idx) => (
        <SwiperSlide
          key={idx}
          className="flex w-full items-center justify-center bg-gray-100"
        >
          <Image
            src={slide.thumbnail}
            alt={slide.name}
            height={300}
            objectFit="cover"
            className="pointer-events-none w-full select-none"
          />
          <div className="absolute bottom-0 w-full bg-black/50 py-1">
            <p className="text-center text-body2 text-white">
              {slide.name?.toUpperCase()}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
