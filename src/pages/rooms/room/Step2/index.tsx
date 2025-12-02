import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import GameManager from '@managers/GameManager'
import Container from '@components/Container'
import { useParams } from 'react-router-dom'
import { useJoinRoomMutation } from '@hooks/mutations/roomsMutation'
import { useCharactersQuery } from '@hooks/queries/assetsQueries'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useTranslation } from 'react-i18next'

interface Step2Props extends Partial<StepFlowProps> {}

// 방 입장
export default function Step2({ onNext }: Step2Props) {
  const { id: roomId } = useParams()

  const { t } = useTranslation()

  const { data: characters } = useCharactersQuery()

  const { data: me } = useMeQuery()

  const { mutate } = useJoinRoomMutation()

  const [texture, setTexture] = useState(0)

  const nickname = me?.user?.nickname

  const onTextureChange = (value: number) => {
    setTexture(value)
  }

  const onEnter = () => {
    if (!nickname) return
    if (!roomId) return

    const game = GameManager.getInstance()

    // 게임씬 실행
    game.scene.start('game', {
      roomNum: roomId,
      nickname,
      texture: characters?.[texture].name,
    })
    // 참여 시간 업데이트
    mutate(roomId)

    onNext && onNext()
  }

  return (
    <div className="flex size-full items-center justify-center">
      <Container className="max-w-[360px]">
        <AvatarSelector texture={texture} onChange={onTextureChange} />

        <Button
          size="md"
          variant="contained"
          fullWidth
          disabled={!me?.user?.nickname}
          onClick={onEnter}
        >
          {t('rooms.room.step2.enter')}
        </Button>
      </Container>
    </div>
  )
}
