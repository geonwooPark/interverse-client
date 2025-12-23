import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScene } from '@providers/SceneProvider'
import Canvas from './Canvas'

export default function Whiteboard() {
  const gameScene = useScene()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    gameScene.events.on('openWhiteboard', handleOpen)
    gameScene.events.on('closeWhiteboard', handleClose)

    return () => {
      gameScene.events.off('openWhiteboard', handleOpen)
      gameScene.events.off('closeWhiteboard', handleClose)
    }
  }, [])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed left-0 top-0 z-dialog flex h-screen w-screen flex-col items-center justify-center bg-black/80">
      <Canvas isOpen={isOpen} />
    </div>,
    document.body,
  )
}
