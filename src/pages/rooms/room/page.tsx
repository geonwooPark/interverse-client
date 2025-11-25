import { useEffect, useState } from 'react'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { useNavigate, useParams } from 'react-router-dom'
import GameManager from '@managers/GameManager'
import { useCharactersQuery } from '@hooks/queries/assetsQueries'
import { useBlockGoBack } from '@hooks/useBlockGoBack'
import { useModal } from '@providers/ModalProvider'
import ConfirmModal from '@components/ConfirmModal'

/**
 * 룸 화면
 */
function RoomPage() {
  const { id: roomId } = useParams()

  const navigate = useNavigate()

  const { addModal, removeModal } = useModal()

  const { data: room, isPending } = useSingleRoomQuery(roomId as string)

  const { data: characters } = useCharactersQuery()

  const [step, setStep] = useState(0)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  // 필요한 에셋 프리로드
  useEffect(() => {
    if (!room?.mapSrc) return

    const game = GameManager.getInstance()

    game.scene.start('preload', {
      mapSrc: room?.mapSrc,
      charactersSrc: characters,
    })
  }, [room?._id, room?.mapSrc, characters])

  useEffect(() => {
    return () => {
      GameManager.destroy()
    }
  }, [])

  useBlockGoBack(() => {
    addModal(
      <ConfirmModal
        title="게임을 종료하시겠습니까?"
        description={`뒤로 가기를 누르면 게임이 종료되며, 이후 방 목록 페이지로 이동합니다. 계속 진행하시겠습니까?`}
        onClose={removeModal}
        onSubmit={() => {
          removeModal()
          navigate('/rooms')
        }}
        rightLabel="종료"
      />,
    )
  })

  return (
    <StepFlow activeStep={step} onNext={onNext}>
      {!room?.isHost && !isPending && <Step1 />}
      <Step2 />
      <Step3 />
    </StepFlow>
  )
}

export default RoomPage
