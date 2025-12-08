import { useEffect } from 'react'
import { useScene } from '@providers/SceneProvider'
import { useModal } from '@providers/ModalProvider'

function Modals() {
  const { addModal, removeModal, hasModal } = useModal()

  const gameScene = useScene()

  // 씬에 이벤트 등록
  useEffect(() => {
    return () => {}
  }, [gameScene, addModal, removeModal, hasModal])

  return null
}

export default Modals
