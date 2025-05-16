import React from 'react'
import { Toast } from './types'
import { motion as m } from 'motion/react'
import slide from '@components/Animation/motions/slide'
import { IconError, IconInfo, IconSuccess } from '@assets/svgs'

const iconMap = {
  success: {
    progressBarColor: 'bg-green-600',
    icon: <IconSuccess className="size-6 shrink-0 text-green-600" />,
  },
  error: {
    progressBarColor: 'bg-red-600',
    icon: <IconError className="size-6 shrink-0 text-red-600" />,
  },
  info: {
    progressBarColor: 'bg-blue-600',
    icon: <IconInfo className="size-6 shrink-0 text-blue-600" />,
  },
}

interface ToastItemProps {
  toast: Toast
  removeToast: () => void
}

export default function ToastItem({ toast, removeToast }: ToastItemProps) {
  return (
    <m.button
      {...slide({ isFade: true, distance: 10 }).inY}
      onClick={removeToast}
      className="relative w-[360px] overflow-hidden rounded-lg border bg-white px-4 py-3 text-left shadow-lg"
    >
      {/* 컨텐츠 */}
      <div className="flex gap-2">
        {iconMap[toast.type].icon}
        <p className="text-body2">{toast.message}</p>
      </div>

      {/* 프로그래스 바 */}
      <m.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        className={`${iconMap[toast.type].progressBarColor} absolute bottom-0 left-0 h-[4px] w-full origin-left bg-black`}
      />
    </m.button>
  )
}
