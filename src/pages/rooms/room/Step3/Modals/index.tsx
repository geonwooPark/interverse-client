import { useEffect } from 'react'
import { useScene } from '@providers/SceneProvider'
import { useModal } from '@providers/ModalProvider'
import ManualModal from './ManualModal'
import SurveyModal from './SurveyModal'
import CreatorModal from './CreatorModal'
import VideoModal from './VideoModal'

function Modals() {
  const { addModal, removeModal, hasModal } = useModal()

  const gameScene = useScene()

  // 씬에 이벤트 등록
  useEffect(() => {
    const handleOpenMenualModal = () => {
      if (!hasModal()) {
        addModal(<ManualModal hasDim />)
      }
    }

    const handleOpenSurveyModal = () => {
      if (!hasModal()) {
        addModal(<SurveyModal hasDim />)
      }
    }

    const handleOpenCreatorModal = () => {
      if (!hasModal()) {
        addModal(<CreatorModal hasDim />)
      }
    }

    const handleOpenVideoModal = () => {
      if (!hasModal()) {
        addModal(<VideoModal hasDim />)
      }
    }

    gameScene.events.on('closeModal', removeModal)
    gameScene.events.on('openMenualModal', handleOpenMenualModal)
    gameScene.events.on('openSurveyModal', handleOpenSurveyModal)
    gameScene.events.on('openCreatorModal', handleOpenCreatorModal)
    gameScene.events.on('openVideoModal', handleOpenVideoModal)

    return () => {
      gameScene.events.off('closeModal', removeModal)
      gameScene.events.off('openMenualModal', handleOpenMenualModal)
      gameScene.events.off('openSurveyModal', handleOpenSurveyModal)
      gameScene.events.off('openCreatorModal', handleOpenCreatorModal)
      gameScene.events.off('openVideoModal', handleOpenVideoModal)
    }
  }, [gameScene, addModal, removeModal, hasModal])

  return null
}

export default Modals
