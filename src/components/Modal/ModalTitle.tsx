import IconButton from '@components/IconButton'
import React from 'react'

interface ModalTitleProps {
  title: string
  onClose?: () => void
}

export default function ModalTitle({ title, onClose }: ModalTitleProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-h6">{title}</h2>

      {onClose && (
        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <IconButton iconName="IconClose" />
        </button>
      )}
    </div>
  )
}
