import { useState, useSyncExternalStore } from 'react'
import UserItem from './UserItem'
import { AnimatePresence, motion as m } from 'motion/react'
import { useScene } from '@providers/SceneProvider'
import { useModal } from '@providers/ModalProvider'
import Trigger from './Trigger'
import MessageModal from './MessageModal'
import slide from '@components/Animation/motions/slide'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '@components/Icon'

function UserList() {
  const { t } = useTranslation()

  const { id: roomId } = useParams()

  const { addModal, removeModal } = useModal()

  const gameScene = useScene()

  const roomManager = gameScene.room

  const userlist = useSyncExternalStore(
    (callback) => roomManager.subscribe(() => callback()),
    () => roomManager.getState(),
  )

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen((prev) => !prev)
  }

  const handleMessageModal = (id: string) => {
    addModal(
      <MessageModal id={id} roomId={roomId || ''} onClose={removeModal} />,
    )
  }

  const totalUsers = userlist.size + 1

  return (
    <div className="relative">
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-[5] size-full" />
      )}

      <Trigger headCount={totalUsers} onClick={onClose} />

      <AnimatePresence>
        {isOpen && (
          <m.div
            {...slide({ distance: -20, isFade: true }).inY}
            className="absolute right-0 z-[6] mt-4 flex h-[480px] w-[320px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-5 py-4">
              <h3 className="text-subtitle1 font-semibold text-gray-900">
                {t('rooms.room.controller.headcount')}
              </h3>
              <div className="flex items-center gap-1.5 rounded-full bg-cyan-100 px-2.5 py-1">
                <Icon iconName="IconUsers" className="size-4 text-cyan-600" />
                <span className="text-caption font-semibold text-cyan-600">
                  {totalUsers}
                </span>
              </div>
            </div>

            {/* 사용자 리스트 */}
            {totalUsers > 0 ? (
              <ul className="hide-scroll flex-1 overflow-y-auto">
                {/* 플레이어 (본인) */}
                <li className="group flex items-center justify-between border-b border-gray-100 px-5 py-3 transition-colors hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_ASSET
                        }/characters/source/${
                          gameScene.player.texture.key
                        }.png)`,
                        backgroundSize: 'auto 48px',
                        backgroundPosition: '-606px center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body2 font-semibold text-gray-900">
                        {gameScene.player.nickname.text}
                      </p>
                      <p className="text-caption text-cyan-600">나</p>
                    </div>
                  </div>
                </li>

                {/* 타 플레이어 */}
                {Array.from(userlist).map((user, index) => (
                  <UserItem
                    key={user[0]}
                    user={user[1]}
                    handleMessageModal={handleMessageModal}
                    isLast={index === userlist.size - 1}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center pb-12">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                  <Icon iconName="IconUsers" className="size-8 text-gray-400" />
                </div>
                <p className="text-body2 text-gray-400">
                  {t('rooms.room.user_list.empty')}
                </p>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserList
