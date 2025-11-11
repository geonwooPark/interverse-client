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
          className="flex h-[300px] w-full items-center justify-center bg-gray-100"
        >
          <img
            src={slide.thumbnail}
            alt={slide.name}
            className="pointer-events-none select-none"
          />
          <div className="absolute bottom-0 w-full bg-black py-1">
            <p className="text-center text-body2 text-white">
              {slide.name?.toUpperCase()}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
