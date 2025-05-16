import React from 'react'
import { Toast } from './types'
import { useToastContext } from '.'
import ToastItem from './ToastItem'
import { AnimatePresence } from 'motion/react'

interface ToastListProps {
  toasts: Toast[]
}

export default function ToastList({ toasts }: ToastListProps) {
  const { removeToast } = useToastContext()

  return (
    <div className="fixed right-[40px] top-[40px] z-[1000]">
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              removeToast={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
