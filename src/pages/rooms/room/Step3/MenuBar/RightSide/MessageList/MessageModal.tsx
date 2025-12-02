import Button from '@components/Button'
import { useState } from 'react'
import { useMeQuery } from '@hooks/queries/authQueries'
import { IDirectMessage } from '@interfaces/index'
import { motion as m } from 'motion/react'
import fade from '@components/Animation/motions/fade'
import GameScene from '@games/scenes/Game'
import GameManager from '@managers/GameManager'
import { useTranslation } from 'react-i18next'

interface DMProps {
  dm: IDirectMessage
  roomId: string
  onClose: () => void
}

function MessageModal({ dm, roomId, onClose }: DMProps) {
  const { t } = useTranslation()

  const { data: me } = useMeQuery()
  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = (dm: IDirectMessage) => {
    if (!me?.user) return
    if (!roomId) return
    if (!dm.socketId) return

    DMManager.sendDM({
      id: Math.random().toString(),
      message: text,
      roomNum: roomId,
      sender: player.nickname.text,
      receiverId: dm.socketId,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-dialog h-screen w-screen">
      {/* Dim */}
      <div onClick={onClose} className="size-full bg-black/70" />

      {/* Modal */}
      <m.div
        {...fade().fadeIn}
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white`}
      >
        {/* 헤더 */}
        <div className="body1 px-4 py-3">
          {t('rooms.room.message_modal.title', { sender: dm.sender })}
        </div>

        {/* 바디 */}
        <div className="px-4">
          <p className="mb-4 h-[160px] overflow-y-scroll break-all rounded-md border p-2 text-body2">
            {dm.message}
          </p>

          <div className="h-[160px]">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('rooms.room.message_modal.input_placeholder')}
              className="size-full resize-none rounded-md border p-2 outline-none"
            />
          </div>
        </div>

        {/*  푸터 */}
        <div className="flex gap-2 px-4 py-3">
          <Button size="md" variant="ghost" onClick={onClose}>
            {t('rooms.room.message_modal.close')}
          </Button>
          <Button size="md" variant="contained" onClick={() => onSubmit(dm)}>
            {t('rooms.room.message_modal.reply')}
          </Button>
        </div>
      </m.div>
    </div>
  )
}

export default MessageModal
