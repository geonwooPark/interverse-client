import React, { useState } from 'react'
import { useMeQuery } from '@hooks/queries/authQueries'
import Button from '@components/Button'
import fade from '@components/Animation/motions/fade'
import { motion as m } from 'motion/react'
import GameScene from '@games/scenes/Game'
import GameManager from '@managers/GameManager'

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
  const { data: me } = useMeQuery()

  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const player = gameScene.player

  const DMManager = gameScene.dm

  const [text, setText] = useState('')

  const onSubmit = () => {
    if (!me?.user) return
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
    <div className="fixed inset-0 z-dialog h-screen w-screen">
      {/* Dim */}
      <div onClick={onClose} className="size-full bg-black/70" />
      {/* Modal */}
      <m.div
        {...fade().fadeIn}
        className={`absolute left-1/2 top-1/2 size-full h-fit w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white`}
      >
        {/* 헤더 */}
        <div className="body1 px-4 py-3">메시지</div>

        {/* 바디 */}
        <div className="h-[160px] px-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="메세지를 입력하세요."
            className="size-full resize-none rounded-md border p-2 outline-none"
          />
        </div>

        {/* 푸터 */}
        <div className="flex gap-2 px-4 py-3">
          <Button size="md" variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button size="md" variant="contained" onClick={onSubmit}>
            전송
          </Button>
        </div>
      </m.div>
    </div>
  )
}
