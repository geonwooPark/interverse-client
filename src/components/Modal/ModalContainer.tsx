import slide from '@components/Animation/motions/slide'
import { cn } from '@utils/cn'
import { motion as m } from 'motion/react'
import React, { PropsWithChildren } from 'react'

interface ModalContainerProps {
  className?: string
}

export default function ModalContainer({
  children,
  className,
}: PropsWithChildren<ModalContainerProps>) {
  return (
    <m.div
      {...slide({ distance: 20, isFade: true }).inY}
      className={cn('bg-white rounded-md', className)}
    >
      {children}
    </m.div>
  )
}
