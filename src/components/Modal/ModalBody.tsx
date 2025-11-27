import { cn } from '@utils/cn'
import React, { PropsWithChildren } from 'react'

interface ModalBodyProps {
  className?: string
}

export default function ModalBody({
  children,
  className,
}: PropsWithChildren<ModalBodyProps>) {
  return (
    <div className={cn('h-full px-4', className)}>
      <div className="whitespace-pre-line text-body2">{children}</div>
    </div>
  )
}
