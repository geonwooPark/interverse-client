import React from 'react'
import EMPTY from '@assets/images/empty.png'
import { cn } from '@utils/cn'

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
      <div className="h-[240px] w-[360px]">
        <img src={EMPTY} alt="빈 이미지" className="size-full object-cover" />
      </div>

      <h6 className="mt-6 text-center text-h6 text-gray-400">{label}</h6>
    </div>
  )
}
