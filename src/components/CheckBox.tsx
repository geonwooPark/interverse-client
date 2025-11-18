import { cn } from '@utils/cn'
import React, { PropsWithChildren } from 'react'
import { CheckBox as VCheckBox } from 'ventileco-ui'

interface CheckBoxProps {
  checked: boolean
  onClick: () => void
  className?: string
}

export default function CheckBox({
  checked,
  onClick,
  children,
  className,
}: CheckBoxProps & PropsWithChildren) {
  return (
    <VCheckBox checked={checked} onClick={onClick}>
      {({ checked }) => (
        <div
          className={cn(
            `flex cursor-pointer items-center gap-2  transition ${
              checked ? 'border-blue-500' : 'border-slate-200'
            }`,
            className,
          )}
        >
          <span
            className={`grid size-4 place-content-center rounded-sm border text-xs font-semibold ${
              checked
                ? 'border-blue-500 bg-blue-600 text-white'
                : 'border-slate-300'
            }`}
          >
            {checked && '✓'}
          </span>
          {children}
        </div>
      )}
    </VCheckBox>
  )
}
