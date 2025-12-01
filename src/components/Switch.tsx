import { cn } from '@utils/cn'
import React from 'react'
import { Switch as VSwitch } from 'ventileco-ui'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export default function Switch({
  checked,
  onChange,
  className,
  disabled = false,
}: SwitchProps) {
  return (
    <VSwitch
      value={checked}
      onChange={onChange}
      marginInline={4}
      duration={200}
      className={cn(
        className,
        `relative flex h-6 w-12 items-center rounded-full ${
          disabled ? 'bg-blue-600' : 'bg-slate-300'
        }`,
      )}
    >
      <VSwitch.Ball className="size-4 rounded-full bg-white shadow" />
    </VSwitch>
  )
}
