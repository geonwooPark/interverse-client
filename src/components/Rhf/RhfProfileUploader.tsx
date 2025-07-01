import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ProfileUploader from '@components/ProfileUploader'
import { CustomFile } from 'ventileco-ui'

interface RhfProfileUploaderProps {
  name: string
}

export default function RhfProfileUploader({ name }: RhfProfileUploaderProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDelete = (e: React.MouseEvent, file: CustomFile) => {
          e.preventDefault()
          const filtered = (field.value ?? []).filter(
            (f: CustomFile) => f !== file,
          )
          field.onChange(filtered)
        }

        return (
          <ProfileUploader
            value={field.value}
            onChange={(value) => field.onChange(value)}
            onDelete={onDelete}
          />
        )
      }}
    />
  )
}
