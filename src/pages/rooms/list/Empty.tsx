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
      <div className="mb-10">
        <img src={EMPTY} alt="empty" className="w-[360px]" />
        <h6 className="text-center text-h6 text-gray-400">{label}</h6>
      </div>
    </div>
  )
}
