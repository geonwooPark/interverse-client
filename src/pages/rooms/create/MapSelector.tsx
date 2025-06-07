import Icon from '@components/Icon'
import { useMapsQuery } from '@hooks/queries/assetsQueries'
import React, { useEffect } from 'react'
import { Slider } from 'ventileco-ui'

interface MapSelectorProps {
  onChange: (map: string) => void
}

export default function MapSelector({ onChange }: MapSelectorProps) {
  const { data: maps, isSuccess } = useMapsQuery()

  const handleChange = (page: number) => {
    if (!maps) return

    onChange(maps[page - 1].mapSrc)
  }

  useEffect(() => {
    if (!maps) return

    onChange(maps[0].mapSrc)
  }, [isSuccess])

  return (
    <Slider
      perPage={1}
      gap={0}
      onChange={handleChange}
      className={`relative mb-4`}
    >
      <Slider.Content className="hide-scroll [&>*]:shrink-0">
        {maps?.map((slide, idx) => (
          <Slider.Item
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
          </Slider.Item>
        ))}
      </Slider.Content>

      <Slider.PrevButton className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-level2 disabled:bg-gray-100 disabled:opacity-70">
        <Icon iconName="IconChevronLeft" className="size-5" />
      </Slider.PrevButton>

      <Slider.NextButton className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-level2 disabled:bg-gray-100 disabled:opacity-70">
        <Icon iconName="IconChevronRight" className="size-5" />
      </Slider.NextButton>
    </Slider>
  )
}
