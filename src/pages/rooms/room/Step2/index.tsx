import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import { MAX_NICKNAME_LENGTH } from '@constants/index'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import GameManager from '@managers/GameManager'
import { TextFieldWithCaption } from '@components/TextField'
import Container from '@components/Container'
import { useParams } from 'react-router-dom'
import { useJoinRoomMutation } from '@hooks/mutations/roomsMutation'
import { useCharactersQuery } from '@hooks/queries/assetsQueries'
import { useTranslation } from 'react-i18next'

interface Step2Props extends Partial<StepFlowProps> {}

// 방 입장
export default function Step2({ activeStep, onNext }: Step2Props) {
  const { id: roomId } = useParams()

  const { data: characters } = useCharactersQuery()

  const { mutate } = useJoinRoomMutation()

  const [texture, setTexture] = useState(0)

  const [nickname, setNickname] = useState('')

  const { t } = useTranslation()

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_NICKNAME_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_NICKNAME_LENGTH)
    }

    setNickname(e.target.value)
  }

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

        <div className="mb-6 mt-3">
          <TextFieldWithCaption
            value={nickname}
            onChange={onNicknameChange}
            placeholder={t('rooms.room.step2.nickname_placeholder')}
            maxLength={MAX_NICKNAME_LENGTH}
            caption={
              <p className="ml-2 mt-1 text-caption text-gray-700">
                {t('rooms.room.step2.nickname_caption', {
                  length: MAX_NICKNAME_LENGTH,
                })}
              </p>
            }
          />
        </div>

        <Button
          size="md"
          variant="contained"
          fullWidth
          disabled={nickname.length === 0}
          onClick={onEnter}
        >
          {t('rooms.room.step2.enter')}
        </Button>
      </Container>
    </div>
  )
}
