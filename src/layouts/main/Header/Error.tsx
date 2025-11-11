import { IconRefresh } from '@assets/svgs'
import Button from '@components/Button'
import React from 'react'

export default function Error({ error, onReset }: any) {
  return (
    <Button
      size="sm"
      variant="outlined"
      onClick={onReset}
      rightIcon={<IconRefresh className="ml-2 size-4" />}
      className="h-[48px] w-[120px]"
    >
      재시도
    </Button>
  )
}
