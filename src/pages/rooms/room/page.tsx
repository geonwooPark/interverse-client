import { useEffect, useState } from 'react'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import GameManager from '@managers/GameManager'
import SceneProvider from '@providers/SceneProvider'
import GameScene from '@games/scenes/Game'
import ModalProvider from '@providers/ModalProvider'
import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { useParams } from 'react-router-dom'

/**
 * 룸 화면
 */
function RoomPage() {
  const { id: roomId } = useParams()

  const { data: room, isPending } = useSingleRoomQuery(roomId as string)

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const [step, setStep] = useState(0)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  // 필요한 에셋 프리로드
  useEffect(() => {
    // 여기서 맵을 받아와서 프리로드?

    if (!game.scene.isActive('Preload')) {
      game.scene.start('Preload')
    }
  }, [])

  return (
    <SceneProvider scene={gameScene}>
      <ModalProvider>
        <StepFlow activeStep={step} onNext={onNext}>
          {!room?.isHost && !isPending && <Step1 />}
          <Step2 />
          <Step3 />
        </StepFlow>
      </ModalProvider>
    </SceneProvider>
  )
}

export default RoomPage
