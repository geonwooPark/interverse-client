import React from 'react'
import { useTranslation } from 'react-i18next'
import { IDirectMessage } from '@interfaces/index'

interface MessageItemProps {
  message: IDirectMessage & { isRead: boolean }
  onClick: () => void
  isLast?: boolean
}

export default function MessageItem({
  message,
  onClick,
  isLast = false,
}: MessageItemProps) {
  const { t } = useTranslation()

  return (
    <li className={isLast ? '' : 'border-b border-gray-100'}>
      <button
        onClick={onClick}
        className="group w-full bg-white px-5 py-4 text-start transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 active:scale-[0.98]"
      >
        <div className="pointer-events-none flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <div
                className={`size-1.5 shrink-0 rounded-full ${
                  message.isRead ? 'bg-gray-300' : 'bg-cyan-500'
                }`}
              />
              <p className="text-caption font-medium text-gray-500">
                {t('rooms.room.message_item.subtitle', {
                  sender: message.sender,
                })}
              </p>
            </div>
            <p className="line-clamp-2 whitespace-pre-wrap break-words text-body2 text-gray-800 group-hover:text-gray-900">
              {message.message}
            </p>
          </div>
          {!message.isRead && (
            <span className="mt-1 shrink-0">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-500 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-cyan-500"></span>
              </span>
            </span>
          )}
        </div>
      </button>
    </li>
  )
}
