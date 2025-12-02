import React, { useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion as m } from 'motion/react'
import { useScene } from '@providers/SceneProvider'
import MessageItem from './MessageItem'
import Trigger from './Trigger'
import { useModal } from '@providers/ModalProvider'
import MessageModal from './MessageModal'
import slide from '@components/Animation/motions/slide'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@components/Icon'

export default function MessageList() {
  const { id: roomId } = useParams()

  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  const DMManager = gameScene.dm

  const messagelist = useSyncExternalStore(
    (callback) => DMManager.subscribe(() => callback()),
    () => DMManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const hasNewAlarm = messagelist?.some((r) => !r.isRead)

  const { t } = useTranslation()

  const onClose = () => {
    setIsOpen((prev) => !prev)
  }

  const readDM = (dm: any) => {
    DMManager.readDM(dm.id)
    addModal(
      <MessageModal dm={dm} roomId={roomId || ''} onClose={removeModal} />,
    )
  }

  const readAllDM = () => {
    DMManager.readAllDM()
  }

  return (
    <div className="relative">
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-[5] size-full" />
      )}

      <Trigger onClick={onClose} hasNewAlarm={hasNewAlarm} />

      <AnimatePresence>
        {isOpen && (
          <m.div
            {...slide({ distance: -20, isFade: true }).inY}
            className="absolute right-0 z-[6] mt-4 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-5 py-4">
              <h3 className="text-subtitle1 font-semibold text-gray-900">
                {t('rooms.room.controller.dm')}
              </h3>
              <button
                disabled={!hasNewAlarm}
                onClick={readAllDM}
                className={`rounded-lg px-3 py-1.5 text-caption font-medium transition-all ${
                  hasNewAlarm
                    ? 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 active:scale-95'
                    : 'cursor-not-allowed text-gray-300'
                }`}
              >
                {t('rooms.room.message_list.mark_all_read')}
              </button>
            </div>

            {/* 메시지 리스트 */}
            {messagelist.length > 0 ? (
              <ul className="hide-scroll flex-1 overflow-y-auto">
                {messagelist.reverse().map((message, index) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    onClick={() => readDM(message)}
                    isLast={index === messagelist.length - 1}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center pb-12">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                  <Icon
                    iconName="IconEvelope"
                    className="size-8 text-gray-400"
                  />
                </div>
                <p className="text-body2 text-gray-400">
                  {t('rooms.room.message_list.empty')}
                </p>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
