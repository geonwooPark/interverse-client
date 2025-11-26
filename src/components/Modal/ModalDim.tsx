import React from 'react'

export default function ModalDim({ onClose }: { onClose: () => void }) {
  return <div onClick={onClose} className="size-full bg-black/70" />
}
