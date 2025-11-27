import React from 'react'
import { SelectBox } from 'ventileco-ui'
import { motion as m } from 'motion/react'
import slide from '@components/Animation/motions/slide'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; disabled?: boolean }[]
}

export default function Select({ value, onChange, options }: SelectProps) {
  return (
    <SelectBox
      defaultValue={value}
      onChange={onChange}
      className="relative text-sm"
    >
      <SelectBox.Input
        className="flex h-11 items-center rounded-md border border-slate-300 bg-white px-3 focus-within:border-blue-500"
        endIcon={<span className="text-xs text-slate-400">▼</span>}
      />
      <SelectBox.List
        as={m.ul}
        {...slide({ distance: 10, isFade: true }).inY}
        className="absolute z-50 mt-2 max-h-52 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg"
      >
        {options.map((item) => (
          <SelectBox.Item
            key={item.value}
            value={item.value}
            label={item.label}
            isDisabled={item.disabled}
          >
            {({ isFocused }) => (
              <div
                className={`flex cursor-pointer items-center gap-2 px-3 py-2
                  ${value === item.value ? 'text-blue-600' : ''}
                  ${
                    item.disabled
                      ? 'cursor-not-allowed text-slate-300'
                      : 'hover:bg-blue-50'
                  }
                  ${isFocused ? 'bg-blue-100' : ''}`}
              >
                {item.label}
              </div>
            )}
          </SelectBox.Item>
        ))}
      </SelectBox.List>
    </SelectBox>
  )
}
