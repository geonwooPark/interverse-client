import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDirectMessage } from '@interfaces/index'

interface MessageItemProps {
  message: IDirectMessage & { isRead: boolean }
  onClick: () => void
}

export default function MessageItem({ message, onClick }: MessageItemProps) {
  const { t } = useTranslation()

  return (
    <li className="border-b">
      <button
        onClick={onClick}
        className="w-full bg-white px-4 pb-4 pt-2 text-start duration-200 hover:bg-gray-100"
      >
        <div className="pointer-events-none flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-body2 text-gray-400">
              {t('rooms.room.message_item.subtitle', {
                sender: message.sender,
              })}
            </p>
            <p className="line-clamp-1 whitespace-pre-wrap break-words text-body2">
              {message.message}
            </p>
          </div>
          {message.isRead || (
            <span className="size-2.5 shrink-0 rounded-full bg-cyan-500" />
          )}
        </div>
      </button>
    </li>
  )
}
