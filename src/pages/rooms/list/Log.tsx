import { IconDelete } from '@assets/svgs'
import Image from '@components/Image'
import { useMeQuery } from '@hooks/queries/authQueries'
import { ResponseBody } from '@interfaces/api'
import { formatDate } from '@utils/dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@utils/cn'

interface LogProps {
  log: NonNullable<ResponseBody<'/rooms', 'get'>['data']>[number]
  participantCount?: number
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => void
}

export default function Log({ log, participantCount, onDelete }: LogProps) {
  const { data: me } = useMeQuery()

  const { t } = useTranslation()

  const isHost = me?.user?.id === log.room?.host

  const headCount = log.room?.headCount ?? 0

  const currentCount = participantCount ?? 0

  const isFull = currentCount >= headCount && headCount > 0

  const Component = isFull ? 'div' : Link

  return (
    <div className="group relative">
      <Component
        to={`/rooms/${log.room?._id}`}
        className="block h-full transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl">
          {/* 이미지 컨테이너 */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={log.room?.map?.thumbnail}
              alt={`map-${log?.room?.map?.name}`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              ratio={4 / 3}
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            {/* 호스트 배지 */}
            {isHost && (
              <div className="absolute left-3 top-3 rounded-full bg-cyan-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                {t('rooms.log_list.host')}
              </div>
            )}

            {/* 참가자 수 배지 */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  isFull ? 'bg-red-400' : 'bg-green-400',
                )}
              ></span>
              <span>
                {currentCount} / {headCount} 명
              </span>
            </div>
          </div>

          {/* 카드 정보 영역 */}
          <div className="bg-white p-4">
            <h3 className="mb-1.5 line-clamp-2 text-h6 font-semibold text-gray-900 transition-colors group-hover:text-cyan-600">
              {log.room?.title}
            </h3>

            <div className="flex items-center gap-2 text-caption text-gray-500">
              <span className="shrink-0">
                {t('rooms.log_list.last_joined', {
                  date: formatDate(log.joinedAt),
                })}
              </span>
            </div>
          </div>
        </div>
      </Component>

      {/* 삭제 버튼 */}
      {isHost && (
        <button
          onClick={(e) => onDelete(e, log.room?._id || '')}
          className={cn(
            'absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full',
            'bg-white/90 backdrop-blur-sm shadow-lg',
            'text-error transition-all duration-200',
            'opacity-0 group-hover:opacity-100',
            'hover:bg-error hover:text-white hover:scale-110',
            'active:scale-95',
          )}
          aria-label="방 삭제"
        >
          <IconDelete className="size-4" />
        </button>
      )}
    </div>
  )
}
