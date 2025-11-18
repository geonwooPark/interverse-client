import CheckBox from '@components/CheckBox'
import Icon from '@components/Icon'
import React, { PropsWithChildren } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface RhfCheckboxProps {
  name: string
  className?: string
}

export default function RhfCheckbox({
  children,
  name,
  className,
}: PropsWithChildren<RhfCheckboxProps>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          <CheckBox
            checked={field.value || false}
            onClick={() => field.onChange(!field.value)}
          >
            {children}
          </CheckBox>

          {error && (
            <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
              <Icon iconName="IconExclamation" className="size-4" />
              <p className="text-caption">{error?.message}</p>
            </div>
          )}
        </div>
      )}
    />
  )
}
