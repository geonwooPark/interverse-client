import React, { useState } from 'react'
import { useMeQuery } from '@hooks/queries/authQueries'
import Button from '@components/Button'
import fade from '@components/Animation/motions/fade'
import { motion as m } from 'motion/react'
import GameScene from '@games/scenes/Game'
import GameService from '@services/gameService'
import { useTranslation } from 'react-i18next'
import Icon from '@components/Icon'

interface MessageModalProps {
  id: string
  roomId: string
  onClose: () => void
}

export default function MessageModal({
  id: receiverId,
  roomId,
  onClose,
}: MessageModalProps) {
  const { t } = useTranslation()
  const { data: me } = useMeQuery()

  const game = GameService.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = () => {
    if (!me) return
    if (!roomId) return

    const id = Math.random().toString()

    DMManager.sendDM({
      id,
      message: text,
      roomNum: roomId,
      sender: player.nickname.text,
      receiverId,
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
            {t('rooms.room.user_list_modal.title')}
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
          <div className="mb-2 flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span className="text-caption font-medium text-gray-500">
              {t('rooms.room.user_list_modal.send')}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('rooms.room.user_list_modal.input_placeholder')}
            className="size-full resize-none rounded-lg border border-gray-200 bg-white p-4 text-body2 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            rows={5}
          />
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <Button size="md" variant="ghost" onClick={onClose}>
            {t('rooms.room.user_list_modal.cancel')}
          </Button>
          <Button
            size="md"
            variant="contained"
            onClick={onSubmit}
            disabled={!text.trim()}
          >
            {t('rooms.room.user_list_modal.send')}
          </Button>
        </div>
      </m.div>
    </div>
  )
}
