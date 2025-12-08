import { IconDelete } from '@assets/svgs'
import Image from '@components/Image'
import { useMeQuery } from '@hooks/queries/authQueries'
import { ResponseBody } from '@interfaces/api'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface LogProps {
  log: NonNullable<ResponseBody<'/rooms', 'get'>['data']>[number]
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => void
}

export default function Log({ log, onDelete }: LogProps) {
  const { data: me } = useMeQuery()

  const { t } = useTranslation()

  return (
    <div className="group relative">
      <Link to={`/rooms/${log.room?._id}`}>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={log.room?.map?.thumbnail}
            alt={`map-${log?.room?.map?.name}`}
            className="absolute inset-0 size-full object-cover"
            ratio={4 / 3}
          />
        </div>

        <div className="mt-2">
          <p className="truncate text-h6">{log.room?.title}</p>

          <p className="text-start text-caption text-gray-400">
            {t('rooms.log_list.last_joined', {
              date: dayjs(log.joinedAt).format('YYYY-MM-DD HH:mm:ss'),
            })}
          </p>
        </div>
      </Link>

      {me?.user?.id === log.room?.host && (
        <button
          onClick={(e) => onDelete(e, log.room?._id || '')}
          className="absolute right-2 top-2 hidden size-10 items-center justify-center rounded-md bg-white/50 duration-200 hover:bg-white/30 group-hover:flex"
        >
          <IconDelete className="size-5 text-error" />
        </button>
      )}
    </div>
  )
}
