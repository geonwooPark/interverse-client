import React from 'react'

export default function ModalDim({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-deep size-full bg-black/70"
    />
  )
}
