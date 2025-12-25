import React, { PropsWithChildren } from 'react'
import { SelectBox } from 'ventileco-ui'
import { motion as m } from 'motion/react'
import slide from '@components/Animation/motions/slide'
import Icon from '@components/Icon'

interface SelectProps {
  value: string
  onChange: (value: string) => void
}

function Select({ children, value, onChange }: PropsWithChildren<SelectProps>) {
  return (
    <SelectBox
      defaultValue={value}
      onChange={onChange}
      className="relative text-sm"
    >
      <SelectBox.Input
        className="flex h-10 items-center rounded-md border border-slate-300 bg-white px-3 focus-within:border-blue-500"
        endIcon={<Icon iconName="IconChevronDown" className="size-4" />}
      />
      <SelectBox.List
        as={m.ul}
        {...slide({ distance: 10, isFade: true }).inY}
        className="absolute z-50 mt-2 max-h-52 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg"
      >
        {children}
      </SelectBox.List>
    </SelectBox>
  )
}

function SelectItem({
  value,
  label,
  disabled,
  children,
}: PropsWithChildren<{
  value: string
  label: string
  disabled?: boolean
}>) {
  return (
    <SelectBox.Item value={value} label={label} isDisabled={disabled}>
      {({ isFocused, isSelected }) => (
        <div
          className={`flex cursor-pointer items-center gap-2 px-3 py-2
                  ${isSelected ? 'text-blue-600' : ''}
                  ${
                    disabled
                      ? 'cursor-not-allowed text-slate-300'
                      : 'hover:bg-blue-50'
                  }
                  ${isFocused ? 'bg-blue-100' : ''}`}
        >
          {children ?? label}
        </div>
      )}
    </SelectBox.Item>
  )
}

export default Object.assign(Select, {
  Item: SelectItem,
})
