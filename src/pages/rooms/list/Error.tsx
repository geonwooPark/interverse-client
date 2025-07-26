import { IconRefresh } from '@assets/svgs'
import Button from '@components/Button'
import React from 'react'
import ErrorImage from '@assets/images/error.png'

export default function Error({ error, onReset }: any) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-10">
        <img src={ErrorImage} alt="error" className="block w-[360px]" />
        <Button
          size="sm"
          variant="outlined"
          onClick={onReset}
          rightIcon={<IconRefresh className="ml-2 size-4" />}
          className="mx-auto"
        >
          재시도
        </Button>
      </div>
    </div>
  )
}
