import React from 'react'
import EMPTY from '@assets/images/empty.png'
import { cn } from '@utils/cn'
import Image from '@components/Image'

interface EmptyProps {
  className?: string
  label: string
}

export default function Empty({ className, label }: EmptyProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center',
        className,
      )}
    >
      <div className="mb-10">
        <Image src={EMPTY} alt="empty" width={360} />
        <h6 className="text-center text-h6 text-gray-400">{label}</h6>
      </div>
    </div>
  )
}
