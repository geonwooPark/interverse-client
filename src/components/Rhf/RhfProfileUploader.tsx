import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ProfileUploader from '@components/ProfileUploader'
import { CustomFile } from 'ventileco-ui'

interface RhfProfileUploaderProps {
  name: string
}

export default function RhfProfileUploader({ name }: RhfProfileUploaderProps) {
  const { control } = useFormContext()

  const initialValueRef = useRef<CustomFile[] | undefined>(undefined)

  const previousValueRef = useRef<CustomFile[] | undefined>(undefined)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (initialValueRef.current === undefined) {
          initialValueRef.current = field.value
        }

        if (field.value && field.value.length > 0) {
          previousValueRef.current = field.value
        }

        const handleChange = (newValue: CustomFile[]) => {
          if (
            newValue.length === 0 &&
            previousValueRef.current &&
            previousValueRef.current.length > 0 &&
            previousValueRef.current[0]?.preview
          ) {
            return
          }
          field.onChange(newValue)
        }

        const onDelete = (e: React.MouseEvent, _file: CustomFile) => {
          e.preventDefault()

          const hasInitialValue =
            initialValueRef.current &&
            initialValueRef.current.length > 0 &&
            initialValueRef.current[0]?.preview

          if (hasInitialValue) {
            field.onChange(initialValueRef.current)
          } else {
            field.onChange([])
          }
        }

        return (
          <ProfileUploader
            value={field.value}
            onChange={handleChange}
            onDelete={onDelete}
          />
        )
      }}
    />
  )
}
