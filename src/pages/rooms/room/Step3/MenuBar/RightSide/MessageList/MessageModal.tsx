import Button from '@components/Button'
import { useState } from 'react'
import { useMeQuery } from '@hooks/queries/authQueries'
import { IDirectMessage } from '@interfaces/index'
import { motion as m } from 'motion/react'
import fade from '@components/Animation/motions/fade'
import GameScene from '@games/scenes/Game'
import GameService from '@services/gameService'
import { useTranslation } from 'react-i18next'
import Icon from '@components/Icon'

interface DMProps {
  dm: IDirectMessage
  roomId: string
  onClose: () => void
}

function MessageModal({ dm, roomId, onClose }: DMProps) {
  const { t } = useTranslation()

  const { data: me } = useMeQuery()
  const game = GameService.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = (dm: IDirectMessage) => {
    if (!me) return
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
    <div className="fixed inset-0 z-dialog flex h-screen w-screen items-center justify-center">
      {/* Dim */}
      <div
        onClick={onClose}
        className="absolute inset-0 size-full bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <m.div
        {...fade().fadeIn}
        className="relative z-10 h-fit w-[480px] rounded-xl bg-white shadow-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-subtitle1 font-semibold text-gray-900">
            {t('rooms.room.message_modal.title', { sender: dm.sender })}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Icon iconName="IconClose" className="size-5" />
          </button>
        </div>

        {/* 바디 */}
        <div className="px-6 py-5">
          {/* 받은 메시지 */}
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="size-2 rounded-full bg-cyan-500" />
              <span className="text-caption font-medium text-gray-500">
                {t('rooms.room.message_item.subtitle', {
                  sender: dm.sender,
                })}
              </span>
            </div>
            <div className="hide-scroll max-h-[200px] overflow-y-auto rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap break-words text-body2 text-gray-800">
                {dm.message}
              </p>
            </div>
          </div>

          {/* 답장 입력 */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-500" />
              <span className="text-caption font-medium text-gray-500">
                {t('rooms.room.message_modal.reply')}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('rooms.room.message_modal.input_placeholder')}
              className="size-full resize-none rounded-lg border border-gray-200 bg-white p-4 text-body2 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              rows={5}
            />
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <Button size="md" variant="ghost" onClick={onClose}>
            {t('rooms.room.message_modal.close')}
          </Button>
          <Button
            size="md"
            variant="contained"
            onClick={() => onSubmit(dm)}
            disabled={!text.trim()}
          >
            {t('rooms.room.message_modal.reply')}
          </Button>
        </div>
      </m.div>
    </div>
  )
}

export default MessageModal
