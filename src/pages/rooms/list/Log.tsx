import { IconDelete } from '@assets/svgs'
import Image from '@components/Image'
import { useMeQuery } from '@hooks/queries/authQueries'
import { formatDate } from '@utils/dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@utils/cn'
import { ResponseBody } from '@interfaces/api'

type LogItem = NonNullable<
  NonNullable<ResponseBody<'/rooms', 'get'>['data']>['logs']
>[number]

interface LogProps {
  log: LogItem
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => void
}

export default function Log({ log, onDelete }: LogProps) {
  const { data: me } = useMeQuery()

  const { t } = useTranslation()

  const isHost = me?.id === log.room?.host

  return (
    <div className="group relative">
      <Link
        to={`/rooms/${log.room?.id}`}
        className="block h-full transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl">
          {/* 이미지 컨테이너 */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={log.room?.map?.thumbnail}
              alt={`map-${log?.room?.map?.name}`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              objectFit="cover"
              ratio={4 / 3}
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            {log.room?.map?.name && (
              <div className="absolute inset-x-3 bottom-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-lg bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-body2 text-white">
                    {log.room.map.name}
                  </span>
                </div>
              </div>
            )}

            {/* 호스트 배지 */}
            {isHost && (
              <div className="absolute left-3 top-3 rounded-full bg-cyan-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                {t('rooms.log_list.host')}
              </div>
            )}
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
      </Link>

      {/* 삭제 버튼 */}
      {isHost && (
        <button
          onClick={(e) => onDelete(e, log.room?.id || '')}
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
