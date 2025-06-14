import { useEffect, useState } from 'react'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { useParams } from 'react-router-dom'
import GameManager from '@managers/GameManager'
import { useCharactersQuery } from '@hooks/queries/assetsQueries'

/**
 * 룸 화면
 */
function RoomPage() {
  const { id: roomId } = useParams()

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

  return (
    <StepFlow activeStep={step} onNext={onNext}>
      {!room?.isHost && !isPending && <Step1 />}
      <Step2 />
      <Step3 />
    </StepFlow>
  )
}

export default RoomPage
