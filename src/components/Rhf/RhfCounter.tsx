import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Counter from '@components/Counter'

interface RhfCounterProps {
  name: string
}

export default function RhfCounter({ name }: RhfCounterProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Counter
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  )
}
